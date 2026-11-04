"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { currencies, type CurrencyCode } from "@/lib/site";

interface CurrencyContextValue {
  code: CurrencyCode;
  setCode: (code: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "wrapvault-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCodeState] = useState<CurrencyCode>("CNY");
  const [mounted, setMounted] = useState(false);

  // Load saved currency from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (saved && currencies.some((c) => c.code === saved)) {
      setCodeState(saved);
    }
    setMounted(true);
  }, []);

  const setCode = useCallback((next: CurrencyCode) => {
    setCodeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({ code, setCode }),
    [code, setCode]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}
