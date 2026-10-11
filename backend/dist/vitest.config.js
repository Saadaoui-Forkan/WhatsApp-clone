import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        setupFiles: ['./tests/setup.ts'],
        include: ['tests/**/*.test.ts'],
        exclude: ['**/index.ts', '**/node_modules/**', '**/dist/**'],
        testTimeout: 30000,
        hookTimeout: 60000,
        pool: 'forks',
        singleFork: true,
        // Run unit tests in parallel, integration tests sequentially
        sequence: {
            hooks: 'list',
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './'),
        },
    },
});
