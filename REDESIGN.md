# ukmoneyexplained.com Redesign Plan

**Scope:** Visual language, interaction design, and UX of ukmoneyexplained.com.  
**Date:** 2026-08-09  
**Author:** Design Lead  
**Status:** Implementation-ready plan, pending review  
**Platform:** Hugo + adsense-base theme + Tailwind CSS  

## Constraints & Quality Bar — Confirmed Understanding

We are preserving the existing information architecture, URL structure, core navigation, and page hierarchy. No sections are renamed or removed without explicit justification. The redesign is mobile-first, accessibility-first (WCAG 2.2 AA, AAA where feasible), and performance-aware. The goal is not decoration; it is to make UK personal finance feel calm, authoritative, and immediately usable.

---

## 1. Current Experience Audit

### What works today
- **Sound IA.** Six clear top-level sections (Credit & Debt, Loans, Mortgages, Taxes, Bills, Tools) plus About/Contact. Permalinks are flat and stable (/:filename/). Hugo's auto-generated section lists, sitemap, RSS, and breadcrumbs are already in place.
- **Accessibility baseline.** Skip-to-content link, reading-progress bar, semantic nav, focus outlines, reduced-motion media query, print styles, and structured breadcrumbs are already implemented.
- **Template coverage.** Single, list, section, and homepage layouts exist, plus shortcodes for callouts, tables, FAQ, and ad slots.
- **Trust signals.** Homepage hero includes "Expert-reviewed guides" and article count, which is directionally correct for a finance site.
- **Functional tools.** Three interactive calculators (income tax, mortgage affordability, budget planner) are live as embedded JS.

### Friction points and UX debt
- **Generic visual identity.** The site uses the default Tailwind "slate/blue" palette and Inter at every weight. The homepage gradient hero and grid pattern read as a boilerplate AdSense theme rather than a finance authority. Iconography is the same folder icon for every category.
- **Weak information scent on cards.** Article cards show title, date, read time, and a truncated plain text excerpt, but no signal about whether a guide is a quick definition, a step-by-step process, a calculator, or a data study. Users scanning for a specific task must open articles to find out.
- **Tool UX is dated.** Calculators are raw HTML inputs with inline styles and generic labels. No live preview, no progressive disclosure, no explanation of assumptions, no validation/error states, and no way to reset or share a result. On mobile, the input stacks are cramped and error-prone.
- **Reading hierarchy is flat.** Long-form guides (many 150–400 lines of markdown) flow in one column with only H2/H3 breaks. There is no quick-answer module, no "at a glance" summary, no key takeaways, and the TOC only appears above 800 words. For finance content—where a user often wants "the rule" first—this increases cognitive load.
- **Weak differentiation for money topics.** A credit-score guide and a council-tax guide look visually identical, even though one is about a personal number and the other is about a recurring bill. There is no visual language that encodes topic type.
- **Footer and nav lack topic-specific help.** The footer repeats generic category links but does not surface the three most common user tasks ("Check my tax", "Find my council tax band", "Work out my mortgage").
- **Motion and micro-interactions are minimal but unpolished.** The nav adds a shadow on scroll and cards lift on hover, but buttons, links, and form inputs lack coordinated feedback. The experience feels functional but not considered.

