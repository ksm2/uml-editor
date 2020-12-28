import { useEffect, useRef, MouseEvent } from "react";
import { Classifier, Diagram, Element } from "../../model";
import { CanvasRenderer } from "../../renderer";

interface Props {
  diagram: Diagram;
}

function forAllNodes(
  root: Element,
  callback: (element: Element) => void
): void {
  for (const child of root.getChildren()) {
    callback(child);
    forAllNodes(child, callback);
  }
}

interface Coordinates {
  readonly x: number;
  readonly y: number;
}

function Canvas({ diagram }: Props) {
  const div = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderer = new CanvasRenderer(canvas.current!);
    renderer.renderDiagram(diagram);
  }, [diagram]);

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

  function getMouseCoordinates(
    event: MouseEvent<HTMLCanvasElement>
  ): Coordinates {
    const { clientX, clientY } = event;
    const boundingClientRect = event.currentTarget.getBoundingClientRect();

    const x = clientX - boundingClientRect.x - boundingClientRect.width / 2;
    const y = clientY - boundingClientRect.y - boundingClientRect.height / 2;

    return { x, y };
  }

  function handleMouseMove(event: MouseEvent<HTMLCanvasElement>) {
    const renderer = new CanvasRenderer(canvas.current!);
    const { x, y } = getMouseCoordinates(event);

    forAllNodes(diagram, (classifier) => {
      if (classifier instanceof Classifier) {
        const isInClassifier = renderer.isPointInClassifier(classifier, x, y);
        classifier.setHovered(isInClassifier);
      }
    });

    renderer.renderDiagram(diagram);
  }

  function handleMouseDown(event: MouseEvent<HTMLCanvasElement>) {
    const renderer = new CanvasRenderer(canvas.current!);
    const { x, y } = getMouseCoordinates(event);

    forAllNodes(diagram, (classifier) => {
      if (classifier instanceof Classifier) {
        const isInClassifier = renderer.isPointInClassifier(classifier, x, y);
        classifier.setSelected(isInClassifier);
      }
    });

    renderer.renderDiagram(diagram);
  }

  return (
    <div
      ref={div}
      className="Canvas"
      style={{
        backgroundColor: "hsl(220 9% 92% / 1)",
        gridArea: "canvas",
      }}
    >
      <canvas
        ref={canvas}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

export default Canvas;
