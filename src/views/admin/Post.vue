<template>
  <div id="post">
    <div class="title">
      <span class="title-text">话&nbsp;题</span>
    </div>

    <el-divider></el-divider>

    <div class="post">
      <el-table
          :data="filterData"
          :max-height="postListHeight"
          v-loading="postLoading"
          style="width: 100%"
      >
        <el-table-column
            prop="id"
            label="ID"
            min-width="50"
            sortable
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'Post', params: { id: scope.row.id } }">{{ scope.row.id }}</router-link>
          </template>
        </el-table-column>

        <el-table-column
            prop="title"
            label="标题"
            min-width="80"
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'Post', params: { id: scope.row.id } }">{{ scope.row.title }}</router-link>
          </template>
        </el-table-column>

        <el-table-column
            prop="username"
            label="用户"
            min-width="20"
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'User', params: { id: scope.row.userId } }">{{ scope.row.username }}</router-link>
          </template>
        </el-table-column>

        <el-table-column
            prop="createTime"
            label="发布时间"
            min-width="45"
            sortable
        ></el-table-column>

        <el-table-column
            prop="top"
            label="置顶"
            min-width="12"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.top">✔️</p>
          </template>
        </el-table-column>

        <el-table-column
            prop="essence"
            label="加精"
            min-width="12"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.essence">✔️</p>
          </template>
        </el-table-column>

        <el-table-column
            min-width="25"
            align="right"
        >
          {{/* eslint-disable-next-line vue/no-unused-vars */}}
          <template slot="header" slot-scope="scope">
            <el-input
                v-model="search"
                size="mini"
                placeholder="搜索"/>
          </template>

          <template slot-scope="scope">
            <el-dropdown>
              <el-button size="mini" type="primary"><i class="el-icon-setting"></i></el-button>

              <el-dropdown-menu slot="dropdown">

                <el-dropdown-item
                    v-if="!scope.row.top"
                    @click.native="handleTop(scope.row)"
                >置顶</el-dropdown-item>

                <el-dropdown-item
                    v-else
                    @click.native="handleTop(scope.row)"
                >取消置顶</el-dropdown-item>

                <el-dropdown-item
                    v-if="!scope.row.essence"
                    @click.native="handleEssence(scope.row)"
                >加精</el-dropdown-item>

                <el-dropdown-item
                    v-else
                    @click.native="handleEssence(scope.row)"
                >取消加精</el-dropdown-item>

                <el-dropdown-item
                    @click.native="handleEdit(scope.row.id)"
                >编辑</el-dropdown-item>

                <el-dropdown-item
                    @click.native="handleDelete(scope.row)"
                    style="color: #ff0000"
                >删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
            @pagination="fetchPostList"
        ></Pagination>
      </p>
    </div>
  </div>
</template>

<script>
import { getPostList, delPostByAdmin, fastUpdatePostByAdmin } from '@/api/post'
import { addNotifyByAdmin } from '@/api/notify'
import Pagination from '@/components/layout/Pagination'

export default {
  name: "Post",
  components: {
    Pagination
  },
  data() {
    return {
      postList: [],
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      postListHeight: window.innerHeight * 0.8,
      postLoading: false,
      search: '',
    }
  },
  mounted() {
    this.fetchPostList()
  },
  computed: {
    filterData: function () {
      let input = this.search
      let items = this.postList
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
    }
  },
  methods: {
    async fetchPostList() {
      this.postLoading = true
      getPostList(null, null, null, this.page.current, this.page.size)
          .then((res) => {
            this.page.current = res.data.current
            this.page.total = res.data.total
            this.page.size = res.data.size
            this.postList = res.data.records
            this.postLoading = false
          })
    },
    handleEdit(id) {
      this.$router.push({ name: 'EditPost', params: {id: id} })
    },
    handleDelete(row) {
      if (window.confirm('确定要删除该话题🐴？')) {
        delPostByAdmin(row.id).then(() => {
          this.$notify({
            position: 'bottom-right',
            message: '话题删除成功',
            type: 'success'
          })
          let dto = {
            'userId': row.userId,
            'content': '您的话题 ' + row.title + ' 已被删除了哦！',
            'remark': 'post/' + row.id
          }
          addNotifyByAdmin(dto)
        })
        this.fetchPostList()
      }
    },
    handleTop(row) {
      let body = {
        'id': row.id,
        'essence': row.essence,
        'top': !row.top
      }
      // console.log(body)
      fastUpdatePostByAdmin(body).then(() => {
        if (!row.top) {
          this.$notify({
            position: 'bottom-right',
            title: '话题置顶成功',
            type: 'success'
          })
          let dto = {
            'userId': row.userId,
            'content': '您的话题 ' + row.title + ' 已被置顶了哦！',
            'remark': 'post/' + row.id
          }
          addNotifyByAdmin(dto)
        } else {
          this.$notify({
            position: 'bottom-right',
            title: '话题取消置顶成功',
            type: 'success'
          })
          let dto = {
            'userId': row.userId,
            'content': '您的话题 ' + row.title + ' 已被取消置顶了哦！',
            'remark': 'post/' + row.id
          }
          addNotifyByAdmin(dto)
        }
        this.fetchPostList()
      })
    },
    handleEssence(row) {
      let body = {
        'id': row.id,
        'top': row.top,
        'essence': !row.essence
      }
      fastUpdatePostByAdmin(body).then(() => {
        if (!row.essence) {
          this.$notify({
            position: 'bottom-right',
            title: '话题加精成功',
            type: 'success'
          })
          let dto = {
            'userId': row.userId,
            'content': '您的话题 ' + row.title + ' 已被加精了哦！',
            'remark': 'post/' + row.id
          }
          addNotifyByAdmin(dto)
        } else {
          this.$notify({
            position: 'bottom-right',
            title: '话题取消加精成功',
            type: 'success'
          })
          let dto = {
            'userId': row.userId,
            'content': '您的话题 ' + row.title + ' 已被取消加精了哦！',
            'remark': 'post/' + row.id
          }
          addNotifyByAdmin(dto)
        }
        this.fetchPostList()
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