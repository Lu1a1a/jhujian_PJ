// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///C:/Users/czps4/Desktop/Project/newPJ/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/czps4/Desktop/Project/newPJ/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import eslint from "file:///C:/Users/czps4/Desktop/Project/newPJ/node_modules/vite-plugin-eslint/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\czps4\\Desktop\\Project\\newPJ";
var vite_config_default = defineConfig({
  root: "src",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__vite_injected_original_dirname, "src/index.html"),
      },
      output: {
        dir: resolve(__vite_injected_original_dirname, "dist"),
      },
    },
  },
  plugins: [vue(), eslint()],
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxjenBzNFxcXFxEZXNrdG9wXFxcXFByb2plY3RcXFxcbmV3UEpcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGN6cHM0XFxcXERlc2t0b3BcXFxcUHJvamVjdFxcXFxuZXdQSlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvY3pwczQvRGVza3RvcC9Qcm9qZWN0L25ld1BKL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgZXNsaW50IGZyb20gXCJ2aXRlLXBsdWdpbi1lc2xpbnRcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJvb3Q6IFwic3JjXCIsXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgbWFpbjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4Lmh0bWxcIiksXG4gICAgICB9LFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGRpcjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiZGlzdFwiKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBwbHVnaW5zOiBbdnVlKCksIGVzbGludCgpXSxcbn0pO1xuLy8gZXNsaW50KClcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFMsU0FBUyxlQUFlO0FBQ2xVLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFIbkIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsTUFBTSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLE1BQzNDO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixLQUFLLFFBQVEsa0NBQVcsTUFBTTtBQUFBLE1BQ2hDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFNBQVMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO0FBQzNCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
