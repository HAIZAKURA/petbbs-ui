<template>
  <div id="billboard">
    <div class="title">
      <span class="title-text">公&nbsp;告</span>
      <div class="title-btn">
        <el-tooltip class="item" effect="dark" content="添加" placement="left">
          <el-button type="success" icon="el-icon-plus" circle @click="handleAdd"></el-button>
        </el-tooltip>
      </div>
    </div>

    <el-divider></el-divider>

    <el-table
        :data="billboardList"
        :max-height="tableHeight"
        :default-sort = "{ prop: 'id', order: 'descending' }"
        v-loading="tableLoading"
        style="width: 100%"
    >
      <el-table-column
          prop="id"
          label="ID"
          min-width="10"
          sortable
      ></el-table-column>

      <el-table-column
          prop="content"
          label="内容"
      ></el-table-column>

      <el-table-column
          prop="createTime"
          label="发布时间"
          min-width="25"
          sortable
      ></el-table-column>

      <el-table-column
          prop="state"
          label="启用"
          min-width="12"
          sortable
      >
        <template slot-scope="scope">
          <p v-if="scope.row.state">✔️</p>
        </template>
      </el-table-column>

      <el-table-column
          min-width="12"
          align="right"
      >
        <template slot-scope="scope">
          <el-button
              v-if="!scope.row.state"
              size="mini"
              type="primary"
              @click="handleChange(scope.row)"
          >启用</el-button>

          <el-button
              v-else
              size="mini"
              type="danger"
              @click="handleChange(scope.row)"
          >停用</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { getAllBillboard, updateBillboard, addBillboard } from '@/api/billboard'

export default {
  name: "Billboard",
  data() {
    return {
      billboardList: [],
      tableHeight: window.innerHeight * 0.75,
      tableLoading: false
    }
  },
  mounted() {
    this.fetchBillboardList()
  },
  methods: {
    async fetchBillboardList() {
      this.tableLoading = true
      getAllBillboard().then((res) => {
        this.billboardList = res.data
        this.tableLoading = false
      })
    },
    handleChange(row) {
      let body = {
        'id': row.id,
        'content': row.content,
        'createTime': row.createTime,
        'state': !row.state
      }
      updateBillboard(body).then(() => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.fetchBillboardList()
      })
    },
    handleAdd() {
      let content = window.prompt('请输入新公告内容：')
      if (content != null && content !== '') {
        let body = {
          'content': content
        }
        addBillboard(body).then(() => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.fetchBillboardList()
        })
      } else {
        window.alert('输入不能为空')
      }
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