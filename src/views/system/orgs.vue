<template>
  <div class="app-container org-container">
    <div class="left-bar">
      <el-card style="min-height: 100%">
        <div slot="header">
          <span style="line-height: 10px;">组织结构</span>
        </div>
        <el-tree
          :data="orgTree"
          :props="orgProps"
          :highlight-current="true"
          accordion
          @node-click="handleNodeClick">
        </el-tree>
      </el-card>
    </div>

    <div class="right-content">
      <el-card style="min-height: 100%">
        <div slot="header">
          <span style="line-height: 10px;">组织列表</span>
        </div>
        <div class="body">
          <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="组织名称"
                      v-model="listQuery.cond.name">
            </el-input>

            <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.order"
                       placeholder="排序">
              <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
              </el-option>
            </el-select>

            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">
              添加
            </el-button>
            <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
          </div>

          <el-table :key='tableKey' :data="displayList" v-loading.body="listLoading" border fit highlight-current-row
                    style="width: 100%">

            <el-table-column align="center" label="序号" width="130" type="index">
              <!-- <template slot-scope="scope">
                <span>{{scope.row.id}}</span>
              </template> -->
            </el-table-column>

            <el-table-column min-width="130" label="组织名称">
              <template slot-scope="scope">
                <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
              </template>
            </el-table-column>

            <!--<el-table-column min-width="130" label="组织编号">-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.orgNo}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->

            <el-table-column min-width="130" label="组织类型">
              <template slot-scope="scope">
                <span>{{scope.row.type}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="130" label="组织描述">
              <template slot-scope="scope">
                <span>{{scope.row.description}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="300">
              <template slot-scope="scope">
                <el-button size="small" type="success"
                           @click="handleUpdate(scope.row)">编辑
                </el-button>
                <el-button size="small" type="danger"
                           @click="handleDelete(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>

          </el-table>

          <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange"
                           :current-page.sync="listQuery.page"
                           :page-sizes="[10,20,30, 50]" :page-size="listQuery.size"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>

          <el-dialog :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
            <el-form class="small-space org-form" :inline="true" :model="org" label-position="left"
                     label-width="70px">
              <el-form-item class="org-form-item" label="组织路径">
                <el-cascader :props="orgProps" :options="orgTree" @change="handleCascaderChange" change-on-select></el-cascader>
              </el-form-item>

              <el-form-item class="org-form-item" label="组织类型">
                <el-select v-model="org.type" placeholder="请选择">
                  <el-option
                    v-for="item in orgType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item class="org-form-item" label="组织名称">
                <el-input class="filter-item" placeholder="请输入组织名称"
                          v-model="org.name">
                </el-input>
              </el-form-item>
              <el-form-item class="org-form-item" label="组织邮箱">
                <el-input class="filter-item" placeholder="请输入组织邮箱"
                          v-model="org.email">
                </el-input>
              </el-form-item>
              <el-form-item class="org-form-item" label="备注">
                <el-input class="filter-item" placeholder="请输入备注"
                          v-model="org.remark">
                </el-input>
              </el-form-item>
              <el-form-item class="org-form-item" label="组织编码">
                <el-input class="filter-item" placeholder="请输入组织编码"
                          v-model="org.postCode">
                </el-input>
              </el-form-item>
              <el-form-item class="org-form-item" label="组织电话">
                <el-input class="filter-item" placeholder="请输入组织电话"
                          v-model="org.tel">
                </el-input>
              </el-form-item>

              <el-form-item class="org-form-item" label="组织描述">
                <el-input class="filter-item" placeholder="请输入组织描述"
                          v-model="org.description">
                </el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
              <el-button v-else type="primary" @click="update">确 定</el-button>
            </div>
          </el-dialog>

        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        // 左边列表树结构的数据
        orgProps: {
          children: 'children',
          label: 'name',
          value: 'id'
        },
        // 右边菜单列表数据
        listQuery: {
          page: 1,
          size: 20,
          order: 'id',
          cond: {}
        },
        total: null,
        treeItem: '',
        displayList: null,
        listLoading: false,
        sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: 'id desc' }],
        tableKey: 0,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑组织',
          create: '创建组织'
        },
        org: {
          id: '',
          parentId: '',
          name: '',
          email: '',
          remark: '',
          postCode: '',
          tel: '',
          type: '',
          description: ''
        },
        orgType: [{
          value: '公司',
          label: '公司'
        }, {
          value: '部门',
          label: '部门'
        }]
      };
    },
    created() {
      this.getOrgTree();
    },
    computed: {
      ...mapGetters([
        'orgTree',
        'orgList'
      ])
    },
    methods: {
      ...mapActions({
        GetOrgTree: 'GetOrgTree',
        DeleteOrg: 'DeleteOrg',
        AddOrg: 'AddOrg',
        UpdateOrg: 'UpdateOrg'
      }),
      getOrgTree() {
        this.GetOrgTree().then(status => {
          if (!status) {
            this.$notify({
              title: '失败',
              message: '获取菜单结构失败',
              type: 'failure',
              duration: 2000
            });
          } else {
            this.displayList = this.orgTree;
          }
        })
      },
      deleteNullChildren(tree) { // 删除组织树中children为空的属性
        let c;
        for (c in tree) {
          if (tree[c].children.length === 0) {
            delete tree[c].children;
          } else {
            this.deleteNullChildren(tree[c].children)
          }
        }
      },
      handleCascaderChange(value) {
        this.org.parentId = value[value.length - 1];
      },
      handleFilter() {
        this.dialogStatus = '';
      },
      handleCreate() {
        this.org.id = '';
        this.org.parentId = '';
        this.org.name = '';
        this.org.email = '';
        this.org.remark = '';
        this.org.postCode = '';
        this.org.tel = '';
        this.org.type = '';
        this.org.description = '';
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      handleUpdate(row) {
        this.org.id = row.id;
        this.org.parentId = row.parentId;
        this.org.name = row.name;
        this.org.email = row.email;
        this.org.remark = row.remark;
        this.org.postCode = row.postCode;
        this.org.tel = row.tel;
        this.org.type = row.type;
        this.org.description = row.description;
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.DeleteOrg(row.id).then(status => {
            if (status) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getOrgTree();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleDownload() {
        this.dialogStatus = '';
      },
      handleSizeChange(val) {
        this.listQuery.size = val;
      },
      handlePageChange(val) {
        this.listQuery.page = val;
      },
      create() {
        this.AddOrg(this.org).then(status => {
          if (status) {
            this.dialogFormVisible = false;
            this.getOrgTree();
          }
        })
      },
      update() {
        this.UpdateOrg(this.org).then(status => {
          if (status) {
            this.dialogFormVisible = false;
            this.getOrgTree();
          }
        })
      },
      handleNodeClick(data) {
        this.treeItem = data.name;
      },
      // 遍历树状结构，获取当前菜单下的子菜单信息
      getOrgItem(orgName, orgList) {
        if (orgList === undefined || orgList === null) {
          return null;
        }
        let result = null;
        orgList.forEach((el, index) => {
          if (orgName === el.name) {
            result = el.children;
          } else {
            let returnResult = null;
            if (el.children !== null) {
              returnResult = this.getOrgItem(orgName, el.children);
              if (returnResult !== null) {
                result = returnResult;
              }
            }
          }
        })

        return result;
      }
    },
    watch: {
      treeItem: function(val) {
        if (val !== null) {
          this.displayList = null;
          this.displayList = this.getOrgItem(val, this.orgList);
        }
      },
      orgTree: function(val) {
        if (val !== null) {
          this.deleteNullChildren(this.orgTree);
        }
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .org-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
  }

  .org-container .left-bar {
    height: 100%;
    flex: 2;
  }

  .org-container .left-bar .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: lightblue;
  }

  .org-container .left-bar .el-tree {
    border: 0;
  }

  .org-container .right-content {
    height: 100%;
    flex: 8;
    margin-left: 20px;
  }

  .org-container .right-content .org-form {
    width: 92%;
    margin-left: 8%;
  }
  .org-container .right-content .org-form .org-form-item {
    width: 46%;
    margin-right: 20px;
  }
  /* 覆盖掉原先el-form-item__content样式，使得内容宽度占满父元素 */
  .org-container .right-content .org-form .org-form-item .el-form-item__content {
    display: inline-block;
    vertical-align: top;
    width: 73%;
  }
</style>
