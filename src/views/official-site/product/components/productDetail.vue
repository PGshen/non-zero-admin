<template>
  <div class="createProduct-container">
    <el-form ref="productForm" :model="productForm" :rules="rules" class="form-container">

      <sticky :class-name="'sub-navbar '+productForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>
      </sticky>

      <div class="createProduct-main-container">
        <el-row>

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="productForm.first_heading" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <el-form-item style="margin-bottom: 40px;" label-width="80px" label="二级标题:">
                  <el-input :rows="1" v-model="productForm.secondary_heading" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item style="margin-bottom: 40px;" label-width="80px" label="三级标题:">
                  <el-input :rows="1" v-model="productForm.tertiary_heading" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="productInfo-container">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="80px" label="产品类别:" class="productInfo-container-item">
                    <el-select v-model="productForm.product_class" :remote-method="getRemoteProductClassList" filterable remote placeholder="搜索产品类别">
                      <el-option v-for="(item,index) in productClassOptions" :key="item+index" :label="item" :value="item"/>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label-width="80px" label="创建时间:" class="productInfo-container-item">
                    <el-date-picker v-model="productForm.create_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="80px" label="产品摘要:">
          <el-input :rows="1" v-model="productForm.product_synopsis" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
        </el-form-item>

        <el-row>
          <el-col :xs="24" :sm="24" :lg="12" style="padding-left: 0">
            <div class="input-wrapper">
              <el-form-item style="margin-bottom: 40px;" label-width="80px" label="产品图片:">
                <el-upload
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card">
                  <i class="el-icon-plus"/>
                </el-upload>
                <el-dialog :visible.sync="picVisible">
                  <img :src="productForm.product_pic" width="100%" alt="">
                </el-dialog>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <div class="editor-container">
          <Tinymce ref="editor" :height="400" v-model="productForm.product_text" />
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchProduct, productSearch } from '@/api/official-site/product/product'

const defaultForm = {
  id: undefined,
  create_time: undefined,
  update_time: undefined,
  first_heading: '',
  secondary_heading: '',
  tertiary_heading: '',
  product_synopsis: '',
  product_text: '',
  product_pic: '',
  is_enable: 'draft',
  create_user: ''
}

export default {
  name: 'ProductDetail',
  components: { Tinymce, MDinput, Sticky },
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
    return {
      productForm: Object.assign({}, defaultForm),
      loading: false,
      productClassOptions: [], // 从数据库获取类别
      picVisible: false,
      rules: {
        first_heading: [{ validator: validateRequire }],
        product_text: [{ validator: validateRequire }],
        product_pic: [{ validator: validateRequire }]
      }
    }
  },
  computed: {
    contentShortLength() {
      return this.productForm.product_text.length
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.productForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      this.productForm.product_pic = file.url
      this.picVisible = true
    },
    fetchData(id) {
      fetchProduct(id).then(response => {
        this.productForm = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.productForm.create_time = parseInt(this.create_time / 1000)
      console.log(this.productForm)
      this.$refs.productForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '新增产品成功',
            type: 'success',
            duration: 2000
          })
          this.productForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.productForm.first_heading.length === 0 || this.productForm.product_text.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.productForm.status = 'draft'
    },
    getRemoteProductClassList(query) {
      productSearch(query).then(response => {
        if (!response.data.items) return
        this.productClassOptions = response.data.items.map(v => v.name)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .createProduct-container {
    position: relative;
    .createProduct-main-container {
      padding: 40px 45px 20px 50px;
      .productInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .productInfo-container-item {
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