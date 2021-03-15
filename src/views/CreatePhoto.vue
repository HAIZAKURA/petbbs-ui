<template>
  <div class="columns">
    <div class="column is-three-quarters">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>📷<span class="mx-1"></span>发表新照片</span>
        </div>

        <div class="photo-upload">
          <el-card shadow="never">
            <div>
              <el-upload
                  v-show="noPhoto"
                  class="upload-file"
                  drag
                  action=""
                  :before-upload="upload"
                  accept="image/*"
                  v-loading.fullscreen.lock="loading"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传图片文件，且不超过20MB</div>
              </el-upload>
            </div>

            <div style="text-align: center">
              <img style="max-width: 500px" v-show="!noPhoto" :src="createPhotoDTO.photo" />
            </div>
          </el-card>
        </div>

        <div>
          <el-input
              type="textarea"
              :rows="2"
              resize="none"
              placeholder="稍微说点什么吧..."
              v-model="createPhotoDTO.content">
          </el-input>
        </div>

        <div class="photo-button">
          <el-button @click="reset">重置</el-button>

          <el-button type="primary" @click="submit">发表</el-button>
        </div>
      </el-card>
    </div>

    <div class="column is-one-quarter">
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
import { createPhoto } from '@/api/photo'
import { uploadUtil } from '@/api/upload'

export default {
  name: "CreatePhoto",
  data() {
    return {
      createPhotoDTO: {
        photo: '',
        content: ''
      },
      noPhoto: true,
      loading: false
    }
  },
  methods: {
    reset() {
      this.createPhotoDTO.content = ''
      this.createPhotoDTO.photo = ''
      this.noPhoto = true
    },
    submit() {
      if (this.createPhotoDTO.content === '' || this.createPhotoDTO.content == null || this.createPhotoDTO.photo === '' || this.createPhotoDTO.photo == null) {
        this.$message({
          message: '内容不能为空',
          type: 'error'
        })
      } else {
        createPhoto(this.createPhotoDTO)
            .then((res) => {
              let { data } = res
              this.$message({
                message: '发表成功',
                type: 'success'
              })
              this.$router.push({ name: 'Photo', params: { id: data.id } })
            })
      }
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
            this.noPhoto = false
            this.createPhotoDTO.photo = data.url
            this.loading = false
            // console.log(res)
          })
          .catch(() => {
            this.loading = false
            this.$message({
              message: '上传失败',
              type: 'error'
            })
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

.photo-upload
  text-align center

.photo-button
  text-align center
  margin-top 1em
</style>