import { StoreonStore } from "storeon";
import { storageAvailable } from "../utils";

export interface ViewState {
  grid: boolean;
}

export interface ViewEvents {
  "view/grid": boolean;
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
  store.on("@init", () => {
    const { grid = false } = loadView();
    return { grid };
  });

  store.on("view/grid", (state, grid) => {
    storeView({ grid });
    return { ...state, grid };
  });
}
