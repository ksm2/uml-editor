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

function storeView(state: ViewState): ViewState {
  if (storageAvailable()) {
    localStorage.setItem(
      "view",
      JSON.stringify({
        grid: state.grid,
        positionX: state.positionX,
        positionY: state.positionY,
      }),
    );
  }
  return state;
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
    return storeView({ ...prevState, grid });
  });

  store.on("view/positionX", (prevState, positionX) => {
    return storeView({ ...prevState, positionX });
  });

  store.on("view/positionY", (prevState, positionY) => {
    return storeView({ ...prevState, positionY });
  });
}
