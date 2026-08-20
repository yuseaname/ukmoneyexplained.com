document.addEventListener('DOMContentLoaded', function () {
  const salaryEl = document.getElementById('tc-salary');
  const scotlandEl = document.getElementById('tc-scotland');
  const resultsEl = document.getElementById('tc-results');
  if (!salaryEl || !resultsEl) return;

  function fmt(n) { return '£' + Math.round(n).toLocaleString('en-GB'); }
  function pct(n, d) { return d > 0 ? (n / d * 100).toFixed(1) + '%' : '0.0%'; }

  function calcTax() {
    var s = parseFloat(salaryEl.value) || 0;
    var sc = scotlandEl && scotlandEl.checked;
    var pa = 12570;
    if (s > 100000) pa = Math.max(0, 12570 - Math.floor((s - 100000) / 2));
    var taxable = Math.max(0, s - pa);
    var tax = 0;
    var bands = sc
      ? [[12570, 14876, 0.19], [14876, 26561, 0.20], [26561, 43662, 0.21], [43662, 75000, 0.42], [75000, 125140, 0.45]]
      : [[12570, 50270, 0.20], [50270, 125140, 0.40]];
    for (var i = 0; i < bands.length; i++) {
      var lo = bands[i][0], hi = bands[i][1], r = bands[i][2];
      if (s > lo) tax += (Math.min(s, hi) - lo) * r;
    }
    if (s > 125140) tax += (s - 125140) * (sc ? 0.48 : 0.45);
    var niMain = Math.max(0, Math.min(s, 50270) - 12570) * 0.08;
    var niUpper = Math.max(0, s - 50270) * 0.02;
    var ni = niMain + niUpper;
    var total = tax + ni;
    var net = s - total;

    var html = '<div class="ukm-result">' +
      '<h2 class="text-lg font-heading font-semibold mb-4">Your estimated result</h2>' +
      '<dl class="space-y-2 text-sm sm:text-base">' +
      row('Gross salary', fmt(s)) +
      row('Personal allowance', fmt(pa)) +
      row('Taxable income', fmt(taxable)) +
      row('Income Tax', fmt(tax)) +
      row('National Insurance', fmt(ni)) +
      row('Total deductions', fmt(total), true) +
      row('Take-home pay (annual)', fmt(net), true) +
      row('Take-home pay (monthly)', fmt(net / 12)) +
      row('Effective tax rate', pct(total, s)) +
      '</dl>' +
      '</div>';
    resultsEl.innerHTML = html;
    resultsEl.setAttribute('aria-live', 'polite');
  }

  function row(label, value, strong) {
    return '<div class="flex justify-between py-2 ukm-rule' + (strong ? ' font-semibold text-ukm-ink' : ' text-ukm-slate') + '">' +
      '<dt>' + label + '</dt><dd' + (strong ? ' class="font-mono text-lg"' : '') + '>' + value + '</dd></div>';
  }

  salaryEl.addEventListener('input', calcTax);
  if (scotlandEl) scotlandEl.addEventListener('change', calcTax);

  // Reset button
  const resetBtn = document.getElementById('tc-reset');
  if (resetBtn) resetBtn.addEventListener('click', function () { salaryEl.value = ''; if (scotlandEl) scotlandEl.checked = false; calcTax(); });

  calcTax();
});
