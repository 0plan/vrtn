import * as path from 'path'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import UnoCSS from 'unocss/vite'
import UnocssIcons from '@unocss/preset-icons'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        UnoCSS({
            // when `presets` is specified, the default preset will be disabled
            // so you could only use the pure CSS icons in addition to your
            // existing app without polluting other CSS
            presets: [
                UnocssIcons({
                    // options
                    prefix: 'i-',
                    extraProperties: {
                        display: 'inline-block'
                    }
                }),
                // presetUno() - if you want to use other atomic CSS as well
            ],
        }),
    ],
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
            '@components/': `${path.resolve(__dirname, 'src/components')}/`
        },
    },
})
