<template>
  <div>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">

      <el-table-column
        v-loading="loading"
        align="center"
        label="ID"
        width="65"
        type="index"
        element-loading-text="请给我点时间！">
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.id }}</span>-->
        <!--</template>-->
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建日期">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" label="类别名">
        <template slot-scope="scope">
          <span>{{ scope.row.clazzValue }}</span>
          <el-tag>{{ scope.row.clazzName }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" align="left" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="操作" width="250px">
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
        <el-button @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable semi */

import { mapGetters } from 'vuex'
import { fetchList, updateClazzMate, deleteClazzMate, checkoutStatusClazzMate } from '@/api/official-site/base-info/clazzConf'

export default {
  props: {
    type: {
      type: String,
      default: 'ABOUT_US'
    }
  },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        size: 100,
        order: 'update_time desc',
        cond: {
          clazzName: this.type
        }
      },
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
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data.list;
        this.loading = false;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    update() {
      updateClazzMate(this.clazz).then(response => {
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
    },
    handleUpdate(row) {
      this.clazz = Object.assign({}, row);
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteClazzMate(row.id).then(status => {
          if (status) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    checkoutStatus(row) {
      checkoutStatusClazzMate(row.id).then(response => {
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .clazz-form {
    width: 92%;
    margin-left: 8%;
  }
  .clazz-form .clazz-form-item {
    display: inline-block;
    width: 100%;
  }
</style>

