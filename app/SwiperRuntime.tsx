"use client";

import { useEffect } from "react";

type SwiperWindow = Window & {
  __swiperRuntimeLoaded?: boolean;
};

const SWIPER_SRC =
  "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js";

export default function SwiperRuntime() {
  useEffect(() => {
    const swiperWindow = window as SwiperWindow;
    let cancelled = false;

    if (swiperWindow.__swiperRuntimeLoaded || window.Swiper) {
      swiperWindow.__swiperRuntimeLoaded = true;
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-swiper-runtime="true"]'
    );

    if (existingScript) {
      const markLoaded = () => {
        swiperWindow.__swiperRuntimeLoaded = true;
      };

      existingScript.addEventListener("load", markLoaded, { once: true });
      return () => {
        existingScript.removeEventListener("load", markLoaded);
      };
    }

    const mountScript = () => {
      if (cancelled || swiperWindow.__swiperRuntimeLoaded || window.Swiper) {
        return;
      }

      const script = document.createElement("script");
      script.src = SWIPER_SRC;
      script.async = true;
      script.dataset.swiperRuntime = "true";
      script.onload = () => {
        swiperWindow.__swiperRuntimeLoaded = true;
      };
      document.body.appendChild(script);
    };

    const scheduleLoad = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => {
          mountScript();
        });
        return;
      }

      window.setTimeout(() => {
        mountScript();
      }, 180);
    };

    if (document.readyState === "complete") {
      scheduleLoad();
    } else {
      window.addEventListener("load", scheduleLoad, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", scheduleLoad);
    };
  }, []);

  return null;
}
