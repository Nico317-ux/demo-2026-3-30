import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Esto permite conexiones externas
    allowedHosts: [
      "nondeductive-unshowering-will.ngrok-free.dev",
      // o todos los hosts (menos seguro pero práctico para dev):
      // '.ngrok-free.dev'
    ],
  },
});
