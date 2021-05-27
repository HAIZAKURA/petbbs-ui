<template>
  <div class="columns shortcut has-text-centered">
    <div class="column is-half">
      <router-link :to="{path:'/sections'}">
        <el-tooltip content="优质专栏" placement="bottom">
          <section class="box my-card hero is-dark">
            <i class="fad fa-pencil-paintbrush fa-2x"></i>
<!--            <span class="subtitle mt-2">优质专栏</span>-->
          </section>
        </el-tooltip>
      </router-link>
    </div>

    <div class="column is-half">
      <router-link :to="{path:'/photos'}">
        <el-tooltip content="照片墙" placement="bottom">
          <section class="box my-card hero is-danger">
            <i class="far fa-images fa-2x"></i>
<!--            <span class="subtitle mt-2">照片墙</span>-->
          </section>
        </el-tooltip>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shortcut"
}
</script>

<style lang="stylus" scoped>
.subtitle
  font-size 1em
</style>