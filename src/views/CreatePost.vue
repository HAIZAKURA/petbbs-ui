<template>
  <div class="columns">
    <div class="column is-three-quarters">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>✍️<span class="mx-1"></span>发表新话题</span>
        </div>

        <div>
          <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
          >
            <el-form-item prop="title">
              <el-input
                  v-model="ruleForm.title"
                  placeholder="输入话题标题"
              />
            </el-form-item>

            <!--Markdown-->
            <div id="vditor" />

            <el-form-item></el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>

              <el-button @click="resetForm('ruleForm')">重置</el-button>
<!--              <el-button @click="test">123</el-button>-->
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

    <div class="column is-one-quarter">
      <el-card class="box-card">
        <div slot="header">🏷️<span class="mx-1"></span>话题标签</div>
        <div>
          <el-select
            v-model="tags"
            style="text-overflow: ellipsis;white-space: nowrap;width: 100%"
            multiple
            :multiple-limit="3"
            filterable
            clearable
            placeholder="请选择话题标签">
            <el-option
                v-for="item in tagList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            ></el-option>
          </el-select>
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
        <p>❗️<span class="mx-1"></span>请不要在 V2EX 发布任何盗版下载链接，包括软件、音乐、电影等等，我们尊重原创。</p>
        <br />
        <p>❗️<span class="mx-1"></span>保持对陌生人的友善。用知识去帮助别人。</p>
      </el-card>
    </div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'

import { addPost } from '@/api/post'
import { getTagList } from '@/api/tags'

export default {
  name: "CreatePost",
  data() {
    return {
      contentEditor: '',
      tagList: [],
      ruleForm: {
        title: '', // 标题
        tags: [], // 标签
        content: {}, // 内容
        html: {}
      },
      tags: [],
      rules: {
        title: [
          { required: true, message: '请输入话题名称', trigger: 'blur' },
          {
            min: 1,
            max: 25,
            message: '长度在 1 到 25 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    document.title = '发表话题 - ' + this.$root.site_info.site_title
  },
  mounted() {
    this.contentEditor = new Vditor('vditor', {
      height: 500,
      placeholder: '此处为话题内容……',
      theme: 'classic',
      counter: {
        enable: true,
        type: 'markdown'
      },
      preview: {
        delay: 0,
        hljs: {
          style: 'monokai',
          lineNumber: true
        }
      },
      tab: '\t',
      typewriterMode: true,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      mode: 'sv',
      upload: {
        // 上传字段名称
        fieldName: 'my-file',
        // 上传 url
        url: 'http://127.0.0.1:10000/upload/file',
        accept: 'image/*'
      }
    })
    this.fetchTagList()
  },
  methods: {
    async fetchTagList() {
      getTagList()
          .then((res) => {
            let { data } = res
            this.tagList = data
          })
          .catch(() => {
            this.$message({
              message: '获取标签列表失败',
              type: 'error'
            })
          })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
              this.contentEditor.getValue().length === 1 ||
              this.contentEditor.getValue() == null ||
              this.contentEditor.getValue() === ''
          ) {
            window.alert('话题内容不可为空')
            return false
          }
          if (this.ruleForm.tags == null) {
            // console.log(this.ruleForm.tags)
            // console.log(this.ruleForm.tags.length)
            window.alert('标签不可以为空')
            return false
          }
          for (let i = 0; i < this.tags.length; i++) {
            this.ruleForm.tags.push({
              'id': this.tags[i]
            })
          }
          this.ruleForm.content = this.contentEditor.getValue()
          this.ruleForm.html = this.contentEditor.getHTML()
          console.log(this.ruleForm)
          addPost(this.ruleForm).then((res) => {
            let { data } = res
            setTimeout(() => {
              this.$router.push({
                name: 'Post',
                params: { id: data.id }
              })
            }, 1000)
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.contentEditor.setValue('')
      this.ruleForm.tags = []
    },
    test() {
      console.log(this.ruleForm.tags)
    }
  }
}
</script>

<style lang="stylus" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>