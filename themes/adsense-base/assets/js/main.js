/**
 * Minimal JS for adsense-base Hugo theme
 * - Mobile nav toggle
 * - Nav shadow on scroll
 * - Lazy image polyfill fallback
 */

(function () {
  'use strict';

  // ── Mobile nav toggle ──
  var toggle = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var hamburger = document.getElementById('hamburger-icon');
  var closeIcon = document.getElementById('close-icon');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      var isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      hamburger.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // ── Nav shadow on scroll ──
  var nav = document.getElementById('main-nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 10) {
        nav.classList.add('shadow-sm');
      } else {
        nav.classList.remove('shadow-sm');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Lazy image loading polyfill ──
  if (!('loading' in HTMLImageElement.prototype)) {
    var lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            img.src = img.src; // trigger load
            observer.unobserve(img);
          }
        });
      });
      lazyImages.forEach(function (img) { observer.observe(img); });
    } else {
      lazyImages.forEach(function (img) { img.removeAttribute('loading'); });
    }
  }
})();
