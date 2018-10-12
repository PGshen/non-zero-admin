<template>
  <div>
    <el-table
      v-loading.body="listLoading"
      :data="firstScreenList"
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
          <span>{{ scope.row.description }}</span>
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
        :page-sizes="[5,10,20,30]"
        :page-size="listQuery.size"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
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

        <el-form-item class="first_screen-form-item" label="启用">
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
            :file-list="fileList"
            :headers="myHeaders"
            action="http://111.230.146.130:8088/official/website/first/screen/upload"
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
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
/* eslint-disable semi */

import { mapGetters } from 'vuex'
import { fetchList, updateFirstScreen, deleteFirstScreen, checkoutStatusFirstScreen } from '@/api/official-site/base-info/firstScreenConf'
import { fetchClazzList } from '@/api/official-site/base-info/clazzConf';
import { getToken } from '@/utils/auth'

export default {
  name: 'FSCtabPane',
  props: {
    type: {
      type: String,
      default: 'ABOUT_US'
    }
  },
  data() {
    return {
      firstScreenList: null,
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
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 5,
        order: 'updateTime',
        cond: {
          firstScreenClass: this.type
        }
      },
      myHeaders: {
        'x-auth-token': getToken() // 文件上传携带token
      },
      fileList: [],
      sortOptions: [{ label: '全部', key: '-1' }, { label: '已启用', key: '1' }, { label: '未启用', key: '0' }],
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      picVisible: false,
      clazzOptions: null
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
    this.getList();
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
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.firstScreenList = response.data.data.list;
        this.total = response.data.data.total;
        this.page = response.data.data.pages;
        this.listLoading = false;
      })
    },
    resetFirstScreen() {
      this.first_screen = {
        id: null,
        firstScreenClass: '',
        updateTime: '',
        heading: '',
        subHeading: '',
        description: '',
        pic: '',
        isEnable: ''
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
    handleUpdate(row) {
      this.first_screen = Object.assign({}, row);
      this.first_screen.firstScreenClass = row.firstScreenClass;
      this.fileList.splice(0, this.fileList.length); // 清空
      this.fileList.push({ name: row.id, url: row.pic });
      this.dialogStatus = 'update';
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      deleteFirstScreen(row.id).then(response => {
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
      checkoutStatusFirstScreen(row.id).then(response => {
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

    },
    update() {
      updateFirstScreen(this.first_screen).then(response => {
        if (response.data.status) {
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .header-container{
    padding-bottom: 10px;
  }

  .first_screen-form {
    width: 92%;
    margin-left: 8%;
    .first_screen-form-item {
      display: inline-block;
      width: 100%;
    }
  }
</style>
