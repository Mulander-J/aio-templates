<script setup lang="ts">
import { HomeNavs } from './navs'

const date = new Date().getFullYear()
</script>

<template>
  <footer class="d-footer">
    <div class="footer__inner">
      <div class="left">
        <div class="navCol" v-for="nav in HomeNavs" :key="nav.name">
          <h3>{{ nav.meta.title }}</h3>
          <ul>
            <li v-for="nc in nav.children" :key="nc.name">
              <Link v-if="!nc?.isRoute" :href="nc?.path" draggable>{{ nc.meta.title }}</Link>
              <RouterLink v-else-if="nc?.path" :to="{ path: nc.path }">{{
                nc.meta.title
              }}</RouterLink>
              <span v-else>{{ nc.meta.title }}</span>
            </li>
          </ul>
        </div>

        <div class="navCol">
          <h3>About Me</h3>
          <div class="socials">
            <Link href="https://twitter.com/MulanderKilig">
              <div class="i-mdi-twitter"></div>
            </Link>
            <Link href="https://github.com/Mulander-J">
              <div class="i-mdi-github"></div>
            </Link>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="brands">
          <RouterLink :to="{ path: '/' }">
            <img src="/logo.svg" alt="VDNA" draggable="false" />
          </RouterLink>
        </div>
        <div class="text-brand-hint typo-0 font-400 mt-19px">
          MIT LICENSE © {{ date }} Mulander-J
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.d-footer {
  @apply bg-white px-16px pb-16px md:(pb-76px px-140px);
  .footer__inner {
    @apply border-t-1px border-brand-line px-8px flex  items-end justify-between flex-wrap md:(flex-row px-0);
    .right {
      @apply md:(-order-1);
      .brands {
        @apply flex items-center gap-x-24px mt-32px md:(mt-56px gap-x-40px);
        img {
          @apply min-w-100px h-28px md:(h-35px);
        }
      }
    }
    .left {
      @apply grid grid-cols-[repeat(2,auto)] gap-y-36px gap-x-46px mt-36px md:(flex items-start mt-56px gap-x-56px);
      .navCol {
        @apply text-brand-primary;
        h3 {
          @apply typo-1 font-700;
        }
        ul {
          @apply grid mt-16px gap-y-16px typo-1 md:(gap-y-20px mt-20px);
          li {
            @apply transition-all hover:text-brand-highlight;
          }
        }
        .socials {
          @apply mt-12px flex gap-x-8px;
          a {
            @apply block transition-all text-brand-hint w-28px h-28px md:(hover:text-brand-main);
          }
        }
      }
    }
  }
}
</style>
