import { Rectangle, Shape } from "../model";
import Canvas from "./Canvas";

class ShapeRenderer {
  private readonly canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  renderShape(shape: Shape, rectangle: Rectangle): void {
    switch (shape) {
      case Shape.RECTANGLE:
        this.drawRectangleShape(rectangle);
        return;
      case Shape.ELLIPSE:
        this.drawEllipseShape(rectangle);
        return;
      case Shape.FOLDER:
        this.drawFolderShape(rectangle);
        return;
      case Shape.NOTE:
        this.drawNoteShape(rectangle);
        return;
      case Shape.BOX:
        this.drawBoxShape(rectangle);
        return;
      case Shape.FILE:
        this.drawFileShape(rectangle);
        return;
      case Shape.COMPONENT:
        this.drawComponentShape(rectangle);
        return;
      case Shape.DIAMOND:
        this.drawDiamondShape(rectangle);
        return;
      case Shape.TRAPEZE:
        this.drawTrapezeShape(rectangle);
        return;
      case Shape.HEXAGONAL:
        this.drawHexagonalShape(rectangle);
        return;
    }
  }

  private drawRectangleShape(rectangle: Rectangle) {
    const { x, y, width, height } = rectangle;
    this.canvas.rect(x, y, width, height);
  }

  private drawEllipseShape(rectangle: Rectangle) {
    const { x, y, width, height } = rectangle;
    this.canvas.ellipse(x, y, width, height);
  }

  private drawFolderShape(rectangle: Rectangle) {
    const { x, y, width, height } = rectangle;
    const FOLDER_WIDTH = 80;
    const FOLDER_HEIGHT = 20;
    this.canvas.rect(x, y - FOLDER_HEIGHT, FOLDER_WIDTH, FOLDER_HEIGHT);
    this.canvas.rect(x, y, width, height);
  }

  private drawNoteShape(rectangle: Rectangle) {
    const { x, y, width, height } = rectangle;
    const NOTE_SIZE = 30;
    this.canvas.moveTo(x, y);
    this.canvas.lineTo(x, y + height);
    this.canvas.lineTo(x + width - NOTE_SIZE, y + height);
    this.canvas.lineTo(x + width, y + height - NOTE_SIZE);
    this.canvas.lineTo(x + width, y);
    this.canvas.closePath();

    this.canvas.moveTo(x + width - NOTE_SIZE, y + height);
    this.canvas.lineTo(x + width, y + height - NOTE_SIZE);
    this.canvas.lineTo(x + width - NOTE_SIZE, y + height - NOTE_SIZE);
    this.canvas.closePath();
  }

  private drawBoxShape(rectangle: Rectangle) {
    const { x, y, width, height } = rectangle;
    const BOX_DEPTH = 20;
    this.canvas.rect(x, y, width, height);

    this.canvas.moveTo(x, y);
    this.canvas.lineTo(x + width, y);
    this.canvas.lineTo(x + width + BOX_DEPTH, y - BOX_DEPTH);
    this.canvas.lineTo(x + BOX_DEPTH, y - BOX_DEPTH);
    this.canvas.closePath();

    this.canvas.moveTo(x + width, y);
    this.canvas.lineTo(x + width, y + height);
    this.canvas.lineTo(x + width + BOX_DEPTH, y + height - BOX_DEPTH);
    this.canvas.lineTo(x + width + BOX_DEPTH, y - BOX_DEPTH);
    this.canvas.closePath();
  }

  private drawFileShape(rectangle: Rectangle) {
    const { x, y, width, height } = rectangle;
    const FILE_SIZE = 30;
    this.canvas.moveTo(x + FILE_SIZE, y);
    this.canvas.lineTo(x, y + FILE_SIZE);
    this.canvas.lineTo(x, y + height);
    this.canvas.lineTo(x + width, y + height);
    this.canvas.lineTo(x + width, y);
    this.canvas.closePath();

    this.canvas.moveTo(x + FILE_SIZE, y);
    this.canvas.lineTo(x, y + FILE_SIZE);
    this.canvas.lineTo(x + FILE_SIZE, y + FILE_SIZE);
    this.canvas.closePath();
  }

  private drawComponentShape(rectangle: Rectangle) {
    const { x, y, width, height } = rectangle;
    const COMPONENT_WIDTH = 40;
    const COMPONENT_HEIGHT = 20;
    const COMPONENT_Y = (height - COMPONENT_HEIGHT * 3) / 2;

    this.canvas.moveTo(x, y);
    this.canvas.lineTo(x, y + COMPONENT_Y);
    this.canvas.lineTo(x + COMPONENT_WIDTH / 2, y + COMPONENT_Y);
    this.canvas.lineTo(x + COMPONENT_WIDTH / 2, y + COMPONENT_Y + COMPONENT_HEIGHT);
    this.canvas.lineTo(x, y + COMPONENT_Y + COMPONENT_HEIGHT);
    this.canvas.lineTo(x, y + COMPONENT_Y + COMPONENT_HEIGHT * 2);
    this.canvas.lineTo(x + COMPONENT_WIDTH / 2, y + COMPONENT_Y + COMPONENT_HEIGHT * 2);
    this.canvas.lineTo(x + COMPONENT_WIDTH / 2, y + COMPONENT_Y + COMPONENT_HEIGHT * 3);
    this.canvas.lineTo(x, y + COMPONENT_Y + COMPONENT_HEIGHT * 3);
    this.canvas.lineTo(x, y + height);
    this.canvas.lineTo(x + width, y + height);
    this.canvas.lineTo(x + width, y);
    this.canvas.closePath();

    this.canvas.rect(x + COMPONENT_WIDTH / -2, y + COMPONENT_Y, COMPONENT_WIDTH, COMPONENT_HEIGHT);
    this.canvas.rect(
      x + COMPONENT_WIDTH / -2,
      y + COMPONENT_Y + 2 * COMPONENT_HEIGHT,
      COMPONENT_WIDTH,
      COMPONENT_HEIGHT,
    );
  }

  private drawDiamondShape(rectangle: Rectangle) {
    const { x, y, width, height } = rectangle;
    const middleX = x + width / 2;
    const middleY = y + height / 2;
    this.canvas.moveTo(middleX, y);
    this.canvas.lineTo(x + width, middleY);
    this.canvas.lineTo(middleX, y + height);
    this.canvas.lineTo(x, middleY);
    this.canvas.closePath();
  }

  private drawTrapezeShape(rectangle: Rectangle) {
    const { x, y, width, height } = rectangle;
    const x1 = x + width / 6;
    const x2 = x + (5 * width) / 6;
    const x3 = x + width;
    this.canvas.moveTo(x1, y);
    this.canvas.lineTo(x3, y);
    this.canvas.lineTo(x2, y + height);
    this.canvas.lineTo(x, y + height);
    this.canvas.closePath();
  }

  private drawHexagonalShape(rectangle: Rectangle) {
    const { x, y, width, height } = rectangle;
    const middleX = x + width / 2;
    const y1 = y + height / 4;
    const y2 = y + (3 * height) / 4;
    this.canvas.moveTo(middleX, y);
    this.canvas.lineTo(x + width, y1);
    this.canvas.lineTo(x + width, y2);
    this.canvas.lineTo(middleX, y + height);
    this.canvas.lineTo(x, y2);
    this.canvas.lineTo(x, y1);
    this.canvas.closePath();
  }
}

export default ShapeRenderer;
