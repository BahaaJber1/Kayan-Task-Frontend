// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      disableTypes: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@app": resolve("./src"),
      "@assets": resolve("./src/assets"),
      "@config": resolve("./src/config"),
      "@constants": resolve("./src/constants"),
      "@components": resolve("./src/components"),
      "@hooks": resolve("./src/hooks"),
      "@lib": resolve("./src/lib"),
      "@pages": resolve("./src/pages"),
      "@routes": resolve("./src/routes"),
      "@store": resolve("./src/store"),
      "@utils": resolve("./src/utils"),
      "@ui": resolve("./src/ui"),
      "@zod": resolve("./src/zod"),
      "@dev-data": resolve("./src/dev-data"),
      "@api": resolve("./src/api"),
    },
  },
});
