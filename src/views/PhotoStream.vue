<template>
  <div class="columns" v-loading.fullscreen.lock="loading">
    <div class="column is-three-quarters">
      <Waterfall v-if="isShow" :options="options">
        <WaterfallItem v-for="(item, key) in photoList" :key="key" class="waterfallitem">
          <el-card :body-style="{ padding: '0' }" class="waterfall-card">
            <div class="waterfall-card-header">
              <el-row :gutter="20">
                <el-col :span="6" style="text-align: left">
                  <img style="height: 2em;border-radius: 50%" :src="item.avatar + '?imageView2/1/w/100/h/100/format/webp/q/80'" :alt="item.alias" />
                </el-col>
                <el-col :span="18" class="waterfall-card-header-alias">
                  <router-link :to="{ name: 'User', params: { id: item.userId } }">{{ item.alias }}</router-link>
                </el-col>
              </el-row>
            </div>

<!--            <img style="display: block; padding-top: 0" :src="item.photo + '?imageView2/0/format/webp/q/80'" :alt="item.content" />-->
            <div class="block" style="text-align: center">
              <el-image :src="item.photo + '?imageView2/0/format/webp/q/80'" :alt="item.content" :preview-src-list="srcList">
                <div slot="error" class="image-slot" style="height: 100px;text-align: center;line-height: 100px;font-size: 1.5em;color: #909399">
                  <span>加载失败</span>
                </div>
              </el-image>
            </div>

            <router-link :to="{ name: 'Photo', params: { id: item.id } }">
              <div class="waterfall-card-content">
                <span>{{ item.content }}</span>
              </div>
            </router-link>

            <div class="waterfall-card-footer">
              <el-row :gutter="10" class="has-text-grey">
                <el-col :span="8" style="text-align: left">
                  <span><i class="fas fa-comment"></i>&nbsp;{{ item.comments }}</span>
                  <span class="mx-1"></span>
                  <span><i class="fas fa-eye"></i>&nbsp;{{ item.view }}</span>
                </el-col>
                <el-col :span="16" style="text-align: right">
                  <span>{{ dayjs(item.createTime).calendar() }}</span>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </WaterfallItem>
      </Waterfall>

      <div style="margin-top: 2.5em" v-show="page.total > 0">
        <el-row>
          <el-col :span="18" :offset="3">
            <div class="pagination-div">
              <p>
                <Pagination
                    v-show="page.total > 0"
                    :total="page.total"
                    :page.sync="page.current"
                    :limit.sync="page.size"
                    @pagination="fetchPhoto"
                ></Pagination>
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="column is-one-quarter" style="margin-top: 0.5em">
      <PhotoCardBar></PhotoCardBar>
    </div>
  </div>
</template>

<script>
import Pagination from 'components/layout/Pagination'
import PhotoCardBar from 'components/layout/PhotoCardBar'
import { getList } from '@/api/photo'
import { Waterfall, WaterfallItem } from 'vue2-waterfall'

export default {
  name: "PhotoStream",
  components: {
    Waterfall,
    WaterfallItem,
    Pagination,
    PhotoCardBar
  },
  data() {
    return {
      srcList: [],
      photoList: [],
      page: {
        current: 1,
        size: 20,
        total: 0
      },
      options: {},
      loading: false,
      isShow: false
    }
  },
  created() {
    document.title = '照片墙 - ' + this.$root.site_info.site_title
  },
  mounted() {
    this.fetchPhoto()
    setInterval(() => {
      this.isShow = false
      this.isShow = true
    }, 500)
  },
  methods: {
    async fetchPhoto() {
      this.loading = true
      getList(this.page.current, this.page.size).then((res) => {
        let { data } = res
        this.page.current = data.current
        this.page.size = data.size
        this.page.total = data.total
        this.photoList = data.records
        this.loading = false
        this.srcList = []
        this.photoList.forEach((item) => {
          this.srcList.push(item.photo + '?imageView2/0/format/webp/q/80')
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.PhotoStream
  height 100%

.waterfallitem
  width 250px
  margin 0.5em

.waterfall-card
  margin 0
  border-radius 10px
  position relative

.waterfall-card-content
  padding 1em 1em 0.5em 1em

.waterfall-card-footer
  font-size 0.25em
  padding 0 2em
  border-top 1px solid #DCDFE6

.waterfall-card-header
  padding 0.5em 1em 0 1em
  border-bottom 1px solid #DCDFE6

.waterfall-card-header-alias
  line-height 2em
  text-align right
  vertical-align center
  font-weight 500

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.pagination-div
  text-align center

.header-div
  margin-bottom 1em
</style>