<template>
  <div class="columns is-hidden-mobile is-multiline has-text-centered mb-2">
    <div class="column is-one-quarter">
      <router-link :to="{path:'/tags/1384720738488451074?name=狗狗'}">
        <el-tooltip content="狗狗" placement="bottom">
          <section class="box my-card hero is-warning">
            <i class="fad fa-dog fa-4x"></i>
          </section>
        </el-tooltip>
      </router-link>
    </div>

    <div class="column is-one-quarter">
      <router-link :to="{ path: '/tags/1384720738450702338?name=猫猫' }">
        <el-tooltip content="猫猫" placement="bottom">
          <section class="box my-card hero is-info">
            <i class="fas fa-cat fa-4x"></i>
          </section>
        </el-tooltip>
      </router-link>
    </div>

    <div class="column is-one-quarter">
      <router-link :to="{path:'/tags/1397563954061434882?name=鸭鸭'}">
        <el-tooltip content="鸭鸭" placement="bottom">
          <section class="box my-card hero is-primary">
            <i class="fad fa-duck fa-4x"></i>
          </section>
        </el-tooltip>
      </router-link>
    </div>

    <div class="column is-one-quarter">
      <router-link :to="{path: '/tags/1397565339259691009?name=龟龟'}">
        <el-tooltip content="龟龟" placement="bottom">
          <section class="box my-card hero is-success">
            <i class="fas fa-turtle fa-4x"></i>
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