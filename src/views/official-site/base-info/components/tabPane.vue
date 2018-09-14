<template>
  <div>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">

      <el-table-column
        v-loading="loading"
        align="center"
        label="ID"
        width="65"
        element-loading-text="请给我点时间！">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建日期">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" label="类别名">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
          <el-tag>{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" align="left" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form :model="clazz" class="small-space clazz-form" label-position="left" label-width="70px">
        <el-form-item class="clazz-form-item" label="类别类型">
          <el-input
            v-model="clazz.type"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="clazz-form-item" label="类别名称">
          <el-input
            v-model="clazz.author"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="clazz-form-item" label="备注">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="clazz.title"
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

import { fetchList } from '@/api/article'

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
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      clazz: {
        id: '',
        type: '',
        timestamp: '',
        title: '',
        author: ''
      },
      loading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑类别',
        create: '创建类别'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.loading = false
      })
    },
    deleteClazz(id) {},
    update() {},
    handleUpdate(row) {
      //        this.clazz = Object.assign({}, row);
      this.clazz.id = row.id;
      this.clazz.title = row.title;
      this.clazz.type = row.type;
      this.clazz.timestamp = row.timestamp;
      this.clazz.author = row.author;
      this.dialogStatus = 'update';
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteClazz(row.id).then(status => {
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

