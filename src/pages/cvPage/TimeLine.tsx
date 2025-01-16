import { useEffect, useState } from "react";

export default function TimeLine() {
  const [scrollBarHeight, setScrollBarHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercent = (scroll / (height - windowHeight)) * 100;
      setScrollBarHeight(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-screen bg-gray-900 fixed top-0 right-10 w-2">
      <div
        className="bg-gray-500 w-full"
        style={{ height: `${scrollBarHeight}%` }}
      ></div>
    </div>
  );
}
