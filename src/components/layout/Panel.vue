<template>
  <div class="columns is-hidden-mobile is-multiline has-text-centered">
    <div class="column is-one-quarter">
      <router-link :to="{path:'/tags'}">
        <el-tooltip content="所有标签" placement="bottom">
          <section class="box my-card hero is-warning">
            <i class="fa fa-tags fa-4x"></i>
          </section>
        </el-tooltip>
      </router-link>
    </div>

    <div class="column is-one-quarter">
      <router-link :to="{ path: '/sections' }">
        <el-tooltip content="优质专栏" placement="bottom">
          <section class="box my-card hero is-info">
            <i class="fa fa-list fa-4x"></i>
          </section>
        </el-tooltip>
      </router-link>
    </div>

    <div class="column is-one-quarter">
      <router-link :to="{path:'/video'}">
        <el-tooltip content="视频专区" placement="bottom">
          <section class="box my-card hero is-primary">
            <i class="fa fa-film fa-4x"></i>
          </section>
        </el-tooltip>
      </router-link>
    </div>

    <div class="column is-one-quarter">
      <router-link :to="{path:'/random'}">
        <el-tooltip content="随机推荐" placement="bottom">
          <section class="box my-card hero is-danger">
            <i class="fa fa-random fa-4x"></i>
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