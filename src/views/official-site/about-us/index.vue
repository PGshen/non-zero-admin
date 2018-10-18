<template>
  <div class="app-container calendar-list-container">
    <div class="baseInfo-main-container">
      <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;" title="关于我们" type="success"/>
      <el-button v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:add') !== -1" size="small" type="success" @click="handleCreate">新增</el-button>

      <el-row :gutter="32" style="margin: 20px 0;">
        <el-col :xs="24" :sm="24" :lg="24" style="padding-left: 0">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane v-for="item in clazzOptions" :label="item.label" :key="item.value" :name="item.value">
              <keep-alive>
                <about-us-tab-pane v-if="activeName===item.value" ref="autp" :type="item.value" @handleEdit="handleUpdate"/>
              </keep-alive>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>

    </div>
    <el-dialog :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogFormVisible" width="80%">
      <el-form :model="aboutUs" class="small-space about-us-form" label-position="left" label-width="70px">
        <el-form-item class="about-us-form-item" label="类别">
          <el-select v-model="aboutUs.aboutUsClass" placeholder="请选择">
            <el-option
              v-for="item in clazzOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item class="about-us-form-item" label="启用">
          <el-switch
            v-model="aboutUs.isEnable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"/>
        </el-form-item>

        <el-form-item class="about-us-form-item" label="标题">
          <el-input
            v-model="aboutUs.heading"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="about-us-form-item" label="副标题">
          <el-input
            v-model="aboutUs.subHeading"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item style="margin-bottom: 40px;" label="图片">
          <el-upload
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :headers="myHeaders"
            :action="uploadUrl()"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="picVisible">
            <img :src="aboutUs.pic" width="100%" alt="">
          </el-dialog>
        </el-form-item>

        <div class="editor-container">
          <Tinymce :height="400" v-model="aboutUs.text" />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable semi */

import aboutUsTabPane from './components/aboutUsTabPane'
import Tinymce from '@/components/Tinymce'
import { mapGetters } from 'vuex'
import { createAboutUs, updateAboutUs } from '@/api/official-site/about-us/aboutUs';
import { fetchClazzList } from '@/api/official-site/base-info/clazzConf';
import { getToken } from '@/utils/auth'

export default {
  name: 'AboutUs',
  components: { aboutUsTabPane, Tinymce },
  data() {
    return {
      aboutUs: {
        id: null,
        aboutUsClass: '',
        updateTime: '',
        heading: '',
        subHeading: '',
        text: '',
        pic: '',
        isEnable: ''
      },
      myHeaders: {
        'x-auth-token': getToken() // 文件上传携带token
      },
      fileList: [],
      tabMapOptions: [
        { label: '企业简介', key: 'INTRODUCTION' },
        { label: '企业文化', key: 'CULTURE' },
        { label: '资质荣誉', key: 'HONOR' }
      ],
      activeName: '',
      loading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      picVisible: false,
      clazzOptions: null,
      options: [{
        value: 'INTRODUCTION',
        label: '企业简介'
      }, {
        value: 'CULTURE',
        label: '企业文化'
      }, {
        value: 'HONOR',
        label: '资质荣誉'
      }],
      type: 'INTRODUCTION'
    }
  },
  computed: {
    ...mapGetters([
      'permList'
    ])
  },
  created() {
    fetchClazzList({ clazzName: 'ABOUT_US' }).then(response => {
      if (response.data.code === 20000) {
        this.clazzOptions = response.data.data;
      }
    });
  },
  methods: {
    uploadUrl() {
      return process.env.BASE_API + '/official/website/about/us/upload'
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
      this.aboutUs.pic = file.response.data;
      this.picVisible = true;
    },
    handleSuccess(res, file, fileList) {
      if (res.code === 20000) {
        this.aboutUs.pic = res.data;
      }
    },
    handleCreate() {
      this.aboutUs.id = '';
      this.aboutUs.created_time = '';
      this.aboutUs.heading = '';
      this.aboutUs.sub_heading = '';
      this.aboutUs.text = '';
      this.aboutUs.pic = '';
      this.aboutUs.enable = '';
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    handleUpdate(aboutUs) {
      this.aboutUs = aboutUs;
      this.aboutUs.aboutUsClass = aboutUs.aboutUsClass;
      this.fileList.splice(0, this.fileList.length); // 清空
      this.fileList.push({ name: aboutUs.id, url: aboutUs.pic });
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
    },
    create() {
      delete this.aboutUs.updateTime;
      createAboutUs(this.aboutUs).then(response => {
        if (response.data.status) {
          this.dialogFormVisible = false;
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          });
        } else {
          this.$notify({
            title: '失败',
            message: '创建失败',
            type: 'fail',
            duration: 2000
          })
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    update() {
      updateAboutUs(this.aboutUs).then(response => {
        if (response.data.status) {
          this.dialogFormVisible = false;
          this.$notify({
            title: '成功',
            message: '更新成功',
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
      }).catch(err => {
        this.$message.error(err);
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .baseInfo-main-container {
    .input-wrapper {
      background: #fff;
      padding: 0 16px 0;
      margin-bottom: 32px;
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
  .about-us-form {
    width: 92%;
    margin-left: 4%;
    .about-us-form-item {
      display: inline-block;
      width: 100%;
    }
  }
</style>
