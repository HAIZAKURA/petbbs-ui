<template>
  <div id="login" class="columns">
    <div class="column is-half is-offset-one-quarter">
      <el-card>
        <el-tabs v-model="activeTab" :stretch="true" @tab-click="handleClick">
          <el-tab-pane label="💾 个人资料" name="profile">
            <el-form
                :model="userInfo"
                ref="userInfo"
                label-width="60px"
            >
              <el-form-item label="账号" prop="username">
                <el-input v-model="userInfo.username" :disabled="true"></el-input>
              </el-form-item>

              <el-form-item label="昵称" prop="alias">
                <el-input v-model="userInfo.alias"></el-input>
              </el-form-item>

              <el-form-item label="邮箱" prop="email">
                <el-input v-model="userInfo.email" type="email">
                  <template slot="append" v-if="!userInfo.active">
                    <el-button @click="gotoActive">去激活</el-button>
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item label="手机" prop="mobile">
                <el-input v-model="userInfo.mobile" type="tel"></el-input>
              </el-form-item>

              <el-form-item label="简介" prop="bio">
                <el-input v-model="userInfo.bio" type="textarea" :rows="2"></el-input>
              </el-form-item>
            </el-form>

            <div style="text-align: center">
              <el-button type="primary" @click="handleUpdateUser">立即修改</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="👤 修改头像" name="avatar">
            <el-card shadow="never">
              <div style="text-align: center">
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
                  <div class="el-upload__tip" slot="tip">请尽量上传1:1正方形图片，否则将进行自动裁切<br />只能上传图片文件，且不超过20MB</div>
                </el-upload>
              </div>

              <div style="text-align: center">
                <img style="max-width: 200px" v-show="!noPhoto" :src="userInfo.avatar" />
              </div>
            </el-card>

            <div style="text-align: center">
              <el-button type="primary" @click="handleUpdateUser">立即修改</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="🔑 修改密码" name="password">
            <el-form
                :model="passForm"
                ref="passForm"
                label-width="60px"
            >
              <el-form-item label="旧密码" prop="old">
                <el-input v-model="passForm.old" type="password"></el-input>
              </el-form-item>

              <el-form-item label="新密码" prop="new">
                <el-input v-model="passForm.new" type="password"></el-input>
              </el-form-item>
            </el-form>

            <div style="text-align: center">
              <el-button type="primary" @click="handleUpdatePass">立即修改</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserInfo, updatePass, updateUser } from '@/api/user'
import { uploadUtil } from '@/api/upload'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Profile",
  data() {
    return {
      activeTab: 'profile',
      passForm: {
        old: '',
        new: ''
      },
      userInfo: {},
      noPhoto: true,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.fetchUser()
  },
  methods: {
    handleClick() {
      // console.log(tab.name)
      this.fetchUser()
    },
    handleUpdatePass() {
      updatePass(this.passForm.old, this.passForm.new).then(() => {
        this.userLogout().then(() => {
          this.$router.push({ name: 'Login' })
        })
      })
    },
    fetchUser() {
      getUserInfo().then((res) => {
        let { data } = res
        // console.log(data.user)
        this.userInfo = data.user
      })
    },
    handleUpdateUser() {
      updateUser(this.userInfo).then(() => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$router.push({ name: 'My' })
      })
    },
    gotoActive() {
      this.$router.push({ name: 'ReActive' })
    },
    upload(file) {
      this.loading = true
      let fd = new FormData()
      fd.append('file', file)
      fd.append('type', 'avatar')
      uploadUtil(fd)
          .then((res) => {
            let { data } = res
            this.noPhoto = false
            this.userInfo.avatar = data.url
            this.loading = false
          })
          .catch(() => {
            this.loading = false
            this.$message({
              message: '上传失败',
              type: 'error'
            })
          })
    },
    ...mapActions({
      userLogout: 'user/logout'
    })
  }
}
</script>

<style scoped>

</style>