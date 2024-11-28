import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, mode === "development" || mode === "local_dev" ? "../" : process.cwd(), "");
    const config: UserConfig = {
        plugins: [react(), tsconfigPaths()],
        css: {
            preprocessorOptions: {
                // Включение именования классов (по умолчанию '[name]__[local]')
                localsConvention: "camelCase",
                // Использование хэшей для имен классов
                generateScopedName: "[hash:base64]"
            }
        },
        build: {
            assetsDir: "styles",
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ["react", "react-dom"]
                    }
                }
            },
            minify: true,
            cssCodeSplit: true
        },
        server: {
            proxy: {},
            host: true,
            port: 80
        }
    };

    if (mode === "development" || mode === "local_dev") {
        config.envDir = "../";
    }

    if (config.server === undefined) return config;

    if (mode === "docker") {
        config.server.proxy = {
            "/api": {
                target: "http://backend:" + env.BACKEND_PORT,
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, "")
            }
        };
    } else if (mode === "production") {
        config.server.proxy = {
            "/api": {
                target: "https://" + env.PROD_HOST,
                changeOrigin: true,
                secure: false
            }
        };
    } else if (mode === "local_dev") {
        config.server.proxy = {
            "/api": {
                target: "http://localhost:" + env.BACKEND_PORT,
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, "")
            }
        };
    } else {
        console.error("Unknown mode")
    }

    return config;
});
