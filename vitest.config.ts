import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Jest のように global で記述可能にする
    environment: "jsdom", // ブラウザ環境をシミュレート
    setupFiles: "./vitest.setup.ts", // マッチャーの拡張など
  },
});
