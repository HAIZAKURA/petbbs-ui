<template>
  <div id="photo" class="columns">
    <div class="column is-three-quarters">
      <el-card>
        <div slot="header">
          <el-row>
            <el-col :span="20">
              <div class="photo-content">
                <p>{{ photo.content }}</p>
              </div>

              <div class="has-text-grey">
                <router-link :to="{ name: 'User', params: { id: photoUser.id } }">
                  <span>{{ photoUser.alias }}</span>
                </router-link>
                <span class="mx-2">·</span>
                <span>浏览 {{ photo.view }}</span>
                <span class="mx-2">·</span>
                <span>发布于{{ dayjs(photo.createTime).format('YYYY/MM/DD HH:MM:ss') }}</span>
              </div>
            </el-col>

            <el-col :span="4" class="has-text-right">
              <div class="good-item">
                <el-tag type="success" effect="plain">
                  <span>{{ photo.good }}</span>
                </el-tag>

                <span class="mx-2"></span>

                <el-button type="success" circle @click="handleGood">
                  <i class="fas fa-thumbs-up"></i>
                </el-button>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="has-text-centered">
          <div class="block" style="text-align: center">
            <el-image :src="photo.photo + '?imageView2/0/format/webp/q/80'" :alt="photo.content">
              <div slot="error" class="image-slot" style="height: 200px;text-align: center;line-height: 200px;font-size: 1.5em;color: #909399">
                <span>加载失败</span>
              </div>
            </el-image>
          </div>
        </div>

        <div v-if="token != null && token !== '' && ((user.id === photoUser.id) || (user.roleId === 1 || user.roleId === 2))">
          <nav class="level has-text-grey is-size-7 mt-6">
            <div class="level-right">
              <a class="level-item">
                <span class="tag is-danger" @click="handleDel">删除</span>
              </a>
            </div>
          </nav>
        </div>
      </el-card>

      <CommentList :post-id="$route.params.id" :type="type"></CommentList>
    </div>

    <div class="column is-one-quarter">
      <PhotoCardBar></PhotoCardBar>
    </div>
  </div>
</template>

<script>
import { getPhoto, delPhoto, delPhotoByAdmin, goodPhoto } from '@/api/photo'
import PhotoCardBar from 'components/layout/PhotoCardBar'
import CommentList from '@/components/comment/CommentList'
import { mapGetters } from 'vuex'

export default {
  name: "Photo",
  components: {
    PhotoCardBar,
    CommentList
  },
  data() {
    return {
      photo: {},
      photoUser: {},
      type: 'photo'
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    this.fetchPhoto()
  },
  methods: {
    async fetchPhoto() {
      getPhoto(this.$route.params.id)
          .then((res) => {
            let { data } = res
            this.photo = data.photo
            this.photoUser = data.user
          })
    },
    handleDel() {
      if (window.confirm("确认删除本话题？")) {
        if (this.user.roleId === 1 || this.user.roleId === 2) {
          delPhotoByAdmin(this.photo.id).then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({ name: 'PhotoStream' })
            }, 1000)
          })
        } else {
          delPhoto(this.photo.id).then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({ name: 'PhotoStream' })
            }, 1000)
          })
        }
      }
    },
    handleGood() {
      goodPhoto(this.photo.id).then(() => {
        this.fetchPhoto()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.photo-content
  font-size 1.25em
  line-height 1.75em
</style>