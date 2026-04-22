// v2 — Terminal variant
// Progressive enhancements only. Page must work with JS disabled.

/**
 * Smooth-scroll for in-page nav when user has not requested reduced motion.
 */
(function smoothScrollNav() {
  const reduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'start'
      });
      // Move focus for a11y without the default scroll-jump.
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
})();

/**
 * Tiny "command palette" keyboard shortcut: press "/" to jump
 * focus to the first nav link — like many terminal UIs do.
 */
(function slashFocusNav() {
  const firstNavLink = document.querySelector('.titlebar nav a');
  if (!firstNavLink) return;

  window.addEventListener('keydown', (e) => {
    if (e.key !== '/') return;
    const tag = (e.target && e.target.tagName) || '';
    // Don't interfere with typing in form fields (there are none, but be safe).
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return;
    if (e.target && e.target.isContentEditable) return;
    e.preventDefault();
    firstNavLink.focus();
  });
})();
