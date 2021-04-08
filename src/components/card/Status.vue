<template>
  <el-card class="box-card">
    <div slot="header">
      <span>⚙️ 社区状况</span>
    </div>

    <div>
      <el-row :gutter="20">
        <el-col :span="7" :offset="1" style="text-align: right; color: #606266">
          <p>用&nbsp;户</p>
          <p>话&nbsp;题</p>
          <p>评&nbsp;论</p>
          <p>照&nbsp;片</p>
        </el-col>

        <el-col :span="16" style="text-align: left; font-weight: bold">
          <p>{{ summary.userCount }}</p>
          <p>{{ summary.postCount }}</p>
          <p>{{ summary.commentCount }}</p>
          <p>{{ summary.photoCount }}</p>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { getSummary } from '@/api/config'

export default {
  name: "Status",
  data() {
    return {
      summary: {}
    }
  },
  mounted() {
    this.fetchSummary()
  },
  methods: {
    async fetchSummary() {
      getSummary().then((res) => {
        this.summary = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>