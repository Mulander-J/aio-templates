<script lang="ts" setup>
import bannerImage from '@/assets/svg/login-banner.svg'
</script>

<template>
  <div class="banner select-none" flex w-520px flex-col justify-center items-center>
    <img class="w-350px" :src="bannerImage" draggable="false" />
  </div>
</template>

<style lang="less" scoped>
.banner {
  background: #235bda;
  background-position-x: 100%;
  background-image: url(../../../assets/images/login-bg.jpg);
  background-size: auto 250px;
  background-repeat: no-repeat;
  @media (max-width: 1024px) {
    display: none;
  }
}
</style>
