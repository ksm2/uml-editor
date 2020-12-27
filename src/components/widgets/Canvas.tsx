import { useEffect, useRef } from "react";
import { Diagram } from "../../model";
import { CanvasRenderer } from "../../renderer";

interface Props {
  diagram: Diagram;
}

function Canvas({ diagram }: Props) {
  const div = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderer = new CanvasRenderer(canvas.current!);
    renderer.renderDiagram(diagram);
  });

  useEffect(() => {
    function onResize() {
      const rect = div.current!.getBoundingClientRect();
      canvas.current!.width = Math.trunc(rect.width);
      canvas.current!.height = Math.trunc(rect.height);

      const renderer = new CanvasRenderer(canvas.current!);
      renderer.renderDiagram(diagram);
    }

    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [diagram]);

  return (
    <div
      ref={div}
      className="Canvas"
      style={{ backgroundColor: "hsl(220 9% 92% / 1)", gridArea: "canvas" }}
    >
      <canvas ref={canvas} />
    </div>
  );
}

export default Canvas;
