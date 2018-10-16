<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="12" :xs="12" :sm="24" :lg="12">
                  <el-form-item label-width="80px" label="类别:" class="productInfo-container-item">
                    <el-select v-model="postForm.newsClass" placeholder="请选择">
                      <el-option
                        v-for="item in newsClassOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12" :xs="12" :sm="24" :lg="12" >
                  <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.releaseTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="productInfo-container">
              <el-row>
                <el-col :span="12" :xs="12" :sm="24" :lg="12">
                  <el-form-item label-width="80px" label="作者:" class="postInfo-container-item">
                    <!--<el-input v-model="postForm.author" placeholder="请输入作者"/>-->
                    <el-input :rows="1" v-model="postForm.author" type="textarea" class="article-textarea" autosize placeholder="请输入作者"/>
                  </el-form-item>
                </el-col>

                <el-col :span="12" :xs="12" :sm="24" :lg="12" >
                  <el-form-item label-width="80px" label="新闻标签:" class="productInfo-container-item">
                    <!--<el-date-picker v-model="postForm.tags" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>-->
                    <el-input :rows="1" v-model="postForm.tags" type="textarea" class="article-textarea" autosize placeholder="请输入标签,多个标签用逗号隔开"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="80px" label="摘要:">
          <el-input :rows="1" v-model="postForm.synopsis" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
          <span v-show="synopsisLength" class="word-counter">{{ synopsisLength }}字</span>
        </el-form-item>

        <el-form-item style="margin-bottom: 40px;" label-width="80px" label="图片:">
          <el-upload
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :headers="myHeaders"
            :file-list="fileList"
            :action="uploadUrl()"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="picVisible">
            <img :src="postForm.titlePic" width="100%" alt="">
          </el-dialog>
        </el-form-item>

        <div class="editor-container">
          <Tinymce ref="editor" :height="400" v-model="postForm.content" />
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validateURL } from '@/utils/validate'
import { getToken } from '@/utils/auth'
import { fetchClazzList } from '@/api/official-site/base-info/clazzConf'
import { fetchNews, createNews, updateNews } from '@/api/official-site/news-center/news'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  synopsis: '', // 文章摘要
  titlePic: '', // 文章图片
  releaseTime: '', // 前台展示时间
  id: undefined,
  newsClass: '', // 新闻类别
  tags: '', // 新闻标签
  author: '', // 新闻作者
  readingTimes: 0
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Upload, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      newsClassOptions: [],
      myHeaders: {
        'x-auth-token': getToken() // 文件上传携带token
      },
      editFlag: this.isEdit,
      fileList: [],
      picVisible: false,
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      }
    }
  },
  computed: {
    synopsisLength() {
      return this.postForm.synopsis.length
    }
  },
  created() {
    fetchClazzList({ clazzName: 'NEWS' }).then(response => {
      if (response.data.code === 20000) {
        this.newsClassOptions = response.data.data
      }
    })
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    uploadUrl() {
      return process.env.BASE_API + '/official/website/news/upload'
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
      this.postForm.titlePic = file.response.data
      this.picVisible = true
    },
    handleSuccess(res, file, fileList) {
      if (res.code === 20000) {
        this.postForm.titlePic = res.data
      }
    },
    fetchData(id) {
      fetchNews(id).then(response => {
        this.postForm = response.data.data
        this.fileList.splice(0, this.fileList.length) // 清空
        this.fileList.push({ name: response.data.data.id, url: response.data.data.titlePic })
        // Just for test
        // this.postForm.title += `   Article Id:${this.postForm.id}`
        // this.postForm.synopsis += `   Article Id:${this.postForm.id}`
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postForm.status = '1' // published
          if (!this.editFlag) {
            createNews(this.postForm).then(response => {
              if (response.data.code === 20000) {
                this.postForm.id = response.data.data.id
                this.editFlag = true // 第一次点击发布后,isEdit标志修改为false,避免后续点击发布按钮重新添加为新的文章
                this.$notify({
                  title: '成功',
                  message: '发布文章成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$notify({
                  title: '成功',
                  message: '发布文章成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          } else {
            updateNews(this.postForm).then(response => {
              if (response.data.code === 20000) {
                this.$notify({
                  title: '成功',
                  message: '更新文章成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$notify({
                  title: '成功',
                  message: '更新文章成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
          this.loading = false
        } else {
          console.log('error submit!!')
          this.$message.error('信息填写有错误')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.loading = true
      this.postForm.status = '0' // draft
      if (!this.editFlag) {
        createNews(this.postForm).then(response => {
          this.postForm.id = response.data.data.id
          this.editFlag = true // 第一次点击发布后,isEdit标志修改为false,避免后续点击发布按钮重新添加为新的文章
          if (response.data.code === 20000) {
            this.$notify({
              title: '成功',
              message: '保存草稿成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: '成功',
              message: '保存草稿成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      } else {
        updateNews(this.postForm).then(response => {
          if (response.data.code === 20000) {
            this.$notify({
              title: '成功',
              message: '更新草稿成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: '成功',
              message: '更新草稿成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      }
      this.loading = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
