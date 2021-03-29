<template>
  <div id="photo">
    <div class="title">
      <span class="title-text">照&nbsp;片</span>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
name: "Photo"
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