document.addEventListener('DOMContentLoaded', function () {
  const ids = ['bp-pay','bp-other','bp-rent','bp-bills','bp-food','bp-transport','bp-personal','bp-debt'];
  const inputs = ids.map(function(id){ return document.getElementById(id); }).filter(Boolean);
  const resultsEl = document.getElementById('bp-results');
  if (!resultsEl || inputs.length === 0) return;

  function v(id) { return parseFloat(document.getElementById(id).value) || 0; }
  function fmt(n) { return '£' + Math.round(n).toLocaleString('en-GB'); }
  function pct(n, d) { return d > 0 ? Math.round(n / d * 100) : 0; }

  function calcBudget() {
    var inc = v('bp-pay') + v('bp-other');
    var rent = v('bp-rent'), bills = v('bp-bills'), food = v('bp-food');
    var trans = v('bp-transport'), pers = v('bp-personal'), debt = v('bp-debt');
    var totalExp = rent + bills + food + trans + pers + debt;
    var surplus = inc - totalExp;
    var needs = rent + bills + food + trans + debt;
    var wants = pers;
    var pNeeds = pct(needs, inc), pWants = pct(wants, inc), pSave = pct(surplus, inc);
    var statusColor = surplus >= 0 ? 'text-ukm-crown' : 'text-ukm-urgent';
    var statusText = surplus >= 0 ? 'You have a surplus.' : 'You are spending more than you earn.';

    var advice = [];
    if (pNeeds > 60) advice.push('Your essential costs are ' + pNeeds + '% of income. Consider reviewing rent, energy, or food costs.');
    if (pWants > 25) advice.push('Your leisure spending is high at ' + pWants + '%. Trimming by £50/month could save £600/year.');
    if (pSave < 10 && surplus > 0) advice.push('Aim to save at least 10% of income. See our emergency fund guide.');
    if (surplus < 0) advice.push('Your expenses exceed income. Consider free debt advice from StepChange or Citizens Advice.');
    if (advice.length === 0) advice.push('Your budget looks healthy. Keep building your emergency fund.');

    var html = '<div class="ukm-result">' +
      '<h2 class="text-lg font-heading font-semibold mb-4">Your monthly budget</h2>' +
      '<div class="space-y-2 text-sm sm:text-base">' +
      '<div class="flex justify-between py-2 ukm-rule font-semibold text-ukm-ink"><span>Total income</span><span>' + fmt(inc) + '</span></div>' +
      catRow('Housing', rent, inc) +
      catRow('Energy & utilities', bills, inc) +
      catRow('Food & groceries', food, inc) +
      catRow('Transport', trans, inc) +
      catRow('Personal & leisure', pers, inc) +
      catRow('Debt repayments', debt, inc) +
      '<div class="flex justify-between py-2 ukm-rule font-semibold ' + statusColor + '"><span>Monthly ' + (surplus >= 0 ? 'surplus' : 'deficit') + '</span><span>' + fmt(Math.abs(surplus)) + '</span></div>' +
      '</div>' +
      '<p class="mt-3 text-sm text-ukm-muted">Status: ' + statusText + '</p>' +
      '<div class="mt-5">' +
        '<p class="text-sm font-semibold mb-2">50/30/20 breakdown</p>' +
        '<div class="h-6 rounded-md overflow-hidden flex bg-ukm-ruler">' +
          '<div class="bg-ukm-authority text-white text-xs flex items-center justify-center" style="width:' + Math.min(100, pNeeds) + '%">' + (pNeeds > 10 ? pNeeds + '%' : '') + '</div>' +
          '<div class="bg-ukm-caution text-white text-xs flex items-center justify-center" style="width:' + Math.min(100 - Math.min(100, pNeeds), pWants) + '%">' + (pWants > 10 ? pWants + '%' : '') + '</div>' +
          '<div class="bg-ukm-crown text-white text-xs flex items-center justify-center" style="width:' + Math.max(0, 100 - Math.min(100, pNeeds) - Math.min(100 - Math.min(100, pNeeds), pWants)) + '%">' + (pSave > 10 ? pSave + '%' : '') + '</div>' +
        '</div>' +
        '<p class="mt-1 text-xs text-ukm-muted">Needs / Wants / Savings</p>' +
      '</div>' +
      '<div class="mt-5 p-4 bg-ukm-crown/5 rounded-md text-sm text-ukm-slate">' + advice.map(function(a){ return '<p class="mb-1 last:mb-0">' + a + '</p>'; }).join('') + '</div>' +
      '</div>';
    resultsEl.innerHTML = html;
    resultsEl.setAttribute('aria-live', 'polite');
  }

  function catRow(label, value, total) {
    return '<div class="flex justify-between py-1.5 text-ukm-slate"><span>' + label + '</span><span><strong>' + fmt(value) + '</strong> (' + pct(value, total) + '%)</span></div>';
  }

  inputs.forEach(function(input){ input.addEventListener('input', calcBudget); });
  const resetBtn = document.getElementById('bp-reset');
  if (resetBtn) resetBtn.addEventListener('click', function(){ inputs.forEach(function(input){ input.value = input.dataset.default || ''; }); calcBudget(); });

  calcBudget();
});
