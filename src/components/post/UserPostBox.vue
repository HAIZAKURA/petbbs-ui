<template>
  <div class="post-box" :postInfo="postInfo" :user="user">
    <el-row :gutter="10">
      <el-col :span="2">
        <img class="post-box-avatar" :src="user.avatar + '?imageView2/1/w/100/h/100/format/webp/q/80'" :alt="postInfo.alias" />
      </el-col>
      <el-col :span="19">
        <div class="post-box-info">
          <div class="post-title">
            <span v-if="postInfo.top">
              <el-tag type="danger" size="mini" effect="dark">置顶</el-tag>
              <span class="mx-1"></span>
            </span>
            <span v-if="postInfo.essence">
              <el-tag size="mini" effect="dark">精华</el-tag>
              <span class="mx-1"></span>
            </span>
            <router-link class="title-link" :to="{ name: 'Post', params: { id: postInfo.id }}">{{ postInfo.title }}</router-link>
          </div>
          <div class="post-info">
            <p>
              <span>
                <router-link style="font-weight: 600;color:#606266" :to="{ name: 'User', params: { id: postInfo.userId } }">{{ user.alias }}</router-link>
              </span>
              <span style="color: #C0C4CC">  •  </span>
              <span>{{ dayjs(postInfo.createTime).calendar() }}</span>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="post-box-comments">
          <p style="font-weight: bold"><el-tag type="info" size="small" effect="plain"><i class="fas fa-comment-alt"></i>&nbsp;{{ postInfo.comments }}</el-tag></p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UserPostBox",
  props: {
    postInfo: {
      required: true
    },
    user: {
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.post-box
  width 100%
  height 80px
  padding 8px 0

.post-box-avatar
  height 48px
  width 48px
  border-radius 50%
  overflow hidden
  margin-top 6px

.post-box-info
  height 48px
  overflow hidden
  margin-top 6px

.post-box-comments
  height 48px
  overflow hidden
  margin-top 6px
  p
    line-height 60px
    text-align right

.post-title
  height 24px

.post-info
  height 28px
  p
    line-height 28px

.title-link
  line-height 24px
  font-size 16px
  color #606266
  font-weight 500

</style>