/* =============================================================
   sidharths.com — main.js
   Minimal: mobile menu · project filter · fade-in · nav highlight
   ============================================================= */

// ── 1. Mobile menu toggle ─────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  })
);

// ── 2. Project category filter ────────────────────────────────
const filterBtns = document.querySelectorAll('[data-filter]');
const cards      = document.querySelectorAll('[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    cards.forEach(card => {
      const cats = card.dataset.category.split(' ');
      card.hidden = filter !== 'all' && !cats.includes(filter);
    });
  });
});

// ── 3. Scroll-triggered fade-in (Intersection Observer) ───────
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.08 }
);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── 4. Active nav section highlight on scroll ─────────────────
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a[href^="/#"], .nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 90) current = s.id;
  });
  navAs.forEach(a => {
    const href = a.getAttribute('href').replace('/', '');
    a.classList.toggle('active', href === `#${current}`);
  });
}, { passive: true });
