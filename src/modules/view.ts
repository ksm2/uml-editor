import { StoreonStore } from "storeon";
import { storageAvailable } from "../utils";

export interface ViewState {
  grid: boolean;
  positionX: number;
  positionY: number;
  zoom: number;
}

export interface ViewEvents {
  "view/moveLeft": undefined;
  "view/moveRight": undefined;
  "view/moveUp": undefined;
  "view/moveDown": undefined;

  "view/zoomIn": undefined;
  "view/zoomOut": undefined;
  "view/zoomReset": undefined;

  "view/grid": boolean;
  "view/positionX": number;
  "view/positionY": number;
  "view/zoom": number;
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
        zoom: state.zoom,
      }),
    );
  }
  return state;
}

export function view(store: StoreonStore<ViewState, ViewEvents>) {
  const MOVE_BY = 50;
  const ZOOM_LEVELS = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2, 3];

  store.on(
    "@init",
    (): ViewState => {
      const { grid = false, positionX = 0, positionY = 0, zoom = 1 } = loadView();
      return { grid, positionX, positionY, zoom };
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

  store.on("view/zoomIn", ({ zoom }) => {
    const index = ZOOM_LEVELS.indexOf(zoom);
    if (index + 1 < ZOOM_LEVELS.length) {
      store.dispatch("view/zoom", ZOOM_LEVELS[index + 1]);
    }
  });

  store.on("view/zoomOut", ({ zoom }) => {
    const index = ZOOM_LEVELS.indexOf(zoom);
    if (index > 0) {
      store.dispatch("view/zoom", ZOOM_LEVELS[index - 1]);
    }
  });

  store.on("view/zoomReset", () => {
    store.dispatch("view/zoom", 1);
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

  store.on("view/zoom", (prevState, zoom) => {
    return storeView({ ...prevState, zoom });
  });
}
