<template>
  <div id="dash">
    <div class="title">
      <span class="title-text">系&nbsp;统&nbsp;总&nbsp;览</span>
    </div>

    <el-divider></el-divider>

    <div class="columns is-hidden-mobile is-multiline has-text-centered">
      <div class="column is-one-quarter">
        <router-link :to="{ name: 'AdminUser' }">
          <section class="box my-card hero is-danger">
            <p style="font-size: 4em">{{ summary.userCount }}</p>
            <p class="subtitle mt-5">用&nbsp;户</p>
          </section>
        </router-link>
      </div>

      <div class="column is-one-quarter">
        <router-link :to="{ name: 'AdminPost' }">
          <section class="box my-card hero is-info">
            <p style="font-size: 4em">{{ summary.postCount }}</p>
            <p class="subtitle mt-5">话&nbsp;题</p>
          </section>
        </router-link>
      </div>

      <div class="column is-one-quarter">
        <router-link :to="{ name: 'AdminPhoto' }">
          <section class="box my-card hero is-success">
            <p style="font-size: 4em">{{ summary.photoCount }}</p>
            <p class="subtitle mt-5">照&nbsp;片</p>
          </section>
        </router-link>
      </div>

      <div class="column is-one-quarter">
        <section class="box my-card hero is-primary">
          <p style="font-size: 4em">{{ summary.commentCount }}</p>
          <p class="subtitle mt-5">评&nbsp;论</p>
        </section>
      </div>
    </div>

    <el-divider></el-divider>

    <div class="columns is-hidden-mobile is-multiline">
      <div class="column is-half">
        <el-card shadow="never">
          <div slot="header">
            <span>最新话题</span>
          </div>

          <div class="link-box">
            <el-table
                :data="summary.postRecent"
                :show-header="false"
                style="width: 100%"
            >
              <el-table-column
                  prop="title"
              >
                <template slot-scope="scope">
                  <router-link :to="{ name: 'Post', params: { id: scope.row.id } }">{{ scope.row.title }}</router-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>

      <div class="column is-half">
        <el-card shadow="never">
          <div slot="header">
            <span>最新评论</span>
          </div>

          <div class="link-box">
            <el-table
                :data="summary.commentRecent"
                :show-header="false"
                style="width: 100%"
            >
              <el-table-column
                  prop="content"
                  min-width="100"
              >
                <template slot-scope="scope">
                  <router-link :to="{ name: 'Post', params: { id: scope.row.postId } }">{{ scope.row.content }}</router-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getSummary } from '@/api/config'

export default {
  name: "Dash",
  data() {
    return {
      summary: {}
    }
  },
  mounted() {
    this.fetchSummary()
  },
  methods: {
    async fetchSummary() {
      getSummary().then((res) => {
        this.summary = res.data
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  text-align left
  &-text
    font-size 1em
  &-btn
    height 1em
    line-height 1em
    float right

.link-box
  margin-top 0
  padding-top 0
</style>