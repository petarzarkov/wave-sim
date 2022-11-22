import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Load app-level env vars to node-level env vars.
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        build: {
            emptyOutDir: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        "react": ["react"],
                        "react-dom": ["react-dom"],
                        "react-router-dom": ["react-router-dom"],
                        "@chakra-ui/react": ["@chakra-ui/react"],
                        "@chakra-ui/icons": ["@chakra-ui/icons"],
                        "react-icons": ["react-icons"],
                        "react-icons/bs": ["react-icons/bs"],
                        "react-icons/gi": ["react-icons/gi"],
                        "react-icons/tb": ["react-icons/tb"],
                        "react-icons/fa": ["react-icons/fa"],
                        "react-icons/vsc": ["react-icons/vsc"],
                        "react-icons/ai": ["react-icons/ai"],
                        "@toplo/components": ["@toplo/components"],
                    }
                }
            }
        },
        resolve: {
            alias: {
                "@mechanics": path.resolve(__dirname, "./app/mechanics"),
                "@screens": path.resolve(__dirname, "./app/screens"),
            }
        },
        plugins: [
            react()
        ]
    };
});
