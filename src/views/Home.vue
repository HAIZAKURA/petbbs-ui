<template>
  <div id="home">
    <div class="mb-5">
      <Header></Header>
    </div>

    <div class="container context">
      <transition
          name="el-fade-in-linear"
          mode="out-in"
          appear
      >
        <router-view :key="this.$route.fullPath"></router-view>
      </transition>
    </div>

    <Footer></Footer>

  </div>
</template>

<script>
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getSiteInfo } from '@/api/config'

export default {
  name: "Home",
  components: {
    Header,
    Footer
  },
  created() {
    getSiteInfo().then(data => {
      this.$root.site_info = data.data
    })
  }
}
</script>

<style lang="stylus" scoped>
.container
  min-height 500px
</style>
