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
        <div slot="header">📷<span class="mx-1"></span>添加图片</div>

        <div style="text-align: center" v-if="photoList.length > 0">
          <el-button size="small" @click="photoListDialog = true">图片列表</el-button>
          <el-divider></el-divider>
        </div>

        <div style="text-align: center">
          <div>
            <el-upload
                action=""
                accept="image/*"
                :before-upload="upload"
                v-loading="loading"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                <span>只能上传图片文件，且不超过20MB</span>
                <br />
                <span>上传后直接在文中对应位置粘贴即可</span>
              </div>
            </el-upload>
          </div>
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header">💡<span class="mx-1"></span>发帖提示</div>
        <p>1⃣️<span class="mx-1"></span>请在标题中描述内容要点。</p>
        <br />
        <p>2⃣️<span class="mx-1"></span>可以在正文中为你要发布的话题添加更多细节。正文采用<i class="fab fa-markdown"></i><a href="https://docs.github.com/en/github/writing-on-github" target="_blank">Markdown</a> 文本标记语法。</p>
        <br />
        <p>3⃣️<span class="mx-1"></span>在最后，请为你的话题选择标签，至多3个。恰当的归类会让你发布的信息更加有用。</p>
      </el-card>

      <el-card class="box-card">
        <div slot="header">📜<span class="mx-1"></span>社区原则</div>
        <p>❗️<span class="mx-1"></span>请不要发布任何盗版下载链接，包括软件、音乐、电影等等，我们尊重原创。</p>
        <br />
        <p>❗️<span class="mx-1"></span>保持对陌生人的友善。用知识去帮助别人。</p>
      </el-card>
    </div>

    <el-dialog
        title="图片列表"
        :visible.sync="photoListDialog"
        width="40%"
    >
      <el-table
          :data="photoList"
          :show-header="false"
          max-height="300px"
          style="width: 100%"
      >
        <el-table-column
            prop="url"
            align="left"
        >
          <template slot-scope="scope">
            <img style="height: 100px" :src="scope.row.url" />
          </template>
        </el-table-column>

        <el-table-column
            prop="md_url"
            align="right"
        >
          <template slot-scope="scope">
            <el-button type="primary" @click="doCopy2(scope.row.md_url)">复制</el-button>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="photoListDialog = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vditor from 'vditor'
import { getPost, updatePost, updatePostByAdmin } from '@/api/post'
import { uploadUtil } from '@/api/upload'
import { mapGetters } from 'vuex'

export default {
  name: "Edit",
  data() {
    return {
      contentEditor: '',
      post: {},
      tags: [],
      photoList: [],
      photoListDialog: false,
      loading: false
    }
  },
  created() {
    document.title = '修改话题'
    this.fetchPost()
  },
  computed: {
    ...mapGetters(['token', 'user'])
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
    async fetchPost() {
      getPost(this.$route.params.id).then((res) => {
        let { data } = res
        this.post = data.post
        this.tags = data.tags
        this.renderMarkdown(this.post.content)
      })
    },
    handleUpdate() {
      this.post.content = this.contentEditor.getValue()
      if (this.user.roleId === 1 || this.user.roleId === 2) {
        updatePostByAdmin(this.post).then((res) => {
          let { data } = res
          this.$router.push({ name: 'Post', params: { id: data.id } })
        })
      } else {
        updatePost(this.post).then((res) => {
          let { data } = res
          this.$router.push({ name: 'Post', params: { id: data.id } })
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.contentEditor.setValue('')
      this.tags = []
    },
    upload(file) {
      this.loading = true
      let fd = new FormData()
      fd.append('file', file)
      fd.append('type', 'image')
      // console.log(fd)
      uploadUtil(fd)
          .then((res) => {
            let { data } = res
            this.$message({
              message: '上传成功',
              type: 'success'
            })
            let item = {
              'url': data.url + '?imageView2/0/format/webp/q/80',
              'md_url': '![](' + data.url + '?imageView2/0/format/webp/q/80)'
            }
            this.photoList.push(item)
            this.loading = false
          })
          .catch(() => {
            this.$message({
              message: '上传失败',
              type: 'error'
            })
            this.loading = false
          })
    },
    doCopy2(text) {
      this.$copyText(text).then(() => {
        // console.log('y')
        this.$message({
          message: '在您需要的位置粘贴即可',
          type: 'info'
        })
        this.photoListDialog = false
        // this.md_img = ''
        // this.img = ''
      }, () => {
        // console.log('n')
        // this.md_img = ''
        // this.img = ''
        this.photoListDialog = false
      })
    }
  }
}
</script>

<style scoped>

</style>