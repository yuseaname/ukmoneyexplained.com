/**
 * Minimal JS for adsense-base Hugo theme
 * - Mobile nav toggle (with Escape and outside-click close)
 * - Nav shadow on scroll
 * - Lazy image polyfill fallback
 */

(function () {
  'use strict';

  // ── Mobile nav toggle ──
  var toggle = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  function setMenuOpen(open) {
    if (!mobileMenu || !toggle) return;
    mobileMenu.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
    if (!open) toggle.focus();
  }

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      setMenuOpen(mobileMenu.classList.contains('hidden'));
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('click', function (e) {
      if (!mobileMenu.classList.contains('hidden') &&
          !mobileMenu.contains(e.target) &&
          !toggle.contains(e.target)) {
        setMenuOpen(false);
      }
    });
  }

  // ── Nav shadow on scroll ──
  var nav = document.getElementById('main-nav');
  if (nav) {
    function updateShadow() {
      if (window.scrollY > 8) {
        nav.classList.add('shadow-sm');
      } else {
        nav.classList.remove('shadow-sm');
      }
    }
    window.addEventListener('scroll', updateShadow, { passive: true });
    updateShadow();
  }

  // ── Lazy image polyfill fallback ──
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[data-src]').forEach(function (img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
})();
