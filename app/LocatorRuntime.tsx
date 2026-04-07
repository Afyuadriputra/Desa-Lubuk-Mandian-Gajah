"use client";

import { useEffect } from "react";
import setupLocatorUI from "@locator/runtime";

declare global {
  interface Window {
    __locatorRuntimeInitialized?: boolean;
  }
}

export default function LocatorRuntime() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "development" ||
      window.__locatorRuntimeInitialized
    ) {
      return;
    }

    window.__locatorRuntimeInitialized = true;
    setupLocatorUI();
  }, []);

  return null;
}
