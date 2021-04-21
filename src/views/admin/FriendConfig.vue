<template>
  <div id="friend">
    <div class="title">
      <span class="title-text">友&nbsp;情&nbsp;链&nbsp;接</span>
      <div class="title-btn">
        <el-tooltip class="item" effect="dark" content="添加" placement="left">
          <el-button type="success" icon="el-icon-plus" circle @click="handleAddOpen"></el-button>
        </el-tooltip>
      </div>
    </div>

    <el-divider></el-divider>

    <div>
      <el-table
          :data="friendList"
          :max-height="tableHeight"
          :default-sort = "{ prop: 'id', order: 'ascending' }"
          style="width: 100%"
      >
        <el-table-column
            prop="id"
            label="ID"
            min-width="6"
            sortable
        ></el-table-column>

        <el-table-column
            prop="icon"
            label="图标"
            min-width="10"
            align="center"
        >
          <template slot-scope="scope">
            <img style="height: 32px" :src="scope.row.icon" />
          </template>
        </el-table-column>

        <el-table-column
            prop="title"
            label="名称"
            min-width="10"
            align="center"
        ></el-table-column>

        <el-table-column
            prop="link"
            label="链接"
            min-width="30"
            align="center"
        ></el-table-column>

        <el-table-column
            prop="state"
            label="状态"
            min-width="6"
            align="center"
        >
          <template slot-scope="scope">
            <el-tag
                v-if="scope.row.state"
                type="success"
                effect="dark"
                size="small"
            >启用</el-tag>

            <el-tag
                v-else
                type="danger"
                effect="dark"
                size="small"
            >停用</el-tag>
          </template>
        </el-table-column>

        <el-table-column min-width="8">
          <template slot-scope="scope">
            <el-button
                size="mini"
                icon="el-icon-edit"
                @click="handleEditOpen(scope.row)"
            ></el-button>

            <el-button
                v-if="!scope.row.state"
                size="mini"
                type="success"
                icon="el-icon-check"
                @click="handleChange(scope.row)"
            ></el-button>

            <el-button
                v-else
                type="danger"
                size="mini"
                icon="el-icon-close"
                @click="handleChange(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
        title="修 改"
        :visible.sync="editDialogVisible"
        width="40%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :destroy-on-close="true"
        center
    >
      <div class="editFormDiv">
        <el-form ref="editForm" label-position="left" :model="editForm" label-width="80px">
          <el-form-item label="图标" style="display: inline">
            <img :src="editForm.icon" style="height: 64px"/>
          </el-form-item>

          <el-form-item label="名称">
            <el-input
                v-model="editForm.title"
            ></el-input>
          </el-form-item>

          <el-form-item label="链接">
            <el-input
                v-model="editForm.link"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer">
        <el-upload style="display: inline-block" action="" accept="image/*" :before-upload="uploadEdit">
          <el-button>上传图标</el-button>
        </el-upload>

        <span class="mx-2"></span>

        <el-button style="display: inline-block" @click="handleEditClose">取消</el-button>
        <el-button style="display: inline-block" type="primary" @click="handleEdit">修改</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="添 加"
        :visible.sync="addDialogVisible"
        width="40%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :destroy-on-close="true"
        center
    >
      <div class="editFormDiv">
        <el-form ref="editForm" label-position="left" :model="addForm" label-width="80px">
          <el-form-item label="图标" style="display: inline">
            <img v-if="addForm.icon" :src="addForm.icon" style="height: 64px" />

            <p v-else>请上传图标</p>
          </el-form-item>

          <el-form-item label="名称">
            <el-input
                v-model="addForm.title"
            ></el-input>
          </el-form-item>

          <el-form-item label="链接">
            <el-input
                v-model="addForm.link"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer">
        <el-upload style="display: inline-block" action="" accept="image/*" :before-upload="uploadAdd">
          <el-button>上传图标</el-button>
        </el-upload>

        <span class="mx-2"></span>

        <el-button style="display: inline-block" @click="handleAddClose">取消</el-button>
        <el-button style="display: inline-block" type="primary" @click="handleAdd">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllFriends, updateFriend, addFriend } from '@/api/friends'
