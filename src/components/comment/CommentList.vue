<template>
  <div>
    <el-card>
      <div slot="header">
        <span>🎙<span class="mx-1"></span>评论</span>
      </div>

      <el-card shadow="never" v-if="quote.id !== ''">
        <el-tag size="mini" effect="dark">引用</el-tag><span class="mx-1"></span><span>{{ quote.content }}</span>
      </el-card>

      <div>
        <el-input
            type="textarea"
            resize="none"
            placeholder="请输入内容"
            v-model="ruleForm.content"
            :rows="4"
        ></el-input>
      </div>

      <div style="margin-top: 1em">
        <el-row :gutter="10">
          <el-col :span="19">
            <span class="mx-1"></span>
          </el-col>
          <el-col :span="5" style="text-align: right">
            <el-button size="mini" @click="resetForm">重置</el-button>
            <el-button type="primary" size="mini" @click="submitForm">发表评论</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <div v-if="commentList.length > 0">
      <div v-for="(item, key) in commentList" :key="key">
        <transition name="el-fade-in">
          <el-card class="comment-box" :commentIfo="item">
            <el-row :gutter="10">
              <el-col :span="2">
                <img class="comment-box-avatar" :src="item.avatar + '?imageView2/1/w/100/h/100/format/webp/q/80'" :alt="item.alias" />
              </el-col>

              <el-col :span="21">
                <div class="comment-box-info">
                  <span class="comment-author">
                    <router-link :to="{ name: 'User', params: { id: item.userId } }" style="font-weight: 600">{{ item.alias }}</router-link>
                  </span>
                  <span class="comment-date has-text-grey"><span class="mx-2"></span>{{ dayjs(item.createTime).format('YYYY/MM/DD HH:MM:ss') }}</span>
                </div>

                <div class="comment-box-content">
                  <div v-if="item.quotes != null" style="margin-top: 1em">
                    <div v-for="(quote, key) in item.quotes" :key="key">
                      <el-card class="quote-box" shadow="never">
                        <div>
                          <span class="quote-author">
                            <router-link :to="{ path: '/' }" style="font-weight: 600">{{ quote.alias }}</router-link>
                          </span>
                          <span class="quote-date has-text-grey"><span class="mx-2"></span>{{ dayjs(quote.createTime).format('YYYY/MM/DD HH:MM:ss') }}</span>
                        </div>
                        <span>{{ quote.content }}</span>
                      </el-card>
                    </div>
                  </div>

                  <p>{{ item.content }}</p>
                </div>
              </el-col>

              <el-col :span="1" style="text-align: right">
                <div class="comment-box-quote">
                  <span class="comment-quote has-text-grey">
                    <el-link type="info" :underline="false">
                      <i class="fas fa-reply" @click="handleQuote(item)"></i>
                    </el-link>
                  </span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </transition>
      </div>
    </div>

    <el-card v-else class="has-text-centered">
      <p>暂时没有人评论哦～</p>
    </el-card>

    <el-card v-show="page.total > 0">
      <div class="pagination-div">
        <p>
          <Pagination
              v-show="page.total > 0"
              :total="page.total"
              :page.sync="page.current"
              :limit.sync="page.size"
              @pagination="fetchCommentList"
          ></Pagination>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/layout/Pagination'

import { getCommentList } from '@/api/comment'
import { addComment, addCommentPhoto } from '@/api/comment'

export default {
  name: "CommentList",
  components: {
    Pagination
  },
  props: {
    postId: {
      required: true,
      type: String
    },
    type: {
      required: true
    }
  },
  data() {
    return {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      commentList: [
        { avatar: String, createTime: Date },
        { current: 1, size: 10, total: 0 }
      ],
      quote: {
        id: '',
        content: ''
      },
      ruleForm: {
        content: '',
        quoteId: '',
        postId: ''
      },
    }
  },
  created() {
    this.fetchCommentList()
  },
  methods: {
    async fetchCommentList() {
      getCommentList(this.postId, this.page.current, this.page.size).then((res) => {
        let { data } = res
        this.page.current = data.current
        this.page.size = data.size
        this.page.total = data.total
        this.commentList = data.records
      })
    },
    handleQuote(quote) {
      this.quote.id = quote.id
      this.quote.content = quote.content
    },
    resetForm() {
      this.ruleForm.content = ''
      this.ruleForm.quoteId = ''
      this.quote.id = ''
      this.quote.content = ''
    },
    submitForm() {
      if (this.ruleForm.content === '' || this.ruleForm.content == null) {
        window.alert("评论内容不能为空")
      }
      this.ruleForm.quoteId = this.quote.id
      this.ruleForm.postId = this.postId
      if (this.type === 'post') {
        addComment(this.ruleForm).then(() => {
          this.$message({
            message: '评论成功',
            type: 'success'
          })
          this.fetchCommentList()
          this.ruleForm.content = ''
          this.ruleForm.quoteId = ''
          this.quote.id = ''
          this.quote.content = ''
        })
      } else if (this.type === 'photo') {
        addCommentPhoto(this.ruleForm).then(() => {
          this.$message({
            message: '评论成功',
            type: 'success'
          })
          this.fetchCommentList()
          this.ruleForm.content = ''
          this.ruleForm.quoteId = ''
          this.quote.id = ''
          this.quote.content = ''
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination-div
  //height 40px
  //padding-top 8px
  p
    text-align center

.comment-box
  width 100%
  padding 8px 0

.comment-box-avatar
  height 48px
  width 48px
  border-radius 50%
  overflow hidden

.comment-box-info
  height 2em

.comment-author
  line-height 2em
  font-size 1em

.comment-date
  font-size 0.5em

.comment-box-quote
  height 48px

.comment-quote
  line-height 48px
  font-size 1em

.quote-author
  font-size 0.5em

.quote-date
  font-size 0.5em

.quote-box
  padding 0
  div
    margin-bottom 0.5em
</style>