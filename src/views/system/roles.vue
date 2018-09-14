<template>
  <div class="app-container calendar-list-container role-tree">
    <div class="filter-container">
      <el-input
        v-model="listQuery.cond.name"
        style="width: 200px;"
        class="filter-item"
        placeholder="名称"
        @keyup.enter.native="handleFilter"/>

      <el-select
        v-model="listQuery.order"
        style="width: 120px"
        class="filter-item"
        placeholder="排序"
        @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>

      <el-button v-waves v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:role:list') !== -1" class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      <el-button v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:role:add') !== -1" class="filter-item" style="margin-left: 10px;" type="primary" icon="edit" @click="handleCreate">
        添加
      </el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
    </div>

    <el-table
      v-loading.body="listLoading"
      :key="tableKey"
      :data="roleList"
      border
      fit
      style="width: 100%">

      <el-table-column align="center" label="序号" width="50" type="index">
        <!-- <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template> -->
      </el-table-column>
      <el-table-column align="center" label="ID" width="210">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="125" label="名称">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="125" label="别名">
        <template slot-scope="scope">
          <span>{{ scope.row.alias }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="240px" label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column width="170px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:role:update') !== -1"
            size="mini"
            type="primary"
            @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button
            v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:role:auth') !== -1"
            size="mini"
            type="warning"
            @click="handleAuth(scope.row)">授权
          </el-button>
          <el-button
            v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:role:delete') !== -1"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        :current-page.sync="listQuery.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.size"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :size="'tiny'" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form :model="role" class="small-space role-form" label-position="left" label-width="70px">
        <el-form-item class="role-form-item" label="名称">
          <el-input
            v-model="role.name"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="role-form-item" label="别名">
          <el-input
            v-model="role.alias"
            style="width: 90%;"
            class="filter-item"
            placeholder="请输入"/>
        </el-form-item>

        <el-form-item class="role-form-item" label="描述">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="role.description"
            style="width: 90%;"
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'角色授权'" :size="'small'" :close-on-click-modal="false" :visible.sync="dlgAuthVisible" @close="handleRoleAuthCancel">
      <div style="margin-left: 5%; margin-right: 5%;">
        <el-row style="display: flex; flex-direction: row; align-items: center; margin-top: 5px;">
          <el-col :span="3">
            角色名称：
          </el-col>
          <el-col :span="9">
            <el-input
              v-model="role.name"
              style="width: 90%;"
              class="filter-item"
              placeholder="请输入"/>
          </el-col>
          <el-col :span="3">
            角色别名：
          </el-col>
          <el-col :span="9">
            <el-input
              v-model="role.alias"
              style="width: 90%;"
              class="filter-item"
              placeholder="请输入"/>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px;">
          功能权限:
        </el-row>
        <el-row style="margin-top: 8px;">
          <el-col>
            <el-tree
              ref="funcTree"
              :data="menuTree"
              :props="authProps"
              :highlight-current="true"
              style="min-height: 300px;"
              node-key="id"
              show-checkbox
              check-strictly
              @check-change="handleCheckChange"/>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleRoleAuthCancel">取 消</el-button>
        <el-button type="primary" @click="handleRoleAuth">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable semi */

import { parseTime } from '@/utils'
import { mapGetters, mapActions } from 'vuex'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'RoleManager',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status]
    }
    // typeFilter(type) {
    //   return calendarTypeKeyValue[type]
    // }
  },
  data() {
    return {
      // 授权列表树结构的数据
      authProps: {
        children: 'children',
        label: 'title',
        value: 'id'
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        order: 'id',
        cond: {

        }
      },
      role: {
        id: '',
        name: '',
        alias: '',
        description: ''
      },
      sortOptions: [{ label: '按ID升序列', key: 'id' }, { label: '按ID降序', key: 'id desc' }],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑角色',
        create: '创建角色'
      },
      tableKey: 0,
      // 角色授权
      dlgAuthVisible: false,
      roleAuth: {
        id: '',
        menus: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'roleList',
      'menuTree',
      'permList'
    ])
  },
  created() {
    this.getList();
    this.getMenuList();
  },
  methods: {
    ...mapActions({
      GetRoleList: 'GetRoleList',
      AddRole: 'AddRole',
      UpdateRole: 'UpdateRole',
      DeleteRole: 'DeleteRole',
      GetMenuList: 'GetMenuList',
      AuthRole: 'AuthRole',
      AuthListRole: 'AuthListRole'
    }),
    getList() {
      this.listLoading = true;
      this.GetRoleList(this.listQuery).then(status => {
        if (status) {
          this.$notify({
            title: '成功',
            message: '获取成功',
            type: 'success',
            duration: 500
          });
          this.listLoading = false
        } else {
          this.$notify({
            title: '失败',
            message: '获取失败',
            type: 'fail',
            duration: 2000
          });
          this.listLoading = false
        }
      })
    },
    getMenuList() {
      this.GetMenuList().then(status => {
        if (status !== 1) {
          this.$notify({
            title: '失败',
            message: '获取菜单失败',
            type: 'failure',
            duration: 2000
          })
        }
      })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleCreate() {
      this.resetRole();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      //        this.role = Object.assign({}, row);
      this.role.id = row.id;
      this.role.name = row.name;
      this.role.alias = row.alias;
      this.role.description = row.description;
      this.dialogStatus = 'update';
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.DeleteRole(row.id).then(status => {
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
    handleRoleAuthCancel() {
      this.dlgAuthVisible = false;
      this.$refs.funcTree.setCheckedKeys([])
    },
    handleAuth(row) {
      // 授权界面显示信息
      this.role.name = row.name;
      this.role.alias = row.alias;

      // 授权参数
      this.roleAuth.id = row.id;
      this.roleAuth.menus = [];
      this.dlgAuthVisible = true;
      this.AuthListRole({ roleId: row.id }).then(data => {
        if (data.status === 1) {
          this.roleAuth.menus = data.data;
          this.$nextTick(() => {
            this.$refs.funcTree.setCheckedKeys(this.roleAuth.menus)
          })
        }
      })
    },
    handleCheckChange(data, isSel, childrenSel) {
      if (isSel || childrenSel) {
        let isContain = false;
        this.roleAuth.menus.forEach(item => {
          if (item === data.id) {
            isContain = true
          }
        });

        if (!isContain) {
          this.roleAuth.menus.push(data.id)
        }
      } else {
        let i = 0;
        for (; i < this.roleAuth.menus.length; i++) {
          if (this.roleAuth.menus[i] === data.id) {
            break
          }
        }
        this.roleAuth.menus.splice(i, 1)
      }
    },
    handleRoleAuth() {
      this.AuthRole(this.roleAuth).then(status => {
        if (status === 1) {
          this.dlgAuthVisible = false;
          this.$notify({
            title: '成功',
            message: '授权成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    create() {
      this.AddRole(this.role).then(status => {
        if (status) {
          this.dialogFormVisible = false;
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          });
          this.getList()
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
    },
    update() {
      this.UpdateRole(this.role).then(status => {
        if (status) {
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
          })
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    resetRole() {
      this.role = {
        id: undefined,
        name: '',
        alias: '',
        description: ''
      }
    },
    handleDownload() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel');
        const tHeader = ['时间', '地区', '类型', '标题', '重要性'];
        const filterVal = ['timestamp', 'province', 'type', 'title', 'importance'];
        const data = this.formatJson(filterVal, this.list);
        export_json_to_excel(tHeader, data, 'table数据')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .role-form {
    width: 92%;
    margin-left: 8%;
  }
  .role-form .role-form-item {
    display: inline-block;
    width: 100%;
  }

  .role-tree{
  }

  /*.role-tree .el-tree {*/
  /*border: 0;*/
  /*}*/

  .role-tree .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: lightblue;
  }
</style>
