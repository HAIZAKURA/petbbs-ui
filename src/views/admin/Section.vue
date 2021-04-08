<template>
  <div id="section">
    <div class="title">
      <span class="title-text">专&nbsp;栏</span>
      <div class="title-btn">
        <el-tooltip class="item" effect="dark" content="添加" placement="left">
          <el-button type="success" icon="el-icon-plus" circle @click="handleAddOpen"></el-button>
        </el-tooltip>
      </div>
    </div>

    <el-divider></el-divider>

    <div>
      <el-table
          :data="filterData"
          :max-height="tableHeight"
          v-loading="tableLoading"
          style="width: 100%"
      >
        <el-table-column
            prop="id"
            label="ID"
            min-width="10"
            sortable
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'SectionPostList', params: { id: scope.row.id } }">{{ scope.row.id }}</router-link>
          </template>
        </el-table-column>

        <el-table-column
            prop="thumbnail"
            min-width="10"
        >
          <template slot-scope="scope">
            <img style="height: 32px" :src="scope.row.thumbnail" />
          </template>
        </el-table-column>

        <el-table-column
            prop="title"
            label="专栏"
            min-width="30"
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'SectionPostList', params: { id: scope.row.id } }">{{ scope.row.title }}</router-link>
          </template>
        </el-table-column>

        <el-table-column
            prop="description"
            label="描述"
        ></el-table-column>

        <el-table-column
            prop="state"
            label="状态"
            min-width="20"
            sortable
        >
          <template slot-scope="scope">
            <el-tag
                v-if="scope.row.state"
                type="success"
                effect="dark"
            >启用</el-tag>

            <el-tag
                v-else
                type="danger"
                effect="dark"
            >停用</el-tag>
          </template>
        </el-table-column>

        <el-table-column
            min-width="20"
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
            <el-button-group>
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
                  @click="changeState(scope.row)"
              ></el-button>

              <el-button
                  v-else
                  size="mini"
                  type="danger"
                  icon="el-icon-close"
                  @click="changeState(scope.row)"
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
            @pagination="fetchSectionList"
        ></Pagination>
      </p>
    </div>

    <el-dialog
        :visible.sync="dialogVisible"
        title="修改"
        width="40%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :destroy-on-close="true"
        center
    >
      <el-form ref="editForm" label-position="left" :model="sectionInfo" label-width="80px">
        <el-form-item label="ID">
          <el-input
              v-model="sectionInfo.id"
              disabled
          ></el-input>
        </el-form-item>

        <el-form-item label="缩略图">
          <el-input
              v-model="sectionInfo.thumbnail"
          ></el-input>
        </el-form-item>

        <el-form-item label="专栏名">
          <el-input
              v-model="sectionInfo.title"
          ></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input
              v-model="sectionInfo.description"
              type="textarea"
              maxlength="255"
              show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label="用户ID">
          <el-input
              v-model="sectionInfo.userId"
          ></el-input>
        </el-form-item>

        <el-form-item label="启用">
          <el-checkbox v-model="sectionInfo.state"></el-checkbox>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="handleEditClose">取消</el-button>
        <el-button type="primary" @click="handleEdit">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog
        :visible.sync="addDialogVisible"
        title="添加"
        width="40%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :destroy-on-close="true"
        center
    >
      <el-form ref="addForm" label-position="left" :model="section" label-width="80px">
        <el-form-item label="专栏名">
          <el-input
              v-model="section.title"
          ></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input
              v-model="section.description"
              type="textarea"
              maxlength="255"
              show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label="缩略图">
          <el-input
              v-model="section.thumbnail"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="handleAddClose">取消</el-button>
        <el-button type="primary" @click="handleAdd">修改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getSectionListByAdmin, updateSectionByAdmin, addSection } from '@/api/sections'
import { addNotifyByAdmin } from '@/api/notify'
import Pagination from '@/components/layout/Pagination'

export default {
  name: "Section",
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
      sectionList: [],
      tableLoading: false,
      tableHeight: window.innerHeight * 0.75,
      search: '',
      dialogVisible: false,
      addDialogVisible: false,
      sectionInfo: {
        id: '',
        title: '',
        description: '',
        thumbnail: '',
        userId: '',
        state: ''
      },
      section: {
        title: '',
        description: '',
        thumbnail: ''
      }
    }
  },
  mounted() {
    this.fetchSectionList()
  },
  computed: {
    filterData: function () {
      let input = this.search
      let items = this.sectionList
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
    async fetchSectionList() {
      this.tableLoading = true
      getSectionListByAdmin(this.page.current, this.page.size).then((res) => {
        let { data } = res
        this.page.current = data.current
        this.page.size = data.size
        this.page.total = data.total
        this.sectionList = data.records
        this.tableLoading = false
      })
    },
    handleEditOpen(row) {
      this.dialogVisible = true
      this.sectionInfo.id = row.id
      this.sectionInfo.title = row.title
      this.sectionInfo.description = row.description
      this.sectionInfo.userId = row.userId
      this.sectionInfo.thumbnail = row.thumbnail
      this.sectionInfo.state = row.state
    },
    handleEditClose() {
      this.dialogVisible = false
      this.sectionInfo.id = ''
      this.sectionInfo.title = ''
      this.sectionInfo.description = ''
      this.sectionInfo.userId = ''
      this.sectionInfo.thumbnail = ''
      this.sectionInfo.state = ''
    },
    handleEdit() {
      updateSectionByAdmin(this.sectionInfo).then(() => {
        this.$notify({
          position: 'bottom-right',
          title: '专栏信息修改成功',
          type: 'success'
        })
        this.handleEditClose()
        this.fetchSectionList()
      })
    },
    changeState(row) {
      let body = {
        "id": row.id,
        "state": !row.state
      }
      updateSectionByAdmin(body).then(() => {
        this.$notify({
          position: 'bottom-right',
          title: '专栏状态修改成功',
          type: 'success'
        })
        if (!row.state) {
          let dto = {
            'userId': row.userId,
            'content': '您的专栏 ' + row.title + ' 已开始启用了哦！',
            'remark': 'sections/' + row.id
          }
          addNotifyByAdmin(dto)
        } else {
          let dto = {
            'userId': row.userId,
            'content': '您的专栏 ' + row.title + ' 已被停用！',
            'remark': 'sections/' + row.id
          }
          addNotifyByAdmin(dto)
        }
        this.fetchSectionList()
      })
    },
    handleAddOpen() {
      this.addDialogVisible = true
      this.section.title = ''
      this.section.description = ''
      this.section.thumbnail = ''
    },
    handleAddClose() {
      this.addDialogVisible = false
      this.section.title = ''
      this.section.description = ''
      this.section.thumbnail = ''
    },
    handleAdd() {
      addSection(this.section).then(() => {
        this.$notify({
          position: 'bottom-right',
          title: '专栏添加成功',
          type: 'success'
        })
        this.handleAddClose()
        this.fetchSectionList()
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