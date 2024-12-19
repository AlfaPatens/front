import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base: './',
    plugins: [react()],
    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.json'],
    },
    build: {
        outDir: "build", // Ensure output matches expected directory
        rollupOptions: {
            output: {
                entryFileNames: "[name].[hash].js",
                chunkFileNames: "[name].[hash].js",
                assetFileNames: "[name].[hash].[ext]",
            },
        },
    },
    server: {
        historyApiFallback: true, // Ensure fallback for client-side routing
    },
});