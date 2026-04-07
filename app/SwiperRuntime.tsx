"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __swiperRuntimeLoaded?: boolean;
  }
}

const SWIPER_SRC =
  "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js";

export default function SwiperRuntime() {
  useEffect(() => {
    if (window.__swiperRuntimeLoaded || window.Swiper) {
      window.__swiperRuntimeLoaded = true;
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-swiper-runtime="true"]'
    );

    if (existingScript) {
      const markLoaded = () => {
        window.__swiperRuntimeLoaded = true;
      };

      existingScript.addEventListener("load", markLoaded, { once: true });
      return () => {
        existingScript.removeEventListener("load", markLoaded);
      };
    }

    const script = document.createElement("script");
    script.src = SWIPER_SRC;
    script.async = true;
    script.dataset.swiperRuntime = "true";
    script.onload = () => {
      window.__swiperRuntimeLoaded = true;
    };
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  return null;
}
