<template>
  <div>
    <div class="columns">
      <div class="column is-three-quarters">
        <div>
          <div class="box" style="font-size: 1.25em;margin-bottom: 1em">
            <el-row>
              <el-col :span="18">
                <p>📰<span class="mx-1"></span>优质专栏</p>
              </el-col>

              <el-col :span="6" align="right">
                <el-button v-if="token != null && token !== ''" size="mini" @click="handleAddOpen">申请专栏</el-button>
              </el-col>
            </el-row>
          </div>
        </div>

        <div>
          <SectionBox :section-list="sectionList"></SectionBox>
        </div>

        <el-card v-show="page.total > 0">
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
        </el-card>
      </div>
      <div class="column is-one-quarter">
        <CardBar></CardBar>
      </div>
    </div>

    <el-dialog
        :visible.sync="dialogVisible"
        title="申请专栏"
        width="40%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :destroy-on-close="true"
        center
    >
<!--      <div style="text-align: center">-->
<!--        <el-upload-->
<!--            class="thumbnail-uploader"-->
<!--            action=""-->
<!--            accept="image/*"-->
<!--            :before-upload="upload"-->
<!--        >-->
<!--          <img v-if="section.thumbnail" :src="section.thumbnail" class="thumbnail">-->
<!--          <i v-else class="el-icon-plus thumbnail-uploader-icon"></i>-->
<!--        </el-upload>-->
<!--      </div>-->

      <el-form ref="addForm" label-position="left" :model="section" label-width="80px">
        <el-form-item label="专栏图">
          <el-upload
              class="thumbnail-uploader"
              action=""
              accept="image/*"
              :before-upload="upload"
              v-loading="loading"
          >
            <img v-if="section.thumbnail" :src="section.thumbnail" class="thumbnail">
            <i v-else class="el-icon-plus thumbnail-uploader-icon"></i>
          </el-upload>
        </el-form-item>

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
      </el-form>

      <div slot="footer">
        <el-button @click="handleAddClose">取消</el-button>
        <el-button type="primary" @click="handleAdd">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CardBar from '@/components/layout/CardBar'
import Pagination from '@/components/layout/Pagination'
import SectionBox from '@/components/section/SectionBox'

import { getSectionList, addSection } from '@/api/sections'
import { uploadUtil } from '@/api/upload'

import { mapGetters } from 'vuex'

export default {
  name: "Sections",
  components: {
    CardBar,
    Pagination,
    SectionBox
  },
  data() {
    return {
      sectionList: [
        { userId: String, title: String, description: String, thumbnail: String },
        { current: 1, size: 10, total: 0 }
      ],
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      dialogVisible: false,
      section: {
        title: '',
        description: '',
        thumbnail: ''
      },
      loading: false
    }
  },
  created() {
    this.fetchSectionList()
    document.title = '优质专栏 - ' + this.$root.site_info.site_title
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    async fetchSectionList() {
      getSectionList(this.page.current, this.page.size).then((res) => {
        let { data } = res
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.sectionList = data.records
      })
    },
    handleAddOpen() {
      this.dialogVisible = true
      this.section.thumbnail = ''
      this.section.title = ''
      this.section.description = ''
    },
    handleAddClose() {
      this.dialogVisible = false
      this.section.thumbnail = ''
      this.section.title = ''
      this.section.description = ''
    },
    handleAdd() {
      addSection(this.section).then(() => {
        this.$message({
          message: '已提交申请',
          type: 'success'
        })
        this.handleAddClose()
      })
    },
    upload(file) {
      this.loading = true
      let fd = new FormData()
      fd.append('file', file)
      fd.append('type', 'image')
      uploadUtil(fd)
          .then((res) => {
            let { data } = res
            this.$message({
              message: '上传成功',
              type: 'success'
            })
            this.section.thumbnail = data.url + '?imageView2/1/w/178/h/178/format/webp/q/80'
            this.loading = false
          })
          .catch(() => {
            this.$message({
              message: '上传失败',
              type: 'error'
            })
            this.loading = false
          })
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination-div
  p
    text-align center

.thumbnail-uploader
  width 178px
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden

.thumbnail-uploader:hover
  border-color #409EFF

.thumbnail-uploader-icon
  font-size 28px
  color #8c939d
  width 178px
  height 178px
  line-height 178px
  text-align center

.thumbnail
  width 178px
  height 178px
  display block

</style>