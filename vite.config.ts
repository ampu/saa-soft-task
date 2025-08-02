import {defineConfig} from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from 'bootstrap-vue-next'
import IconsResolve from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

const {GH_PAGES} = process.env

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Components({
      resolvers: [
        BootstrapVueNextResolver(),
        IconsResolve(),
      ],
      dts: true,
    }),
    Icons({
      compiler: `vue3`,
      autoInstall: true,
    })
  ],
  base: GH_PAGES ? `/saa-soft-task` : undefined,
})
