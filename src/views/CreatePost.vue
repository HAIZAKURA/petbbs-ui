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

      <el-card class="box-card" v-if="sectionList.length > 1">
        <div slot="header">📰<span class="mx-1"></span>话题专栏</div>
        <div>
          <el-select
              v-model="ruleForm.sectionId"
              style="text-overflow: ellipsis;white-space: nowrap;width: 100%"
              filterable
              placeholder="请选择话题专栏">
            <el-option
                v-for="item in sectionList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-card>

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
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
    >
      <div style="text-align: center">
        <img :src="img" width="200px" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doCopy">复 制</el-button>
      </span>
    </el-dialog>

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
import 'vditor/dist/index.css'

import { addPost } from '@/api/post'
import { getTagList } from '@/api/tags'
import { uploadUtil } from '@/api/upload'
import { getUserSectionList } from '@/api/sections'

export default {
  name: "CreatePost",
  data() {
    return {
      dialogVisible: false,
      loading: false,
      img: '',
      md_img: '',
      contentEditor: '',
      tagList: [],
      ruleForm: {
        title: '', // 标题
        tags: [], // 标签
        content: {}, // 内容
        html: {},
        sectionId: 0
      },
      tags: [],
      sectionList: [
        {
          id: 0,
          title: '无'
        }
      ],
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
      },
      photoList: [],
      photoListDialog: false
    }
  },
  created() {
    document.title = '发表话题 - ' + this.$root.site_info.site_title
  },
  mounted() {
    this.contentEditor = new Vditor('vditor', {
      height: 500,
      mode: 'ir',
      placeholder: '此处为话题内容……',
      counter: {
        enable: true,
        type: 'text'
      },
      preview: {
        delay: 0,
        hljs: {
          style: 'monokai'
        }
      },
      toolbarConfig: {
        pin: true
      },
      cache: {
        id: false,
        enable: false
      }
    })
    this.fetchTagList()
    this.fetchSectionList()
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
    async fetchSectionList() {
      getUserSectionList().then((res) => {
        // console.log(res.data)
        // this.sectionList = res.data
        for (let index in res.data) {
          this.sectionList.push(res.data[index])
        }
        // console.log(this.sectionList)
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
          if ((typeof this.ruleForm.sectionId != 'number') || isNaN(this.ruleForm.sectionId)) {
            this.ruleForm.sectionId = 0
          }
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
            // this.img = data.url
            // this.md_img = '![](' + data.url + '?imageView2/0/format/webp/q/80)'
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
            this.photoListDialog = true
            // this.dialogVisible = true
            // console.log(this.photoList)
            // console.log(res)
          })
          .catch(() => {
            this.$message({
              message: '上传失败',
              type: 'error'
            })
            this.loading = false
          })
    },
    doCopy() {
      this.$copyText(this.md_img).then(() => {
        // console.log('y')
        this.md_img = ''
        this.img = ''
      }, () => {
        // console.log('n')
        this.md_img = ''
        this.img = ''
      })
      this.dialogVisible = false
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