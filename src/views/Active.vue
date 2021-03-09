<template>
  <div class="Active"></div>
</template>

<script>
import { activeUser } from '@/api/user'

export default {
  name: "Active",
  data() {
    return {
      activeDTO: {
        user: "",
        code: ""
      }
    }
  },
  mounted() {
    console.log(this.$route.query.user);
    console.log(this.$route.query.code);
    this.activeDTO.user = this.$route.query.user;
    this.activeDTO.code = this.$route.query.code;
    activeUser(this.activeDTO)
        .then((value) => {
          const { code, message } = value;
          if (code === 200) {
            window.alert(message);
          } else {
            window.alert(message);
          }
          setTimeout(() => {
            this.$router.push({ path: this.redirect || "/" })
          }, 0.1 * 1000)
        })
  }
}
</script>

<style scoped>

</style>