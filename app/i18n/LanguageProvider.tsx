"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { messages, type Lang } from "./messages";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string) => any; // string 또는 배열
};

const LanguageContext = createContext<Ctx | null>(null);

function getByPath(obj: any, path: string) {
  return path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), obj);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "ko") setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = () => setLang((p) => (p === "en" ? "ko" : "en"));

  const t = (key: string) => {
    const v = getByPath(messages[lang], key);
    return v ?? key; // 키 누락 시 키 그대로 표시(디버깅 편함)
  };

  const value = useMemo(() => ({ lang, setLang, toggle, t }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
