// v22 — The Channel
// - Masthead scroll state
// - Subtle section reveal (respects prefers-reduced-motion)
// - Privacy-first click-to-load YouTube embed (no iframe on page load, no cookies until consent)

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------------------------------------------------------------------
  // Masthead scroll state
  // ------------------------------------------------------------------
  const masthead = document.querySelector('.masthead');
  if (masthead) {
    const onScroll = () => {
      masthead.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ------------------------------------------------------------------
  // Subtle section reveal
  // ------------------------------------------------------------------
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll(
      '.hero-inner, .familiar, .reframe, .frames-grid, .services-grid, .proof-head, .video-list, .video-embed, .faq-list, .curiosity-grid, .about-inner, .cta-final-inner'
    );
    targets.forEach((el) => el.classList.add('reveal'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((el) => io.observe(el));
  }

  // ------------------------------------------------------------------
  // Click-to-load YouTube embed
  // Privacy-first: no iframe, no cookies, no YouTube network calls until
  // the user presses play.
  // ------------------------------------------------------------------
  const poster = document.querySelector('.video-poster');
  if (poster) {
    const btn = poster.querySelector('.poster-btn');
    btn.addEventListener('click', () => {
      const channel = poster.dataset.ytId || 'ThePureState';
      const iframe = document.createElement('iframe');
      // youtube-nocookie is used where a specific video is known; for a
      // channel-uploads playlist without a known video id, link to the
      // channel uploads list.
      iframe.src = `https://www.youtube-nocookie.com/embed/?listType=user_uploads&list=${encodeURIComponent(channel)}&autoplay=1&rel=0`;
      iframe.title = 'Ronald Schlenker — @ThePureState on YouTube';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';

      poster.innerHTML = '';
      poster.appendChild(iframe);
      poster.classList.add('is-live');
    });
  }

  // ------------------------------------------------------------------
  // Smooth-scroll for in-page anchors (but only when not reduced-motion)
  // ------------------------------------------------------------------
  if (!prefersReducedMotion) {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
})();
