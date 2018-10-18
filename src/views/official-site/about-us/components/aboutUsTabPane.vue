<template>
  <div>
    <el-table
      v-loading.body="listLoading"
      :data="aboutUsList"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column align="center" label="ID" width="60px" type="index">
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.id }}</span>-->
        <!--</template>-->
      </el-table-column>

      <el-table-column width="140px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" align="left" label="Heading">
        <template slot-scope="scope">
          <span>{{ scope.row.heading }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" align="left" label="SubHeading">
        <template slot-scope="scope">
          <span>{{ scope.row.subHeading }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="Picture">
        <template slot-scope="scope">
          <img :src="scope.row.pic" width="100%">
        </template>
      </el-table-column>

      <el-table-column width="220px" align="center" label="Operation">
        <template slot-scope="scope">
          <el-button
            v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:update') !== -1"
            size="mini"
            type="primary"
            @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button
            v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:ban') !== -1 && scope.row.isEnable === '1'"
            size="mini"
            type="warning"
            @click="checkoutStatus(scope.row)">禁用
          </el-button>
          <el-button
            v-else-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:ban') !== -1 && scope.row.isEnable === '0'"
            size="mini"
            type="success"
            @click="checkoutStatus(scope.row)">启用
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
        :page-sizes="[5,10,20]"
        :page-size="listQuery.size"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

  </div>
</template>

<script>
/* eslint-disable semi */

import { mapGetters } from 'vuex'
import Tinymce from '@/components/Tinymce'
import { fetchList, deleteAboutUs, checkoutStatusAboutUs } from '@/api/official-site/about-us/aboutUs';
import { fetchClazzList } from '@/api/official-site/base-info/clazzConf';
import { getToken } from '@/utils/auth'

export default {
  name: 'AboutUstabPane',
  components: { Tinymce },
  props: {
    type: {
      type: String,
      default: 'Introduction'
    }
  },
  data() {
    return {
      aboutUsList: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 5,
        order: 'update_time desc',
        cond: {
          aboutUsClass: this.type
        }
      },
      myHeaders: {
        'x-auth-token': getToken() // 文件上传携带token
      },
      sortOptions: [{ label: '全部', key: '-1' }, { label: '已启用', key: '1' }, { label: '未启用', key: '0' }],
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogStatus: '',
      dialogFormVisible: false,
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
      }]
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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.aboutUsList = response.data.data.list;
        this.total = response.data.data.total;
        this.page = response.data.data.pages;
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
    handleUpdate(aboutUs) {
      this.$emit('handleEdit', aboutUs)
    },
    handleDelete(row) {
      deleteAboutUs(row.id).then(response => {
        if (response.data.status) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          });
          this.getList()
        } else {
          this.$notify({
            title: '失败',
            message: '删除失败',
            type: 'fail',
            duration: 2000
          })
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    checkoutStatus(row) {
      checkoutStatusAboutUs(row.id).then(response => {
        if (response.data.status) {
          this.$notify({
            title: '成功',
            message: '更新状态成功',
            type: 'success',
            duration: 2000
          });
          this.getList()
        } else {
          this.$notify({
            title: '失败',
            message: '更新状态失败',
            type: 'fail',
            duration: 2000
          })
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleDownload() {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .header-container{
    padding-bottom: 10px;
  }

  .about-us-form {
    width: 92%;
    margin-left: 4%;
    .about-us-form-item {
      display: inline-block;
      width: 100%;
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
</style>
