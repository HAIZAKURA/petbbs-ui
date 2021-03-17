<template>
  <div id="home">
    <el-container>
      <el-aside class="aside"></el-aside>
      <el-container>
        <el-header class="admin-header"></el-header>
        <el-main class="main-view">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "AdminHome",
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    if (this.user.roleId !== 1 || this.user.roleId !== 2) {
      this.$message({
        message: '权限不足',
        type: 'error',
        duration: 1000
      })
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-menu-item.is-active
  background-color #393a3e !important

.blank10
  height 10px

.blank20
  height 20px

.aside
  height 100%
  max-width 180px
  overflow-x hidden
  z-index 1

.aside-menu
  height 100vh
  border-right none

.aside-menu-item
  text-align left

.aside-submenu-item
  text-align center

.aside-logo
  margin-top 20px
  width 180px
  display grid
  border-bottom 1px solid #2b2c30
  img
    width 80px
    margin auto

.admin-header
  padding 0
  margin 0
  width 100%

.header-menu
  height 60px
  padding-right 32px
  &-item
    float right
    line-height 60px
    height 48px
    margin auto

.header-user
  color #ffffff
  margin-right 32px

.main-view
  padding 1.5em 3em

.header-tool
  background-color #242327
  height 60px
  width 100%
  position absolute
  top 0px
  right 0px
  z-index 0
  padding-right 2em
  &-item
    float right
    line-height 60px
    height 60px
    margin auto
    z-index 0

.cover
  position absolute
  top 0px
  left 0px
  height 100vh
  width 100vw
  background-color rgba(255, 255, 255, 0.4)
  backdrop-filter blur(10px)
  z-index 99
  &-content
    margin-top 15%
    &-text
      font-size 60px
      height 100px
      line-height 100px
      display inline
      letter-spacing 16px
    &-btn
      height 100px
      line-height 100px
</style>