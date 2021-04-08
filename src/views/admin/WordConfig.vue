<template>
  <div id="word-config">
    <div class="title">
      <span class="title-text">敏&nbsp;感&nbsp;词&nbsp;设&nbsp;置</span>
      <div class="title-btn">
        <el-tooltip class="item" effect="dark" content="添加" placement="left">
          <el-button type="success" icon="el-icon-plus" circle @click="addWord"></el-button>
        </el-tooltip>
      </div>
    </div>

    <el-divider></el-divider>

    <div>
          <div>
            <el-table
                :data="wordList"
                :max-height="tableHeight"
                :default-sort = "{ prop: 'id', order: 'ascending' }"
                style="width: 100%"
            >
              <el-table-column
                  prop="id"
                  label="ID"
                  min-width="6"
                  sortable
              ></el-table-column>

              <el-table-column
                  prop="word"
                  label="敏感内容"
              ></el-table-column>

              <el-table-column min-width="6">
                <template slot-scope="scope">
                  <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      @click="deleteWord(scope.row.id)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
    </div>
  </div>
</template>

<script>
import { getSensitiveWord, delSensitiveWord, addSensitiveWord } from '@/api/config'

export default {
  name: "WordConfig",
  data() {
    return {
      wordList: [],
      tableHeight: window.innerHeight * 0.75,
    }
  },
  created() {
    this.fetchSensitiveWord()
  },
  methods: {
    async fetchSensitiveWord() {
      getSensitiveWord().then((res) => {
        this.wordList = res.data
      })
    },
    deleteWord(id) {
      if (window.confirm('确定要删除吗？')) {
        delSensitiveWord(id).then(() => {
          this.$notify({
            position: 'bottom-right',
            title: '敏感词删除成功',
            type: 'success'
          })
          this.fetchSensitiveWord()
        })
      }
    },
    addWord() {
      let words = window.prompt("请输入敏感词\n多个词之前请使用','隔开")
      if (words != null && words !== '') {
        let body = words.split(',')
        addSensitiveWord(body).then(() => {
          this.$notify({
            position: 'bottom-right',
            title: '敏感词添加成功',
            type: 'success'
          })
          this.fetchSensitiveWord()
        })
      } else {
        window.alert('输入不能为空！')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  text-align left
  &-text
    font-size 1em
  &-btn
    height 1em
    line-height 1em
    float right
</style>