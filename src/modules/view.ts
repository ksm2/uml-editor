import { StoreonStore } from "storeon";
import { storageAvailable } from "../utils";

export interface ViewState {
  grid: boolean;
  positionX: number;
  positionY: number;
}

export interface ViewEvents {
  "view/grid": boolean;
  "view/moveLeft": undefined;
  "view/moveRight": undefined;
  "view/moveUp": undefined;
  "view/moveDown": undefined;
  "view/positionX": number;
  "view/positionY": number;
}

function loadView(): Partial<ViewState> {
  if (storageAvailable()) {
    const item = localStorage.getItem("view");
    if (item !== null) return JSON.parse(item);
  }

  return {};
}

function storeView(state: ViewState): void {
  if (storageAvailable()) {
    localStorage.setItem("view", JSON.stringify(state));
  }
}

export function view(store: StoreonStore<ViewState, ViewEvents>) {
  const MOVE_BY = 50;

  store.on(
    "@init",
    (): ViewState => {
      const { grid = false, positionX = 0, positionY = 0 } = loadView();
      return { grid, positionX, positionY };
    },
  );

  store.on("view/moveLeft", (prevState) => {
    store.dispatch("view/positionX", prevState.positionX + MOVE_BY);
  });

  store.on("view/moveRight", (prevState) => {
    store.dispatch("view/positionX", prevState.positionX - MOVE_BY);
  });

  store.on("view/moveUp", (prevState) => {
    store.dispatch("view/positionY", prevState.positionY + MOVE_BY);
  });

  store.on("view/moveDown", (prevState) => {
    store.dispatch("view/positionY", prevState.positionY - MOVE_BY);
  });

  store.on("view/grid", (prevState, grid) => {
    const state: ViewState = { ...prevState, grid };
    storeView(state);
    return state;
  });

  store.on("view/positionX", (prevState, positionX) => {
    const state: ViewState = { ...prevState, positionX };
    storeView(state);
    return state;
  });

  store.on("view/positionY", (prevState, positionY) => {
    const state: ViewState = { ...prevState, positionY };
    storeView(state);
    return state;
  });
}
