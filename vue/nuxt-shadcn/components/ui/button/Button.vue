<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { type ButtonVariants, buttonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  launch?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button'
})
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(buttonVariants({ variant, size }), launch && 'btn-launch', props.class)">
    <slot />
    <div v-if="launch" class="launch-base">
      <i class="launch-target">
        <slot name="arrow">
          <Icon name="custom:arrow-right" class="size-[15px]" />
        </slot>
      </i>
    </div>
  </Primitive>
</template>

<style scoped>
.btn-launch {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s linear;
  .launch-base {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0;
    overflow: clip;
  }
  .launch-target {
    transition: all 0.15s ease-in-out;
    display: inline-flex;
    opacity: 0;
    transform: translateX(-100%);
  }

  &:hover {
    .launch-base {
      width: auto;
      .launch-target {
        margin-left: 8PX;
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}

</style>
