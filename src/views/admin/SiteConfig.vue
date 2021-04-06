<template>
  <div id="site-config">
    <div class="title">
      <span class="title-text">系&nbsp;统&nbsp;设&nbsp;置</span>
    </div>

    <el-divider></el-divider>

    <el-row :gutter="60">
      <el-col :span="12">
        <div class="sub-title">
          <span class="sub-title-text">网&nbsp;站&nbsp;信&nbsp;息</span>
        </div>

        <el-divider></el-divider>

        <div class="siteFormDiv">
          <el-form ref="siteForm" label-position="left" :model="siteConfig" label-width="60px">
            <el-form-item label="标题">
              <el-input
                  v-model="siteConfig.site_title"
              ></el-input>
            </el-form-item>

            <el-form-item label="Logo">
              <el-input
                  v-model="siteConfig.site_logo"
              ></el-input>
            </el-form-item>

            <el-form-item label="域名">
              <el-input
                  v-model="siteConfig.site_domain"
              ></el-input>
            </el-form-item>

            <el-form-item label="备案">
              <el-input
                  v-model="siteConfig.site_beian"
              ></el-input>
            </el-form-item>

            <el-form-item label="广告">
              <el-input
                  type="textarea"
                  v-model="siteConfig.site_side_ad"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="upSiteConfig">修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="sub-title">
          <span class="sub-title-text">邮&nbsp;箱&nbsp;信&nbsp;息</span>
        </div>

        <el-divider></el-divider>
        <div class="mailFormDiv">
          <el-form ref="mailForm" label-position="left" :model="mailConfig" label-width="60px">
            <el-form-item label="发送">
              <el-input
                  v-model="mailConfig.mail_from"
              ></el-input>
            </el-form-item>

            <el-form-item label="用户">
              <el-input
                  v-model="mailConfig.mail_user"
              ></el-input>
            </el-form-item>

            <el-form-item label="密码">
              <el-input
                  v-model="mailConfig.mail_pass"
              ></el-input>
            </el-form-item>

            <el-form-item label="地址">
              <el-input
                  v-model="mailConfig.mail_host"
              ></el-input>
            </el-form-item>

            <el-form-item label="端口">
              <el-input
                  v-model="mailConfig.mail_port"
              ></el-input>
            </el-form-item>

            <el-form-item label="SSL">
              <el-select v-model="mailConfig.mail_ssl">
                <el-option
                    v-for="item in useSsl"
                    :key="item.key"
                    :label="item.key"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button @click="testMail">测试</el-button>

              <el-button type="primary" @click="upMailConfig">修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getConfig, updateConfig, mailTest } from '@/api/config'

export default {
  name: "SiteConfig",
  data() {
    return {
      siteConfig: {
        site_title: '',
        site_logo: '',
        site_domain: '',
        site_beian: '',
        site_side_ad: ''
      },
      mailConfig: {
        mail_from: '',
        mail_user: '',
        mail_pass: '',
        mail_host: '',
        mail_port: '',
        mail_ssl: ''
      },
      useSsl: [
        {
          key: '使用',
          value: 'yes'
        },
        {
          key: '不使用',
          value: 'no'
        }
      ]
    }
  },
  mounted() {
    this.fetchConfig()
  },
  methods: {
    async fetchConfig() {
      getConfig().then((res) => {
        // console.log(res)
        let { data } = res
        this.siteConfig.site_title = data.site_title
        this.siteConfig.site_logo = data.site_logo
        this.siteConfig.site_domain = data.site_domain
        this.siteConfig.site_beian = data.site_beian
        this.siteConfig.site_side_ad = data.site_side_ad
        this.mailConfig.mail_from = data.mail_from
        this.mailConfig.mail_user = data.mail_user
        this.mailConfig.mail_pass = data.mail_pass
        this.mailConfig.mail_host = data.mail_host
        this.mailConfig.mail_port = data.mail_port
        this.mailConfig.mail_ssl = data.mail_ssl
      })
    },
    upSiteConfig() {
      let body = [
        {
          'item': 'site_title',
          'value': this.siteConfig.site_title
        },
        {
          'item': 'site_logo',
          'value': this.siteConfig.site_logo
        },
        {
          'item': 'site_domain',
          'value': this.siteConfig.site_domain
        },
        {
          'item': 'site_beian',
          'value': this.siteConfig.site_beian
        },
        {
          'item': 'site_side_ad',
          'value': this.siteConfig.site_side_ad
        }
      ]
      updateConfig(body).then(() => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.fetchConfig()
      })
    },
    upMailConfig() {
      // console.log(this.mailConfig)
      let body = [
        {
          'item': 'mail_from',
          'value': this.mailConfig.mail_from
        },
        {
          'item': 'mail_host',
          'value': this.mailConfig.mail_host
        },
        {
          'item': 'mail_pass',
          'value': this.mailConfig.mail_pass
        },
        {
          'item': 'mail_port',
          'value': this.mailConfig.mail_port
        },
        {
          'item': 'mail_ssl',
          'value': this.mailConfig.mail_ssl
        },
        {
          'item': 'mail_user',
          'value': this.mailConfig.mail_user
        }
      ]
      updateConfig(body).then(() => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.fetchConfig()
      })
    },
    testMail() {
      let mailTo = 'hhbilly99@163.com'
      mailTest(mailTo)
          .then(() => {
            this.$message({
              message: '测试成功',
              type: 'success'
            })
          })
          .catch(() => {
            this.$message({
              message: '测试失败',
              type: 'error'
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

.sub-title
  text-align left
  &-text
    font-size 1.25em
</style>