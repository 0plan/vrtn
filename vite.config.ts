import path from 'path'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import pages from 'vite-plugin-react-pages'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        pages({
            pagesDir: path.join(__dirname, 'pages'),
        }),],
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
            '@components/': `${path.resolve(__dirname, 'src/components')}/`
        },
    },
})
