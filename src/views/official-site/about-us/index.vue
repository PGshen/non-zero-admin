<template>
  <div class="app-container calendar-list-container">
    <div class="baseInfo-main-container">
      <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;" title="关于我们" type="success"/>
      <el-button size="small" type="success" @click="handleCreate">新增</el-button>

      <el-row :gutter="32" style="margin: 20px 0;">
        <el-col :xs="24" :sm="24" :lg="24" style="padding-left: 0">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key="item.key" :name="item.key">
              <keep-alive>
                <about-us-tab-pane v-if="activeName===item.key" :type="item.key"/>
              </keep-alive>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>

    </div>
    <el-dialog :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogFormVisible" width="80%">
      <el-form :model="about_us" class="small-space about-us-form" label-position="left" label-width="70px">
        <el-form-item class="about-us-form-item" label="类别">
          <el-select v-model="about_us.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item class="about-us-form-item" label="启用">
          <el-switch
            v-model="about_us.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
        </el-form-item>

        <el-form-item class="about-us-form-item" label="标题">
          <el-input
            v-model="about_us.heading"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="about-us-form-item" label="副标题">
          <el-input
            v-model="about_us.sub_heading"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item style="margin-bottom: 40px;" label="图片">
          <el-upload
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="picVisible">
            <img :src="about_us.pic" width="100%" alt="">
          </el-dialog>
        </el-form-item>

        <div class="editor-container">
          <Tinymce :height="400" v-model="about_us.text" />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable semi */

import aboutUsTabPane from './components/aboutUsTabPane'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'AboutUs',
  components: { aboutUsTabPane, Tinymce },
  data() {
    return {
      about_us: {
        id: null,
        type: '',
        created_time: '',
        heading: '',
        sub_heading: '',
        text: '',
        pic: '',
        enable: ''
      },
      tabMapOptions: [
        { label: '企业简介', key: 'INTRODUCTION' },
        { label: '企业文化', key: 'CULTURE' },
        { label: '资质荣誉', key: 'HONOR' }
      ],
      activeName: 'INTRODUCTION',
      loading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      picVisible: false,
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

  },
  created() {

  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      this.about_us.pic = file.url;
      this.picVisible = true;
    },
    handleCreate() {
      this.about_us.id = '';
      this.about_us.created_time = '';
      this.about_us.heading = '';
      this.about_us.sub_heading = '';
      this.about_us.text = '';
      this.about_us.pic = '';
      this.about_us.enable = '';
      this.dialogStatus = 'create';
      this.dialogFormVisible = true
    },
    create() {}
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
