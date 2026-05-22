import { useState, useEffect, useRef } from 'react';

export default function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  const threshold = options.threshold ?? 0.05;
  const rootMargin = options.rootMargin ?? '0px';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold,
      rootMargin,
      root: options.root ?? null,
    });

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [threshold, rootMargin, options.root]);

  return [ref, isInView];
}
