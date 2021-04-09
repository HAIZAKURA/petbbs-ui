<template>
  <div id="post" class="columns">
    <div class="column is-three-quarters">
      <el-card>
        <div slot="header">
          <h6 class="title is-5 ellipsis is-ellipsis-1">{{ post.title }}</h6>
          <div class="has-text-grey">
            <span>{{ postUser.alias }}</span>
            <span class="mx-2">·</span>
            <span>浏览 {{ post.view }}</span>
            <span class="mx-2">·</span>
            <span>发布于{{ dayjs(post.createTime).format('YYYY/MM/DD HH:MM:ss') }}</span>
            <span v-if="post.modifyTime!=null && post.createTime !== post.modifyTime">
              <span class="mx-2">·</span>修改于{{ dayjs(post.modifyTime).format('YYYY/MM/DD HH:MM:ss') }}
            </span>
          </div>
        </div>

        <div id="preview"></div>

        <el-divider></el-divider>

        <div style="margin-top: -1.5em">
          <nav class="level has-text-grey is-size-7 mt-6">
            <div class="level-left">
              <p class="level-item">
                <b-taglist>
                  <router-link v-for="(tag, index) in tags" :key="index" :to="{ name: 'TagPostList', params: { id: tag.id }, query: { name: tag.name } }">
                    <span class="tag is-plain"><i class="fas fa-tag"></i><span class="mx-1"></span>{{ tag.name }}</span>
                  </router-link>
                </b-taglist>
              </p>
            </div>

            <div v-if="token != null && token !== ''" class="level-right">
              <a class="level-item">
                <span class="tag is-info" @click="handleCollect(post.id)">收藏</span>
              </a>

              <router-link
                  v-if="(user.id === postUser.id) || (user.roleId === 1 || user.roleId === 2)"
                  class="level-item"
                  :to="{ name: 'EditPost', params: { id: post.id }}"
              >
                <span class="tag is-primary">编辑</span>
              </router-link>

              <a v-if="(user.id === postUser.id) || (user.roleId === 1 || user.roleId === 2)" class="level-item">
                <span class="tag is-danger" @click="handleDelete(post.id)">删除</span>
              </a>
            </div>
          </nav>
        </div>
      </el-card>

      <CommentList :post-id="$route.params.id" :type="type"></CommentList>
    </div>
    <div class="column is-one-quarter">
      <PostAuthor v-if="flag" :user="postUser"></PostAuthor>
    </div>
  </div>
</template>

<script>
import PostAuthor from '@/components/post/PostAuthor'
import CommentList from '@/components/comment/CommentList'

import { getPost, delPost, delPostByAdmin } from '@/api/post'
import { putCollect } from '@/api/collect'
import { addNotifyByAdmin } from '@/api/notify'
import { mapGetters } from 'vuex'

import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
  name: "Post",
  components: {
    PostAuthor,
    CommentList,
  },
  data() {
    return {
      flag: false,
      post: {
        content: ''
      },
      tags: [],
      postUser: {},
      type: 'post'
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    this.fetchPost()
  },
  methods: {
    renderMarkdown(md) {
      Vditor.preview(document.getElementById('preview'), md, {
        hljs: { style: 'github' }
      })
    },
    async fetchPost() {
      getPost(this.$route.params.id).then((res) => {
        let { data } = res;
        document.title = data.post.title + ' - ' + this.$root.site_info.site_title
        this.post = data.post
        this.tags = data.tags
        this.postUser = data.user
        this.comments = data.comments
        this.renderMarkdown(this.post.content)
        this.flag = true
      })
    },
    handleDelete(postId) {
      if (window.confirm("确认删除本话题？")) {
        if (this.user.roleId === 1 || this.user.roleId === 2) {
          delPostByAdmin(postId)
              .then(() => {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                let dto = {
                  'userId': this.postUser.id,
                  'content': '您的话题 ' + this.post.title + ' 已被删除了哦！',
                  'remark': 'post/' + postId
                }
                addNotifyByAdmin(dto)
                setTimeout(() => {
                  this.$router.push({ path: '/' })
                }, 1000)
              })
        } else {
          delPost(postId)
              .then(() => {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.push({ path: '/' })
                }, 1000)
              })
        }
      }
    },
    handleCollect(postId) {
      putCollect(postId).then((res) => {
        this.$message({
          message: res.message,
          type: 'success',
          duration: 1000
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#preview
  min-height 100px

.tags
  bottom 0
</style>