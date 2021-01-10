import { StoreonStore } from "storeon";

export interface ViewState {
  grid: boolean;
}

export interface ViewEvents {
  "view/grid": boolean;
}

export function view(store: StoreonStore<ViewState, ViewEvents>) {
  store.on("@init", () => ({ grid: false }));

  store.on("view/grid", (state, grid) => ({ ...state, grid }));
}
