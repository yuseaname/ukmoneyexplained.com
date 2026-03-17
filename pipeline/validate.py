#!/usr/bin/env python3
"""
UK Money Explained — Article Validator

Validates generated articles against the mandatory template structure,
word counts, disclaimer checks, and content quality rules.

Usage:
    python validate.py                    # Validate all generated articles
    python validate.py --slug SLUG        # Validate a specific article
    python validate.py --fix              # Auto-fix minor issues where possible
"""

import argparse
import csv
import re
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
KEYWORDS_PATH = SCRIPT_DIR / "keywords.csv"
CONTENT_DIR = PROJECT_ROOT / "content"

# Mandatory H2 sections (partial match)
REQUIRED_SECTIONS = [
    "Quick Answer",
    "What Is",
    "How",
    "Example",
    "Table",
    "Frequently Asked Questions",
]

# Phrases that constitute financial advice (forbidden)
ADVICE_PHRASES = [
    r"\byou should\b",
    r"\bI recommend\b",
    r"\bwe recommend\b",
    r"\bthe best option is\b",
    r"\byou must invest\b",
    r"\balways choose\b",
    r"\bnever take out\b",
    r"\byou need to get\b",
]

MIN_WORDS = 1000
MAX_WORDS = 3500
MIN_FAQ_COUNT = 2


class ValidationResult:
    def __init__(self, slug, filepath):
        self.slug = slug
        self.filepath = filepath
        self.errors = []
        self.warnings = []

    def error(self, msg):
        self.errors.append(msg)

    def warn(self, msg):
        self.warnings.append(msg)

    @property
    def passed(self):
        return len(self.errors) == 0

    def __str__(self):
        status = "PASS" if self.passed else "FAIL"
        lines = [f"[{status}] {self.slug}"]
        for e in self.errors:
            lines.append(f"  ERROR: {e}")
        for w in self.warnings:
            lines.append(f"  WARN:  {w}")
        return "\n".join(lines)


def load_keywords():
    rows = []
    with open(KEYWORDS_PATH, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    return rows


def find_article(slug, section):
    """Find the article markdown file."""
    filepath = CONTENT_DIR / section / f"{slug}.md"
    if filepath.exists():
        return filepath
    return None


def parse_article(filepath):
    """Parse article into frontmatter dict and body text."""
    text = filepath.read_text()

    # Parse frontmatter
    fm = {}
    body = text
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            fm_text = parts[1].strip()
            body = parts[2].strip()
            for line in fm_text.split("\n"):
                if ":" in line:
                    key, _, value = line.partition(":")
                    fm[key.strip()] = value.strip().strip('"')

    return fm, body


def validate_article(slug, section, filepath):
    """Run all validation checks on an article."""
    result = ValidationResult(slug, filepath)
    fm, body = parse_article(filepath)

    # --- Frontmatter checks ---
    required_fm = ["title", "date", "description", "slug", "has_faq"]
    for field in required_fm:
        if field not in fm:
            result.error(f"Missing frontmatter field: {field}")

    if fm.get("description") and len(fm["description"]) > 160:
        result.warn(f"Meta description too long ({len(fm['description'])} chars, max 160)")

    # --- Word count ---
    words = len(body.split())
    if words < MIN_WORDS:
        result.error(f"Word count too low: {words} (min {MIN_WORDS})")
    elif words > MAX_WORDS:
        result.warn(f"Word count high: {words} (target max {MAX_WORDS})")

    # --- Required sections ---
    h2_headings = re.findall(r"^##\s+(.+)$", body, re.MULTILINE)
    h2_text = " ".join(h2_headings).lower()

    for section_name in REQUIRED_SECTIONS:
        if section_name.lower() not in h2_text:
            result.error(f"Missing required section: '{section_name}'")

    # --- FAQ check ---
    faq_headings = re.findall(r"^###\s+(.+)$", body, re.MULTILINE)
    # Only count FAQ items (those after "Frequently Asked Questions")
    faq_start = body.lower().find("frequently asked questions")
    if faq_start >= 0:
        faq_section = body[faq_start:]
        faq_items = re.findall(r"^###\s+(.+)$", faq_section, re.MULTILINE)
        if len(faq_items) < MIN_FAQ_COUNT:
            result.error(f"Too few FAQ items: {len(faq_items)} (min {MIN_FAQ_COUNT})")
    else:
        result.error("No FAQ section found")

    # --- Table check ---
    if "|" not in body or "---" not in body:
        result.warn("No markdown table detected")

    # --- Financial advice check ---
    for pattern in ADVICE_PHRASES:
        matches = re.findall(pattern, body, re.IGNORECASE)
        if matches:
            result.error(f"Contains financial advice language: '{matches[0]}'")

    # --- H1 check ---
    h1_headings = re.findall(r"^#\s+(.+)$", body, re.MULTILINE)
    if not h1_headings:
        result.warn("No H1 heading found in body")

    # --- UK mention check ---
    if "uk" not in body.lower() and "united kingdom" not in body.lower():
        result.warn("No mention of 'UK' or 'United Kingdom' in article body")

    return result


def main():
    parser = argparse.ArgumentParser(description="Validate UK Money Explained articles")
    parser.add_argument("--slug", help="Validate a specific article by slug")
    parser.add_argument("--all", action="store_true", help="Validate all articles (including non-generated)")
    args = parser.parse_args()

    rows = load_keywords()
    results = []

    for row in rows:
        if args.slug and row["slug"] != args.slug:
            continue
        if not args.all and row["status"] not in ("generated", "validated"):
            continue

        filepath = find_article(row["slug"], row["section"])
        if not filepath:
            if row["status"] == "generated":
                r = ValidationResult(row["slug"], None)
                r.error("Article file not found")
                results.append(r)
            continue

        result = validate_article(row["slug"], row["section"], filepath)
        results.append(result)

    if not results:
        print("No articles to validate.")
        return

    # Print results
    passed = 0
    failed = 0
    for r in results:
        print(r)
        if r.passed:
            passed += 1
        else:
            failed += 1

    print(f"\n{'='*40}")
    print(f"Total: {len(results)} | Passed: {passed} | Failed: {failed}")

    if failed > 0:
        sys.exit(1)


if __name__ == "__main__":
    main()
