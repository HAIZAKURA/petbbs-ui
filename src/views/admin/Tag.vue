<template>
  <div id="tag">
    <div class="title">
      <span class="title-text">标&nbsp;签</span>
      <div class="title-btn">
        <el-tooltip class="item" effect="dark" content="添加" placement="left">
          <el-button type="success" icon="el-icon-plus" circle @click="handleAdd"></el-button>
        </el-tooltip>
      </div>
    </div>

    <el-divider></el-divider>

    <div>
      <el-table
          :data="tagList"
          :max-height="tableHeight"
          :default-sort = "{ prop: 'id', order: 'ascending' }"
          v-loading="tableLoading"
          style="width: 100%"
      >
        <el-table-column
            prop="id"
            label="ID"
            min-width="25"
            sortable
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'TagPostList', params: { id: scope.row.id }, query: { name: scope.row.name }}">{{ scope.row.id }}</router-link>
          </template>
        </el-table-column>

        <el-table-column
            prop="name"
            label="标签名"
            sortable
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'TagPostList', params: { id: scope.row.id }, query: { name: scope.row.name }}">{{ scope.row.name }}</router-link>
          </template>
        </el-table-column>

        <el-table-column
            prop="postCount"
            label="话题数"
            min-width="15"
            sortable
        ></el-table-column>

        <el-table-column
            min-width="15"
        >
          <template slot-scope="scope">
            <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
            ></el-button>

            <el-button
                v-if="scope.row.postCount === 0"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="handleDelete(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import { getTagList, editTagByAdmin, deleteTagByAdmin, addTagByAdmin } from '@/api/tags'

export default {
  name: "Tag",
  data() {
    return {
      tagList: [],
      tableHeight: window.innerHeight * 0.75,
      tableLoading: false
    }
  },
  mounted() {
    this.fetchTagList()
  },
  methods: {
    async fetchTagList() {
      this.tableLoading = true
      getTagList().then((res) => {
        let { data } = res
        this.tagList = data
        this.tableLoading = false
      })
    },
    handleEdit(row) {
      let name = window.prompt('请输入新标签名：')
      if (name != null && name !== '') {
        let body = {
          'id': row.id,
          'name': name,
          'postCount': row.postCount
        }
        editTagByAdmin(body).then(() => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.fetchTagList()
        })
      } else {
        window.alert('标签名不能为空！')
      }
    },
    handleDelete(id) {
      if (window.confirm('确认删除该标签吗？')) {
        deleteTagByAdmin(id).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.fetchTagList()
        })
      }
    },
    handleAdd() {
      let input = window.prompt("请输入新加标签名\n多个标签名之前请使用','隔开")
      if (input != null && input !== '') {
        let tagList = input.split(',')
        addTagByAdmin(tagList).then(() => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.fetchTagList()
        })
      } else {
        window.alert('输入不能为空！')
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
</style>