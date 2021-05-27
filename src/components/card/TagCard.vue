<template>
  <el-card class="box-card">
    <div slot="header">
      <span>🏷️ 话题标签</span>
    </div>

    <div v-for="(item, key) in tagList" :key="key" class="tag-div">
      <router-link :to="{ name: 'TagPostList', params: { id: item.id }, query: { name: item.name }}">
        <el-tag effect="dark" :type="item.type" size="small">
          <span>{{ item.name }}</span>
        </el-tag>
      </router-link>
    </div>
  </el-card>
</template>

<script>
import { getTagList } from '@/api/tags'

export default {
  name: "TagCard",
  data() {
    return {
      tagList: [],
      typeList: ['', 'danger', 'info', 'success', 'warning']
    }
  },
  created() {
    this.fetchTagList()
  },
  methods: {
    async fetchTagList() {
      getTagList().then((res) => {
        let { data } = res
        this.tagList = data
        for (let i = 0; i < this.tagList.length; i++) {
          this.tagList[i].type = this.randomType()
        }
      })
    },
    randomType() {
      let rand = Math.floor(Math.random()*5)
      return this.typeList[rand]
    }
  }
}
</script>

<style lang="stylus" scoped>
.tag-div
  float left
  margin 0 0.5em 1em 0.5em
</style>