import { useWindowScroll } from "@mantine/hooks";

export default function ScrollLoadingBar() {
  const [scroll] = useWindowScroll();

  return (
    <div className="hidden md:block fixed top-3 bottom-3 left-1">
      <div
        className="w-1 rounded-lg bg-gray-200 z-50"
        style={{
          height: `${
            (scroll.y / (document.body.scrollHeight - window.innerHeight)) * 100
          }%`,
        }}
      ></div>
    </div>
  );
}
