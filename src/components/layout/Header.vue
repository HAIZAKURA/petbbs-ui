<template>
  <header class="header has-background-white has-text-black">
    <b-navbar
        class="container is-white"
        :fixed-top="true"
    >
      <template slot="brand">
        <b-navbar-item tag="div">
          <img :src="$root.site_info.site_logo" alt="logo" />
        </b-navbar-item>

        <b-navbar-item
            class="is-hidden-desktop"
            tag="router-link"
            :to="{ path: '/' }"
        >主页</b-navbar-item>
      </template>

      <template slot="start">
        <b-navbar-item
            tag="router-link"
            :to="{ path: '/' }"
        >🌐 主页</b-navbar-item>

        <b-navbar-item
            tag="a"
            href="tencent://message/?Menu=yes&uin=860638556"
        >👾 反馈</b-navbar-item>
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
              <b-button class="is-info" @click="search()">搜索</b-button>
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

        <b-navbar-dropdown
            v-else
            :label="user.alias"
        >
          <b-navbar-item
              tag="router-link"
              :to="{ path: '' }"
          >🧘 个人中心</b-navbar-item>
          <hr class="dropdown-divider" />
          <b-navbar-item
              tag="a"
              @click="logout"
          > 👋 退出登录</b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      searchKey: ''
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  methods: {
    async logout() {
      this.userLogout('/user/logout')
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
    ...mapActions({
      userLogout: 'user/logout'
    })
  }
}
</script>

<style lang="stylus" scoped>
input
  width 80%
  height 86%
</style>