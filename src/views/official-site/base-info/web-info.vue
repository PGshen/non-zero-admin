<template>
  <div class="baseInfo-container">
    <el-form ref="webForm" :model="webForm" :rules="rules" class="form-container">

      <div class="baseInfo-main-container">
        <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;" title="网站基本信息配置" type="success"/>
        <el-button size="small" type="success" @click="update">更新</el-button>
        <el-row>

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="siteName">
              <MDinput v-model="webForm.siteName" :maxlength="100" name="name" required>
                网站名称
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="24" style="padding-left: 0">
            <div class="input-wrapper">
              <el-form-item style="margin-bottom: 40px;" label-width="100px" label="网站Logo:">
                <pan-thumb :image="webForm.logoUrl"/>

                <el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="logoShow=true">Change Logo
                </el-button>

                <image-cropper
                  v-show="logoShow"
                  :width="300"
                  :height="300"
                  :key="logoCropperKey"
                  url="/official/website/base/info/upload"
                  lang-type="en"
                  @close="closeLogo"
                  @crop-upload-success="cropLogoSuccess"/>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="24" style="padding-left: 0">
            <div class="input-wrapper">
              <el-form-item style="margin-bottom: 40px;" label-width="100px" label="二维码:">
                <img :src="webForm.qrCodeUrl" class="qrcode">

                <el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="qrCodeShow=true">Change QRcode
                </el-button>

                <image-cropper
                  v-show="qrCodeShow"
                  :width="300"
                  :height="300"
                  :key="qrCodeCropperKey"
                  url="/official/website/base/info/upload"
                  lang-type="en"
                  @close="closeQRCode"
                  @crop-upload-success="cropQRCodeSuccess"/>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="100px" label="网站关键字:">
          <el-input :rows="1" v-model="webForm.keyWords" type="textarea" class="article-textarea" autosize placeholder="请输入关键字"/>
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
import Upload from '@/components/Upload/singleImage'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { validateURL } from '@/utils/validate'
import { fetchInfo, updateInfo } from '@/api/official-site/base-info/webInfo'

const defaultForm = {
  siteName: '', // 网站名称
  logoUrl: '', // logo URL
  qrCodeUrl: '', // 二维码URL
  keyWords: '', // 关键字
  description: '', // 描述
  contact: '', // 联系方式
  record: '', // 备案信息
  copyright: '' // 版权信息
};

export default {
  name: 'WebInfo',
  components: { MDinput, Upload, ImageCropper, PanThumb },
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
      logoShow: false,
      qrCodeShow: false,
      logoCropperKey: 0,
      qrCodeCropperKey: 0,
      rules: {
        siteName: [{ validator: validateRequire }],
        description: [{ validator: validateRequire }],
        keyWords: [{ validator: validateRequire }],
        logoUrl: [{ validator: validateSourceUri, trigger: 'blur' }],
        qrCodeUrl: [{ validator: validateSourceUri, trigger: 'blur' }]
      }
    }
  },
  computed: {
    contentShortLength() {
      return this.webForm.description.length
    }
  },
  created() {
    this.fetchInfo()
  },
  methods: {
    cropLogoSuccess(resData) {
      this.logoShow = false
      this.logoCropperKey = this.logoCropperKey + 1
      this.webForm.logoUrl = resData.data
    },
    closeLogo() {
      this.logoShow = false
    },
    cropQRCodeSuccess(resData) {
      this.qrCodeShow = false
      this.qrCodeCropperKey = this.qrCodeCropperKey + 1
      this.webForm.qrCodeUrl = resData.data
    },
    closeQRCode() {
      this.qrCodeShow = false
    },
    fetchInfo() {
      fetchInfo().then(response => {
        if (response.data.status) {
          this.$notify({
            title: '成功',
            message: '获取信息成功',
            type: 'success',
            duration: 2000
          });
          this.webForm = response.data.data;
          this.webForm.logoUrl = response.data.data.logoUrl;
          this.webForm.qrCodeUrl = response.data.data.qrCodeUrl;
        } else {
          this.$notify({
            title: '失败',
            message: '获取失败',
            type: 'fail',
            duration: 2000
          })
        }
      })
    },
    update() {
      console.log(this.webForm);
      this.loading = true;
      this.$refs.webForm.validate(valid => {
        if (valid) {
          this.loading = true;
          updateInfo(this.webForm).then(response => {
            if (response.data.status) {
              this.webForm = response.data.data;
              this.$notify({
                title: '成功',
                message: '更新网站信息成功',
                type: 'success',
                duration: 2000
              });
            } else {
              this.$notify({
                title: '失败',
                message: '更新失败',
                type: 'fail',
                duration: 2000
              });
            }
          });
          this.loading = false;
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
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 20%;
  }
  .qrcode{
    width: 150px;
    height: 150px;
  }
</style>
