import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Vuetify from "vite-plugin-vuetify";
import laravel from "laravel-vite-plugin";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/src/desktop.js", "resources/src/mobile.js"],
            refresh: true,
            detectTls: "monoland.test",
        }),
        Vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        Vuetify({
            autoImport: true,
        }),
        VitePWA({
            devOptions: {
                enabled: false,
                type: "module",
            },

            strategies: "injectManifest",
            srcDir: "resources/src/Plugins/PWA",
            filename: "service-worker.js",

            registerType: "autoUpdate",

            manifest: {
                name: "Monoland",
                short_name: "Monoland",
                description: "Monoland Application Platform",
                icons: [
                    {
                        src: "assets/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },

                    {
                        src: "assets/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
                start_url: "/build/",
                display: "fullscreen",
                display_override: ["fullscreen", "minimal-ui"],
                background_color: "#ffffff",
                theme_color: "#ffffff",
            },

            workbox: {
                exclude: [/\.(?:png|php|jpg|jpeg|svg|txt|ico|html|htaccess)$/],
                maximumFileSizeToCacheInBytes: 10485760,
            },
        }),
    ],
    resolve: {
        alias: {
            "@components": fileURLToPath(
                new URL("./resources/src/Components", import.meta.url)
            ),
            "@pages": fileURLToPath(
                new URL("./resources/src/Pages", import.meta.url)
            ),
            "@plugins": fileURLToPath(
                new URL("./resources/src/Plugins", import.meta.url)
            ),
            "@styles": fileURLToPath(
                new URL("./resources/src/Styles", import.meta.url)
            ),
        },
        extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
});
