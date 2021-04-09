<template>
  <div id="404">
    <el-row>
      <el-col :span="20" :offset="2">
        <el-card class="card-404">
          <div class="header-img">
            <img src="../assets/zzz.png" alt="Zzzzzzzz" />
          </div>

          <div class="text-404">
            <span>啊叻？内容不见了？</span>
          </div>

          <div class="btn-404">
            <el-button type="primary" @click="gotoHome">返回首页</el-button>

            <span class="mx-6"></span>

            <el-button type="success" @click="random">随机推荐</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "404",
  methods: {
    gotoHome() {
      this.$router.push({ path: '/' })
    },
    random() {
      this.$router.push({ path: '/random' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.card-404
  text-align center
  padding-bottom 3em

.header-img
  img
    height 20em

.text-404
  font-size 2em
  font-weight bold
  margin-bottom 2em
</style>