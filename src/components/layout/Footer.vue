<template>
  <footer class="footer has-text-grey-light has-background-grey-darker">
    <div class="container">
      <div>
        <span>{{ title }} ALL RIGHTS RESERVED</span>
        <br />
        <span><a href="http://beian.miit.gov.cn/" target="_blank">{{ $root.site_info.site_beian }}</a></span>
        <div style="float: right">
          <template>
            <b-taglist attached>
              <b-tag type="is-primary" size="is-normal">Design</b-tag>
              <b-tag type="is-info" size="is-normal">{{ author }}</b-tag>
            </b-taglist>
          </template>
        </div>
      </div>
    </div>
    <BackTop></BackTop>
  </footer>
</template>

<script>
import BackTop from "@/components/backtop/BackTop";

export default {
  name: "Footer",
  components: {
    BackTop
  },
  data() {
    return {
      title: '© ' + new Date().getFullYear() + ' HAIZAKURA',
      author: '灰桜'
    }
  }
}
</script>

<style lang="stylus" scoped>
footer
  margin-top 150px
  height 100px
  a
    color #bfbfbf
</style>