import { useEffect, useRef } from "react";

export default function useInfiniteScroll({
  ref,
  callback,
  hasMore = true,
  options = {},
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  callback: () => void;
  hasMore?: boolean;
  options?: IntersectionObserverInit;
}) {
  const loadingRef = useRef(false); // prevent spamming

  useEffect(() => {
    if (!ref.current || !hasMore) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loadingRef.current) {
        loadingRef.current = true;
        callback();
        // reset flag after callback (you can also tie this to loading state externally)
        setTimeout(() => {
          loadingRef.current = false;
        }, 500); // debounce duration
      }
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, callback, hasMore]);
}
