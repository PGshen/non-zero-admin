<template>
  <div class="app-container calendar-list-container">
    <!--<div class="form-container">-->

    <div class="baseInfo-main-container">
      <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;" title="类别元数据配置" type="success"/>
      <el-button v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:add') !== -1" size="small" type="success" @click="handleCreate">新增</el-button>

      <el-row :gutter="32" style="margin: 20px 0;">
        <el-col :xs="24" :sm="24" :lg="24" style="padding-left: 0">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key="item.key" :name="item.key">
              <keep-alive>
                <tab-pane v-if="activeName===item.key" :type="item.key"/>
              </keep-alive>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>

    </div>
    <el-dialog :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form :model="clazz" class="small-space clazz-form" label-position="left" label-width="70px">
        <el-form-item class="clazz-form-item" label="类别类型">
          <el-select v-model="clazz.clazzName" placeholder="请选择">
            <el-option
              v-for="item in tabMapOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"/>
          </el-select>
        </el-form-item>

        <el-form-item class="clazz-form-item" label="启用">
          <el-switch
            v-model="clazz.isEnable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"/>
        </el-form-item>

        <el-form-item class="clazz-form-item" label="类别值">
          <el-input
            v-model="clazz.clazzValue"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="clazz-form-item" label="备注">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="clazz.remark"
            style="width: 90%;"
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </div>
    </el-dialog>
  </div>

  <!--</div>-->
</template>

<script>
/* eslint-disable semi */

import tabPane from './components/tabPane'
import { mapGetters } from 'vuex'
import { createClazzMate } from '@/api/official-site/base-info/clazzConf'

export default {
  name: 'ClassConf',
  components: { tabPane },
  data() {
    return {
      clazz: {
        id: '',
        clazzName: 'ABOUT_US',
        clazzValue: '',
        isEnable: '1',
        remark: '',
        updateTime: ''
      },
      tabMapOptions: [
        { label: '关于我们', key: 'ABOUT_US' },
        { label: '新闻类别', key: 'NEWS' },
        { label: '产品类别', key: 'PRODUCT' },
        { label: '方案类别', key: 'SOLUTION' },
        { label: '案例类别', key: 'CASE' },
        { label: '首屏类别', key: 'FIRST_SCREEN' },
        { label: '职位类别', key: 'CAPACITY' }
      ],
      activeName: 'ABOUT_US',
      loading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑类别',
        create: '创建类别'
      }
    }
  },
  computed: {
    ...mapGetters([
      'permList'
    ])
  },
  created() {

  },
  methods: {
    handleCreate() {
      this.clazz.id = undefined;
      this.clazz.clazzName = 'ABOUT_US';
      this.clazz.clazzValue = '';
      this.clazz.isEnable = '1';
      this.clazz.updateTime = '';
      this.clazz.remark = '';
      this.dialogStatus = 'create';
      this.dialogFormVisible = true
    },
    create() {
      delete this.clazz.updateTime;
      createClazzMate(this.clazz).then(response => {
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
