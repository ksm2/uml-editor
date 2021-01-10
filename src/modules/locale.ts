import { StoreonStore } from "storeon";
import { LOCALES } from "../constants";
import { Locale } from "../utils";

export interface LocaleState {
  locale: Locale;
}

export interface LocaleEvents {
  "locale/change": Locale;
}

function normalizeLocale(locale: string): Locale {
  const prefix = locale.slice(0, 2).toLowerCase() as Locale;
  if (LOCALES.includes(prefix)) {
    return prefix;
  } else {
    return Locale.ENGLISH;
  }
}

export function locale(store: StoreonStore<LocaleState, LocaleEvents>): void {
  store.on("@init", () => ({ locale: normalizeLocale(navigator.language) }));

  store.on("locale/change", (state, locale) => ({ ...state, locale }));
}
