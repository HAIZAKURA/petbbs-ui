<template>
  <div>
    <Shortcut></Shortcut>

    <Share></Share>

    <el-card class="box-card">
      <div slot="header">
        <span>📃 发表照片</span>
      </div>

      <div v-if="token != null && token !== ''" class="has-text-centered">
        <b-button type="is-danger" tag="router-link" :to="{ name: 'CreatePhoto' }" outlined>📷️ 发表照片</b-button>
      </div>

      <div v-else class="has-text-centered">
        <b-button type="is-primary" tag="router-link" :to="{path:'/register'}" outlined>马上入驻</b-button>
        <b-button type="is-danger" tag="router-link" :to="{path:'/login'}" outlined class="ml-2"> 社区登录</b-button>
      </div>
    </el-card>

    <Tips></Tips>
    <Links></Links>
    <SideAd></SideAd>
  </div>
</template>

<script>
import Tips from '@/components/card/Tips'
import Links from '@/components/card/Links'
import SideAd from '@/components/card/SideAd'
import { mapGetters } from 'vuex'
import Shortcut from '@/components/card/Shortcut'
import Share from '@/components/card/Share'

export default {
  name: "PhotoCardBar",
  components: {
    Share,
    Shortcut,
    Tips,
    Links,
    SideAd
  },
  computed: {
    ...mapGetters(['token'])
  }
}
</script>

<style scoped>

</style>