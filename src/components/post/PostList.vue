<template>
  <div>
    <el-card>
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane label="🆕 最新话题" name="latest">
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
        </el-tab-pane>

        <el-tab-pane label="✨ 精华话题" name="essence" :lazy="true">
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
        </el-tab-pane>

        <el-tab-pane label="🔥 近期热门" name="hot" :lazy="true">
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
        </el-tab-pane>
      </el-tabs>

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
</template>

<script>
import PostBox from '@/components/post/PostBox'
import Pagination from '@/components/layout/Pagination'

import { getPostList } from '@/api/post'

export default {
  name: "PostList",
  components: {
    PostBox,
    Pagination
  },
  data() {
    return {
      postList: [
        { avatar: String, createTime: Date },
        { current: 1, size: 20, total: 0 }
      ],
      page: {
        current: 1,
        size: 20,
        total: 0
      },
      activeTab: 'latest'
    }
  },
  created() {
    this.getList(this.activeTab)
  },
  methods: {
    async getList(tabName) {
      getPostList(null, null, tabName, this.page.current, this.page.size)
          .then((data) => {
            this.page.current = data.data.current
            this.page.total = data.data.total
            this.page.size = data.data.size
            this.postList = data.data.records
          })
    },
    handleClick(tab) {
      // console.log(tab.name)
      this.getList(tab.name)
    }
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