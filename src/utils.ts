import { MouseEvent } from "react";
import { Style } from "./css";
import { Diagram } from "./model";

export interface Coordinates {
  readonly x: number;
  readonly y: number;
}

export interface Consumer<T> {
  (item: T): void;
}

export interface Predicate<T> {
  (item: T): boolean;
}

export interface File {
  title: string;
  model: Diagram;
  css: string;
  style: Style;
}

export function getMouseCoordinates(event: MouseEvent<HTMLCanvasElement>): Coordinates {
  const { clientX, clientY } = event;
  const boundingClientRect = event.currentTarget.getBoundingClientRect();

  const x = clientX - boundingClientRect.x - boundingClientRect.width / 2;
  const y = clientY - boundingClientRect.y - boundingClientRect.height / 2;

  return { x, y };
}

export function subtractCoords(vec1: Coordinates, vec2: Coordinates): Coordinates {
  const x = vec1.x - vec2.x;
  const y = vec1.y - vec2.y;
  return { x, y };
}

export function roundCoordsBy(coord: Coordinates, by: number): Coordinates {
  return {
    x: Math.round(coord.x / by) * by,
    y: Math.round(coord.y / by) * by,
  };
}

export function sanitizeFilename(element: string): string {
  return element.replace(/[^a-zA-Z_-]+/g, "-");
}

export function downloadFile(filename: string, dataURL: string): void {
  const downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = dataURL;
  downloadLink.click();
}
