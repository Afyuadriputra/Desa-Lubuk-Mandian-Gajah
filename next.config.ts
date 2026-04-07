import path from "node:path";
import type { NextConfig } from "next";

const locatorWebpackLoader = path.resolve(
  process.cwd(),
  "node_modules/@locator/webpack-loader/dist/index.js",
);

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "**/*.{tsx,jsx}": {
        loaders: [
          {
            loader: locatorWebpackLoader,
            options: { env: "development" },
          },
        ],
      },
    },
  },
};

export default nextConfig;
