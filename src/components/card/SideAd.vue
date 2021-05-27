<template>
  <el-card class="box-card" v-if="$root.site_info.site_side_ad">
    <div class="ad-div">
      <el-tag class="ad-tag" type="info" size="small" effect="plain">广告</el-tag>
      <div v-html="$root.site_info.site_side_ad"></div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "SideAd"
}
</script>

<style lang="stylus" scoped>
.ad-div
  position relative

.ad-tag
  position absolute
  right 0
  bottom 0

</style>