<template>
  <div id="register" class="columns py-6">
    <div class="column is-half is-offset-one-quarter">
      <el-card shadow="never" class="content">
        <div slot="header" class="has-text-centered card-title">
          <span>新用户入驻</span>
        </div>
        <div>
          <el-form
              ref="ruleForm"
              v-loading="loading"
              :model="ruleForm"
              status-icon
              :rules="rules"
              label-width="90px"
              class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入账号" />
            </el-form-item>

            <el-form-item label="密码" prop="pass">
              <el-input
                  v-model="ruleForm.pass"
                  type="password"
                  autocomplete="off"
                  placeholder="请输入密码"
              />
            </el-form-item>

            <el-form-item label="确认" prop="checkPass">
              <el-input
                  v-model="ruleForm.checkPass"
                  type="password"
                  autocomplete="off"
                  placeholder="请再次输入密码"
              />
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" autocomplete="off" placeholder="请输入邮箱" />
            </el-form-item>

            <el-form-item label="验证" prop="verify">
              <Verify @success="successVerify" @error="errorVerify" :type="3" :show-button="false"></Verify>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { userRegister } from '@/api/auth/auth'
import Verify from 'vue2-verify'

export default {
  name: "Register",
  components: {
    Verify
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码！'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致！'));
      } else {
        callback();
      }
    }
    return {
      redirect: this.$route.query.to,
      verify: false,
      loading: false,
      ruleForm: {
        name: '',
        pass: '',
        checkPass: '',
        email: ''
      },
      rules: {
        name: [
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
        pass: [
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
        ],
        checkPass: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          },
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  created() {
    document.title = '新用户入驻 - ' + this.$root.site_info.site_title
  },
  methods: {
    submitForm(formName) {
      if (this.verify) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            userRegister(this.ruleForm)
                .then((value) => {
                  const { code, message } = value;
                  if (code === 200) {
                    this.$message({
                      message: '账号注册成功，请在30分钟内前往邮箱激活账号',
                      type: 'success'
                    })
                    setTimeout(() => {
                      this.loading = false;
                      this.$router.push({path: this.redirect || '/login'})
                    })
                  } else {
                    this.$message.error(message)
                  }
                })
                .catch(() => {
                  this.loading = false
                })
          } else {
            return false;
          }
        })
      } else {
        window.alert("请完成验证")
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    successVerify() {
      this.verify = true
    },
    errorVerify() {
      this.verify = false
      window.alert("验证失败")
    }
  }
}
</script>

<style lang='stylus' scoped>
.card-title
  height 36px
  span
    line-height 36px
    font-size 24px

</style>