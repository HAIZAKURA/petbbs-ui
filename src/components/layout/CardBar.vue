<template>
  <section>
    <Shortcut></Shortcut>
    <Welcome></Welcome>
    <TagCard></TagCard>
<!--    <Tips></Tips>-->
    <Links></Links>
    <Status></Status>
    <SideAd></SideAd>
  </section>
</template>

<script>
import Welcome from '@/components/card/Welcome'
// import Tips from '@/components/card/Tips'
import Status from 'components/card/Status'
import Links from '@/components/card/Links'
import SideAd from '@/components/card/SideAd'
import Shortcut from '@/components/card/Shortcut'
import TagCard from "../card/TagCard";

export default {
  name: "CardBar",
  components: {
    TagCard,
    Shortcut,
    Welcome,
    // Tips,
    Status,
    Links,
    SideAd
  }
}
</script>

<style scoped>

</style>