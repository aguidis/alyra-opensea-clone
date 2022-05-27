import { defineConfig } from 'vite';
import postcss from './postcss.config.js';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        'process.env': process.env
    },
    css: {
        postcss
    },
    plugins: [vue(), eslintPlugin()],
    resolve: {
        alias: [
            {
                find: /^~.+/,
                replacement: (val) => {
                    return val.replace(/^~/, '');
                }
            }
        ]
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true
        }
    }
});
