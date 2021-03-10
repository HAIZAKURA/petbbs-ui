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
          const { message } = value;
          window.alert(message);
          this.$router.push({ path: "/" });
        })
        .catch(() => {
          this.$router.push({ path: "/reactive" })
        })
  }
}
</script>

<style scoped>

</style>