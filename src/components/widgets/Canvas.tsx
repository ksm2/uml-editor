import { MouseEvent, MutableRefObject, useEffect, useRef } from "react";
import { GRID } from "../../constants";
import { Style } from "../../css";
import { Anchor, Classifier, Diagram, Element, Rectangle } from "../../model";
import { CanvasRenderer, Handle } from "../../renderer";
import {
  Coordinates,
  getMouseCoordinates,
  roundCoordsBy,
  subtractCoords,
  ViewOptions,
} from "../../utils";

interface Props {
  viewOptions: ViewOptions;
  diagram: Diagram;
  style: Style;
  onChange?: (element: Element) => void;
}

function createRenderer(canvas: HTMLCanvasElement, style: Style): CanvasRenderer {
  return new CanvasRenderer(canvas, style, {
    translateX: canvas.width / 2,
    translateY: canvas.height / 2,
  });
}

function Canvas({ viewOptions, diagram, style, onChange }: Props) {
  const options = useRef(viewOptions);
  const div = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const mouseDownCoords = useRef<Coordinates>(null) as MutableRefObject<Coordinates | null>;
  const mouseDownRectangle = useRef<Rectangle>(null) as MutableRefObject<Rectangle | null>;
  const mouseDownObject = useRef<Handle | Element>(null) as MutableRefObject<
    Handle | Element | null
  >;

  useEffect(() => {
    options.current = viewOptions;
  });

  useEffect(() => {
    function onResize() {
      const rect = div.current!.getBoundingClientRect();
      canvas.current!.width = Math.trunc(rect.width);
      canvas.current!.height = Math.trunc(rect.height);

      const renderer = createRenderer(canvas.current!, style);
      renderer.clear();
      if (options.current.grid) {
        renderer.renderGrid();
      }
      renderer.renderDiagram(diagram);
    }

    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [viewOptions, diagram, style]);

  function setCursor(cursor: string): void {
    canvas.current!.style.cursor = cursor;
  }

  function handleHandleUpdate(target: Classifier, handle: Handle, deltaX: number, deltaY: number) {
    if (handle.anchor === Anchor.W || handle.anchor === Anchor.NW || handle.anchor === Anchor.SW) {
      target.setWidth(mouseDownRectangle.current!.width - deltaX);
      target.setLeft(mouseDownRectangle.current!.x + deltaX);
      onChange?.(target);
    }
    if (handle.anchor === Anchor.E || handle.anchor === Anchor.NE || handle.anchor === Anchor.SE) {
      target.setWidth(mouseDownRectangle.current!.width + deltaX);
      target.setLeft(mouseDownRectangle.current!.x);
      onChange?.(target);
    }
    if (handle.anchor === Anchor.N || handle.anchor === Anchor.NW || handle.anchor === Anchor.NE) {
      target.setHeight(mouseDownRectangle.current!.height - deltaY);
      target.setTop(mouseDownRectangle.current!.y + deltaY);
      onChange?.(target);
    }
    if (handle.anchor === Anchor.S || handle.anchor === Anchor.SW || handle.anchor === Anchor.SE) {
      target.setHeight(mouseDownRectangle.current!.height + deltaY);
      target.setTop(mouseDownRectangle.current!.y);
      onChange?.(target);
    }
  }

  function handleLeftMouseButtonMove(x: number, y: number) {
    const target = diagram.find((el) => el.isSelected());
    if (target instanceof Classifier) {
      const { x: deltaX, y: deltaY } = roundCoordsBy(
        subtractCoords({ x, y }, mouseDownCoords.current!),
        GRID,
      );
      if (mouseDownObject.current === target) {
        target.setLeft(mouseDownRectangle.current!.x + deltaX);
        target.setTop(mouseDownRectangle.current!.y + deltaY);
        onChange?.(target);
        return;
      }
      if (mouseDownObject.current instanceof Handle) {
        handleHandleUpdate(target, mouseDownObject.current, deltaX, deltaY);
      }
    }
  }

  function handleMouseMove(event: MouseEvent<HTMLCanvasElement>) {
    const renderer = createRenderer(canvas.current!, style);
    const { x, y } = getMouseCoordinates(event);

    if (event.buttons & 1) {
      handleLeftMouseButtonMove(x, y);
      renderer.clear();
      if (options.current.grid) {
        renderer.renderGrid();
      }
      renderer.renderDiagram(diagram);
      return;
    }

    for (const element of diagram) {
      element.setHovered(false);
    }

    const handle = renderer.findHandleForPoint(diagram, x, y);
    if (handle !== undefined) {
      setCursor(`${Anchor[handle.anchor].toLowerCase()}-resize`);
    } else {
      setCursor("default");

      for (const classifier of diagram) {
        if (classifier instanceof Classifier) {
          const isInClassifier = renderer.isPointInClassifier(classifier, x, y);
          if (isInClassifier) {
            classifier.setHovered(true);
            break;
          }
        }
      }
    }

    renderer.clear();
    if (options.current.grid) {
      renderer.renderGrid();
    }
    renderer.renderDiagram(diagram);
  }

  function renderMouseDown(renderer: CanvasRenderer, x: number, y: number) {
    const selectedElement = diagram.find((el) => el.isSelected());
    const handle = renderer.findHandleForPoint(diagram, x, y);
    if (handle !== undefined && selectedElement instanceof Classifier) {
      mouseDownRectangle.current = selectedElement.getRectangle();
      mouseDownCoords.current = { x, y };
      mouseDownObject.current = handle;
      return;
    }

    selectedElement?.setSelected(false);
    for (const classifier of diagram) {
      if (classifier instanceof Classifier) {
        const isInClassifier = renderer.isPointInClassifier(classifier, x, y);
        if (isInClassifier) {
          classifier.setSelected(true);
          mouseDownRectangle.current = classifier.getRectangle();
          mouseDownCoords.current = { x, y };
          mouseDownObject.current = classifier;
          return;
        }
      }
    }
  }

  function handleMouseDown(event: MouseEvent<HTMLCanvasElement>) {
    const renderer = createRenderer(canvas.current!, style);
    const { x, y } = getMouseCoordinates(event);

    renderMouseDown(renderer, x, y);
    renderer.clear();
    if (options.current.grid) {
      renderer.renderGrid();
    }
    renderer.renderDiagram(diagram);
  }

  function handleMouseUp() {
    mouseDownRectangle.current = null;
    mouseDownCoords.current = null;
    mouseDownObject.current = null;
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
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}

export default Canvas;
