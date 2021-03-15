<template>
  <div class="columns">
    <div class="column is-three-quarters">
      <el-card>
        <div slot="header">
          <span>🏷️<span class="mx-1"></span>{{ tag.name }}</span>
        </div>

        <div v-if="postList.length > 0">
          <div v-for="(item, key) in postList" :key="key">
            <transition name="el-fade-in">
              <PostBox :post-info="item"></PostBox>
            </transition>
          </div>
        </div>

        <div v-else class="nocontent">
          <p>暂时没有相关话题哦～</p>
        </div>

        <div class="pagination-div">
          <p>
            <Pagination
                v-show="page.total > 0"
                :total="page.total"
                :page.sync="page.current"
                :limit.sync="page.size"
                @pagination="getList"
            ></Pagination>
          </p>
        </div>
      </el-card>
    </div>

    <div class="column">
      <CardBar></CardBar>
    </div>
  </div>
</template>

<script>
import PostBox from '@/components/post/PostBox'
import Pagination from '@/components/layout/Pagination'
import CardBar from '@/components/layout/CardBar'

import { getPostList } from '@/api/post'

export default {
  name: "TagPostList",
  components: {
    CardBar,
    PostBox,
    Pagination
  },
  data() {
    return {
      tag: {
        id: this.$route.params.id,
        name: this.$route.query.name
      },
      postList: [
        { avatar: String, createTime: Date },
        { current: 1, size: 10, total: 0 }
      ],
      page: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    this.getList()
    document.title = this.$route.query.name + ' - ' + this.$root.site_info.site_title
  },
  methods: {
    async getList() {
      getPostList(null, this.tag.id, 'latest', this.page.current, this.page.size)
          .then((data) => {
            this.page.current = data.data.current
            this.page.total = data.data.total
            this.page.size = data.data.size
            this.postList = data.data.records
          })
    },
  }
}
</script>

<style lang="stylus" scoped>
.nocontent
  height 64px
  line-height 48px
  padding 8px 0
  p
    line-height 48px
    text-align center

.pagination-div
  height 40px
  padding-top 8px
  p
    text-align center
</style>