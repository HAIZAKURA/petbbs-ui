<template>
  <div class="columns">
    <div class="column is-three-quarters">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>✍️<span class="mx-1"></span>修改话题</span>
        </div>

        <div>
          <el-form
              ref="post"
              :model="post"
          >
            <el-form-item prop="title">
              <el-input
                  v-model="post.title"
                  placeholder="输入话题标题"
              />
            </el-form-item>

            <!--Markdown-->
            <div id="vditor" />

            <el-form-item></el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleUpdate">立即修改</el-button>

              <el-button @click="resetForm('post')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

    <div class="column is-one-quarter">
      <el-card class="box-card">
        <div slot="header">💡<span class="mx-1"></span>发帖提示</div>
      </el-card>

      <el-card class="box-card">
        <div slot="header">📜<span class="mx-1"></span>社区原则</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import { getPost, updatePost } from '@/api/post'

export default {
  name: "Edit",
  data() {
    return {
      contentEditor: '',
      post: {},
      tags: [],
    }
  },
  created() {
    document.title = '修改话题 - ' + this.$root.site_info.site_title
    this.fetchPost()
  },
  methods: {
    renderMarkdown(md) {
      this.contentEditor = new Vditor('vditor', {
        height: 460,
        placeholder: '输入话题内容',
        preview: {
          hljs: { style: 'monokai' }
        },
        mode: 'sv',
        after: () => {
          this.contentEditor.setValue(md)
        }
      })
    },
    fetchPost() {
      getPost(this.$route.params.id).then((res) => {
        let { data } = res
        this.post = data.post
        this.tags = data.tags
        this.renderMarkdown(this.post.content)
      })
    },
    handleUpdate() {
      this.post.content = this.contentEditor.getValue()
      updatePost(this.post).then((res) => {
        let { data } = res
        this.$router.push({ name: 'Post', params: { id: data.id } })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.contentEditor.setValue('')
      this.tags = []
    },
  }
}
</script>

<style scoped>

</style>