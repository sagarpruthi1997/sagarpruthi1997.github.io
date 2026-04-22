/* CloudSufi InfoSec — Shared JS: nav, reveal, scroll */
(function () {
  'use strict';

  /* ── Hamburger nav ─────────────────────────────────────── */
  var btn   = document.getElementById('navHamburger');
  var menu  = document.getElementById('navMobile');
  var bars  = btn ? btn.querySelectorAll('span') : [];

  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    /* close on any mobile link tap */
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    /* close on outside tap */
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Scroll-reveal (IntersectionObserver) ──────────────── */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
    reveals.forEach(function (el) { obs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Smooth anchor scroll with nav offset ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      var target = id && id.length > 1 && document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = 74;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  /* ── iOS: fix 100vh on Safari ──────────────────────────── */
  function setVh() {
    document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
  }
  setVh();
  window.addEventListener('resize', setVh);
  window.addEventListener('orientationchange', function () { setTimeout(setVh, 200); });
})();
