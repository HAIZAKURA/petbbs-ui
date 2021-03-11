<template>
  <el-card class="box-card">
    <div slot="header">
      <span>📃 发表话题</span>
    </div>

    <div v-if="token != null && token !== ''" class="has-text-centered">
      <b-button type="is-danger" tag="router-link" :to="{path:'/post/create'}" outlined>✍️ 发表话题</b-button>
    </div>

    <div v-else class="has-text-centered">
      <b-button type="is-primary" tag="router-link" :to="{path:'/register'}" outlined>马上入驻</b-button>
      <b-button type="is-danger" tag="router-link" :to="{path:'/login'}" outlined class="ml-2"> 社区登录</b-button>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Welcome",
  computed: {
    ...mapGetters(['token'])
  }
}
</script>

<style scoped>

</style>