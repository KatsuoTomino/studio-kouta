"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, dict: dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useI18n() {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useI18n must be used within LocaleProvider");
  }
  return value;
}
