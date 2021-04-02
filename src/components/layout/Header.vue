<template>
  <header class="header has-background-white has-text-black">
    <b-navbar
        class="container is-white"
        :fixed-top="true"
    >
      <template slot="brand">
        <b-navbar-item tag="div">
          <img
              :src="$root.site_info.site_logo"
              alt="logo"
              style="cursor: pointer"
              @click="gotoHome()"
          />
        </b-navbar-item>

        <b-navbar-item
            class="is-hidden-desktop"
            tag="router-link"
            :to="{ path: '/' }"
        >主页</b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <b-field position="is-centered">
            <b-input
                v-model="searchKey"
                class="search-input"
                width="80%"
                placeholder="搜索"
                clearable
                @keyup.enter.native="search()"
            />
            <p class="control">
              <b-button class="is-info" @click="search()">
                <i class="fa fa-search"></i>
              </b-button>
            </p>
          </b-field>
        </b-navbar-item>

        <b-navbar-item
            v-if="token == null || token === ''"
            tag="div"
        >
          <div class="buttons">
            <b-button
                class="is-light"
                tag="router-link"
                :to="{ path: '/register' }"
            >注册</b-button>
            <b-button
                class="is-primary"
                tag="router-link"
                :to="{ path: '/login' }"
            >登录</b-button>
          </div>
        </b-navbar-item>

        <b-navbar-item
            v-else
            tag="router-link"
            :to="{ name: 'Notify' }"
        >
          <el-badge :value="newNotifyNum" :max="10" class="item" v-if="newNotifyNum > 0">
            <i class="fas fa-bell"></i>
          </el-badge>
          <el-badge class="item" v-else>
            <i class="fas fa-bell"></i>
          </el-badge>
        </b-navbar-item>

        <b-navbar-dropdown
            v-if="token != null && token !== ''"
            :hoverable="true"
            :arrowless="true"
            :label="user.alias"
        >
          <b-navbar-item
              tag="router-link"
              :to="{ path: '/my' }"
          > 🧘 个人中心</b-navbar-item>
          <hr class="dropdown-divider" />
          <b-navbar-item
              v-if="!user.active"
              tag="router-link"
              :to="{ name: 'ReActive' }"
          > 🔑 激活账号</b-navbar-item>
          <hr v-if="!user.active" class="dropdown-divider" />
          <b-navbar-item
              v-if="user.roleId === 1 || user.roleId === 2"
              tag="router-link"
              :to="{ path: '/admin' }"
          > ⚙️ 系统管理</b-navbar-item>
          <hr v-if="user.roleId === 1 || user.roleId === 2" class="dropdown-divider" />
          <b-navbar-item
              tag="a"
              @click="logout"
          > 👋 注销登录</b-navbar-item>
        </b-navbar-dropdown>

        <b-navbar-item v-if="token != null && token !== ''" tag="div">
          <img
              :src="user.avatar"
              :alt="user.alias"
              style="border-radius: 50%"
          />
        </b-navbar-item>
      </template>
    </b-navbar>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNewNotify } from '@/api/notify'
// import { getSiteInfo } from '@/api/config'

export default {
  name: "Header",
  data() {
    return {
      searchKey: '',
      newNotifyNum: 0
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    // getSiteInfo().then(data => {
    //   this.$root.site_info = data.data
    // })
    // console.log(this.user)
  },
  mounted() {
    if (this.token) {
      setInterval(() => {
        // console.log(this.token)
        if (this.token) {
          this.fetchNewNotify()
        }
      }, 3000)
    }
  },
  methods: {
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
    },
    async fetchNewNotify() {
      getNewNotify()
          .then((data) => {
            this.newNotifyNum = data.data.length
          })
          .catch(() => {
            this.$router.push({ name: 'Login' })
          })
    },
    gotoHome() {
      this.$router.push({ path: '/' })
    },
    search() {
      this.$router.push({ name: 'Search', query: { keyword: this.searchKey } })
    }
  }
}
</script>

<style lang="stylus" scoped>
input
  width 80%
  height 86%

</style>