import { MouseEvent } from "react";
import { Style } from "./css";
import { Diagram } from "./model";

export interface Coordinates {
  readonly x: number;
  readonly y: number;
}

export interface Predicate<T> {
  (item: T): boolean;
}

export interface SerializableFile {
  title: string;
  xml: string;
  css: string;
}

export interface File extends SerializableFile {
  model: Diagram;
  style: Style;
}

export enum Locale {
  GERMAN = "de",
  ENGLISH = "en",
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

export function uploadFile(pattern: string): Promise<string> {
  return new Promise<string>((resolve) => {
    const uploadInput = document.createElement("input");

    uploadInput.addEventListener(
      "change",
      () => {
        if (uploadInput.files!.length > 0) {
          resolve(uploadInput.files!.item(0)!.text());
        }
      },
      { once: true },
    );

    uploadInput.type = "file";
    uploadInput.accept = pattern;
    uploadInput.multiple = false;
    uploadInput.click();
  });
}

export function storageAvailable(): boolean {
  const storage = window.localStorage;
  try {
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage?.length !== 0
    );
  }
}
