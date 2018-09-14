<template>
  <div class="baseInfo-container">
    <el-form ref="webForm" :model="webForm" :rules="rules" class="form-container">

      <div class="baseInfo-main-container">
        <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;" title="网站基本信息配置" type="success"/>
        <el-button size="small" type="success" @click="submitForm">更新</el-button>
        <el-row>

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="site_name">
              <MDinput v-model="webForm.site_name" :maxlength="100" name="name" required>
                网站名称
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="12" style="padding-left: 0">
            <div class="input-wrapper">
              <el-form-item style="margin-bottom: 40px;" label-width="100px" label="网站Logo:">
                <el-upload
                  :on-preview="handleLogoPreview"
                  :on-remove="handleRemove"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card">
                  <i class="el-icon-plus"/>
                </el-upload>
                <el-dialog :visible.sync="logoVisible">
                  <img :src="webForm.logo_url" width="100%" alt="">
                </el-dialog>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12" style="padding-left: 0">
            <div class="input-wrapper">
              <el-form-item style="margin-bottom: 40px;" label-width="100px" label="二维码:">
                <el-upload
                  :on-preview="handleQRPreview"
                  :on-remove="handleRemove"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card">
                  <i class="el-icon-plus"/>
                </el-upload>
                <el-dialog :visible.sync="qrVisible">
                  <img :src="webForm.qr_code_url" width="100%" alt="">
                </el-dialog>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="100px" label="网站关键字:">
          <el-input :rows="1" v-model="webForm.key_words" type="textarea" class="article-textarea" autosize placeholder="请输入关键字"/>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" label-width="100px" label="首页描述:">
          <el-input :rows="1" v-model="webForm.description" type="textarea" class="article-textarea" autosize placeholder="请输入描述"/>
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item>

        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8" style="padding: 0;">
            <div class="input-wrapper">
              <el-form-item style="margin-bottom: 40px;" label-width="100px" label="联系方式:">
                <el-input :rows="1" v-model="webForm.contact" type="textarea" class="article-textarea" autosize placeholder="请输入联系方式"/>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="8" style="padding: 0">
            <div class="input-wrapper">
              <el-form-item style="margin-bottom: 40px;" label-width="100px" label="备案信息:">
                <el-input :rows="1" v-model="webForm.record" type="textarea" class="article-textarea" autosize placeholder="请输入备案信息"/>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="8" style="padding: 0">
            <div class="input-wrapper">
              <el-form-item style="margin-bottom: 40px;" label-width="100px" label="版权信息:">
                <el-input :rows="1" v-model="webForm.copyright" type="textarea" class="article-textarea" autosize placeholder="请输入版权信息"/>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

      </div>
    </el-form>

  </div>
</template>

<script>
/* eslint-disable semi */

import MDinput from '@/components/MDinput'
import { validateURL } from '@/utils/validate'

const defaultForm = {
  site_name: '', // 网站名称
  logo_url: '', // logo URL
  qr_code_url: '', // 二维码URL
  key_words: '', // 关键字
  description: '', // 描述
  contact: '', // 联系方式
  record: '', // 备案信息
  copyright: '' // 版权信息
};

export default {
  name: 'WebInfo',
  components: { MDinput },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        });
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    };
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          });
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    };
    return {
      webForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      logoVisible: false,
      qrVisible: false,
      rules: {
        site_name: [{ validator: validateRequire }],
        description: [{ validator: validateRequire }],
        key_words: [{ validator: validateRequire }],
        logo_url: [{ validator: validateSourceUri, trigger: 'blur' }],
        qr_code_url: [{ validator: validateSourceUri, trigger: 'blur' }]
      }
    }
  },
  computed: {
    contentShortLength() {
      return this.webForm.description.length
    }
  },
  created() {

  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleQRPreview(file) {
      this.webForm.qr_code_url = file.url;
      this.qrVisible = true;
    },
    handleLogoPreview(file) {
      this.webForm.logo_url = file.url;
      this.logoVisible = true;
    },
    submitForm() {
      this.webForm.display_time = parseInt(this.display_time / 1000);
      console.log(this.webForm);
      this.$refs.webForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$notify({
            title: '成功',
            message: '更新网站信息成功',
            type: 'success',
            duration: 2000
          });
          this.webForm.status = 'published';
          this.loading = false
        } else {
          console.log('error submit!!');
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .baseInfo-container {
    position: relative;
    .baseInfo-main-container {
      .input-wrapper {
        background: #fff;
        padding: 0 16px 0;
        margin-bottom: 32px;
      }
      padding: 40px 45px 20px 50px;
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
</style>
