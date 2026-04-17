import { defineConfig } from "tsdown"

export default defineConfig([
  {
    entry: ["src/svg-generator.ts"],
    format: ["esm", "cjs"],
    outDir: "dist",
    platform: "neutral",
    dts: {
      tsgo: true,
    },
    exports: true,
  },
  {
    entry: ["src/cli.ts"],
    format: ["esm"],
    outDir: "dist",
    platform: "node",
    dts: false,
  },
])
