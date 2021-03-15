<template>
  <div>
    <el-card>
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane label="未读通知" name="new">
          <el-card shadow="never" v-for="(item, key) in newNotifyList" :key="key">
            <router-link v-if="item.remark != null || item.remark !== ''" :to="{ path: item.remark }">
              <span>{{ item.content }}</span>
            </router-link>
            <router-link v-else>
              <span>{{ item.content }}</span>
            </router-link>
          </el-card>

          <div style="text-align: center">
            <el-button type="primary" @click="readAll">已读全部</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="所有通知" name="all">
          <el-card shadow="never" v-for="(item, key) in allNotifyList" :key="key">
            <router-link v-if="item.remark != null || item.remark !== ''" :to="{ path: item.remark }">
              <span>{{ item.content }}</span>
            </router-link>
            <router-link v-else>
              <span>{{ item.content }}</span>
            </router-link>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getNewNotify, getAllNotify, setReadNotify } from '@/api/notify'

export default {
  name: "Notify",
  data() {
    return {
      activeTab: 'new',
      newNotifyList: [],
      allNotifyList: []
    }
  },
  created() {
    this.fetchNewNotifyList()
    document.title = '通知中心 - ' + this.$root.site_info.site_title
  },
  methods: {
    fetchNewNotifyList() {
      getNewNotify().then((res) => {
        let { data } = res
        this.newNotifyList = data
      })
    },
    fetchAllNotifyList() {
      getAllNotify().then((res) => {
        let { data } = res
        this.allNotifyList = data
      })
    },
    handleClick(tab) {
      if (tab.name === 'all') {
        this.fetchAllNotifyList()
      } else {
        this.fetchNewNotifyList()
      }
    },
    readAll() {
      for (let i = 0; i < this.newNotifyList.length; i++) {
        setReadNotify(this.newNotifyList[i].id).then(() => {
          this.fetchNewNotifyList()
        })
      }
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>

</style>