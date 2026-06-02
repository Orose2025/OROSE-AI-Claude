/* ÉCHEC O CUBE — scroll reveal + stat counters + mobile nav. Vanilla, no deps. */
(function () {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('eoc-in');
      var c = e.target.querySelector('[data-count]');
      if (c && !c.dataset.done) { c.dataset.done = '1'; count(c); }
      io.unobserve(e.target);
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.eoc-reveal').forEach(function (el) { io.observe(el); });

  function count(el) {
    var end = parseInt(el.getAttribute('data-count'), 10) || 0, t0 = null, dur = 1600;
    var suffix = el.getAttribute('data-suffix') || '';
    (function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.floor(p * end).toLocaleString('fr-CA') + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  var toggle = document.querySelector('.eoc-nav__toggle');
  if (toggle) toggle.addEventListener('click', function () {
    document.querySelector('.eoc-nav__links').classList.toggle('is-open');
  });
})();
