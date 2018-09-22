<template>
  <div class="app-container calendar-list-container">
    <div class="baseInfo-main-container">
      <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;" title="页面首屏配置" type="success"/>
      <el-button size="small" type="success" @click="handleCreate">新增</el-button>

      <el-row :gutter="32" style="margin: 20px 0;">
        <el-col :xs="24" :sm="24" :lg="24" style="padding-left: 0">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key="item.key" :name="item.key">
              <keep-alive>
                <fsc-tab-pane v-if="activeName===item.key" :type="item.key"/>
              </keep-alive>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>

    </div>
    <el-dialog :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form :model="first_screen" class="small-space first_screen-form" label-position="left" label-width="70px">
        <el-form-item class="first_screen-form-item" label="首屏">
          <el-select v-model="first_screen.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item class="first_screen-form-item" label="标题">
          <el-input
            v-model="first_screen.heading"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="first_screen-form-item" label="副标题">
          <el-input
            v-model="first_screen.sub_heading"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="first_screen-form-item" label="启用">
          <el-switch
            v-model="first_screen.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
        </el-form-item>

        <el-form-item class="first_screen-form-item" label="描述">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="first_screen.description"
            style="width: 90%;"
            type="textarea"
            placeholder="请输入内容"/>
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
            <img :src="first_screen.pic" width="100%" alt="">
          </el-dialog>
        </el-form-item>
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

import fscTabPane from './components/fscTabPane'

export default {
  name: 'FirstScreenConf',
  components: { fscTabPane },
  data() {
    return {
      first_screen: {
        id: null,
        type: '',
        created_time: '',
        heading: '',
        sub_heading: '',
        description: '',
        pic: '',
        enable: ''
      },
      tabMapOptions: [
        { label: '关于我们', key: 'ABOUT_US' },
        { label: '联系我们', key: 'CONTACT_US' },
        { label: '产品中心', key: 'PRODUCT' },
        { label: '解决方案', key: 'SOLUTION' },
        { label: '客户案例', key: 'CASE' },
        { label: '新闻中心', key: 'NEWS' },
        { label: '人才招聘', key: 'RECRUIT' }
      ],
      activeName: 'ABOUT_US',
      loading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      picVisible: false,
      options: [{
        value: 'ABOUT_US',
        label: '关于我们'
      }, {
        value: 'CONTACT_US',
        label: '联系我们'
      }, {
        value: 'NEWS',
        label: '新闻中心'
      }, {
        value: 'PRODUCT',
        label: '产品中心'
      }, {
        value: 'SOLUTION',
        label: '解决方案'
      }, {
        value: 'CASE',
        label: '客户案例'
      }, {
        value: 'RECRUIT',
        label: '人才招聘'
      }],
      type: 'ABOUT_US'
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
      this.first_screen.pic = file.url;
      this.picVisible = true;
    },
    handleCreate() {
      this.first_screen.id = '';
      this.first_screen.created_time = '';
      this.first_screen.heading = '';
      this.first_screen.sub_heading = '';
      this.first_screen.description = '';
      this.first_screen.pic = '';
      this.first_screen.enable = '';
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
  }
</style>
