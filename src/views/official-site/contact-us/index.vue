<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.cond.heading"
        style="width: 200px;"
        class="filter-item"
        placeholder="标题"
        @keyup.enter.native="handleFilter"/>

      <el-select
        v-model="listQuery.enable"
        style="width: 120px"
        class="filter-item"
        placeholder="筛选"
        @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>

      <el-button v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:list') !== -1" class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      <el-button v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:add') !== -1" class="filter-item" style="margin-left: 10px;" type="primary" icon="edit" @click="handleCreate">
        添加
      </el-button>

    </div>

    <el-table
      v-loading.body="listLoading"
      :data="contactUsList"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130px" align="left" label="Name">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" align="left" label="Address">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="left" label="CooperationEmail">
        <template slot-scope="scope">
          <span>{{ scope.row.cooperation_email }}</span>
        </template>
      </el-table-column>

      <el-table-column width="90px" align="center" label="Telephone">
        <template slot-scope="scope">
          <span>{{ scope.row.office_telephone }}</span>
        </template>
      </el-table-column>

      <el-table-column width="90px" align="center" label="HotLine">
        <template slot-scope="scope">
          <span>{{ scope.row.hotline }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="ZipCode">
        <template slot-scope="scope">
          <span>{{ scope.row.zip_code }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="Picture">
        <template slot-scope="scope">
          <img :src="scope.row.pic" width="100%">
        </template>
      </el-table-column>

      <el-table-column width="250px" align="center" label="Operation">
        <template slot-scope="scope">
          <el-button
            v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:update') !== -1"
            size="mini"
            type="primary"
            @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button
            v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:ban') !== -1 && scope.row.enable === 1"
            size="mini"
            type="warning"
            @click="handleUpdate(scope.row)">禁用
          </el-button>
          <el-button
            v-else-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:ban') !== -1 && scope.row.enable === 0"
            size="mini"
            type="success"
            @click="handleUpdate(scope.row)">启用
          </el-button>
          <el-button
            v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:delete') !== -1"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[5,10]"
        :page-size="listQuery.size"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form :model="contactUs" class="small-space contact-us-form" label-position="left" label-width="70px">
        <el-form-item class="contact-us-form-item" label="名称">
          <el-input
            v-model="contactUs.name"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="contact-us-form-item" label="启用">
          <el-switch
            v-model="contactUs.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
        </el-form-item>

        <el-form-item class="contact-us-form-item" label="办公地址">
          <el-input
            v-model="contactUs.address"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="contact-us-form-item" label="合作邮箱">
          <el-input
            v-model="contactUs.cooperation_email"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="contact-us-form-item" label="办公电话">
          <el-input
            v-model="contactUs.office_telephone"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="contact-us-form-item" label="邮政编码">
          <el-input
            v-model="contactUs.zip_code"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="contact-us-form-item" label="热线电话">
          <el-input
            v-model="contactUs.hotline"
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
            <img :src="contactUs.pic" width="100%" alt="">
          </el-dialog>
        </el-form-item>
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

import { mapGetters } from 'vuex'
import { fetchList } from '@/api/official-site/contact-us/contactUs'

export default {
  name: 'ContactUs',
  data() {
    return {
      contactUsList: null,
      contactUs: {
        id: null,
        address: '',
        cooperation_email: '',
        office_telephone: '',
        zip_code: '',
        hotline: '',
        name: '',
        pic: '',
        enable: ''
      },
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 5,
        enable: '-1',
        cond: {}
      },
      sortOptions: [{ label: '全部', key: '-1' }, { label: '已启用', key: '1' }, { label: '未启用', key: '0' }],
      textMap: {
        update: '编辑联系方式',
        create: '创建联系方式'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      picVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'permList'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      this.contactUs.pic = file.url;
      this.picVisible = true;
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.contactUsList = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      })
    },
    handleSizeChange(val) {
      this.listQuery.size = val;
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList()
    },
    handleFilter() {
      this.getList()
    },
    handleCreate() {
      this.dialogStatus = 'create';
      this.dialogFormVisible = true
    },
    handleUpdate() {
      this.dialogStatus = 'update';
      this.dialogFormVisible = true
    },
    handleDelete() {},
    handleDownload() {

    },
    update() {},
    create() {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .header-container{
    padding-bottom: 10px;
  }

  .contact-us-form {
    width: 92%;
    margin-left: 8%;
    .contact-us-form-item {
      display: inline-block;
      width: 100%;
    }
  }
</style>
