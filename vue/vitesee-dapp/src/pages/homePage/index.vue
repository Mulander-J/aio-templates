<script setup lang="ts">
import IconVuemarcos from '~/assets/imgs/vuemarcos.svg'
import IconMetamask from '~/assets/imgs/metamask.svg'

defineOptions({
  name: 'HomeIndex'
})

const { t } = useI18n()

const statsEle = ref(null)
const statsShow = ref(false)
useIntersectionObserver(statsEle, ([{ isIntersecting }], _observerElement) => {
  statsShow.value = isIntersecting
})

const ecoEle = ref(null)
const ecoShow = ref(false)
const { stop } = useIntersectionObserver(ecoEle, ([{ isIntersecting }], _observerElement) => {
  ecoShow.value = isIntersecting
  isIntersecting && stop()
})

/* Use of svg intro */
const ecoList = [
  { icon: 'i-logos:vitejs', link: 'https://vitejs.dev/' }, // icones/logos
  { icon: 'i-logos:vue', link: 'https://vuejs.org/' },
  {
    img: IconVuemarcos,
    link: 'https://github.com/sxzz/unplugin-vue-macros'
  }, // import from assets
  { img: 'https://pinia.vuejs.org/logo.svg', link: 'https://pinia.vuejs.org/' }, // http url
  {
    img: 'https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico',
    link: 'https://arco.design/vue/docs/'
  },
  { icon: 'i-logos:vueuse', link: 'https://vueuse.org/' },
  { icon: 'i-logos:unocss', link: 'https://github.com/antfu/unocss' },
  { icon: 'i-custom:icones', link: 'https://icones.js.org/' }, // custom icon set
  { img: '/safari-pinned-tab.svg', link: 'https://github.com/antfu/vitesse' }, // public assets
  { icon: 'i-custom:wagmi', link: 'https://wagmi.sh/core/getting-started' },
  { img: IconMetamask, link: 'https://metamask.io' },
  { icon: 'i-custom:walletconnect', link: 'https://walletconnect.com' },
  {
    img: 'https://echarts.apache.org/zh/images/favicon.png?_v_=20200710_1',
    link: 'https://echarts.apache.org'
  },
  { icon: 'i-custom:pnpm', link: 'https://pnpm.io/' },
  { icon: 'i-logos:typescript-icon', link: 'https://www.typescriptlang.org/' },
  { icon: 'i-logos:eslint', link: 'https://eslint.org/' },
  { icon: 'i-logos:visual-studio-code', link: 'https://code.visualstudio.com/' },
  { icon: 'i-logos:docker-icon', link: 'https://www.docker.com/' }
]
</script>
<template>
  <div>
    <section class="hero">
      <div class="heroShow">
        <div class="pattern"></div>

        <div class="content animated animate-fade-in-up animated-fast">
          <h1>
            {{ t('app.shortTitle') }}
          </h1>
          <p>{{ t('app.title') }}</p>

          <p>{{ t('app.description') }}</p>

          <div class="mt-2">
            <DBtn
              arrow
              class="w-180px"
              :label="t('button.launch')"
              @click="$router.push({ name: 'PageApp' })"
            />
          </div>
        </div>
      </div>

      <div class="stats" ref="statsEle">
        <div class="statsRow">
          <div class="stats-item">
            <div class="stats-head">
              <span :class="[statsShow && 'animated animate-slide-in-up animate-fast']">15+</span>
              <label>{{ t('stats.framework.title') }}</label>
            </div>
            <p>{{ t('stats.framework.intro') }}</p>
          </div>
        </div>

        <div class="statsRow">
          <div class="stats-item">
            <div class="stats-head">
              <span :class="[statsShow && 'animated animate-slide-in-up animate-fast']">10+</span>
              <label>{{ t('stats.component.title') }}</label>
            </div>
            <p>{{ t('stats.component.intro') }}</p>
          </div>
        </div>
      </div>

      <div class="hero-bg" />
    </section>

    <section class="page-w my-10 py-4 md:(my-20 py-10)">
      <div
        ref="ecoEle"
        class="frameworks flex flex-wrap rounded-8 justify-center gap-16 py-8 md:(gap-30 py-16)"
      >
        <a
          :class="[ecoShow && 'animated animate-zoom-in animate-fast']"
          target="_blank"
          :href="e.link"
          v-for="(e, i) in ecoList"
          :key="i"
        >
          <i v-if="e?.icon" :class="e?.icon" />
          <img v-else-if="e?.img" :src="e?.img" />
        </a>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  @apply w-full relative overflow-hidden;
  .heroShow {
    @apply relative;
    .pattern {
      background: linear-gradient(104.41deg, #5ea847 -21.77%, #a4cdaf 177.4%);
      animation: 0.4s forwards;
      animation-delay: 0.4s;
      @apply absolute top-0 bottom-0 left-0 z-2 right-16px rounded-rb-50px;
      @screen md {
        transform: translateX(-150%);
        animation-name: blueGo;
        animation-delay: 0.4s;
        right: 140px;
      }
    }
    .content {
      @apply relative z-3 pt-68px px-16px overflow-hidden pb-64px;
      animation-delay: 0.4s;
      @screen md {
        padding: 152px 0 106px 140px;
        animation-delay: 0.6s;
        @apply max-w-900px;
      }
      h1 {
        @apply text-white font-700 typo-6 md:(leading-68px text-50px);
      }
      p {
        @apply whitespace-pre-wrap break-words text-brand-wall font-400 pr-16px mt-16px text-14px leading-21px mb-26px md:(text-18px leading-27px mb-56px pr-0);
      }
    }
  }
  .stats {
    @apply relative z-3 mt-84px col-center md:(mt-135px mx-144px pl-99px block);
    .statsRow {
      .stats-item {
        @apply col-center w-243px md:(w-578px);
        .stats-head {
          @apply row-center overflow-hidden font-700 mb-16px typo-6 md:(text-48px leading-66px);
          span {
            @apply block text-brand-highlight font-manrope mr-4px;
          }
          label {
            @apply text-brand-primary;
          }
        }
        p {
          @apply text-brand-main typo-2 text-center whitespace-pre-wrap break-words;
        }
      }
    }

    .statsRow:nth-child(2) {
      @apply pt-32px pb-52px md:(flex justify-end);
    }
  }
  .hero-bg {
    @apply absolute bg-brand-wall z-1 top-0 left-0 right-0 bottom-0;
    background-repeat: no-repeat;
    /* background-image: url('~/assets/imgs/bg.svg'); */
    animation: 0.4s forwards;
    @screen md {
      transform: translateX(100%);
      animation-name: blueGo;
      @apply bg-left-bottom rounded-lb-50px left-140px;
    }
  }
}

@keyframes blueGo {
  100% {
    transform: translateX(0);
  }
}

.frameworks {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url('~/assets/imgs/bg.svg');
  i,
  img {
    @apply block h-48px min-w-48px md:(h-64px min-w-64px);
  }
}
</style>
