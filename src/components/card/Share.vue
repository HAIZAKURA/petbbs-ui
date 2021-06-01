<template>
  <el-card class="box-card has-text-centered">
    <div class="m-share"></div>
  </el-card>
</template>

<script>
import MShare from 'm-share'

export default {
  name: "Share",
  mounted() {
    const config = {
      types: ['wx', 'qq', 'qzone', 'sina']
    }
    MShare.init(config)
  }
}
</script>

<style scoped>

</style>