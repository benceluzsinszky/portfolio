import { useWindowScroll } from "@mantine/hooks";

export default function ScrollLoadingBar() {
  const [scroll] = useWindowScroll();

  return (
    <div>
      <div
        className="fixed top-1 left-1 w-1 rounded-lg bg-gray-400 shadow-md shadow-gray-600 z-50"
        style={{
          height: `${
            (scroll.y / (document.body.scrollHeight - window.innerHeight)) * 100
          }%`,
        }}
      ></div>
    </div>
  );
}
