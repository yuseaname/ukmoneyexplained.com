---
title: "Income Tax Calculator UK 2025/26"
description: "Free UK income tax calculator for 2025/26. Enter your salary to see income tax, National Insurance, take-home pay, and effective tax rate. Includes Scottish tax bands."
date: 2026-08-09
lastmod: 2026-08-09
draft: false
format: calculator
tags: ["tax", "calculator", "income-tax", "national-insurance"]
quick_answer:
  - "Enter your gross salary and location to see take-home pay instantly."
  - "Results use official 2025/26 HMRC tax and National Insurance rates."
  - "The £100k–£125k band can create an effective 60% tax rate due to tapering."
script: "income-tax.js"
---

Enter your annual salary below to see exactly how much income tax and National Insurance you'll pay, and what your take-home pay will be.

{{< calculator script="income-tax.js" >}}
  <div class="space-y-5">
    <div>
      <label for="tc-salary" class="block text-sm font-medium text-ukm-slate mb-1.5">Your annual gross salary (£)</label>
      <input type="number" id="tc-salary" value="35000" min="0" step="1000" class="ukm-input w-full text-lg font-mono">
    </div>
    <label class="flex items-center gap-2.5 cursor-pointer text-sm text-ukm-slate">
      <input type="checkbox" id="tc-scotland" class="w-5 h-5 rounded border-ukm-ruler text-ukm-authority focus:ring-ukm-authority">
      <span>I live in Scotland (uses Scottish income tax bands)</span>
    </label>
    <button type="button" id="tc-reset" class="ukm-btn ukm-btn-secondary ukm-focus w-full sm:w-auto">Start again</button>
  </div>
  
  <div id="tc-results" class="mt-6"></div>
  
  <div class="mt-6 p-4 bg-ukm-parchment rounded-md text-sm text-ukm-slate">
    <p class="font-medium text-ukm-ink mb-1">How this is calculated</p>
    <p>Uses 2025/26 HMRC thresholds: Personal Allowance £12,570; basic rate 20% (rUK) / 19% starter (Scotland); higher rates from £50,270; additional/top rates above £125,140. NI is 8% between £12,570 and £50,270, and 2% above.</p>
  </div>
{{< /calculator >}}

## How This Calculator Works

This calculator uses the official **2025/26** tax rates from HMRC:

| Band | Earnings | Rate (rUK) | Rate (Scotland) |
|------|----------|-----------|-----------------|
| Personal Allowance | £0 – £12,570 | 0% | 0% |
| Basic / Starter | £12,571 – £50,270 | 20% | 19–20% |
| Higher | £50,271 – £125,140 | 40% | 42–45% |
| Additional / Top | Above £125,140 | 45% | 48% |

**National Insurance** for 2025/26 is 8% on earnings between £12,570 and £50,270, plus 2% above £50,270.

### The £100,000 Tax Trap

If you earn over £100,000, your Personal Allowance is reduced by £1 for every £2 above £100,000. This creates an effective tax rate of **60%** on earnings between £100,000 and £125,140.

Read our full guide on [income tax bands explained](/income-tax-bands-uk-explained/) for more detail.

## Sources

- [GOV.UK — Income Tax rates](https://www.gov.uk/income-tax-rates)
- [GOV.UK — National Insurance rates](https://www.gov.uk/national-insurance)

> **Disclaimer:** This calculator provides estimates only based on 2025/26 rates. It does not account for pension contributions, student loan repayments, childcare vouchers, or other salary deductions. For exact figures, use the [GOV.UK tax checker](https://www.gov.uk/estimate-income-tax).