<template>
  <div class="collect-box" :postInfo="postInfo">
    <el-row :gutter="10">
      <el-col :span="2">
        <img class="collect-box-avatar" :src="postInfo.avatar + '?imageView2/1/w/100/h/100/format/webp/q/80'" :alt="postInfo.alias" />
      </el-col>

      <el-col :span="18">
        <div class="collect-box-info">
          <div class="collect-title">
            <span v-if="postInfo.top">
              <el-tag type="danger" size="mini" effect="dark">置顶</el-tag>
              <span class="mx-1"></span>
            </span>
            <span v-if="postInfo.essence">
              <el-tag size="mini" effect="dark">精华</el-tag>
              <span class="mx-1"></span>
            </span>
            <router-link class="title-link" :to="{ name: 'Post', params: { id: postInfo.postId }}">{{ postInfo.title }}</router-link>
          </div>
          <div class="collect-info">
            <p>
              <span>
                <router-link style="font-weight: 600;color:#606266" :to="{ path: '/' }">{{ postInfo.alias }}</router-link>
              </span>
              <span style="color: #C0C4CC">  •  </span>
              <span>{{ dayjs(postInfo.createTime).calendar() }}</span>
              <span v-for="(tag, index) in postInfo.tags" :key="index">
                <span style="color: #C0C4CC">  •  </span>
                <el-tag type="info" size="mini">
                  <router-link style="color:#606266" :to="{ name: 'TagPostList', params: { id: tag.id }, query: { name: tag.name }}"><i class="fas fa-tag"></i>&nbsp;{{ tag.name }}</router-link>
                </el-tag>
              </span>
            </p>
          </div>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="collect-box-comments">
          <span style="font-weight: bold"><el-tag type="info" size="small" effect="plain"><i class="fas fa-comment-alt"></i>&nbsp;{{ postInfo.comments }}</el-tag></span>
          <span class="mx-1"></span>
          <span style="font-weight: bold"><el-tag type="danger" size="small" effect="dark"><i class="fas fa-trash"></i></el-tag></span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UserCollectBox",
  props: {
    postInfo: {
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.collect-box
  width 100%
  height 80px
  padding 8px 0

.collect-box-avatar
  height 48px
  width 48px
  border-radius 50%
  overflow hidden
  margin-top 6px

.collect-box-info
  height 48px
  overflow hidden
  margin-top 6px

.collect-box-comments
  height 48px
  overflow hidden
  margin-top 6px
  text-align right
  p
    line-height 48px

.collect-title
  height 24px

.collect-info
  height 28px
  p
    line-height 28px

.title-link
  line-height 24px
  font-size 16px
  color #606266
  font-weight 500

</style>