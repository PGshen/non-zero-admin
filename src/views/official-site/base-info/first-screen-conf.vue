<template>
  <div class="app-container calendar-list-container">
    <div class="baseInfo-main-container">
      <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;" title="页面首屏配置" type="success"/>
      <el-button v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:add') !== -1" size="small" type="success" @click="handleCreate">新增</el-button>

      <el-row :gutter="32" style="margin: 20px 0;">
        <el-col :xs="24" :sm="24" :lg="24" style="padding-left: 0">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane v-for="item in clazzOptions" :label="item.label" :key="item.value" :name="item.value">
              <keep-alive>
                <fsc-tab-pane v-if="activeName===item.value" :type="item.value"/>
              </keep-alive>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>

    </div>
    <el-dialog :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form :model="first_screen" class="small-space first_screen-form" label-position="left" label-width="70px">
        <el-form-item class="first_screen-form-item" label="首屏">
          <el-select v-model="first_screen.firstScreenClass" placeholder="请选择">
            <el-option
              v-for="item in clazzOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item class="clazz-form-item" label="启用">
          <el-switch
            v-model="first_screen.isEnable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"/>
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
            v-model="first_screen.subHeading"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
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
            :on-success="handleSuccess"
            :headers="myHeaders"
            action="http://localhost:8088/official/website/first/screen/upload"
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
import { mapGetters } from 'vuex'
import { createFirstScreen } from '@/api/official-site/base-info/firstScreenConf';
import { fetchClazzList } from '@/api/official-site/base-info/clazzConf';
import { getToken } from '@/utils/auth'

export default {
  name: 'FirstScreenConf',
  components: { fscTabPane },
  data() {
    return {
      first_screen: {
        id: null,
        firstScreenClass: '',
        updateTime: '',
        heading: '',
        subHeading: '',
        description: '',
        pic: '',
        isEnable: ''
      },
      myHeaders: {
        'x-auth-token': getToken() // 文件上传携带token
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
      type: 'ABOUT_US'
    }
  },
  computed: {
    ...mapGetters([
      'permList'
    ])
  },
  created() {
    fetchClazzList({ clazzName: 'FIRST_SCREEN' }).then(response => {
      if (response.data.code === 20000) {
        this.clazzOptions = response.data.data;
      }
    });
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
      this.first_screen.pic = file.response.data;
      this.picVisible = true;
    },
    handleSuccess(res, file, fileList) {
      if (res.code === 20000) {
        this.first_screen.pic = res.data;
      }
    },
    handleCreate() {
      // fetchClazzList({ clazzName: 'FIRST_SCREEN' }).then(response => {
      //   if (response.data.code === 20000) {
      //     this.clazzOptions = response.data.data;
      //     console.log(this.clazzOptions);
      //   }
      // });
      this.first_screen.id = undefined;
      this.first_screen.firstScreenClass = '';
      this.first_screen.updateTime = '';
      this.first_screen.heading = '';
      this.first_screen.subHeading = '';
      this.first_screen.description = '';
      this.first_screen.pic = '';
      this.first_screen.isEnable = '1';
      this.dialogStatus = 'create';
      this.dialogFormVisible = true
    },
    create() {
      delete this.first_screen.updateTime;
      createFirstScreen(this.first_screen).then(response => {
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
  }
</style>
