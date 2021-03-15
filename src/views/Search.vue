<template>
  <div>
    <el-card v-if="postList.length > 0">
      <div v-for="(item, key) in postList" :key="key">
        <transition name="el-fade-in">
          <PostBox :post-info="item"></PostBox>
        </transition>
      </div>

      <div class="pagination-div">
        <p>
          <Pagination
              v-show="page.total > 0"
              :total="page.total"
              :page.sync="page.current"
              :limit.sync="page.size"
              @pagination="fetchSearch"
          ></Pagination>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import PostBox from '@/components/post/PostBox'
import Pagination from '@/components/layout/Pagination'

import { searchPost } from '@/api/search'

export default {
  name: "Search",
  components: {
    PostBox,
    Pagination
  },
  data() {
    return {
      postList: [
        { avatar: String, createTime: Date },
        { current: 1, size: 10, total: 0 }
      ],
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      keyword: ''
    }
  },
  created() {
    if (this.$route.query.keyword != null || this.$route.query.keyword !== '') {
      this.fetchSearch(this.$route.query.keyword)
    }
    document.title = '搜索 - ' + this.$root.site_info.site_title
  },
  methods: {
    async fetchSearch(keyword) {
      searchPost(keyword, this.page.current, this.page.size).then((res) => {
        let { data } = res
        this.postList = data.records
        this.page.current = data.current
        this.page.size = data.size
        this.page.total = data.total
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination-div
  height 40px
  padding-top 8px
  p
    text-align center
</style>