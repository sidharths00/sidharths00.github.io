/* sidharths.com — main.js */

// Mobile menu toggle
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
