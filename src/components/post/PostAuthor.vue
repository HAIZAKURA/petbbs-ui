<template>
  <section id="author">
    <el-card>
      <div slot="header">
        <span class="has-text-weight-bold">👨‍💻 作者</span>
      </div>
      <div>
        <div class="columns" style="border-bottom: 1px solid #EBEEF5">
          <div class="column is-half has-text-centered">
            <img :src="user.avatar + '?imageView2/1/w/100/h/100/format/webp/q/80'" :alt="user.alias" style="border-radius: 50%; height: 80px" />
          </div>
          <div class="column has-text-left user-name">
            <router-link :to="{ path: `/member/${user.username}/home` }">
              <p class="alias">{{ user.alias }}</p>
              <p class="is-size-10 has-text-grey">{{ '@' + user.username }}</p>
            </router-link>
          </div>
        </div>
        <div class="columns has-text-centered">
          <div class="column is-one-third">
            <code>{{ user.postCount }}</code>
            <p>话题</p>
          </div>
          <div class="column is-one-third">
            <code>{{ user.sections }}</code>
            <p>专栏</p>
          </div>
          <div class="column is-one-third">
            <code>{{ user.followerCount }}</code>
            <p>粉丝</p>
          </div>
        </div>
<!--        <div>-->
<!--          <button-->
<!--              v-if="hasFollow"-->
<!--              class="button is-success button-center is-fullwidth"-->
<!--              @click="handleUnFollow(user.id)"-->
<!--          >-->
<!--            已关注-->
<!--          </button>-->

<!--          <button v-else class="button is-link button-center is-fullwidth" @click="handleFollow(user.id)">-->
<!--            关注-->
<!--          </button>-->
<!--        </div>-->
      </div>
    </el-card>
  </section>
</template>

<script>
export default {
  name: "PostAuthor",
  props: {
    user: {
      default: null,
      type: Object
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
.user-name
  height 80px
  padding 24px 0

.alias
  font-size 18px
</style>