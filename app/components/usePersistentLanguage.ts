"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type Lang = "en" | "zh";

const storageKey = "xingtong-portfolio-language";
const languageEvent = "xingtong-language-change";
let fallbackLanguage: Lang = "en";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(languageEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(languageEvent, callback);
  };
}

function getSnapshot(): Lang {
  try { return window.localStorage.getItem(storageKey) === "zh" ? "zh" : "en"; } catch { return fallbackLanguage; }
}

function getServerSnapshot(): Lang {
  return "en";
}

export function usePersistentLanguage() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    fallbackLanguage = next;
    try { window.localStorage.setItem(storageKey, next); } catch { /* Session language still works with storage disabled. */ }
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    window.dispatchEvent(new Event(languageEvent));
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "zh" : "en");
  }, [lang, setLang]);

  return { lang, setLang, toggleLang };
}
