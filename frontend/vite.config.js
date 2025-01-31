import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["hoist-non-react-statics"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Additional SCSS options if using SCSS
      },
    },
  },
});
