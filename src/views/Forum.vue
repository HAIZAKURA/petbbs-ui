<template>
  <div class="Forum"></div>
</template>

<script>
import { getSiteInfo } from "@/api/config";

export default {
  name: "Forum",
  created() {
    getSiteInfo().then(data => {
      this.$root.site_info = data.data
      document.title = data.data.site_title
    })
  }
}
</script>

<style scoped>

</style>