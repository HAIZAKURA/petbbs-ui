<template>
  <div id="reactive" class="columns py-6">
    <div class="column is-half is-offset-one-quarter">
      <el-card class="content">
        <div slot="header" class="has-text-centered card-title">
          <span>激活账号</span>
        </div>
        <div>
          <el-form
              v-loading="loading"
              :model="form"
              status-icon
              ref="from"
              label-width="100px"
          >
            <el-form-item label="账号" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm()">提交</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { reActiveUser } from '@/api/user'

export default {
  name: "ReActive",
  data() {
    return {
      form: {
        name: '',
        email: ''
      },
      loading: false
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm() {
      this.loading = true
      reActiveUser(this.form.name, this.form.email)
          .then(() => {
            this.$message({
              message: '激活链接已发送至您的邮箱中',
              type: 'success'
            })
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
    }
  }
}
</script>

<style scoped>

</style>