<template>
  <div id="qiniu-config">
    <div class="title">
      <span class="title-text">七&nbsp;牛&nbsp;云&nbsp;设&nbsp;置</span>
    </div>

    <el-divider></el-divider>

    <div class="qiniuFormDiv">
      <el-form ref="qiniuForm" label-position="left" :model="qiniuConfig" label-width="100px">
        <el-form-item label="Access Key">
          <el-input v-model="qiniuConfig.accesskey"></el-input>
        </el-form-item>

        <el-form-item label="Secret Key">
          <el-input v-model="qiniuConfig.secretkey"></el-input>
        </el-form-item>

        <el-form-item label="Bucket">
          <el-input v-model="qiniuConfig.bucket"></el-input>
        </el-form-item>

        <el-form-item label="Domain">
          <el-input v-model="qiniuConfig.host"></el-input>
        </el-form-item>

        <el-form-item label="SSL">
          <el-checkbox v-model="qiniuConfig.usessl"></el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="upQiniuConfig">修改</el-button>

          <span class="mx-4"></span>
          <a href="https://portal.qiniu.com/user/key" target="_blank">
            <span>如何申请？</span>
          </a>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getQiniuConfig, updateQiniuConfig } from '@/api/config'

export default {
  name: "QiniuConfig",
  data() {
    return {
      qiniuConfig: {
        accesskey: '',
        secretkey: '',
        bucket: '',
        host: '',
        usessl: false
      }
    }
  },
  created() {
    this.fetchQiniuConfig()
  },
  methods: {
    async fetchQiniuConfig() {
      getQiniuConfig().then((res) => {
        let { data } = res
        this.qiniuConfig.accesskey = data.accesskey
        this.qiniuConfig.secretkey = data.secretkey
        this.qiniuConfig.bucket = data.bucket
        this.qiniuConfig.host = data.host
        this.qiniuConfig.usessl = data.usessl
      })
    },
    upQiniuConfig() {
      updateQiniuConfig(this.qiniuConfig).then(() => {
        this.$notify({
          position: 'bottom-right',
          title: '配置修改成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  text-align left
  &-text
    font-size 1em
  &-btn
    height 1em
    line-height 1em
    float right
</style>