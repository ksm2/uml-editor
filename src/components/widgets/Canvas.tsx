import { useEffect, useRef } from "react";

function Canvas() {
  const div = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    function onResize() {
      const rect = div.current!.getBoundingClientRect();
      console.log(rect);
      canvas.current!.width = Math.trunc(rect.width);
      canvas.current!.height = Math.trunc(rect.height);
    }

    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={div}
      className="Canvas"
      style={{ backgroundColor: "#2e3440", gridArea: "canvas" }}
    >
      <canvas ref={canvas} />
    </div>
  );
}

export default Canvas;
