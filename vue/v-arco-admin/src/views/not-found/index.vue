<script lang="ts" setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'NoteFound'
})

const router = useRouter()
const back = () => {
  // warning： Go to the node that has the permission
  router.back()
}
</script>

<template>
  <div p-4>
    <div relative flex flex-col items-center p10 bg-white dark:bg-dark>
      <a-result class="result" status="404" subtitle="Not Found" />
      <div class="operation-row">
        <a-button key="again" style="margin-right: 16px">Again</a-button>
        <a-button key="back" type="primary" @click="back()">Back</a-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
