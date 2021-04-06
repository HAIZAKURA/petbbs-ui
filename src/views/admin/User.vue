<template>
  <div id="user">
    <div class="title">
      <span class="title-text">用&nbsp;户&nbsp;管&nbsp;理</span>
    </div>

    <el-divider></el-divider>

    <div class="user">
      <el-table
          :data="filterData"
          :max-height="userListHeight"
          v-loading="userLoading"
          style="width: 100%"
      >
        <el-table-column
            prop="id"
            label="ID"
            min-width="55"
            sortable
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'User', params: { id: scope.row.id } }">{{ scope.row.id }}</router-link>
          </template>
        </el-table-column>

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
            min-width="45"
        ></el-table-column>

        <el-table-column
            prop="roleId"
            label="用户组"
            min-width="30"
            sortable
            :formatter="roleFormat"
        ></el-table-column>

        <el-table-column
            prop="active"
            label="激活"
            min-width="20"
            sortable
        >
          <template slot-scope="scope">
            <p v-if="scope.row.active">✔️</p>
            <p v-else>❌</p>
          </template>
        </el-table-column>

        <el-table-column
            prop="status"
            label="状态"
            min-width="20"
            sortable
        >
          <template slot-scope="scope">
            <p v-if="scope.row.status">✔️</p>
            <p v-else>❌</p>
          </template>
        </el-table-column>

        <el-table-column
            prop="createTime"
            label="注册时间"
            min-width="45"
            sortable
        ></el-table-column>

        <el-table-column min-width="30">
          {{/* eslint-disable-next-line vue/no-unused-vars */}}
          <template slot="header" slot-scope="scope">
            <el-input
                v-model="search"
                size="mini"
                placeholder="搜索"/>
          </template>

          <template slot-scope="scope">
            <el-button-group v-if="scope.row.roleId >= user.roleId">
              <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="handleEditOpen(scope.row)"
              ></el-button>

              <el-button
                  v-if="!(scope.row.id === user.id) && (scope.row.status)"
                  size="mini"
                  type="danger"
                  icon="el-icon-close"
                  @click="handleBanUser(scope.row)"
              ></el-button>

              <el-button
                  v-if="!scope.row.status"
                  size="mini"
                  type="success"
                  icon="el-icon-refresh-right"
                  @click="handleRecoverUser(scope.row)"
              ></el-button>
            </el-button-group>
          </template>
        </el-table-column>
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

    <!-- Edit Dialog -->
    <el-dialog
        title="修 改 用 户"
        :visible.sync="editDialogVisible"
        width="40%"
        top="5vh"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :destroy-on-close="true"
        center
    >
      <div class="editFormDiv">
        <el-form ref="editForm" label-position="left" :model="userInfo" label-width="80px">
          <el-form-item label="头像" style="display: inline">
            <img
                :src="userInfo.avatar + '?imageView2/1/w/100/h/100/format/webp/q/80'"
                :alt="userInfo.username"
                style="height: 100px"
            />
          </el-form-item>

          <el-form-item label="ID">
            <el-input
                v-model="userInfo.id"
                disabled
            ></el-input>
          </el-form-item>

          <el-form-item label="用户名">
            <el-input
                maxlength="15"
                v-model="userInfo.username"
                show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="昵称">
            <el-input
                maxlength="20"
                v-model="userInfo.alias"
                show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="邮箱">
            <el-input
                maxlength="60"
                v-model="userInfo.email"
                show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input
                maxlength="11"
                v-model="userInfo.mobile"
                show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="个人简介">
            <el-input
                type="textarea"
                maxlength="255"
                v-model="userInfo.bio"
                show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="用户组">
            <el-select v-model="userInfo.roleId" placeholder="请选择">
              <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.remark"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer">
        <el-button @click="handleEditClose">取消</el-button>
        <el-button type="primary" @click="resetAvatar">重置头像</el-button>
        <el-button type="primary" @click="editUser">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUsersByAdmin, updateUserByAdmin } from '@/api/user'
import Pagination from '@/components/layout/Pagination'
import { mapGetters } from 'vuex'

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
      search: '',
      editDialogVisible: false,
      userInfo: {
        id: '',
        username: '',
        alias: '',
        avatar: '',
        email: '',
        mobile: '',
        bio: '',
        active: '',
        status: '',
        roleId: ''
      },
      roleList: [
        {
          id: 1,
          remark: '超级管理员'
        },
        {
          id: 2,
          remark: '管理员'
        },
        {
          id: 10000,
          remark: '用户'
        }
      ]
    }
  },
  mounted() {
    this.fetchUserList()
  },
  computed: {
    filterData: function () {
      let input = this.search && this.search.toLowerCase()
      let items = this.userList
      let matchItem
      if (input) {
        matchItem = items.filter(function (item) {
          return Object.keys(item).some(function (key) {
            return String(item[key]).toLowerCase().match(input)
          })
        })
      } else {
        matchItem = items
      }
      return matchItem
    },
    ...mapGetters(['token', 'user'])
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
    roleFormat: function (row, column) {
      let data = row[column.property]
      if (data === undefined) {
        return ''
      }
      if (data === 1) {
        return '超级管理员'
      }
      if (data === 2) {
        return '管理员'
      }
      if (data === 10000) {
        return '用户'
      }
    },
    handleEditOpen(row) {
      this.editDialogVisible = true
      // console.log(row)
      this.userInfo.id = row.id
      this.userInfo.username = row.username
      this.userInfo.alias = row.alias
      this.userInfo.avatar = row.avatar
      this.userInfo.email = row.email
      this.userInfo.mobile = row.mobile
      this.userInfo.bio = row.bio
      this.userInfo.active = row.active
      this.userInfo.status = row.status
      this.userInfo.roleId = row.roleId
    },
    handleEditClose() {
      this.userInfo.id = ''
      this.userInfo.username = ''
      this.userInfo.alias = ''
      this.userInfo.avatar = ''
      this.userInfo.email = ''
      this.userInfo.mobile = ''
      this.userInfo.bio = ''
      this.userInfo.active = ''
      this.userInfo.status = ''
      this.userInfo.roleId = ''
      this.editDialogVisible = false
    },
    editUser() {
      updateUserByAdmin(this.userInfo).then(() => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.handleEditClose()
        this.fetchUserList()
      })
    },
    resetAvatar() {
      this.userInfo.avatar = 'http://demo.nya.run/DfHNo4.jpg'
    },
    handleBanUser(row) {
      // console.log(row)
      row.status = false
      updateUserByAdmin(row).then(() => {
        this.$message({
          message: '封禁成功',
          type: 'success'
        })
        this.fetchUserList()
      })
    },
    handleRecoverUser(row) {
      row.status = true
      updateUserByAdmin(row).then(() => {
        this.$message({
          message: '解封成功',
          type: 'success'
        })
        this.fetchUserList()
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

.pagination-div
  height 40px
  padding-top 8px
  p
    text-align center
</style>