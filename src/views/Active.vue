<template>
  <div id="active"></div>
</template>

<script>
import { activeUser } from '@/api/user'

export default {
  name: "Active",
  data() {
    return {
      activeDTO: {
        user: this.$route.query.user,
        code: this.$route.query.code
      }
    }
  },
  created() {
    this.handleActive()
  },
  methods: {
    handleActive() {
      if (this.activeDTO.code && this.activeDTO.user) {
        activeUser(this.activeDTO)
            .then(() => {
              this.$message({
                message: '激活成功',
                type: 'success'
              })
              window.location.href = '/'
            })
            .catch(() => {
              this.$message({
                message: '激活失败',
                type: 'error'
              })
              this.$router.push({ name: 'ReActive' })
            })
      }
    }
  }
}
</script>

<style scoped>

</style>