/* TechNova Computer Academy - main.js: navigation, UI behaviour, gallery lightbox */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function initNav() {
    var btn = $('.menu-toggle'), nav = $('#nav'), header = $('.site-header');
    if (btn && nav) {
      var setOpen = function (open) { nav.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open)); };
      btn.addEventListener('click', function () { setOpen(btn.getAttribute('aria-expanded') !== 'true'); });
      $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
      window.addEventListener('resize', function () { if (window.innerWidth > 1180) setOpen(false); });
    }
    if (header) {
      var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 10); };
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
  }

  function initToggles() {
    $$('[data-toggle]').forEach(function (b) {
      b.addEventListener('click', function () {
        var panel = b.nextElementSibling; if (!panel) return;
        var open = panel.hasAttribute('hidden');
        if (open) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
        b.setAttribute('aria-expanded', String(open));
        b.textContent = open ? 'Hide Details' : 'View Details';
      });
    });
    // Open the course card when arriving with a #hash
    var h = location.hash && $(location.hash);
    if (h) { var t = $('[data-toggle]', h); if (t && t.getAttribute('aria-expanded') === 'false') t.click(); }
  }

  function initReveal() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  function initCounters() {
    var els = $$('[data-count]');
    if (!els.length) return;
    var run = function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0, start = null;
      var step = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / 1400, 1);
        el.textContent = Math.floor(p * target).toLocaleString('en-IN');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.textContent = e.getAttribute('data-count'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    els.forEach(function (e) { io.observe(e); });
  }

  function initGallery() {
    var items = $$('.gal-item');
    if (!items.length) return;
    $$('[data-filter]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var f = chip.getAttribute('data-filter');
        $$('[data-filter]').forEach(function (c) { c.classList.toggle('active', c === chip); });
        items.forEach(function (it) { if (f === 'all' || it.getAttribute('data-cat') === f) it.removeAttribute('hidden'); else it.setAttribute('hidden', ''); });
      });
    });
    var lb = document.createElement('div');
    lb.className = 'lightbox'; lb.hidden = true; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Image preview');
    lb.innerHTML = '<button class="lb-btn lb-close" type="button" aria-label="Close preview">&times;</button><button class="lb-btn lb-prev" type="button" aria-label="Previous image">&#8249;</button><img alt=""><p></p><button class="lb-btn lb-next" type="button" aria-label="Next image">&#8250;</button>';
    document.body.appendChild(lb);
    var img = $('img', lb), cap = $('p', lb), idx = 0, opener = null;
    var visible = function () { return items.filter(function (i) { return !i.hasAttribute('hidden'); }); };
    var show = function (list, i) {
      idx = (i + list.length) % list.length;
      img.src = list[idx].getAttribute('data-full'); img.alt = list[idx].getAttribute('data-cap'); cap.textContent = list[idx].getAttribute('data-cap');
    };
    var close = function () { lb.hidden = true; document.body.classList.remove('no-scroll'); if (opener) opener.focus(); };
    items.forEach(function (it) {
      it.addEventListener('click', function () {
        opener = it; var list = visible(); show(list, list.indexOf(it));
        lb.hidden = false; document.body.classList.add('no-scroll'); $('.lb-close', lb).focus();
      });
    });
    $('.lb-close', lb).addEventListener('click', close);
    $('.lb-prev', lb).addEventListener('click', function () { show(visible(), idx - 1); });
    $('.lb-next', lb).addEventListener('click', function () { show(visible(), idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(visible(), idx - 1);
      else if (e.key === 'ArrowRight') show(visible(), idx + 1);
    });
  }

  function initExtras() {
    $$('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
    var top = document.createElement('button');
    top.className = 'to-top'; top.type = 'button'; top.hidden = true; top.setAttribute('aria-label', 'Back to top'); top.innerHTML = '&uarr;';
    document.body.appendChild(top);
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    window.addEventListener('scroll', function () { top.hidden = window.scrollY < 600; }, { passive: true });
  }

  [initNav, initToggles, initReveal, initCounters, initGallery, initExtras].forEach(function (fn) { fn(); });
})();
