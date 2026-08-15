---
title: "Budget Planner UK: Free Monthly Budget Calculator"
description: "Free UK budget planner to track your income and expenses. See where your money goes, check if you're following the 50/30/20 rule, and get personalised recommendations."
date: 2026-08-09
lastmod: 2026-08-09
draft: false
format: calculator
tags: ["budgeting", "calculator", "money-management", "savings"]
quick_answer:
  - "Enter your monthly income and outgoings to see your surplus or deficit."
  - "The 50/30/20 split helps you judge needs, wants, and savings at a glance."
  - "If you spend more than you earn, the tool points you to free debt advice."
script: "budget-planner.js"
---

Enter your monthly income and expenses below to see exactly where your money goes and whether you're living within your means.

{{< calculator script="budget-planner.js" >}}
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
    <div class="sm:col-span-2">
      <h2 class="text-lg font-heading font-semibold text-ukm-ink ukm-rule pb-2 mb-3">Income</h2>
    </div>
    <div>
      <label for="bp-pay" class="block text-sm font-medium text-ukm-slate mb-1.5">Take-home pay (£/month)</label>
      <input type="number" id="bp-pay" value="2500" min="0" step="50" data-default="2500" class="ukm-input w-full font-mono">
    </div>
    <div>
      <label for="bp-other" class="block text-sm font-medium text-ukm-slate mb-1.5">Other income (£/month)</label>
      <input type="number" id="bp-other" value="0" min="0" step="50" data-default="0" class="ukm-input w-full font-mono">
    </div>
  </div>
  
  <h2 class="text-lg font-heading font-semibold text-ukm-ink ukm-rule pb-2 mt-8 mb-4">Expenses</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
    <div>
      <label for="bp-rent" class="block text-sm font-medium text-ukm-slate mb-1.5">Rent / Mortgage (£/month)</label>
      <input type="number" id="bp-rent" value="850" min="0" step="50" data-default="850" class="ukm-input w-full font-mono">
    </div>
    <div>
      <label for="bp-bills" class="block text-sm font-medium text-ukm-slate mb-1.5">Energy & Utilities (£/month)</label>
      <input type="number" id="bp-bills" value="180" min="0" step="10" data-default="180" class="ukm-input w-full font-mono">
    </div>
    <div>
      <label for="bp-food" class="block text-sm font-medium text-ukm-slate mb-1.5">Food & Groceries (£/month)</label>
      <input type="number" id="bp-food" value="350" min="0" step="10" data-default="350" class="ukm-input w-full font-mono">
    </div>
    <div>
      <label for="bp-transport" class="block text-sm font-medium text-ukm-slate mb-1.5">Transport (£/month)</label>
      <input type="number" id="bp-transport" value="150" min="0" step="10" data-default="150" class="ukm-input w-full font-mono">
    </div>
    <div>
      <label for="bp-personal" class="block text-sm font-medium text-ukm-slate mb-1.5">Personal & Leisure (£/month)</label>
      <input type="number" id="bp-personal" value="200" min="0" step="10" data-default="200" class="ukm-input w-full font-mono">
    </div>
    <div>
      <label for="bp-debt" class="block text-sm font-medium text-ukm-slate mb-1.5">Debt repayments (£/month)</label>
      <input type="number" id="bp-debt" value="0" min="0" step="10" data-default="0" class="ukm-input w-full font-mono">
    </div>
  </div>
  
  <button type="button" id="bp-reset" class="mt-6 ukm-btn ukm-btn-secondary ukm-focus w-full sm:w-auto">Start again</button>
  
  <div id="bp-results" class="mt-6"></div>

  <div class="mt-6 p-4 bg-ukm-parchment rounded-md text-sm text-ukm-slate">
    <p class="font-medium text-ukm-ink mb-1">How this is calculated</p>
    <p>Needs include rent/mortgage, bills, food, transport and debt repayments. Wants are personal and leisure spending. Savings is whatever remains after needs and wants. The 50/30/20 rule is a guideline, not a strict target.</p>
  </div>

{{< /calculator >}}

## The 50/30/20 Rule

A popular budgeting framework suggests allocating your after-tax income as:

| Category | % of Income | Includes |
|----------|-------------|----------|
| **Needs** | 50% | Rent, bills, food, transport, minimum debt payments |
| **Wants** | 30% | Entertainment, dining out, hobbies, subscriptions |
| **Save** | 20% | Emergency fund, pension, investments, overpaying debts |

This is a guideline, not a rule. If you're on a low income, your needs may take up more than 50%, leaving less for wants and savings. Read our [budgeting on a low income guide](/how-to-budget-on-a-low-income-uk/) for tailored advice.

## Related Tools and Guides

- [Income tax calculator](/income-tax-calculator-uk/) — see your take-home pay
- [Emergency fund guide](/emergency-fund-guide-uk/) — how much to save
- [Best savings accounts UK](/best-savings-accounts-uk/) — where to keep your surplus

> **Disclaimer:** This tool provides general budgeting guidance only and does not constitute financial advice. For free, confidential money advice, visit [MoneyHelper](https://www.moneyhelper.org.uk) or [Citizens Advice](https://www.citizensadvice.org.uk).