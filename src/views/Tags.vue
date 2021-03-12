<template>
  <el-card style="padding-bottom: 1em">
    <div slot="header">
      <span style="font-size: 1.25em">🏷️<span class="mx-1"></span>所有标签</span>
    </div>
    <div v-for="(item, key) in tagList" :key="key" class="tag-div">
      <router-link :to="{ name: 'TagPostList', params: { id: item.id }, query: { name: item.name }}">
        <el-tag effect="dark" :type="item.type">
          <i class="fas fa-tag"></i>
          <span class="mx-1"></span>
          <span>{{ item.name }}</span>
        </el-tag>
      </router-link>
    </div>
  </el-card>
</template>

<script>
import { getTagList } from '@/api/tags'

export default {
  name: "Tags",
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
  margin 0.5em
</style>