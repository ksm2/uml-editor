import { MouseEvent, MutableRefObject, useEffect, useRef } from "react";
import { Classifier, Diagram, Element } from "../../model";
import { CanvasRenderer } from "../../renderer";

interface Props {
  diagram: Diagram;
  onChange?: (element: Element) => void;
}

interface Coordinates {
  readonly x: number;
  readonly y: number;
}

function Canvas({ diagram, onChange }: Props) {
  const div = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const mouseDownCoords = useRef<Coordinates>(
    null
  ) as MutableRefObject<Coordinates>;
  const mouseDownPosition = useRef<Coordinates>(
    null
  ) as MutableRefObject<Coordinates>;

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

  function subtractCoords(vec1: Coordinates, vec2: Coordinates): Coordinates {
    const x = vec1.x - vec2.x;
    const y = vec1.y - vec2.y;
    return { x, y };
  }

  function roundCoordsBy(coord: Coordinates, by: number): Coordinates {
    return {
      x: Math.round(coord.x / by) * by,
      y: Math.round(coord.y / by) * by,
    };
  }

  function handleMouseMove(event: MouseEvent<HTMLCanvasElement>) {
    const renderer = new CanvasRenderer(canvas.current!);
    const { x, y } = getMouseCoordinates(event);

    if (event.buttons & 1) {
      const selectedElement = diagram.find((el) => el.isSelected());
      if (selectedElement instanceof Classifier) {
        const { x: deltaX, y: deltaY } = roundCoordsBy(
          subtractCoords({ x, y }, mouseDownCoords.current!),
          20
        );
        selectedElement.x = mouseDownPosition.current!.x + deltaX;
        selectedElement.y = mouseDownPosition.current!.y + deltaY;
        onChange?.(selectedElement);
      }
    }

    diagram.forEach((classifier) => {
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

    diagram.forEach((classifier) => {
      if (classifier instanceof Classifier) {
        const isInClassifier = renderer.isPointInClassifier(classifier, x, y);
        classifier.setSelected(isInClassifier);
        if (isInClassifier) {
          mouseDownPosition.current = { x: classifier.x, y: classifier.y };
        }
      }
    });

    mouseDownCoords.current = { x, y };

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
