import path from "path";
import { defineConfig, PluginOption } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            tsconfigPath: "./tsconfig.build.json",
            insertTypesEntry: true,
            outDir: "dist", // not 'dist/types'
            copyDtsFiles: true,
            rollupTypes: true, // bundle into single .d.ts
        }),
        cssInjectedByJsPlugin({
          relativeCSSInjection: true,
        }) as PluginOption,
    ],
    server: {
        proxy: {
            '/api': 'http://localhost:5000'
        }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // now "@/styles/..." works
      },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/main.tsx"),
            name: "Webstudio",
            fileName: (format) => `webstudio.${format}.js`,
            formats: ["es", "umd", "cjs"],
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                exports: "named",
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
});
