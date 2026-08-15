---
title: "Mortgage Affordability Calculator UK 2026"
description: "How much can you borrow for a mortgage? Enter your income, deposit and outgoings to see your maximum mortgage, monthly payments and loan-to-value ratio."
date: 2026-04-17
lastmod: 2026-08-09
draft: false
format: calculator
tags: ["mortgage", "calculator", "affordability", "uk-property"]
quick_answer:
  - "Enter your income, partner’s income, deposit and monthly debts to estimate how much you can borrow."
  - "UK lenders typically offer around 4–4.5 times combined gross annual income."
  - "A larger deposit lowers your LTV and usually unlocks better interest rates."
script: "mortgage-affordability.js"
---

Find out how much you could borrow for a mortgage. Enter your details below for an instant estimate of your maximum loan, monthly payments, and deposit requirements.

{{< calculator script="mortgage-affordability.js" >}}
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
    <div>
      <label for="mc-income" class="block text-sm font-medium text-ukm-slate mb-1.5">Your annual income (before tax) (£)</label>
      <input type="number" id="mc-income" value="40000" min="0" step="1000" data-default="40000" class="ukm-input w-full text-base font-mono">
    </div>
    <div>
      <label for="mc-income2" class="block text-sm font-medium text-ukm-slate mb-1.5">Partner's income (optional) (£)</label>
      <input type="number" id="mc-income2" value="0" min="0" step="1000" data-default="0" class="ukm-input w-full text-base font-mono">
    </div>
    <div>
      <label for="mc-deposit" class="block text-sm font-medium text-ukm-slate mb-1.5">Deposit (£)</label>
      <input type="number" id="mc-deposit" value="25000" min="0" step="1000" data-default="25000" class="ukm-input w-full text-base font-mono">
    </div>
    <div>
      <label for="mc-debts" class="block text-sm font-medium text-ukm-slate mb-1.5">Monthly debt payments (£)</label>
      <input type="number" id="mc-debts" value="0" min="0" step="50" data-default="0" class="ukm-input w-full text-base font-mono">
    </div>
  </div>
  
  <button type="button" id="mc-reset" class="mt-6 ukm-btn ukm-btn-secondary ukm-focus w-full sm:w-auto">Start again</button>
  
  <div id="mc-results" class="mt-6"></div>
  
  <div class="mt-6 p-4 bg-ukm-parchment rounded-md text-sm text-ukm-slate">
    <p class="font-medium text-ukm-ink mb-1">How this is calculated</p>
    <p>Estimates maximum borrowing at 4.5x combined gross income, reduced by half of annual debt repayments. Monthly payment estimates assume a 25-year term and illustrative rates of 4.5%, 5.0% and 5.5%. Actual lender offers depend on full affordability checks, credit history and stress testing.</p>
  </div>
{{< /calculator >}}

## How Mortgage Affordability Works

UK lenders typically offer **4–4.5 times your gross annual income** as a maximum mortgage amount. For joint applications, most lenders use 4x–4.5x combined income.

Lenders also conduct a detailed **affordability assessment** that considers:

- Your monthly income (including bonuses, overtime, benefits)
- All monthly outgoings (bills, debts, childcare, living costs)
- Your credit score and history
- The property's value and condition
- Stress testing against higher interest rates

### LTV (Loan-to-Value) Explained

| Deposit | LTV | Impact |
|---------|-----|--------|
| 5% | 95% | Highest rates, limited lenders |
| 10% | 90% | Better rates, most first-time buyers |
| 15% | 85% | Good rates, wider choice |
| 20%+ | 80% | Best rates, lowest costs |

A lower LTV means you have more equity in the property, which lenders reward with better interest rates. Read our guide on [how much deposit you need](/how-much-deposit-for-a-house-uk/) for more detail.

## Next Steps

- Read our [first-time buyer guide](/first-time-buyer-guide-uk/) for a complete walkthrough
- Check your [credit score](/how-to-increase-credit-score-uk/) before applying
- Compare [fixed vs tracker mortgages](/fixed-vs-tracker-mortgage-uk/)
- Learn [how mortgages work](/how-mortgages-work-uk/) in the UK

> **Disclaimer:** This calculator provides an estimate only. Actual lending decisions depend on a full affordability assessment by the lender. Speak to an FCA-registered mortgage advisor via [Unbiased.co.uk](https://www.unbiased.co.uk) for personalised advice.
