// Lightweight local effects: work even when external 3D libraries are unavailable.
(() => {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  document.querySelectorAll('.date-details h3 em, .memories .section-title em, .closing h2 em').forEach(el => el.classList.add('gold-shimmer'));
  document.querySelectorAll('.scene').forEach((el, i) => el.style.setProperty('--scene-phase', `${i * -.7}s`));
  // Decoration only, excluded from accessibility and pointer interactions.
  ['.cover', '.invitation', '.closing'].forEach((selector, index) => {
    const section = document.querySelector(selector);
    if (!section) return;
    const decor = document.createElement('div');
    decor.className = 'petal-field';
    decor.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 7; i++) {
      const petal = document.createElement('i');
      petal.className = i % 3 === 0 ? 'floating-spark' : 'floating-petal';
      petal.style.setProperty('--x', `${7 + (i * 17 + index * 11) % 87}%`);
      petal.style.setProperty('--duration', `${15 + i * 2}s`);
      petal.style.setProperty('--delay', `${-i * 3.2}s`);
      petal.style.setProperty('--drift', `${i % 2 ? 38 : -32}px`);
      decor.append(petal);
    }
    section.append(decor);
  });
  let observer;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.classList.toggle('motion-in-view', entry.isIntersecting);
    }), { threshold: 0, rootMargin: '70px' });
    document.querySelectorAll('.scene').forEach(section => observer.observe(section));
    root.classList.add('enhanced-motion');
  }
  function sync() {
    root.classList.toggle('effects-paused', document.hidden || media.matches);
  }
  document.addEventListener('visibilitychange', sync);
  media.addEventListener('change', sync);
  sync();
})();
