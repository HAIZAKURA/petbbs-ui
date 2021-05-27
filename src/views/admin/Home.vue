<template>
  <div id="home">
    <el-container>
      <el-aside class="aside">
        <el-menu
            class="aside-menu"
            background-color="#242327"
            text-color="#fff"
            active-text-color="#ffd04b"
            default-active="/admin"
            unique-opened
            router
        >
          <div class="aside-logo">
            <div class="blank10"></div>
<!--            <img src="../../assets/logo.png" />-->
            <img :src="$root.site_info.site_logo">
            <div class="blank20"></div>
          </div>

          <el-menu-item class="aside-menu-item" index="/admin">
            <i class="el-icon-odometer"></i>
            <span>&nbsp;总&nbsp;览</span>
          </el-menu-item>

          <el-menu-item class="aside-menu-item" index="/admin/user">
            <i class="el-icon-user"></i>
            <span>&nbsp;用&nbsp;户</span>
          </el-menu-item>

          <el-submenu class="aside-menu-item" index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>&nbsp;话&nbsp;题</span>
            </template>

            <el-menu-item class="aside-submenu-item" index="/admin/post">
              <span>话&nbsp;题</span>
            </el-menu-item>

            <el-menu-item class="aside-submenu-item" index="/admin/tag">
              <span>标&nbsp;签</span>
            </el-menu-item>

            <el-menu-item class="aside-submenu-item" index="/admin/section">
              <span>专&nbsp;栏</span>
            </el-menu-item>
          </el-submenu>

          <el-menu-item class="aside-menu-item" index="/admin/photo">
            <i class="el-icon-picture-outline"></i>
            <span>&nbsp;照&nbsp;片</span>
          </el-menu-item>

          <el-menu-item class="aside-menu-item" index="/admin/billboard" v-if="user.roleId === 1">
            <i class="el-icon-postcard"></i>
            <span>&nbsp;公&nbsp;告</span>
          </el-menu-item>

          <el-submenu class="aside-menu-item" index="2" v-if="user.roleId === 1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>&nbsp;设&nbsp;置</span>
            </template>

            <el-menu-item class="aside-submenu-item" index="/admin/config/site">
              <span>系&nbsp;统&nbsp;侧</span>
            </el-menu-item>

            <el-menu-item class="aside-submenu-item" index="/admin/config/qiniu">
              <span>七&nbsp;牛&nbsp;云</span>
            </el-menu-item>

            <el-menu-item class="aside-submenu-item" index="/admin/config/word">
              <span>敏&nbsp;感&nbsp;词</span>
            </el-menu-item>

            <el-menu-item class="aside-submenu-item" index="/admin/config/friend">
              <span>友&nbsp;情&nbsp;链</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="admin-header">
          <div class="header-tool">
            <div class="header-tool-item">
              <span class="header-user">{{ user.alias }}</span>
              <el-button type="primary" size="medium" round @click="back">返回论坛</el-button>
              <el-button type="danger" size="medium" round @click="logout">登出</el-button>
            </div>
          </div>
        </el-header>

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
    // console.log(this.user.roleId !== 1 && this.user.roleId !== 2)
    if (this.user.roleId !== 1 && this.user.roleId !== 2) {
      this.$message({
        message: '权限不足',
        type: 'error',
        duration: 1000
      })
      this.$router.push({ name: 'Login', query: { to: 'admin' } })
    }
  },
  mounted() {
    document.title = '控制面板'
  },
  methods: {
    back() {
      this.$router.push({ path: '/' })
    },
    async logout() {
      this.$store.dispatch('user/logout')
          .then(() => {
            this.$message({
              message: '注销成功',
              type: 'success',
              duration: 2000
            })
            setTimeout(() => {
              this.$router.push({ path: this.redirect || '/' })
            }, 1000)
          })
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