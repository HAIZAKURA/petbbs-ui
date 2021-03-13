<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="avatar-div">
            <el-tag class="avatar-tag" v-if="user.roleId === 1 || user.roleId === 2" type="danger" effect="dark">管理员</el-tag>
            <img style="border-radius: 50%" :src="user.avatar + '?imageView2/1/w/200/h/200/format/webp/q/80'" :alt="user.alias" />
          </div>
        </el-col>

        <el-col :span="15">
          <p class="alias">{{ user.alias }}</p>
          <p class="bio">{{ user.bio }}</p>
          <p class="username has-text-grey">@{{ user.username }}</p>
          <p class="email has-text-grey">{{ user.email }}</p>
          <p class="date has-text-grey">加入于<span class="mx-1"></span>{{ dayjs(user.createTime).format('YYYY年MM月DD日 HH:MM:ss') }}</p>
          <div class="sometag">
            <el-tag size="mini" v-if="user.active">已激活</el-tag>
            <el-tag size="mini" type="danger" v-else>未激活</el-tag>
            <span class="mx-1"></span>
            <el-tag size="mini" v-if="!user.status" type="danger">已封禁</el-tag>
          </div>
        </el-col>

        <el-col :span="3" style="text-align: right">
          <router-link :to="{ path: '/profile' }">
            <el-button>修改资料</el-button>
          </router-link>
        </el-col>
      </el-row>
    </el-card>

    <el-card>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="📜 我的话题" name="post">
          <div v-if="postList.length > 0">
            <div v-for="(item, key) in postList" :key="key">
              <transition name="el-fade-in">
                <UserPostBox :post-info="item" :user="userInfo"></UserPostBox>
              </transition>
            </div>
          </div>
          <div v-else class="nocontent">
            <p>暂时没有相关话题哦～</p>
          </div>
        </el-tab-pane>

        <el-tab-pane label="🗂 我的收藏" name="collect">
        </el-tab-pane>
      </el-tabs>

      <div class="pagination-div">
        <p>
          <Pagination
              v-show="page.total > 0"
              :total="page.total"
              :page.sync="page.current"
              :limit.sync="page.size"
              @pagination="fetchUser"
          ></Pagination>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUser } from '@/api/user'
import UserPostBox from '@/components/post/UserPostBox'
import Pagination from '@/components/layout/Pagination'

export default {
  name: "My",
  components: {
    UserPostBox,
    Pagination
  },
  data() {
    return {
      postList: [
        { avatar: String, createTime: Date },
        { current: 1, size: 10, total: 0 }
      ],
      userInfo: '',
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      activeTab: 'post'
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      getUser(this.page.current, this.page.size).then((res) => {
        let { data } = res
        // console.log(data)
        this.postList = data.posts.records
        this.page.current = data.posts.current
        this.page.size = data.posts.size
        this.page.total = data.posts.total
        this.userInfo = data.user
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.nocontent
  height 64px
  line-height 48px
  padding 8px 0
  p
    line-height 48px
    text-align center

.pagination-div
  height 40px
  padding-top 8px
  p
    text-align center

.alias
  line-height 2em
  font-size 2.5em

.bio
  font-size 1em
  line-height 2em

.username
  line-height 1.75em
  font-size 1em

.email
  font-size 1em
  line-height 1.75em

.date
  line-height 1.75em
  font-size 1em

.avatar-div
  position relative

.avatar-tag
  position absolute
  top 0
  left 0

.sometag
  line-height 2em
  font-size 1em

</style>