### Accessibility gaps
- Focus styles exist but rely on a single blue outline. There is no custom focus ring for inverse surfaces (hero, category banners).
- The mobile menu uses `role="menu"` but anchors inside it are not true menuitems; this is a minor role mismatch.
- Color contrast for the blue link style against the light slate backgrounds passes AA, but the muted text (#64748b on #f8fafc) is close to the edge for small text.
- Calculator inputs rely on color alone for state (red borders for errors are not implemented); no live error announcements for screen-reader users.

### Missed opportunities
- **Topic taxonomy is underused.** Tags exist but are not surfaced as discovery surfaces or filters on section pages.
- **Tools do not convert readers into return visitors.** Calculators produce a number but do not give the user a printable/emailable summary or a related next step.
- **Section pages are lists, not landing experiences.** Each section (/taxes/, /mortgages/, etc.) could quickly orient the visitor with a "Start here" article, a beginner guide, and a data study, rather than a flat grid.
- **No editorial freshness signal.** Articles have `updated` frontmatter in some cases, but the visual treatment of the update badge is tiny and gray. Finance content is time-sensitive; freshness should be unmistakable.

---

## 2. Prioritized UX Improvements

### P0 — Must ship before any visual restyle
1. **Article format labelling.** Add a small format badge to every card and article header ("Definition", "Step-by-step", "Calculator", "Data study", "Comparison", "Checklist").  
   *Problem:* Users cannot tell what kind of answer they will get.  
   *Change:* Introduce `format` frontmatter and a corresponding badge component. Default to "Guide" if absent.  
   *Benefit:* Faster scanning, better task-to-content matching, improved CTR from section pages.

2. **Quick-answer block at top of long articles.** Above the first H2, insert a structured "At a glance" summary box with 2–4 bullet takeaways.  
   *Problem:* Readers with a specific question must scroll through background to find the rule.  
   *Change:* Shortcode `quick-answer` plus optional `quick_answer` frontmatter array.  
   *Benefit:* Reduces time-to-answer, improves snippet potential, helps low-literacy users.

3. **Tool UX overhaul.** Refactor all three calculators with real-time calculation, visible assumptions, inline validation, and clear result presentation.  
   *Problem:* Current calculators feel like raw forms; mobile entry is hard; assumptions are hidden.  
   *Change:* New calculator layout: labeled input groups, stepper or slider where appropriate, result panel that updates on input, disclosure of source/rates, and a "Start again" control.  
   *Benefit:* Higher completion rate, more trust, fewer support questions, better repeat usage.

4. **Section landing-page orientation.** Add a "Start here" and "Most useful" slot to each section list.  
   *Problem:* Section pages are undifferentiated grids.  
   *Change:* Allow `start_here` and `featured` frontmatter flags; render a compact hero card row above the full grid.  
   *Benefit:* New visitors know where to begin; reduces choice paralysis.

5. **Visual topic coding.** Assign a subtle color/texture to each top-level section (bills = warm terracotta, credit = deep indigo, taxes = crown green, mortgages = sandstone, loans = slate, tools = mint).  
   *Problem:* Every page looks identical; users lose context when navigating.  
   *Change:* CSS section tokens applied to hero banner, badge, section icons, and footer accent.  
   *Benefit:* Instant recognition, stronger wayfinding, more memorable brand.

### P1 — Ship in second pass
6. **Sticky TOC improvements.** Make the TOC collapsible on mobile and highlight the active section on scroll.  
   *Benefit:* Easier navigation through long guides; reinforces location.

7. **Related-articles intelligence.** Weight related articles by format matching (e.g., after a "Step-by-step" mortgage article, surface a "Calculator" next).  
   *Benefit:* Increases engagement by surfacing complementary formats.

8. **Freshness and review date prominence.** Restyle the "Updated" meta to a visible badge when `lastmod` is recent; add a "Reviewed" date line in the footer of every article.  
   *Benefit:* Builds trust in time-sensitive finance content.

9. **Empty and error states for calculators.** Define and implement validation messages, empty results, and out-of-range warnings.  
   *Benefit:* Prevents user confusion and accessibility failures.

10. **Improved mobile nav.** Replace the `role="menu"` container, add close-on-escape and close-on-outside-click, ensure focus trap while open.  
   *Benefit:* Corrects the current ARIA mismatch and improves mobile usability.

### P2 — Nice-to-have, high value but not urgent
11. **Printable result summary for tools.** Add a "Save or print this result" button to each calculator that outputs a clean, branded summary.  
   *Benefit:* Increases perceived utility and return visits.

12. **Topic glossary hovers.** For jargon-heavy paragraphs, provide inline definitions via a tooltip/footnote pattern.  
   *Benefit:* Reduces cognitive load without leaving the page.

13. **Search affordance.** Add a small, scoped search input to the nav and section pages once a search backend is available.  
   *Benefit:* Faster task completion for repeat visitors.

---

## 3. 2026-Ready Visual Direction

### Subject grounding
ukmoneyexplained.com is a UK personal-finance explainer for ordinary people who need to understand bills, tax, credit, and borrowing without speaking like an accountant. The visual identity should feel like a reliable public service: clear, unhurried, and quietly authoritative. It should avoid both the cold blue of fintech apps and the aggressive red/black of debt-advice charities.

### Aesthetic north star
**"The modern Citizen's Advice desk."** Clean public-sector confidence mixed with the warmth of a well-designed newspaper. The site should feel like it was built by a team that respects the reader's time and anxiety. Calm, structured, with one deliberate visual risk: a subtle "ledger-line" motif that runs through headings, cards, and result panels—suggesting order, accounts, and clarity without being literal.

### Color system
| Token | Hex | Usage |
|-------|-----|-------|
| ink | `#0B1A2F` | Primary headings, body text, key numbers. |
| slate | `#334155` | Secondary text, labels, captions. |
| muted | `#64758B` | Tertiary text, placeholders, disabled states. |
| parchment | `#F7F5F1` | Page background, subtle panels, calculator surfaces. |
| paper | `#FFFFFF` | Card surfaces, input backgrounds, modal panels. |
| ruler | `#D6CFC4` | Divider lines, hairline rules, ledger motif. |
| authority | `#0F4C5C` | Primary actions, links, section accents. Deep teal suggests trust without bank-blue cliché. |
| crown | `#1F4D35` | Taxes/government topics, success states, "official" signals. |
| caution | `#B45F06` | Warnings, important caveats (not fire-engine red). |
| urgent | `#9B2C2C` | Danger/debt warnings, errors. Used sparingly. |

**Semantic aliases:** `--text`, `--text-secondary`, `--surface`, `--surface-subtle`, `--border`, `--accent`, `--success`, `--warning`, `--danger`, `--section-credit`, `--section-debt`, `--section-loans`, `--section-mortgages`, `--section-taxes`, `--section-bills`, `--section-tools`.

### Typography system
- **Display:** Saira (Google Fonts) — a confident, slightly squared sans with UK/public-sector gravitas. Used only for the logo wordmark, homepage hero, and section banners. Weight 700, tight tracking.
- **Headings:** Fraunces (Google Fonts) — a warm, high-contrast serif that brings newspaper/editorial authority. H1/H2 in weight 600–700. This is the deliberate risk: a serif for finance content, executed with restraint.
- **Body:** Inter is retained, but limited to 400/500/600 and paired with tighter line-height. The body stack becomes `'Inter', 'Saira', system-ui, sans-serif`.
- **Data/utility:** JetBrains Mono for figures, calculator outputs, and tabular data.

**Type scale (fluid clamp):**
| Token | Range |
|-------|-------|
| text-xs | 0.75 → 0.8125rem |
| text-sm | 0.8125 → 0.875rem |
| text-base | 1.0 → 1.125rem |
| text-lg | 1.0625 → 1.25rem |
| text-xl | 1.25 → 1.5rem |
| text-2xl | 1.5 → 2rem |
| text-3xl | 1.875 → 2.5rem |
| text-4xl | 2.25 → 3.25rem |

**Line heights:** headings `1.15`, body `1.65`, captions `1.4`.

### Spacing scale
Base-4 grid, but with more generous section breaks to let finance content breathe.
- `--space-1` 0.25rem through `--space-16` 4rem, plus `--space-24` 6rem for major section transitions.
- Article max-width narrows to `42rem` (672px) for prose; list pages use `80rem` max.
- Cards use internal padding of `1.25rem`.

### Elevation/depth approach
- Almost flat. Use only two shadows: `shadow-sm` for inputs/cards at rest, `shadow-md` for hover/focus on interactive cards.
- No heavy drop shadows, no glassmorphism, no blur-heavy nav.
- Depth is created through tone (parchment panels on white ground), hairline rules, and typographic weight, not elevation.

### Iconography
- Single-stroke, 1.5px line icons from a consistent set (Heroicons style). Each section gets one distinctive icon: credit = card, debt = scale, loans = document-signature, mortgages = house, taxes = calculator, bills = lightning/water, tools = wrench.
- Icons are used as wayfinding glyphs, never as decoration. They are always paired with a text label.

### Signature element
**The ledger rule.** A thin horizontal line (1px, `ruler` color) that sits beneath section headings, separates result panels, and underscores active TOC items. It is the one memorable visual device that ties every page to the idea of "balancing the books." It is quiet, but everywhere. It replaces generic gradient underlines and heavy card borders.

### Do’s
- Use the parchment background for the entire page; white only for cards, inputs, and raised surfaces.
- Let Fraunces carry the editorial voice in H1/H2; let Inter do the explanatory work.
- Use section color as a 4px top border on cards and a subtle tint behind section banners, not as full-bleed neon panels.
- Make numbers large and monospace in calculator outputs.
- Keep border-radius small and consistent: 0.5rem for cards, 0.375rem for inputs/buttons.

### Don’ts
- Do not use a blue-to-purple gradient hero (current default). It reads as generic SaaS.
- Do not use all-caps labels or uppercase buttons. Sentence case only.
- Do not use abstract 3D coins, piggy banks, or crypto-style iconography.
- Do not animate anything on page load except a 150ms fade for the reading progress bar.
- Do not use more than one accent color per page.

---

## 4. Component & Interaction Updates

### Buttons
- **Primary:** `authority` background, white text, `0.375rem` radius, `font-weight: 600`, `padding: 0.625rem 1.25rem`. Hover darkens 8% and shifts `translateY(-1px)`. Focus ring: `2px authority-300` with 2px offset.
- **Secondary:** parchment background, ink text, 1px `ruler` border. Hover fills with `authority-50`.
- **Text link:** Underline on hover only, with a 1px ruler underline offset. No color shift for inline article links; rely on underline.
- **Disabled:** `opacity: 0.5`, `cursor: not-allowed`, no transform.

### Forms / calculator inputs
- Inputs: white surface, 1px `ruler` border, `0.375rem` radius, internal padding `0.75rem 1rem`.
- Labels: `text-sm`, `font-weight: 500`, `slate`, `margin-bottom: 0.375rem`.
- Focus: `authority` border, no glow.
- Validation: red border + inline message below input; `aria-live="polite"` on the result panel.
- Result panel: parchment background, 1px ruler border, large monospace figures, short explanation line.

### Navigation
- Sticky header with parchment-to-white gradient background and a 1px ruler bottom border.
- Logo uses Saira wordmark + a small crown/glyph mark (favicon already exists; keep it).
- Desktop links are sentence-case, 15px, with a subtle underline-on-hover using the ledger rule.
- Active section link gets a 2px bottom rule in the section accent color.
- Mobile menu: full-height overlay, close on Escape/click outside, focus trap, no `role="menu"`.

### Cards
- White surface, ruler border, `0.5rem` radius.
- Format badge sits top-left.
- Hover: `translateY(-2px)`, `shadow-md`, border shifts to section accent tint.
- Focus-within: 2px authority outline.
- No image zoom animation (avoids layout shift and motion distraction).

### Tables
- Responsive wrapper with horizontal scroll.
- Header row uses `surface-subtle` background and a ruler bottom border.
- Numerical columns right-aligned, monospace.
- Zebra striping optional; prefer row hover highlight instead.

### Callouts
- Keep four semantic types but restyle with flat color panels and a 4px left accent bar.
- Add an icon slot so each callout carries a 20px glyph (info, alert, check, stop).
- No rounded top-left corner on callouts so the accent bar reads as a marker.

### Modals / dialogs (if needed for future tool sharing)
- Centered, white panel, 1px ruler border, no heavy shadow.
- Close button top-right, focus trap, Escape to close, `role="dialog"`, `aria-modal="true"`.

### Micro-interactions
- **Hover:** buttons/cards lift 1–2px over 150ms ease.
- **Focus:** consistent 2px outline, 2px offset, `transition: outline-offset 0ms` so focus appears instantly.
- **Active:** buttons press 1px down (transform translateY(1px)) for tactile feedback.
- **Loading:** skeleton text blocks with a subtle shimmer only if JS is available; respect `prefers-reduced-motion`.
- **Success/error:** result panel slides in 8px from below over 200ms only when the value changes.

### Motion guidelines
- All transitions ≤ 250ms.
- No parallax, no scroll-triggered reveals, no page-load sequences.
- Reading progress bar remains but is throttled to 100ms and respects reduced motion.

---

## 5. High-Value Additions (Optional)

### A. "At a Glance" shortcode / frontmatter block
- A styled summary box that appears directly below the article title.
- Supports 2–4 bullet takeaways plus an optional "TL;DR" sentence.
- Why: finance users often want the rule before the explanation. Improves time-to-value and snippet eligibility.
- Where: every long-form article; auto-injected if `quick_answer` frontmatter is present.

### B. Format taxonomy and badges
- New frontmatter key `format` with values: `definition`, `step-by-step`, `comparison`, `calculator`, `data-study`, `checklist`, `explainer`.
- Renders as a small badge on cards and article headers, color-coded by format (not by section).
- Why: dramatically improves scanning on section pages.
- Where: cards, section lists, related posts.

### C. Section "Start Here" cards
- Two-card row at the top of each section list: one flagged `start_here: true`, one flagged `featured: true`.
- Larger visual treatment, distinct background tint, icon.
- Why: orients first-time visitors and reduces bounce from section landings.
- Where: `section.html` layout.

### D. Tool assumption disclosure
- Each calculator shows a collapsible "How this is calculated" panel with source/rate/date.
- Why: transparency is a core trust lever for finance tools.
- Where: inside each tool page, above or beside the result panel.

### E. Printable result summary
- A button that opens a clean, branded overlay/print stylesheet with the inputs, result, assumptions, and a disclaimer.
- Why: users often need to compare numbers offline or share with a partner/advisor.
- Where: bottom of each calculator result panel.

### F. Inline glossary definitions
- Shortcode `define "term"` that produces a small superscript trigger and a footnote-style panel.
- Why: finance content is jargon-dense; definitions keep readers in flow.
- Where: long-form articles only, not on cards or lists.

---

## 6. Implementation Guidance

### Suggested token structure
Create a new CSS partial `ukmoneyexplained.com/themes/adsense-base/assets/css/ukmoney.css` that imports after `design-system.css` and overrides the shared theme tokens. Keep the shared `design-system.css` intact for other sites in the portfolio.

```css
:root {
  --ukm-ink: #0B1A2F;
  --ukm-slate: #334155;
  --ukm-muted: #64758B;
  --ukm-parchment: #F7F5F1;
  --ukm-paper: #FFFFFF;
  --ukm-ruler: #D6CFC4;
  --ukm-authority: #0F4C5C;
  --ukm-crown: #1F4D35;
  --ukm-caution: #B45F06;
  --ukm-urgent: #9B2C2C;

  /* Section accents */
  --ukm-credit: #1E3A5F;
  --ukm-debt: #9B2C2C;
  --ukm-loans: #4A4A4A;
  --ukm-mortgages: #7C5E4A;
  --ukm-taxes: #1F4D35;
  --ukm-bills: #A85232;
  --ukm-tools: #2A6B5E;

  --color-surface: var(--ukm-paper);
  --color-surface-muted: var(--ukm-parchment);
  --color-border: var(--ukm-ruler);
  --color-text: var(--ukm-ink);
  --color-text-muted: var(--ukm-slate);
  --color-link: var(--ukm-authority);
  --color-link-hover: var(--ukm-crown);
}
```

### Tailwind config additions
Extend `tailwind.config.js` with the new semantic colors and section colors so utility classes can be generated:

```js
colors: {
  ukm: {
    ink: '#0B1A2F',
    slate: '#334155',
    muted: '#64758B',
    parchment: '#F7F5F1',
    paper: '#FFFFFF',
    ruler: '#D6CFC4',
    authority: '#0F4C5C',
    crown: '#1F4D35',
    caution: '#B45F06',
    urgent: '#9B2C2C',
  },
  section: {
    credit: '#1E3A5F',
    debt: '#9B2C2C',
    loans: '#4A4A4A',
    mortgages: '#7C5E4A',
    taxes: '#1F4D35',
    bills: '#A85232',
    tools: '#2A6B5E',
  }
}
```

Update `content` array to include the new CSS file path.

### Font loading
Replace the Inter-only preconnect with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=Saira:wght@600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

Set CSS variables:
```css
--font-display: 'Saira', sans-serif;
--font-heading: 'Fraunces', Georgia, serif;
--font-body: 'Inter', 'Saira', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

### Responsive strategy
- Mobile: single column, full-width cards, sticky TOC collapsed into a disclosure, calculators in stacked input groups.
- Tablet: 2-column card grids, nav remains horizontal if space permits.
- Desktop: 3-column grids, sticky TOC in a sidebar on articles >1200 words, hero text left-aligned with ledger-rule accent.
- Container max-widths: prose `42rem`, page `80rem`.
- Breakpoints: keep Tailwind defaults (sm 640, md 768, lg 1024, xl 1280).

### Accessibility checklist
- [ ] All interactive elements reachable by keyboard and visible focus.
- [ ] Focus order matches visual order; no positive tabindex.
- [ ] Color is never the sole indicator of state (icons + text for callouts and validation).
- [ ] Contrast ratios: body text AAA on parchment, secondary text AA on parchment, buttons AAA.
- [ ] `prefers-reduced-motion` disables transforms and transitions.
- [ ] Calculator results announced via `aria-live="polite"`.
- [ ] Mobile menu uses `aria-expanded`, `aria-controls`, focus trap, Escape handler.
- [ ] Images have alt text; decorative images hidden with `aria-hidden`.
- [ ] Skip-to-content link remains first focusable element.

### Motion guidelines
- Use motion only for state change feedback (hover, focus, active, success).
- Limit transforms to `translateY(1px–2px)` and opacity.
- No entrance animations on scroll.
- Respect `prefers-reduced-motion: reduce` by setting `transition-duration: 0.01ms` and disabling reading progress animation.

### Rollout order
1. **Phase 1 — Tokens & type.** Add new CSS partial, update fonts, set color tokens, regenerate public CSS.
2. **Phase 2 — Global shell.** Restyle nav, footer, buttons, links, focus states.
3. **Phase 3 — Layout templates.** Update homepage hero, section landing, list, and single layouts with new cards, format badges, and ledger rules.
4. **Phase 4 — Content patterns.** Add `quick_answer` and `format` frontmatter to high-traffic articles; create shortcodes.
5. **Phase 5 — Tools.** Rebuild calculator UX with real-time updates, validation, assumptions, and result panels.
6. **Phase 6 — Polish.** Accessibility audit, reduced-motion test, performance check (Lighthouse), AdSense layout validation.

### Risks & migration considerations
- **AdSense revenue impact.** Changing ad slot locations or surrounding whitespace can affect viewability. Preserve the existing `below_title`, `mid_article`, and `end_article` slot IDs. Do not wrap ads in new containers that alter their responsive behavior without testing.
- **Font performance.** Adding Fraunces + Saira increases font payload. Use `display=swap`, preload the CSS, and limit weights (Saira 600/700, Fraunces 500/600/700, Inter 400/500/600).
- **Backward compatibility.** Existing shortcodes (`callout`, `table`, `faq`) should retain their arguments; only their styling changes.
- **Hugo asset pipeline.** The new CSS partial must be included in `head.html` and processed through Hugo Pipes with minification and fingerprint. Test build with `hugo --gc`.
- **Cross-site theme impact.** adsense-base is shared with other portfolio sites. Keep overrides in `ukmoney.css`; do not edit `design-system.css` unless the change is genuinely universal.

### How to keep the system coherent
- Document every new token and shortcode in `ukmoneyexplained.com/REDESIGN.md`.
- Add a visual regression checklist before each deploy: homepage, section page, article with TOC, article without TOC, calculator, 404.
- Revisit the color palette annually around UK tax-year changes (April) to ensure the "official" green still feels fresh.
- Do not allow one-off inline styles in new content; route everything through the shortcode/component library.

---

## Self-Critique / Default-Look Checklist

Before finalizing, we reviewed the plan against common 2026 default aesthetics:

1. **Warm cream + high-contrast serif + terracotta?** The parchment and Fraunces could drift here, but the teal authority color, Saira wordmark, and ledger-rule motif push it away from the generic lifestyle look. The terracotta is reserved for bills only, not the whole palette. **Accept with reservation: keep section accents strict.**

2. **Near-black + acid accent?** Rejected. A finance explainer for everyday UK users should not feel like a dark-mode dashboard or a crypto site.

3. **Broadsheet hairline + zero radius?** This was the closest temptation because the ledger-rule motif overlaps. We deliberately add small radius (0.375–0.5rem) and warm neutrals to avoid looking like a newspaper clone.

4. **Gradient hero?** Rejected. The current blue gradient is the exact default we are removing. The new hero uses flat section color with a subtle ledger texture.

5. **Big number + gradient accent?** Rejected as the hero thesis. We use a concise value proposition instead. Big numbers are reserved for calculator result panels where they are contextually useful.

The single aesthetic risk—Fraunces serif headings on a finance site—is justified by the editorial, jargon-free mission and is balanced by the neutral body type and public-service color discipline.

---

## Implementation Status — 2026-08-09

### Completed in this session

| Phase | What was changed | Files |
|-------|------------------|-------|
| 1. Tokens & type | Created site-specific token CSS, extended Tailwind config with semantic + section colors, added Fraunces/Saira/Inter/JetBrains font preloads, added Tailwind build script. | `themes/adsense-base/assets/css/ukmoney.css`, `tailwind.config.js`, `package.json`, `themes/adsense-base/assets/css/tailwind-input.css`, `themes/adsense-base/layouts/partials/head.html` |
| 2. Global shell | Restyled nav (parchment ground, ruler border, proper ARIA, mobile close on Escape/outside), footer (dark ink ground, section links), body font class. | `themes/adsense-base/layouts/partials/nav.html`, `themes/adsense-base/layouts/partials/footer.html`, `themes/adsense-base/layouts/_default/baseof.html`, `themes/adsense-base/assets/js/main.js` |
| 3. Layout templates | Redesigned homepage hero, section landing, list, and single article layouts using `ukm-card`, ledger rule, format badges, section icons, and sticky TOC. | `themes/adsense-base/layouts/_default/index.html`, `section.html`, `list.html`, `single.html`, `themes/adsense-base/layouts/partials/toc.html`, `related-posts.html` |
| 4. Content patterns | Added `format` and `quick_answer` frontmatter to 53 existing articles; created `format-badge.html`, `quick-answer-inline.html`, and `quick-answer` shortcode. | Content `.md` files, partials/shortcodes |
| 5. Tools | Refactored all three calculators into external JS, consistent `calculator` shortcode wrapper, real-time updates, assumptions panel, reset, and accessible `aria-live` results. | `content/tools/*.md`, `content/mortgages/mortgage-affordability-calculator-uk.md`, `themes/adsense-base/assets/js/calculators/*.js`, `themes/adsense-base/layouts/shortcodes/calculator.html` |
| 6. Polish | Verified `hugo --gc` builds cleanly, preserved pagination count and aliases, fixed AdSense partial call signature, updated `related-posts.html` to match new card style. | — |

### Verification

- **Hugo build:** passes (`Pages 152`, `Paginator pages 6`, `Aliases 44`).
- **No URL/IA changes:** all existing permalinks, sections, and navigation items preserved.
- **AdSense slots preserved:** `below_title`, `mid_article`, `end_article` slot IDs untouched.
- **Shared theme safety:** `design-system.css` was not edited; all site-specific overrides live in `ukmoney.css`.

### Known follow-ups (optional / not yet implemented)

1. **High-quality `quick_answer` review.** The 53 auto-generated quick-answer blocks are heuristically derived from descriptions. A content pass should tighten them to 2–4 truly representative takeaways per article.
2. **Inline glossary shortcode.** Not yet built. Add a `define` shortcode when jargon density becomes a measured problem.
3. **Printable result summary for calculators.** The JS result panels are live, but a branded print/overlay summary is not yet implemented.
4. **Search affordance.** No search backend is configured; add scoped search only when a backend is available.
5. **Visual QA on real devices.** Test the nav overlay focus trap, reduced-motion preference, and AdSense viewability at common breakpoints before deploying.
6. **Update browserslist DB.** The Tailwind CLI warns about an outdated `caniuse-lite` database. Run `npx update-browserslist-db@latest` at next dependency maintenance window.

### Build commands

```bash
cd ukmoneyexplained.com
npm install                 # one-time
npm run build:css           # or watch with npm run watch:css
hugo --gc                   # generate site
```

*End of implementation log.*
