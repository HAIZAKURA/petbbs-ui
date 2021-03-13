<template>
  <div></div>
</template>

<script>
import { randomPost } from '@/api/search'

export default {
  name: "Random",
  created() {
    randomPost().then((res) => {
      let { data } =res
      this.$router.push({ name: 'Post', params: { id: data.id } })
    })
  }
}
</script>

<style scoped>

</style>