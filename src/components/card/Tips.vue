<template>
  <el-card class="content box-card">
    <div slot="header">
      <span>💡 每日一言</span>
    </div>
    <div>
      <div class="has-text-left block">
        <p>{{ hitokoto.hitokoto }}</p>
      </div>
      <div class="has-text-right mt-5 block">
        <p>FROM<span class="mx-1"></span>{{ hitokoto.from }}</p>
      </div>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'

export default {
  name: "Tips",
  data() {
    return {
      hitokoto: ''
    }
  },
  created() {
    this.getHitokoto()
    // console.log(this.hitokoto)
  },
  methods: {
    getHitokoto() {
      axios.get('https://v1.hitokoto.cn').then((res) => {
        // console.log(res.data)
        this.hitokoto = res.data
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>