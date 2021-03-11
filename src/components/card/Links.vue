<template>
  <el-card class="box-card">
    <div slot="header">
      <span>👬 友情链接</span>
    </div>
    <div>
      <div class="link-div" v-for="(item, key) in friendLinks" :key="key">
        <el-link :underline="false" :href="item.link" :alt="item.title" target="_blank">
          <img class="link-img" :src="item.icon" :alt="item.title" />
        </el-link>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getFriends } from '@/api/friends'

export default {
  name: "Links",
  data() {
    return {
      friendLinks: []
    }
  },
  created() {
    this.fetchFriendLinks()
  },
  methods: {
    fetchFriendLinks() {
      getFriends().then((data) => {
        this.friendLinks = data.data
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.link-div
  height 30px
  text-align center

.link-img
  height 30px
</style>