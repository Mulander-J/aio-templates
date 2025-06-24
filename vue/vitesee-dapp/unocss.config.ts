import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { animatedUno } from 'animated-unocss'
import CustomIconSet from './src/assets/customIconSet'

export default defineConfig({
  theme: {
    colors: {
      brand: {
        primary: '#0E0B3D',
        highlight: '#70BC5B',
        main: '#535479',
        line: '#DDE0EE',
        hint: '#B3B8D0',
        wall: '#F7F9FC'
      },
    },
  },
  rules: [
    /**
     * typo level
     * fontSize: 12+d*2
     */
    [/^typo-([0-6])$/, ([, d]) => ({
      'font-size': `${Number(d) * 2 + 12}px`,
      'line-height': `${Number(d) * 3 + 16}px`
    })],
    ['typo-title', { 'font-size': '28px', 'line-height': '38px', 'font-weight': 700 }],

  ],
  shortcuts: [
    // layout center
    ['page-w', 'px-16px md:(w-full max-w-1440px px-140px mx-auto)'],
    ['row-center', 'flex items-center justify-center'],
    ['col-center', 'flex flex-col items-center justify-center'],
    ['btn', 'cursor-pointer select-none'],
    ['link', 'cursor-pointer text-brand-primary hover:text-brand-highlight']
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        custom: CustomIconSet
      }
    }),
    presetWebFonts({
      fonts: {
        sans: 'Open Sans'
      },
    }),
    animatedUno(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
