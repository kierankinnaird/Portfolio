import { useEffect, useRef, useState } from "react";

// Reports true once the element has entered the viewport, then stops
// observing: reveals run once, they do not replay on scroll.
export function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
