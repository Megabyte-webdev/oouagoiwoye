import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 8020,
        proxy: {
            "/api": {
                target: "http://oouweb.perfecthomesdeveloperlimited.com",
                changeOrigin: true,
                secure: true, // set to false only if using self-signed SSL
                rewrite: (path) => path.replace(/^\/api/, "/api/oouweb"),
                configure: (proxy) => {
                    proxy.on("proxyReq", (proxyReq, req) => {
                        console.log(
                            `[VITE PROXY] ${req.url} -> ${proxyReq.path}`
                        );
                    });
                },
            },
        },
    },
});
