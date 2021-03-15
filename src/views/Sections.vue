<template>
  <div>
    <div class="columns">
      <div class="column is-three-quarters">
        <div>
          <p class="box" style="font-size: 1.25em;margin-bottom: 1em">📰<span class="mx-1"></span>优质专栏</p>
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
  </div>
</template>

<script>
import CardBar from '@/components/layout/CardBar'
import Pagination from '@/components/layout/Pagination'
import SectionBox from '@/components/section/SectionBox'

import { getSectionList } from '@/api/sections'

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
    }
  },
  created() {
    this.fetchSectionList()
    document.title = '优质专栏 - ' + this.$root.site_info.site_title
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination-div
  p
    text-align center
</style>