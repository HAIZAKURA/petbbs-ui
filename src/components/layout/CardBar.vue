<template>
  <section>
    <Welcome></Welcome>
    <Tips></Tips>
    <Links></Links>
    <SideAd></SideAd>
  </section>
</template>

<script>
import Welcome from '@/components/card/Welcome'
import Tips from '@/components/card/Tips'
import Links from '@/components/card/Links'
import SideAd from '@/components/card/SideAd'

export default {
  name: "CardBar",
  components: {
    Welcome,
    Tips,
    Links,
    SideAd
  }
}
</script>

<style scoped>

</style>