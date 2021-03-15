<template>
  <div class="columns">
    <div class="column is-three-quarters">
      <el-card>
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

    <div class="column is-one-quarter">
      <el-card>
        <div slot="header">
          <img :src="section.thumbnail" :alt="section.title" />
        </div>

        <div>
          <p class="section-title">{{ section.title }}</p>
          <p class="section-desc has-text-grey">{{ section.description }}</p>
        </div>
      </el-card>

      <el-card>
        <div slot="header">
          <span class="has-text-weight-bold">👨‍💻 作者</span>
        </div>

        <div>
          <div class="columns">
            <div class="column is-half has-text-centered">
              <img :src="user.avatar + '?imageView2/1/w/100/h/100/format/webp/q/80'" :alt="user.alias" style="border-radius: 50%; height: 80px" />
            </div>
            <div class="column has-text-left user-name">
              <router-link :to="{ path: `/member/${user.username}/home` }">
                <p class="alias">{{ user.alias }}</p>
                <p class="is-size-10 has-text-grey">{{ '@' + user.username }}</p>
              </router-link>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import PostBox from '@/components/post/PostBox'
import Pagination from '@/components/layout/Pagination'

import { getSection } from '@/api/sections'
import { getUserInfoByUsernameOrId } from '@/api/user'
import { getPostList } from '@/api/post'

export default {
  name: "SectionPost",
  components: {
    PostBox,
    Pagination
  },
  data() {
    return {
      section: '',
      user: '',
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
    this.fetchSection()
    this.getList()
    document.title = '专栏话题 - ' + this.$root.site_info.site_title
  },
  methods: {
    async fetchSection() {
      getSection(this.$route.params.id).then((res) => {
        let { data } = res
        this.section = data
        this.fetchUserInfo(data.userId)
      })
    },
    fetchUserInfo(usernameXid) {
      getUserInfoByUsernameOrId(usernameXid).then((res) => {
        let { data } = res
        this.user = data.user
      })
    },
    async getList() {
      getPostList(this.$route.params.id, null, 'latest', this.page.current, this.page.size)
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
.section-title
  line-height 1.75em
  font-size 1.5em

.section-desc
  margin-top 0.25em
  font-size 1em

.user-name
  height 80px
  padding 24px 0

.alias
  font-size 18px

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