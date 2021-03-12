<template>
  <div>
    <el-card v-for="(item, key) in sectionList" :key="key">
      <el-row :gutter="10">
        <el-col :span="3">
          <img class="section-img" :src="item.thumbnail" :alt="item.title" />
        </el-col>
        <el-col :span="21">
          <router-link :to="{ name: 'SectionPostList', params: { id: item.id } }">
            <p class="section-title">{{ item.title }}</p>
          </router-link>
          <p class="section-desc has-text-grey">{{ item.description }}</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SectionBox",
  props: {
    sectionList: {
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.section-img
  width 64px
  height 64px

.section-title
  line-height 1.75em
  font-size 1.5em

.section-desc
  margin-top 0.25em
  font-size 1em
</style>