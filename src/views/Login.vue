<template>
  <div id="login" class="columns py-6">
    <div class="column is-half is-offset-one-quarter">
      <el-card class="content">
        <div slot="header" class="has-text-centered card-title">
          <span>用户登录</span>
        </div>
        <div>
          <el-form
              v-loading="loading"
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
          >
            <el-form-item label="账号" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                  type="password"
                  v-model="ruleForm.password"
                  autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="记住" prop="delivery">
              <el-switch v-model="ruleForm.rememberMe"></el-switch>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      redirect: undefined,
      loading: false,
      ruleForm: {
        username: '',
        password: '',
        rememberMe: false
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '用户名长度应为3-15',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: '密码长度应为6-20',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    document.title = '登录'
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('user/login', this.ruleForm)
              .then(() => {
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  duration: 2000
                })
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: this.redirect || '/' })
                }, 0.1 * 1000)
              })
              .catch(() => {
                this.loading = false;
              })
        } else {
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="stylus" scoped>
.card-title
  height 36px
  span
    line-height 36px
    font-size 24px
</style>