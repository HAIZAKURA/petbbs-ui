<template>
  <div class="columns">
    <div class="column is-three-quarters">
      <el-card>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="avatar-div">
              <el-tag class="avatar-tag" size="mini" v-if="user.roleId === 1 || user.roleId === 2" type="danger" effect="dark">管理员</el-tag>
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
              <el-tag size="mini" type="danger" v-else><router-link :to="{ name: 'ReActive' }">未激活</router-link></el-tag>
              <span class="mx-1"></span>
              <el-tag size="mini" v-if="!user.status" type="danger">已封禁</el-tag>
            </div>
          </el-col>

          <el-col :span="3" style="text-align: right">
            <router-link :to="{ name: 'Profile' }">
              <el-button size="mini">修改资料</el-button>
            </router-link>
          </el-col>
        </el-row>
      </el-card>

      <el-card>
        <el-tabs v-model="activeTab" @tab-click="handleClick">
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
            <div v-if="collectList.length > 0">
              <div v-for="(item, key) in collectList" :key="key">
                <transition name="el-fade-in">

                  <div class="collect-box">
                    <el-row :gutter="10">
                      <el-col :span="2">
                        <img class="collect-box-avatar" :src="item.avatar + '?imageView2/1/w/100/h/100/format/webp/q/80'" :alt="item.alias" />
                      </el-col>

                      <el-col :span="18">
                        <div class="collect-box-info">
                          <div class="collect-title">
                            <span v-if="item.top">
                              <el-tag type="danger" size="mini" effect="dark">置顶</el-tag>
                              <span class="mx-1"></span>
                            </span>

                            <span v-if="item.essence">
                              <el-tag size="mini" effect="dark">精华</el-tag>
                              <span class="mx-1"></span>
                            </span>

                            <router-link class="title-link" :to="{ name: 'Post', params: { id: item.postId }}">{{ item.title }}</router-link>
                          </div>

                          <div class="collect-info">
                            <p>
                              <span>
                                <router-link style="font-weight: 600;color:#606266" :to="{ name: 'User', params: { id: item.userId } }">{{ item.alias }}</router-link>
                              </span>
                              <span style="color: #C0C4CC">  •  </span>
                              <span>{{ dayjs(item.createTime).calendar() }}</span>
                              <span v-for="(tag, index) in item.tags" :key="index">
                                <span style="color: #C0C4CC">  •  </span>
                                <el-tag type="info" size="mini">
                                  <router-link style="color:#606266" :to="{ name: 'TagPostList', params: { id: tag.id }, query: { name: tag.name }}"><i class="fas fa-tag"></i>&nbsp;{{ tag.name }}</router-link>
                                </el-tag>
                              </span>
                            </p>
                          </div>
                        </div>
                      </el-col>

                      <el-col :span="4">
                        <div class="collect-box-comments">
                          <span style="font-weight: bold"><el-tag type="info" size="small" effect="plain"><i class="fas fa-comment-alt"></i>&nbsp;{{ item.comments }}</el-tag></span>
                          <span class="mx-1"></span>
                          <span style="font-weight: bold;cursor: pointer"><el-tag type="danger" size="small" effect="dark" @click="handleDelCollect(item.postId)"><i class="fas fa-trash"></i></el-tag></span>
                        </div>
                      </el-col>
                    </el-row>
                  </div>

                </transition>
              </div>
            </div>
            <div v-else class="nocontent">
              <p>暂时没有相关话题哦～</p>
            </div>
          </el-tab-pane>
        </el-tabs>

        <div class="pagination-div">
          <p>
            <Pagination
                v-show="page.total > 0"
                :total="page.total"
                :page.sync="page.current"
                :limit.sync="page.size"
                @pagination="fetchList"
            ></Pagination>
          </p>
        </div>
      </el-card>
    </div>

    <div class="column is-one-quarter">
      <CardBar></CardBar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUser } from '@/api/user'
import { getCollectList, delCollect } from '@/api/collect'
import UserPostBox from '@/components/post/UserPostBox'
import Pagination from '@/components/layout/Pagination'
import CardBar from '@/components/layout/CardBar'

export default {
  name: "My",
  components: {
    UserPostBox,
    Pagination,
    CardBar
  },
  data() {
    return {
      postList: [],
      collectList: [],
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
    if (this.token == null || this.token === '') {
      this.$router.push({ path: '/login' })
    } else {
      this.fetchList(this.activeTab)
    }
    document.title = '个人中心 - ' + this.$root.site_info.site_title
  },
  methods: {
    async fetchList(tabName) {
      if (tabName === 'post') {
        getUser(this.page.current, this.page.size).then((res) => {
          let { data } = res
          // console.log(data)
          this.postList = data.posts.records
          this.page.current = data.posts.current
          this.page.size = data.posts.size
          this.page.total = data.posts.total
          this.userInfo = data.user
        })
      } else {
        getCollectList(this.page.current, this.page.size).then((res) => {
          let { data } = res
          this.page.current = data.current
          this.page.size = data.size
          this.page.total = data.total
          this.collectList = data.records
        })
      }
    },
    handleClick(tab) {
      this.fetchList(tab.name)
    },
    handleDelCollect(id) {
      // console.log(id)
      delCollect(id).then((res) => {
        this.$message({
          message: res.message,
          type: 'success',
          duration: 1000
        })
        this.fetchList(this.activeTab)
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

.collect-box
  width 100%
  height 80px
  padding 8px 0

.collect-box-avatar
  height 48px
  width 48px
  border-radius 50%
  overflow hidden
  margin-top 6px

.collect-box-info
  height 48px
  overflow hidden
  margin-top 6px

.collect-box-comments
  height 48px
  overflow hidden
  margin-top 6px
  text-align right
  p
    line-height 48px

.collect-title
  height 24px

.collect-info
  height 28px
  p
    line-height 28px

.title-link
  line-height 24px
  font-size 16px
  color #606266
  font-weight 500
</style>