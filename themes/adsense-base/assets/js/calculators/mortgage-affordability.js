document.addEventListener('DOMContentLoaded', function () {
  const ids = ['mc-income','mc-income2','mc-deposit','mc-debts'];
  const inputs = ids.map(function(id){ return document.getElementById(id); }).filter(Boolean);
  const resultsEl = document.getElementById('mc-results');
  if (!resultsEl || inputs.length === 0) return;

  function fmt(n) { return '£' + Math.round(n).toLocaleString('en-GB'); }

  function calcMort() {
    var inc = parseFloat(document.getElementById('mc-income').value) || 0;
    var inc2 = parseFloat(document.getElementById('mc-income2').value) || 0;
    var dep = parseFloat(document.getElementById('mc-deposit').value) || 0;
    var debts = parseFloat(document.getElementById('mc-debts').value) || 0;
    var totalInc = inc + inc2;
    var maxLoan = Math.max(0, Math.round(totalInc * 4.5 - debts * 12 * 0.5));
    var maxPrice = maxLoan + dep;
    var ltv = maxPrice > 0 ? Math.round(maxLoan / maxPrice * 100) : 0;

    function pmt(rate) {
      if (maxLoan <= 0) return 0;
      var r = rate / 12;
      return Math.round(maxLoan * r * Math.pow(1 + r, 300) / (Math.pow(1 + r, 300) - 1));
    }

    var html = '<div class="ukm-result">' +
      '<h2 class="text-lg font-heading font-semibold mb-4">Your estimated borrowing</h2>' +
      '<dl class="space-y-2 text-sm sm:text-base">' +
      row('Combined annual income', fmt(totalInc)) +
      row('Maximum borrowing (approx.)', fmt(maxLoan), true) +
      row('Maximum property price', fmt(maxPrice), true) +
      row('Your deposit', fmt(dep)) +
      row('Loan-to-value (LTV)', ltv + '%') +
      '</dl>' +
      '</div>' +
      '<div class="mt-5 p-4 bg-ukm-parchment rounded-md">' +
        '<p class="font-medium text-ukm-ink mb-2">Estimated monthly payments (25-year term)</p>' +
        '<div class="flex flex-wrap gap-3 text-sm">' +
          rateTag('4.5% rate', pmt(0.045)) +
          rateTag('5.0% rate', pmt(0.05)) +
          rateTag('5.5% rate', pmt(0.055)) +
        '</div>' +
      '</div>';
    resultsEl.innerHTML = html;
    resultsEl.setAttribute('aria-live', 'polite');
  }

  function row(label, value, strong) {
    return '<div class="flex justify-between py-2 ukm-rule' + (strong ? ' font-semibold text-ukm-ink' : ' text-ukm-slate') + '">' +
      '<dt>' + label + '</dt><dd' + (strong ? ' class="font-mono text-lg"' : '') + '>' + value + '</dd></div>';
  }
  function rateTag(label, amount) {
    return '<span class="inline-flex items-center px-2.5 py-1 rounded-md bg-ukm-paper border border-ukm-ruler text-ukm-slate">' + label + ': <strong class="ml-1 text-ukm-ink">' + fmt(amount) + '/mo</strong></span>';
  }

  inputs.forEach(function(input){ input.addEventListener('input', calcMort); });
  const resetBtn = document.getElementById('mc-reset');
  if (resetBtn) resetBtn.addEventListener('click', function(){ inputs.forEach(function(input){ input.value = input.dataset.default || ''; }); calcMort(); });

  calcMort();
});
