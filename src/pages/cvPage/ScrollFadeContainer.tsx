import { useEffect, useRef, useState } from "react";

type ScrollFadeContainerProps = {
  children: React.ReactNode;
};

export default function ScrollFadeContainer({
  children,
}: ScrollFadeContainerProps) {
  const [isVisible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setVisible(entry.isIntersecting);
    });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.9,
    };

    const observer = new IntersectionObserver(handleObserver, observerOptions);

    const currentRef = containerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-1000`}
    >
      {children}
    </div>
  );
}
