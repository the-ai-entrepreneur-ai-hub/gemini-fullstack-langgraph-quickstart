import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/app/",
  define: {
    __DEFINES__: JSON.stringify({
      "process.env.NODE_ENV": process.env.NODE_ENV,
    }),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    headers: {
      "Content-Security-Policy": "script-src 'self' 'unsafe-eval' 'unsafe-inline';"
    },
    proxy: {
      // Proxy API requests to the backend server
      "/api": {
        target: "http://127.0.0.1:8000", // Default backend address
        changeOrigin: true,
        // Optionally rewrite path if needed (e.g., remove /api prefix if backend doesn't expect it)
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
