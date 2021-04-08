<template>
  <div id="photo">
    <div class="title">
      <span class="title-text">照&nbsp;片</span>
    </div>

    <el-divider></el-divider>

    <div>
      <el-table
          :data="filterData"
          :max-height="photoListHeight"
          v-loading="photoLoading"
          style="width: 100%"
      >
        <el-table-column
            prop="id"
            label="ID"
            min-width="40"
            sortable
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'Photo', params: { id: scope.row.id } }">{{ scope.row.id }}</router-link>
          </template>
        </el-table-column>

        <el-table-column
            prop="photo"
            label="照片源"
            min-width="100"
        >
          <template slot-scope="scope">
            <el-popover
                placement="right"
                trigger="hover"
                :open-delay="100"
                :close-delay="100"
            >
              <div style="text-align: center; margin: 0">
                <img style="height: 200px" :src="scope.row.photo + '?imageView2/0/format/webp/q/80'" />
              </div>
              <a :href="scope.row.photo" target="_blank" slot="reference">{{ scope.row.photo }}</a>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
            prop="username"
            label="用户"
            min-width="20"
            sortable
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'User', params: { id: scope.row.userId } }">{{ scope.row.username }}</router-link>
          </template>
        </el-table-column>

        <el-table-column
            prop="createTime"
            label="发布时间"
            min-width="40"
            sortable
        ></el-table-column>

        <el-table-column
            min-width="24"
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
            <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row.id)"
            ></el-button>
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
            @pagination="fetchPhotoList"
        ></Pagination>
      </p>
    </div>
  </div>
</template>

<script>
import { getList, delPhotoByAdmin } from '@/api/photo'
import Pagination from '@/components/layout/Pagination'

export default {
  name: "Photo",
  data() {
    return {
      photoList: [],
      srcList: [],
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      photoListHeight: window.innerHeight * 0.75,
      photoLoading: false,
      search: '',
      options: {},
      visible: false
    }
  },
  components: {
    Pagination,
  },
  mounted() {
    this.fetchPhotoList()
  },
  computed: {
    filterData: function () {
      let input = this.search
      let items = this.photoList
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
    async fetchPhotoList() {
      this.photoLoading = true
      getList(this.page.current, this.page.size).then((res) => {
        let { data } = res
        this.page.current = data.current
        this.page.size = data.size
        this.page.total = data.total
        this.photoList = data.records
        this.srcList = []
        this.photoList.forEach((item) => {
          this.srcList.push(item.photo + '?imageView2/0/format/webp/q/80')
        })
        this.photoLoading = false
      })
    },
    handleDelete(id) {
      delPhotoByAdmin(id).then(() => {
        this.$notify({
          position: 'bottom-right',
          title: '照片删除成功',
          type: 'success'
        })
        this.fetchPhotoList()
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