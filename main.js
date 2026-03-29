/* sidharths.com — main.js */

// Theme toggle
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.theme-toggle');
    btn?.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark' ||
        (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const next = isDark ? 'light' : 'dark';

      if (!document.startViewTransition) {
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        return;
      }

      document.startViewTransition(() => {
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
      });
    });
  });
})();

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

// Chaos button
(function () {
  let split = false;

  function splitAllText() {
    if (split) return;
    split = true;
    const skip = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'BUTTON', 'SVG']);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      if (skip.has(node.parentElement?.tagName)) continue;
      if (!node.textContent.trim()) continue;
      nodes.push(node);
    }
    nodes.forEach(textNode => {
      const frag = document.createDocumentFragment();
      for (const ch of textNode.textContent) {
        if (ch === ' ' || ch === '\u00a0') {
          // Keep spaces as plain text nodes so they render and wrap correctly
          frag.appendChild(document.createTextNode(ch));
        } else {
          const span = document.createElement('span');
          span.className = 'chaos-char';
          span.textContent = ch;
          frag.appendChild(span);
        }
      }
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('chaos-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      btn.disabled = true;
      splitAllText();

      const chars = document.querySelectorAll('.chaos-char');
      const els   = document.querySelectorAll('.project-item, .project-links a, .section-label');

      // Establish rest state with no transition, then force reflow so the
      // browser commits the "at origin" position before we start animating
      chars.forEach(ch => { ch.style.transition = 'none'; ch.style.transform = ''; });
      els.forEach(el   => { el.style.transition  = 'none'; el.style.transform  = ''; });
      void document.body.offsetHeight; // reflow — anchors the start state

      // Drift chars
      chars.forEach(ch => {
        const tx  = (Math.random() - 0.5) * 32;
        const ty  = (Math.random() - 0.5) * 24;
        const rot = (Math.random() - 0.5) * 18;
        ch.style.transition = 'transform 2s linear';
        ch.style.transform  = `translate(${tx}px,${ty}px) rotate(${rot}deg)`;
      });

      // Drift lines and buttons — smaller offsets so they feel like objects, not letters
      els.forEach(el => {
        const tx  = (Math.random() - 0.5) * 18;
        const ty  = (Math.random() - 0.5) * 12;
        const rot = (Math.random() - 0.5) * 6;
        el.style.transition = 'transform 2s linear';
        el.style.transform  = `translate(${tx}px,${ty}px) rotate(${rot}deg)`;
      });

      // All snap back at exactly the same time
      setTimeout(() => {
        const snap = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        chars.forEach(ch => { ch.style.transition = snap; ch.style.transform = ''; });
        els.forEach(el   => { el.style.transition  = snap; el.style.transform  = ''; });
        setTimeout(() => { btn.disabled = false; }, 600);
      }, 2000);
    });
  });
})();
