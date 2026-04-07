import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: "class",
                theme: {
                  extend: {
                    colors: {
                      "on-tertiary": "#ffffff",
                      "secondary-container": "#ffc641",
                      "surface": "#F7F1E3",
                      "surface-container-highest": "#e8e2d4",
                      "background": "#F7F1E3",
                      "secondary": "#795900",
                      "on-secondary": "#ffffff",
                      "on-tertiary-fixed": "#2d1600",
                      "outline-variant": "#c0c9bf",
                      "error": "#ba1a1a",
                      "on-error-container": "#93000a",
                      "primary-fixed-dim": "#95d5a8",
                      "tertiary": "#5a3205",
                      "inverse-on-surface": "#f6f0e2",
                      "on-secondary-fixed-variant": "#5c4300",
                      "surface-container-low": "#f9f3e5",
                      "on-surface": "#1d1c13",
                      "on-background": "#1d1c13",
                      "primary": "#1F5E3B",
                      "secondary-fixed-dim": "#f6be39",
                      "inverse-primary": "#95d5a8",
                      "on-primary-container": "#95d5a9",
                      "on-primary": "#ffffff",
                      "on-tertiary-fixed-variant": "#673d10",
                      "on-tertiary-container": "#f9ba83",
                      "surface-container-lowest": "#ffffff",
                      "tertiary-fixed": "#ffdcc0",
                      "surface-container-high": "#eee8da",
                      "error-container": "#ffdad6",
                      "on-secondary-fixed": "#261a00",
                      "surface-container": "#f3eddf",
                      "on-surface-variant": "#404942",
                      "surface-variant": "#e8e2d4",
                      "secondary-fixed": "#ffdfa0",
                      "primary-fixed": "#b0f1c3",
                      "surface-dim": "#dfdacc",
                      "tertiary-container": "#75491b",
                      "primary-container": "#1f5e3b",
                      "on-secondary-container": "#715300",
                      "tertiary-fixed-dim": "#f8ba82",
                      "surface-tint": "#2c6a46",
                      "on-primary-fixed": "#00210f",
                      "on-primary-fixed-variant": "#0e5130",
                      "surface-bright": "#fff9eb",
                      "inverse-surface": "#333027",
                      "outline": "#707971",
                      "on-error": "#ffffff"
                    },
                    borderRadius: {
                      DEFAULT: "0.25rem",
                      lg: "0.5rem",
                      xl: "0.75rem",
                      full: "9999px"
                    },
                    fontFamily: {
                      headline: ["Noto Serif"],
                      body: ["Manrope"],
                      label: ["Manrope"]
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>

      <body className="bg-surface font-body text-on-surface selection:bg-primary/20">
        {children}
      </body>
    </html>
  );
}