import { uploadUtil } from '@/api/upload'

export default {
  name: "Friend",
  data() {
    return {
      friendList: [],
      tableHeight: window.innerHeight * 0.75,
      addDialogVisible: false,
      editDialogVisible: false,
      editForm: {
        id: '',
        title: '',
        link: '',
        icon: ''
      },
      addForm: {
        title: '',
        link: '',
        icon: ''
      }
    }
  },
  created() {
    this.fetchFriendList()
  },
  methods: {
    async fetchFriendList() {
      getAllFriends().then((res) => {
        console.log(res.data)
        this.friendList = res.data
      })
    },
    handleChange(row) {
      let body = {
        'id': row.id,
        'state': !row.state
      }
      updateFriend(body)
          .then(() => {
            this.$notify({
              position: 'bottom-right',
              title: '友情链接状态修改成功',
              type: 'success'
            })
            this.fetchFriendList()
          })
          .catch(() => {
            this.$notify({
              position: 'bottom-right',
              title: '友情链接状态修改失败',
              type: 'error'
            })
            this.fetchFriendList()
          })
    },
    handleEditOpen(row) {
      this.editForm.id = row.id
      this.editForm.title = row.title
      this.editForm.link = row.link
      this.editForm.icon = row.icon
      this.editDialogVisible = true
    },
    handleEditClose() {
      this.editForm.id = ''
      this.editForm.title = ''
      this.editForm.link = ''
      this.editForm.icon = ''
      this.editDialogVisible = false
    },
    handleEdit() {
      updateFriend(this.editForm)
          .then(() => {
            this.$notify({
              position: 'bottom-right',
              title: '友情链接信息修改成功',
              type: 'success'
            })
            this.handleEditClose()
            this.fetchFriendList()
          })
          .catch(() => {
            this.$notify({
              position: 'bottom-right',
              title: '友情链接信息修改失败',
              type: 'error'
            })
            this.handleEditClose()
            this.fetchFriendList()
          })
    },
    handleAddOpen() {
      this.addForm.icon = ''
      this.addForm.title = ''
      this.addForm.link = ''
      this.addDialogVisible = true
    },
    handleAddClose() {
      this.addForm.icon = ''
      this.addForm.title = ''
      this.addForm.link = ''
      this.addDialogVisible = false
    },
    handleAdd() {
      addFriend(this.addForm)
          .then(() => {
            this.$notify({
              position: 'bottom-right',
              title: '友情链接添加成功',
              type: 'success'
            })
            this.handleAddClose()
            this.fetchFriendList()
          })
          .catch(() => {
            this.$notify({
              position: 'bottom-right',
              title: '友情链接添加失败',
              type: 'error'
            })
            this.handleAddClose()
            this.fetchFriendList()
          })
    },
    uploadAdd(file) {
      this.$message({
        message: '上传中...',
        type: 'info',
        duration: 1000
      })
      let fd = new FormData()
      fd.append('file', file)
      fd.append('type', 'image')
      uploadUtil(fd)
          .then((res) => {
            let { data } = res
            this.$notify({
              position: 'bottom-right',
              title: '文件上传成功',
              type: 'success'
            })
            this.addForm.icon = data.url
          })
          .catch(() => {
            this.$notify({
              position: 'bottom-right',
              title: '文件上传失败',
              type: 'error'
            })
          })
    },
    uploadEdit(file) {
      this.$message({
        message: '上传中...',
        type: 'info',
        duration: 1000
      })
      let fd = new FormData()
      fd.append('file', file)
      fd.append('type', 'image')
      uploadUtil(fd)
          .then((res) => {
            let { data } = res
            this.$notify({
              position: 'bottom-right',
              title: '文件上传成功',
              type: 'success'
            })
            this.editForm.icon = data.url
          })
          .catch(() => {
            this.$notify({
              position: 'bottom-right',
              title: '文件上传失败',
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
</style>