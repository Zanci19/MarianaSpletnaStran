/* =====================================================================
   SVETLANA — frizerski salon
   Animacije in interakcija. Brez zunanjih knjižnic.
   ===================================================================== */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     1. Animacija ob nalaganju strani
     --------------------------------------------------------------- */
  window.addEventListener('DOMContentLoaded', function () {
    document.documentElement.classList.add('is-loaded');
  });

  /* ---------------------------------------------------------------
     2. Razkrivanje elementov ob drsenju (IntersectionObserver)
        Uporaba v HTML:  data-reveal  |  data-reveal="left|right|zoom|mask"
        Zamik:           data-delay="200"   (v milisekundah)
     --------------------------------------------------------------- */
  var revealables = document.querySelectorAll('[data-reveal]');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = el.getAttribute('data-delay');
        if (delay) el.style.setProperty('--reveal-delay', (parseInt(delay, 10) / 1000) + 's');
        el.classList.add('is-in');
        revealObserver.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------------------------------------------------------
     3. Samodejni zamik za otroke v mreži (učinek "stopnice")
        Na starša dodajte  data-stagger="120"
     --------------------------------------------------------------- */
  document.querySelectorAll('[data-stagger]').forEach(function (parent) {
    var step = parseInt(parent.getAttribute('data-stagger'), 10) || 120;
    Array.prototype.forEach.call(parent.children, function (child, i) {
      if (child.hasAttribute('data-reveal') && !child.hasAttribute('data-delay')) {
        child.setAttribute('data-delay', i * step);
      }
    });
  });

  /* ---------------------------------------------------------------
     4. Obkroženi del naslova — ročno narisan krog
        Nariše se, ko pride v pogled, in se ponovi vsakih 8 sekund.
     --------------------------------------------------------------- */
  var marks = document.querySelectorAll('.mark');

  /* Vsakemu krogu dam rahlo drugačen videz (naklon, raztezek, občasno
     zrcaljenje in hitrost risanja), da nobena dva nista povsem enaka. */
  marks.forEach(function (mark) {
    var svg = mark.querySelector('svg');
    if (!svg) return;
    var rot  = (Math.random() * 8 - 4).toFixed(2);        // -4° .. 4°
    var sx   = (0.97 + Math.random() * 0.09).toFixed(3);  // 0.97 .. 1.06
    var sy   = (0.93 + Math.random() * 0.15).toFixed(3);  // 0.93 .. 1.08
    var flip = Math.random() < 0.5 ? -1 : 1;              // občasno zrcali
    svg.style.setProperty('--m-rot', rot + 'deg');
    svg.style.setProperty('--m-sx', (sx * flip).toFixed(3));
    svg.style.setProperty('--m-sy', sy);
    var path = svg.querySelector('path');
    if (path) path.style.animationDuration = (1.0 + Math.random() * 0.5).toFixed(2) + 's';
  });

  if (reduced) {
    marks.forEach(function (m) { m.classList.add('is-drawn'); });
  } else if ('IntersectionObserver' in window) {
    var markObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-drawn');   /* nariše se samo enkrat */
        markObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });

    marks.forEach(function (m) { markObserver.observe(m); });
  }

  /* ---------------------------------------------------------------
     5. Glava: pomanjšanje ob drsenju + vrstica napredka
     --------------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  var progress = document.querySelector('.progress');
  var toTop = document.querySelector('.to-top');
  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;

    if (header) header.classList.toggle('is-stuck', y > 40);
    if (toTop) toTop.classList.toggle('is-visible', y > 600);

    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    }

    /* rahel paralaks na fotografiji v junaku */
    if (!reduced) {
      document.querySelectorAll('[data-parallax]').forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.08;
        el.style.transform = 'translate3d(0,' + (-y * speed).toFixed(1) + 'px,0)';
      });
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------
     6. Mobilni meni
     --------------------------------------------------------------- */
  var burger = document.querySelector('.burger');
  var mobileNav = document.querySelector('.mobile-nav');

  function closeNav() {
    if (!burger || !mobileNav) return;
    burger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }

  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      mobileNav.classList.toggle('is-open', !open);
      document.body.classList.toggle('nav-open', !open);
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------------------------------------------------------------
     7. Gumb "na vrh"
     --------------------------------------------------------------- */
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ---------------------------------------------------------------
     8. Števci (data-count="15")
     --------------------------------------------------------------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        countObserver.unobserve(el);

        if (reduced) { el.textContent = target + suffix; return; }

        var start = null, dur = 1600;
        (function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ---------------------------------------------------------------
     9. Nadomestek za fotografije, ki jih (še) ni
        Ko datoteke naložite v mapo /slike, nadomestek sam izgine.
     --------------------------------------------------------------- */
  document.querySelectorAll('.photo img').forEach(function (img) {
    function markEmpty() {
      var box = img.closest('.photo');
      if (box) box.classList.add('is-empty');
    }
    img.addEventListener('error', markEmpty);
    if (img.complete && img.naturalWidth === 0) markEmpty();
  });

})();
