# adsense-base

Canonical Adsense Base theme for the ad portfolio.

## Status

Extracted **2026-08-19** from 6 vendored copies of `theme-adsense-base` across:

| Site | Role |
|------|------|
| utilityexplained.com | Base source (most complete) |
| alarmbeepguide.com | Majority for faq/faq-schema/image shortcodes |
| mejorconexion.mx | Source for 9 author/source/verdict partials & shortcodes |
| ukmoneyexplained.com | Source for calculators, formatter partials, calculator shortcode |
| rentingexplained | Source for index/single/state-laws/searchindex + howto/reviewer/sources drawers |
| solarpoweredproject | Source for faq-schema-render, next-steps, system-strip, toolscript, search single |

Majority rules per ADR-003: files where 4–5 sites agree override the outlier version.
The three majority-swapped files (ABG > utilityexplained):

* `layouts/shortcodes/faq.html`
* `layouts/shortcodes/faq-schema.html`
* `layouts/shortcodes/image.html`

## Hugo Override Mechanism

Hugo loads theme layouts/assets/data as the **default** layer. A site's own
directory at `site/layouts/<path>` or `site/assets/<path>` (or `site/data/<path>`) 
obviates the theme version.

Therefore:
* The canonical theme should contain everything every site *might* need.
* Sites only override what they actually customise.
* If a fix is needed, push it into canonical first; sites that **did not** override 
  will pick it up automatically. This is the "fixes flow canonical → sites" path.

## Union-Merged Additions

36 site-unique files were added to canonical so no site needs to re-provide them:

| File | Source site |
|------|-------------|
| `assets/css/author.css` | mejorconexion.mx |
| `assets/css/ukmoney.css` | ukmoneyexplained.com |
| `assets/js/calculators/budget-planner.js` | ukmoneyexplained.com |
| `assets/js/calculators/income-tax.js` | ukmoneyexplained.com |
| `assets/js/calculators/mortgage-affordability.js` | ukmoneyexplained.com |
| `assets/js/search.js` | mejorconexion.mx |
| `layouts/_default/index.searchindex.json` | rentingexplained |
| `layouts/_default/single-wide.html` | rentingexplained |
| `layouts/_default/state-laws.html` | rentingexplained |
| `layouts/_default/taxonomy.html` | utilityexplained |
| `layouts/authors/single.html` | mejorconexion.mx |
| `layouts/index.searchindex.json` | mejorconexion.mx |
| `layouts/partials/author-box.html` | mejorconexion.mx |
| `layouts/partials/cookie-consent.html` | utilityexplained |
| `layouts/partials/responsive-image.html` | mejorconexion.mx |
| `layouts/partials/source-card.html` | mejorconexion.mx |
| `layouts/partials/update-log.html` | mejorconexion.mx |
| `layouts/partials/verdict-card.html` | mejorconexion.mx |
| `layouts/partials/faq-schema-render.html` | solarpoweredproject |
| `layouts/partials/format-badge.html` | ukmoneyexplained.com |
| `layouts/partials/howto-schema.html` | rentingexplained |
| `layouts/partials/next-steps.html` | solarpoweredproject |
| `layouts/partials/quick-answer-inline.html` | ukmoneyexplained.com |
| `layouts/partials/reviewer-card.html` | rentingexplained |
| `layouts/partials/section-icon.html` | ukmoneyexplained.com |
| `layouts/partials/sources-drawer.html` | rentingexplained |
| `layouts/partials/system-strip.html` | solarpoweredproject |
| `layouts/search/single.html` | solarpoweredproject |
| `layouts/shortcodes/calculator.html` | ukmoneyexplained.com |
| `layouts/shortcodes/howto-step.html` | mejorconexion.mx |
| `layouts/shortcodes/jump-row.html` | utilityexplained |
| `layouts/shortcodes/quick-answer.html` | ukmoneyexplained.com |
| `layouts/shortcodes/review.html` | mejorconexion.mx |
| `layouts/shortcodes/scorecard.html` | mejorconexion.mx |
| `layouts/shortcodes/source-card.html` | mejorconexion.mx |
| `layouts/shortcodes/toolscript.html` | solarpoweredproject |

## Per-Site Override Inventory

The Commander maintains a matrix file (external to this repo) listing which 
sites override which canonical files. Sites only need to ship the deltas they 
actually customise.

Fixes made to canonical flow **downstream** to any site that has not overridden 
that specific file — so keep overrides minimal and well-documented.
