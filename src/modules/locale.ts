import { StoreonStore } from "storeon";
import { LOCALES } from "../constants";
import { Locale, storageAvailable } from "../utils";

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

function loadLocale(): string {
  if (storageAvailable()) {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale !== null) {
      return storedLocale;
    }
  }

  if (typeof navigator.language === "string") {
    return navigator.language;
  }

  return Locale.ENGLISH;
}

function storeLocale(locale: string): void {
  if (storageAvailable()) {
    localStorage.setItem("locale", locale);
  }
}

export function locale(store: StoreonStore<LocaleState, LocaleEvents>): void {
  store.on("@init", () => ({ locale: normalizeLocale(loadLocale()) }));

  store.on("locale/change", (state, locale) => {
    storeLocale(locale);
    return { ...state, locale };
  });
}
