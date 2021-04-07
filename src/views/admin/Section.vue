<template>
  <div id="section">
    <div class="title">
      <span class="title-text">专&nbsp;栏</span>
      <div class="title-btn">
        <el-tooltip class="item" effect="dark" content="添加" placement="left">
          <el-button type="success" icon="el-icon-plus" circle @click="addWord"></el-button>
        </el-tooltip>
      </div>
    </div>

    <el-divider></el-divider>

  </div>
</template>

<script>
export default {
  name: "Section"
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