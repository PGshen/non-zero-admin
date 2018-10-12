<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;" title="首页轮播图配置" type="success"/>
    </div>
    <div class="filter-container">
      <el-input
        v-model="listQuery.cond.heading"
        style="width: 200px;"
        class="filter-item"
        placeholder="标题"
        @keyup.enter.native="handleFilter"/>

      <el-select
        v-model="listQuery.cond.isEnable"
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
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>

    </div>

    <el-table
      v-loading.body="listLoading"
      :data="carouselList"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column align="center" label="ID" width="80" type="index">
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.id }}</span>-->
        <!--</template>-->
      </el-table-column>

      <el-table-column width="100px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="left" label="Heading">
        <template slot-scope="scope">
          <span>{{ scope.row.heading }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="left" label="SubHeading">
        <template slot-scope="scope">
          <span>{{ scope.row.subHeading }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="250px" align="left" label="Description">
        <template slot-scope="scope">
          <span>{{ scope.row.description.substring(0,45) + "..." }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="Picture">
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
            v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:ban') !== -1 && scope.row.isEnable === '1'"
            size="mini"
            type="warning"
            @click="handleBan(scope.row)">禁用
          </el-button>
          <el-button
            v-else-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:ban') !== -1 && scope.row.isEnable === '0'"
            size="mini"
            type="success"
            @click="handleBan(scope.row)">启用
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
        :page-sizes="[5,10,20,30]"
        :page-size="listQuery.size"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form :model="carousel" class="small-space carousel-form" label-position="left" label-width="70px">
        <el-form-item class="carousel-form-item" label="标题">
          <el-input
            v-model="carousel.heading"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="carousel-form-item" label="副标题">
          <el-input
            v-model="carousel.subHeading"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="carousel-form-item" label="启用">
          <el-switch
            v-model="carousel.isEnable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"/>
        </el-form-item>

        <el-form-item class="carousel-form-item" label="描述">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="carousel.description"
            style="width: 90%;"
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>

        <el-form-item style="margin-bottom: 40px;" label="图片">
          <el-upload
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :headers="myHeaders"
            action="http://111.230.146.130:8088/official/website/carousel/upload"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="picVisible">
            <img :src="carousel.pic" width="100%" alt="">
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
import { fetchList, createCarousel, updateCarousel, deleteCarousel, checkoutStatusCarousel } from '@/api/official-site/base-info/carouselConf'
import { getToken } from '@/utils/auth'

export default {
  name: 'CarouselConf',
  data() {
    return {
      carouselList: null,
      carousel: {
        id: null,
        updateTime: '',
        heading: '',
        subHeading: '',
        description: '',
        pic: '',
        isEnable: '1'
      },
      myHeaders: {
        'x-auth-token': getToken() // 文件上传携带token
      },
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 5,
        order: 'updateTime',
        cond: {}
      },
      sortOptions: [{ label: '全部', key: '-1' }, { label: '已启用', key: '1' }, { label: '未启用', key: '0' }],
      textMap: {
        update: '编辑轮播图',
        create: '创建轮播图'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      picVisible: false,
      fileList: []
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
      console.log(file);
      this.carousel.pic = file.response.data;
      this.picVisible = true;
    },
    handleSuccess(res, file, fileList) {
      if (res.code === 20000) {
        this.carousel.pic = res.data;
      }
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.carouselList = response.data.data.list;
        this.total = response.data.data.total;
        this.page = response.data.data.pages;
        this.listLoading = false;
      })
    },
    resetCarousel() {
      this.carousel = {
        id: undefined,
        updateTime: '',
        heading: '',
        subHeading: '',
        description: '',
        pic: '',
        isEnable: '1'
      }
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
      this.resetCarousel();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.carousel = Object.assign({}, row);
      this.fileList.splice(0, this.fileList.length); // 清空
      this.fileList.push({ name: row.id, url: row.pic });
      this.dialogStatus = 'update';
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      deleteCarousel(row.id).then(response => {
        if (response.data.code === 20000) {
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
    handleBan(row) {
      checkoutStatusCarousel(row.id).then(response => {
        if (response.data.code === 20000) {
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

    },
    update() {
      updateCarousel(this.carousel).then(response => {
        if (response.data.code === 20000) {
          this.dialogFormVisible = false;
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          });
          this.getList()
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
    },
    create() {
      delete this.carousel.updateTime;
      createCarousel(this.carousel).then(response => {
        if (response.data.code === 20000) {
          this.dialogFormVisible = false;
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          });
          this.getList();
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
  .header-container{
    padding-bottom: 10px;
  }

  .carousel-form {
    width: 92%;
    margin-left: 8%;
    .carousel-form-item {
      display: inline-block;
      width: 100%;
    }
  }
</style>
