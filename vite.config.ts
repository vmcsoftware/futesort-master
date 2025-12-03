<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
>>>>>>> b7498fe6c83f181618ed327d3aec4f63ecaa15c8
  server: {
    host: "::",
    port: 8080,
  },
<<<<<<< HEAD
  plugins: [react()],
=======
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
>>>>>>> b7498fe6c83f181618ed327d3aec4f63ecaa15c8
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
<<<<<<< HEAD
  base: '/futesort-master/',
})
=======
}));
>>>>>>> b7498fe6c83f181618ed327d3aec4f63ecaa15c8
