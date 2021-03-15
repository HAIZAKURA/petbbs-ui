<template>
  <div id="forum">
    <div v-if="billboard != null">
      <p v-for="(item, key) in billboard" class="box" v-bind:key="key">🔔 公告：{{ item.content }}</p>
    </div>

    <div class="home-panel">
      <Panel></Panel>
    </div>

    <div class="columns">
      <div class="column is-three-quarters">
        <PostList></PostList>
      </div>

      <div class="column">
        <CardBar></CardBar>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from '@/components/layout/Panel'
import PostList from '@/components/post/PostList'
import CardBar from '@/components/layout/CardBar'

// import { getSiteInfo } from '@/api/config'
import { activeUser } from '@/api/user'
import { getBillboard } from '@/api/billboard'

export default {
  name: "Forum",
  components: {
    Panel,
    PostList,
    CardBar
  },
  data() {
    return {
      billboard: '',
      activeDTO: {
        user: this.$route.query.user,
        code: this.$route.query.code
      }
    }
  },
  created() {
    // getSiteInfo().then(data => {
    //   this.$root.site_info = data.data
    //   document.title = data.data.site_title
    // })
    this.handleActive()
    this.fetchBillboard()
  },
  mounted() {
    setTimeout(() => {
      document.title = this.$root.site_info.site_title
    }, 100)
  },
  methods: {
    handleActive() {
      if (this.activeDTO.code && this.activeDTO.user) {
        activeUser(this.active).then((value) => {
          let { code, message } = value
          if (code === 200) {
            this.$message({
              message: message,
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: message,
              type: 'error',
              duration: 2000
            })
          }
        })
      }
    },
    async fetchBillboard() {
      getBillboard().then((data) => {
        this.billboard = data.data
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-panel
  margin-top 1em
  margin-bottom 0.25em

</style>