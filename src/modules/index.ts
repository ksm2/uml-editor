import React, { ReactNode } from "react";
import { createStoreon } from "storeon";
import { StoreContext, useStoreon } from "storeon/react";
import { file, FileEvents, FileState } from "./file";
import { locale, LocaleEvents, LocaleState } from "./locale";
import { view, ViewEvents, ViewState } from "./view";

type State = FileState & LocaleState & ViewState;

type Events = FileEvents & LocaleEvents & ViewEvents;

export function useStore(...keys: (keyof State)[]) {
  return useStoreon<State, Events>(...keys);
}

interface Props {
  children: ReactNode;
}

const store = createStoreon<State, Events>([file, locale, view]);

export function Store({ children }: Props) {
  return React.createElement(StoreContext.Provider, { value: store }, children);
}
