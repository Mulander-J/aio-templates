import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Unocss from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import { visualizer } from "rollup-plugin-visualizer";


export default ({ mode }: any) => {
  const isProd = /stg|stage|prod/i.test(mode)

  return defineConfig({
    server: {
      // https: true,
      proxy: {
        '/api': {
          target: 'http://{ip}:{port}/',
          rewrite: path => path.replace(/^\/api/, ''),
        },
        '/prodApi': {
          target: 'http://{ip}:{port}/',
          rewrite: path => path.replace(/^\/prodApi/, '')
        }
      }
    },
    plugins: [

      VueMacros({
        plugins: {
          vue: Vue({
            reactivityTransform: true,
          }),
        },
      }),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'vue/macros',
          '@vueuse/head',
          '@vueuse/core',
        ],
        dts: true,
        dirs: [
          './src/composables',
        ],
        resolvers: [ArcoResolver()],
        vueTemplate: true,
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true,
        resolvers: [
          ArcoResolver({
            sideEffect: true,
            importStyle: 'less'
          })
        ],
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),

      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),

      createSvgIconsPlugin({
        iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
        /**
       * inject position
       * @default: body-last
       */
        // inject?: 'body-last' | 'body-first'

        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        // customDomId: '__svg__icons__dom__',
      }),

      // visualizer({})
    ],
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            //  arco-ui PrimaryColor
            'arcoblue-6': '#005DFF',
          },
          javascriptEnabled: true,
        }
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: 1500,
      reportCompressedSize: !isProd,
      sourcemap: !isProd,
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: isProd,
        },
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        }
      }
    }
  })
}
