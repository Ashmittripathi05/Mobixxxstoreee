import { useEffect } from 'react';

/**
 * Watches for .anim elements entering the viewport and adds .in-view class.
 * Use once per app — in App.jsx — so it covers all pages via route changes.
 */
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Once visible, stop watching to save performance
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    // Observe all .anim elements on the page
    const attach = () => {
      document.querySelectorAll('.anim').forEach((el) => {
        if (!el.classList.contains('in-view')) {
          observer.observe(el);
        }
      });
    };

    // Initial attach + re-attach on DOM changes (route changes)
    attach();
    const mutObs = new MutationObserver(attach);
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutObs.disconnect();
    };
  }, []);
};

export default useScrollAnimation;
