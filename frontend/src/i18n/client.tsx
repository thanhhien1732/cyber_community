import { defaultLocale, Locale, locales } from "@/i18n/config";
import { getUserLocale, LOCALE_CHANGED_EVENT } from "@/services/locale";
import en from "../../messages/en.json";
import vi from "../../messages/vi.json";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type Messages = Record<string, unknown>;
type TranslationContextValue = { locale: Locale; messages: Messages };

const dictionaries: Record<Locale, Messages> = { en, vi };
const TranslationContext = createContext<TranslationContextValue>({
   locale: defaultLocale,
   messages: dictionaries[defaultLocale],
});

function isLocale(value: string): value is Locale {
   return locales.includes(value as Locale);
}

function readPath(source: Messages, path: string): unknown {
   return path.split(".").reduce<unknown>((value, key) => {
      if (!value || typeof value !== "object") return undefined;
      return (value as Messages)[key];
   }, source);
}

export function TranslationProvider({ children }: { children: ReactNode }) {
   const [locale, setLocale] = useState<Locale>(() => {
      const stored = getUserLocale();
      return isLocale(stored) ? stored : defaultLocale;
   });

   useEffect(() => {
      document.documentElement.lang = locale;
   }, [locale]);

   useEffect(() => {
      const handleLocaleChange = (event: Event) => {
         const selectedLocale = (event as CustomEvent<string>).detail;
         if (isLocale(selectedLocale)) setLocale(selectedLocale);
      };
      window.addEventListener(LOCALE_CHANGED_EVENT, handleLocaleChange);
      return () => window.removeEventListener(LOCALE_CHANGED_EVENT, handleLocaleChange);
   }, []);

   const value = useMemo(() => ({ locale, messages: dictionaries[locale] }), [locale]);
   return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

export function useLocale() {
   return useContext(TranslationContext).locale;
}

export function useTranslations(namespace?: string) {
   const { messages } = useContext(TranslationContext);
   return (key: string, values?: Record<string, string | number>) => {
      const path = namespace ? `${namespace}.${key}` : key;
      const translated = readPath(messages, path);
      const text = typeof translated === "string" ? translated : key;
      return Object.entries(values || {}).reduce(
         (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
         text
      );
   };
}
