<template>
  <section>
    <Welcome></Welcome>
    <Tips></Tips>
    <SideAd></SideAd>
    <Links></Links>
    <Status></Status>
  </section>
</template>

<script>
import Welcome from '@/components/card/Welcome'
import Tips from '@/components/card/Tips'
import Status from 'components/card/Status'
import Links from '@/components/card/Links'
import SideAd from '@/components/card/SideAd'

export default {
  name: "CardBar",
  components: {
    Welcome,
    Tips,
    Status,
    Links,
    SideAd
  }
}
</script>

<style scoped>

</style>