<template>
  <div class="columns is-hidden-mobile is-multiline has-text-centered">
    <div class="column is-one-quarter">
      <router-link :to="{path:'/tags'}">
        <el-tooltip content="所有标签" placement="bottom">
          <section class="box my-card hero is-warning">
            <i class="fas fa-tags fa-4x"></i>
          </section>
        </el-tooltip>
      </router-link>
    </div>

    <div class="column is-one-quarter">
      <router-link :to="{ path: '/sections' }">
        <el-tooltip content="优质专栏" placement="bottom">
          <section class="box my-card hero is-info">
            <i class="fas fa-list-alt fa-4x"></i>
          </section>
        </el-tooltip>
      </router-link>
    </div>

    <div class="column is-one-quarter">
      <router-link :to="{path:'/photos'}">
        <el-tooltip content="萌宠照片墙" placement="bottom">
          <section class="box my-card hero is-primary">
            <i class="fas fa-camera fa-4x"></i>
          </section>
        </el-tooltip>
      </router-link>
    </div>

    <div class="column is-one-quarter">
      <router-link :to="{path:'/random'}">
        <el-tooltip content="随机推荐" placement="bottom">
          <section class="box my-card hero is-danger">
            <i class="fas fa-paw fa-4x"></i>
          </section>
        </el-tooltip>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Panel"
}
</script>

<style lang="stylus" scoped>
</style>