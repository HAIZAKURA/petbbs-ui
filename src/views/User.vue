<template>
  <div class="columns">
    <div class="column is-three-quarters">
      <el-card>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="avatar-div">
              <el-tag class="avatar-tag" size="mini" v-if="userInfo.roleId === 1 || userInfo.roleId === 2" type="danger" effect="dark">管理员</el-tag>
              <img style="border-radius: 50%" :src="userInfo.avatar + '?imageView2/1/w/200/h/200/format/webp/q/80'" :alt="userInfo.alias" />
            </div>
          </el-col>

          <el-col :span="18">
            <p class="alias">{{ userInfo.alias }}</p>
            <p class="bio">{{ userInfo.bio }}</p>
            <p class="username has-text-grey">@{{ userInfo.username }}</p>
            <p class="email has-text-grey"><span class="mx-1"></span></p>
            <p class="date has-text-grey">加入于<span class="mx-1"></span>{{ dayjs(userInfo.createTime).format('YYYY年MM月DD日 HH:MM:ss') }}</p>
            <div class="sometag">
              <el-tag size="mini" v-if="userInfo.active">已激活</el-tag>
              <el-tag size="mini" type="danger" v-else>未激活</el-tag>
              <span class="mx-1"></span>
              <el-tag size="mini" v-if="!userInfo.status" type="danger">已封禁</el-tag>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <el-card>
        <el-tabs v-model="activeTab" @tab-click="handleClick">
          <el-tab-pane label="📜 他的话题" name="post">
            <div>
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
            </div>
          </el-tab-pane>

          <el-tab-pane label="📷 他的照片" name="photo">
            <Waterfall v-if="photoList.length > 0" :options="options">
              <WaterfallItem v-for="(item, key) in photoList" :key="key" class="waterfallitem">
                <el-card :body-style="{ padding: '0' }" class="waterfall-card">
                  <div class="block" style="text-align: center">
                    <el-image :src="item.photo + '?imageView2/0/format/webp/q/80'" :alt="item.content">
                      <div slot="error" class="image-slot" style="height: 100px;text-align: center;line-height: 100px;font-size: 1.5em;color: #909399">
                        <span>加载失败</span>
                      </div>
                    </el-image>
                  </div>

                  <router-link :to="{ name: 'Photo', params: { id: item.id } }">
                    <div class="waterfall-card-content">
                      <span>{{ item.content }}</span>
                    </div>
                  </router-link>

                  <div class="waterfall-card-footer">
                    <el-row :gutter="10" class="has-text-grey">
                      <el-col :span="8" style="text-align: left">
                        <span><i class="fas fa-comment"></i>&nbsp;{{ item.comments }}</span>
                        <span class="mx-1"></span>
                        <span><i class="fas fa-eye"></i>&nbsp;{{ item.view }}</span>
                      </el-col>
                      <el-col :span="16" style="text-align: right">
                        <span>{{ dayjs(item.createTime).calendar() }}</span>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </WaterfallItem>
            </Waterfall>

            <div v-else class="nocontent">
              <p>暂时没有相关照片哦～</p>
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
import { getUserByNameOrId } from '@/api/user'
import { getPhotoListByUser } from '@/api/photo'
import CardBar from '@/components/layout/CardBar'
import UserPostBox from '@/components/post/UserPostBox'
import Pagination from '@/components/layout/Pagination'
import { Waterfall, WaterfallItem } from 'vue2-waterfall'

export default {
  name: "User",
  components: {
    CardBar,
    UserPostBox,
    Pagination,
    Waterfall,
    WaterfallItem
  },
  data() {
    return {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      userInfo: '',
      postList: [],
      photoList: [],
      options: {},
      activeTab: 'post',
      isShow: true
    }
  },
  created() {
    this.fetchList(this.activeTab)
  },
  methods: {
    async fetchList(tabName) {
      if (tabName === 'post') {
        this.page.current = 1
        this.page.size = 10
        getUserByNameOrId(this.$route.params.id, this.page.current, this.page.size).then((res) => {
          let { data } = res
          this.page.current = data.posts.current
          this.page.size = data.posts.size
          this.page.total = data.posts.total
          this.postList = data.posts.records
          this.userInfo = data.user
        })
      } else if (tabName === 'photo') {
        this.page.current = 1
        this.page.size = 10
        getPhotoListByUser(this.$route.params.id, this.page.current, this.page.size)
            .then((res) => {
              let { data } = res
              // console.log(data)
              this.page.current = data.current
              this.page.size = data.size
              this.page.total = data.total
              this.photoList = data.records
            })
      }
    },
    handleClick(tab) {
      // console.log(tab.name)
      this.fetchList(tab.name)
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

.waterfallitem
  width 230px
  margin 0.5em

.waterfall-card
  margin 0
  border-radius 10px
  position relative

.waterfall-card-content
  margin-top -1em
  padding 0 0.5em 0.5em 0.5em

.waterfall-card-footer
  font-size 0.75em
  padding 0 2em
  border-top 1px solid #DCDFE6
</style>