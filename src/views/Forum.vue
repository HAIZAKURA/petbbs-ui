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
    }
  },
  created() {
    this.fetchBillboard()
  },
  mounted() {
    setTimeout(() => {
      document.title = this.$root.site_info.site_title
    }, 100)
  },
  methods: {
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