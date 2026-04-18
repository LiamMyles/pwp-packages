import { defineConfig } from "tsdown"

export default defineConfig({
  format: ["esm"],
  outDir: "dist",
  platform: "neutral",
  entry: ["src/index.ts"],
  dts: {
    tsgo: true,
  },
  exports: true,
})
