<template>
  <div id="post">
    <div class="title">
      <span class="title-text">话&nbsp;题</span>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
name: "Post"
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