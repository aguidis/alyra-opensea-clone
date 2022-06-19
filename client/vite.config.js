import { defineConfig } from 'vite';
import postcss from './postcss.config.js';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import nodePolyfills from 'rollup-plugin-polyfill-node';
const production = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        'process.env': process.env
    },
    css: {
        postcss
    },
    plugins: [
        vue(),
        eslintPlugin(),
        !production &&
            nodePolyfills({
                include: [
                    'node_modules/**/*.js',
                    new RegExp('node_modules/.vite/.*js')
                ]
            })
    ],
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
        rollupOptions: {
            plugins: [
                // ↓ Needed for build
                nodePolyfills()
            ]
        },
        // ↓ Needed for build if using WalletConnect and other providers
        commonjsOptions: {
            transformMixedEsModules: true
        },
        define: {
            'process.env': {}
        }
    }
});
