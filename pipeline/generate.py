#!/usr/bin/env python3
"""
UK Money Explained — Article Generation Pipeline

Generates SEO-optimized finance articles using a local Ollama LLM.
Reads keywords from CSV, generates articles, saves as Hugo markdown.

Usage:
    python generate.py                     # Generate all pending articles
    python generate.py --slug SLUG         # Generate a specific article
    python generate.py --dry-run           # Print prompts, don't call LLM
    python generate.py --batch N           # Generate N articles max
    python generate.py --priority 1        # Only priority 1 articles
"""

import argparse
import csv
import http.client
import json
import os
import socket
import sys
import time
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

import yaml


SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
CONFIG_PATH = SCRIPT_DIR / "config.yaml"
KEYWORDS_PATH = SCRIPT_DIR / "keywords.csv"
PROMPT_PATH = SCRIPT_DIR / "prompts" / "article.txt"


def load_config():
    with open(CONFIG_PATH) as f:
        return yaml.safe_load(f)


def load_prompt_template():
    with open(PROMPT_PATH) as f:
        return f.read()


def load_keywords():
    rows = []
    with open(KEYWORDS_PATH, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    return rows


def save_keywords(rows):
    if not rows:
        return
    fieldnames = rows[0].keys()
    with open(KEYWORDS_PATH, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def build_prompt(template, row):
    """Build the article generation prompt from template and keyword row."""
    # Extract topic from title (remove "UK", "Explained", etc. for cleaner topic name)
    topic = row["title"]
    topic_clean = re.sub(r"\s*(UK|Explained|Calculator)\s*", " ", topic).strip()

    prompt = template.replace("{title}", row["title"])
    prompt = prompt.replace("{target_keyword}", row["target_keyword"])
    prompt = prompt.replace("{section}", row["section"])
    prompt = prompt.replace("{pillar}", row["pillar"])
    prompt = prompt.replace("{topic}", topic_clean)
    return prompt


def build_frontmatter(row, config):
    """Build Hugo frontmatter for the article."""
    now = datetime.now(timezone.utc).strftime(config["content"]["date_format"])
    fm = {
        "title": row["title"],
        "date": now,
        "lastmod": now,
        "description": f'{row["target_keyword"]} — explained in plain English. Learn how {row["title"].lower()} with clear examples, tables, and FAQs.',
        "categories": [row["pillar"]],
        "tags": [kw.strip() for kw in row["target_keyword"].split(",")],
        "keywords": [row["target_keyword"]],
        "slug": row["slug"],
        "schema_type": "Article",
        "has_faq": True,
        "draft": False,
    }
    # Simple YAML serialization (avoid requiring extra deps)
    lines = ["---"]
    for key, value in fm.items():
        if isinstance(value, bool):
            lines.append(f"{key}: {'true' if value else 'false'}")
        elif isinstance(value, list):
            items = json.dumps(value)
            lines.append(f"{key}: {items}")
        else:
            # Quote strings containing colons or special chars
            if ":" in str(value) or '"' in str(value):
                escaped = str(value).replace('"', '\\"')
                lines.append(f'{key}: "{escaped}"')
            else:
                lines.append(f"{key}: \"{value}\"")
    lines.append("---")
    return "\n".join(lines)


def call_ollama(prompt, config):
    """Call the Ollama OpenAI-compatible API using http.client for reliable timeout handling."""
    ollama_cfg = config["ollama"]
    parsed = urlparse(ollama_cfg["base_url"])
    host = parsed.hostname
    port = parsed.port or 80
    path = f"{parsed.path}/chat/completions"

    # Use /no_think for Qwen3+ models to skip chain-of-thought
    model = ollama_cfg["model"]
    system_msg = "/no_think\nYou are a professional UK personal finance education writer."
    if "qwen" not in model.lower():
        system_msg = "You are a professional UK personal finance education writer."

    payload = json.dumps({
        "model": model,
        "messages": [
            {"role": "system", "content": system_msg},
            {"role": "user", "content": prompt},
        ],
        "temperature": ollama_cfg["temperature"],
        "max_tokens": ollama_cfg["max_tokens"],
        "stream": False,
    }).encode()

    timeout = ollama_cfg["timeout"]
    conn = http.client.HTTPConnection(host, port, timeout=timeout)
    try:
        conn.request("POST", path, body=payload, headers={"Content-Type": "application/json"})
        # Set a generous socket timeout for reading the response
        conn.sock.settimeout(timeout)
        resp = conn.getresponse()
        raw = resp.read()
        if resp.status != 200:
            raise ConnectionError(f"Ollama API returned {resp.status}: {raw.decode()[:200]}")
        data = json.loads(raw)
        return data["choices"][0]["message"]["content"]
    except (socket.timeout, TimeoutError) as e:
        raise ConnectionError(f"Ollama API timeout after {timeout}s: {e}")
    except (ConnectionRefusedError, OSError) as e:
        raise ConnectionError(f"Ollama API connection error: {e}")
    finally:
        conn.close()


def extract_article_body(response):
    """Clean the LLM response — strip any accidental frontmatter or code fences."""
    text = response.strip()
    # Remove code fences if wrapped
    if text.startswith("```"):
        text = re.sub(r"^```\w*\n?", "", text)
        text = re.sub(r"\n?```$", "", text)
    # Remove frontmatter if accidentally included
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            text = parts[2].strip()
    return text


def save_article(row, frontmatter, body, config):
    """Save the generated article as a Hugo markdown file."""
    section = row["section"]
    slug = row["slug"]
    output_dir = PROJECT_ROOT / config["content"]["output_dir"] / section
    output_dir.mkdir(parents=True, exist_ok=True)
    filepath = output_dir / f"{slug}.md"
    content = f"{frontmatter}\n\n{body}\n"
    filepath.write_text(content)
    return filepath


def generate_article(row, config, template, dry_run=False):
    """Generate a single article."""
    prompt = build_prompt(template, row)

    if dry_run:
        print(f"\n{'='*60}")
        print(f"DRY RUN: {row['slug']}")
        print(f"{'='*60}")
        print(prompt[:500] + "...")
        return True

    print(f"  Generating: {row['title']}...", end=" ", flush=True)
    start = time.time()

    retries = config["generation"]["max_retries"]
    for attempt in range(retries):
        try:
            response = call_ollama(prompt, config)
            break
        except ConnectionError as e:
            if attempt < retries - 1:
                wait = config["generation"]["retry_delay"]
                print(f"\n  Retry {attempt+1}/{retries} in {wait}s ({e})")
                time.sleep(wait)
            else:
                print(f"FAILED after {retries} attempts: {e}")
                return False

    body = extract_article_body(response)
    frontmatter = build_frontmatter(row, config)
    filepath = save_article(row, frontmatter, body, config)
    elapsed = time.time() - start
    word_count = len(body.split())
    print(f"OK ({word_count} words, {elapsed:.1f}s) -> {filepath}")
    return True


def main():
    parser = argparse.ArgumentParser(description="Generate UK Money Explained articles")
    parser.add_argument("--slug", help="Generate a specific article by slug")
    parser.add_argument("--dry-run", action="store_true", help="Print prompts without calling LLM")
    parser.add_argument("--batch", type=int, default=0, help="Max articles to generate (0=all)")
    parser.add_argument("--priority", type=int, default=0, help="Only generate this priority level (0=all)")
    parser.add_argument("--config", type=str, default=str(CONFIG_PATH), help="Config file path")
    args = parser.parse_args()

    config = load_config()
    template = load_prompt_template()
    rows = load_keywords()

    # Filter rows
    targets = []
    for row in rows:
        if args.slug and row["slug"] != args.slug:
            continue
        if row["status"] != "pending":
            continue
        if args.priority and int(row["priority"]) != args.priority:
            continue
        targets.append(row)

    if not targets:
        print("No pending articles to generate.")
        return

    if args.batch:
        targets = targets[:args.batch]

    print(f"Generating {len(targets)} article(s)...")
    success = 0
    failed = 0

    for i, row in enumerate(targets):
        print(f"\n[{i+1}/{len(targets)}]", end="")
        ok = generate_article(row, config, template, dry_run=args.dry_run)

        if ok and not args.dry_run:
            # Update status in CSV
            for r in rows:
                if r["slug"] == row["slug"]:
                    r["status"] = "generated"
                    break
            save_keywords(rows)
            success += 1
        elif not ok:
            failed += 1

        # Delay between articles (skip on last or dry-run)
        if not args.dry_run and i < len(targets) - 1:
            delay = config["generation"]["delay_between_articles"]
            if delay > 0:
                time.sleep(delay)

    print(f"\n{'='*40}")
    print(f"Done. Success: {success}, Failed: {failed}")
    if args.dry_run:
        print("(Dry run — no articles were generated)")


if __name__ == "__main__":
    main()
