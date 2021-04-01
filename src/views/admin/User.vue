<template>
  <div id="user">
    <div class="title">
      <span class="title-text">用&nbsp;户</span>
    </div>

    <el-divider></el-divider>

    <div class="user">
      <el-table
          :data="userList"
          :max-height="userListHeight"
          v-loading="userLoading"
          style="width: 100%"
      >
<!--        <el-table-column-->
<!--            prop="id"-->
<!--            label="ID"-->
<!--            min-width="30"-->
<!--            sortable-->
<!--        ></el-table-column>-->

        <el-table-column
            prop="username"
            label="用户名"
            min-width="30"
        ></el-table-column>

        <el-table-column
            prop="alias"
            label="昵称"
            min-width="30"
        ></el-table-column>

        <el-table-column
            prop="email"
            label="邮箱"
            min-width="60"
        ></el-table-column>

        <el-table-column
            prop="mobile"
            label="手机"
            min-width="40"
        ></el-table-column>

        <el-table-column
            prop="createTime"
            label="注册时间"
            min-width="60"
            sortable
        ></el-table-column>

        <el-table-column
            prop="roleId"
            label="用户组"
            min-width="20"
            sortable
        ></el-table-column>

        <el-table-column
            prop="active"
            label="激活"
            min-width="20"
            sortable
            :formatter="activeFormat"
        ></el-table-column>

        <el-table-column
            prop="status"
            label="状态"
            min-width="20"
            sortable
            :formatter="statusFormat"
        ></el-table-column>
      </el-table>
    </div>

    <div class="pagination-div">
      <p>
        <Pagination
            v-show="page.total > 0"
            :total="page.total"
            :page.sync="page.current"
            :limit.sync="page.size"
            @pagination="fetchUserList"
        ></Pagination>
      </p>
    </div>
  </div>
</template>

<script>
import { getUsersByAdmin } from '@/api/user'
import Pagination from '@/components/layout/Pagination'

export default {
  name: "User",
  components: {
    Pagination
  },
  data() {
    return {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      userList: [],
      userLoading: false,
      userListHeight: window.innerHeight * 0.75,
    }
  },
  mounted() {
    this.fetchUserList()
  },
  methods: {
    async fetchUserList() {
      this.userLoading = true
      getUsersByAdmin(this.page.current, this.page.size).then((res) => {
        let { data } = res
        this.page.current = data.current
        this.page.size = data.size
        this.page.total = data.total
        this.userList = data.records
        this.userLoading = false
      })
    },
    statusFormat: function (row, column) {
      let data = row[column.property]
      if (data === undefined) {
        return ""
      }
      return data === true ? "正常" : "删除/封禁"
    },
    activeFormat: function (row, column) {
      let data = row[column.property]
      if (data === undefined) {
        return ""
      }
      return data === true ? "已激活" : "未激活"
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

.pagination-div
  height 40px
  padding-top 8px
  p
    text-align center
</style>