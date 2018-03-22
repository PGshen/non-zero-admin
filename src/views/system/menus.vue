<template>
  <div class="app-container menu-container">
    <div class="left-bar">
      <el-card style="min-height: 100%">
        <div slot="header">
          <span style="line-height: 10px;">菜单结构</span>
        </div>
        <el-tree
          :data="menuTree"
          :props="menuProps"
          :highlight-current="true"
          accordion
          @node-click="handleNodeClick">
        </el-tree>
      </el-card>
    </div>

    <div class="right-content">
      <el-card style="min-height: 100%">
        <div slot="header">
          <span style="line-height: 10px;">菜单列表</span>
        </div>
        <div class="body">
          <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="菜单名称"
                      v-model="listQuery.cond.name">
            </el-input>

            <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.order"
                       placeholder="排序">
              <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
              </el-option>
            </el-select>

            <el-button v-if="btn.indexOf('sys:menu:list') !== -1" class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
            <el-button v-if="btn.indexOf('sys:menu:add') !== -1" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">
              添加
            </el-button>
            <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
          </div>

          <el-table :key='tableKey' :data="displayList" v-loading.body="listLoading" border fit
                    style="width: 100%">

            <el-table-column align="center" label="序号" width="80" type="index">
              <!-- <template slot-scope="scope">
                <span>{{scope.row.id}}</span>
              </template> -->
            </el-table-column>

            <el-table-column min-width="130" label="菜单名称">
              <template slot-scope="scope">
                <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="180" label="请求URL">
              <template slot-scope="scope">
                <span>{{scope.row.url}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="130" label="请求Method">
              <template slot-scope="scope">
                <span>{{scope.row.method}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="100" label="菜单类型">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.type == 0" type="primary">菜单</el-tag>
                <el-tag v-if="scope.row.type == 1" type="success">请求</el-tag>
                <el-tag v-if="scope.row.type == 2" type="warning">按钮</el-tag>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="250">
              <template slot-scope="scope">
                <el-button v-if="btn.indexOf('sys:menu:update') !== -1" size="mini" type="primary"
                           @click="handleUpdate(scope.row)">编辑
                </el-button>
                <el-button v-if="btn.indexOf('sys:menu:ban') !== -1" size="mini" type="warning"
                           @click="handleForbid(scope.row)">禁用
                </el-button>
                <el-button v-if="btn.indexOf('sys:menu:delete') !== -1" size="mini" type="danger"
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
            <el-form class="small-space menu-form" :inline="true" :model="menu" label-position="left"
                     label-width="70px">
              <el-form-item class="menu-form-item" label="类型">
                <el-radio-group v-model="menu.type">
                  <el-radio v-for="type in menuType" :key="type.id" :label="type.id">{{type.name}}</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item class="menu-form-item" label="名称">
                <el-input class="filter-item" placeholder="名称必须唯一,建议英文"
                          v-model="menu.name">
                </el-input>
              </el-form-item>
              <el-form-item class="menu-form-item" label="显示名称">
                <el-input class="filter-item" placeholder="请输入显示名称"
                          v-model="menu.title">
                </el-input>
              </el-form-item>

              <el-form-item class="menu-form-item" label="上级菜单">
                <el-cascader :props="menuProps" :options="menuTree" @change="handleCascaderChange" change-on-select></el-cascader>
              </el-form-item>

              <el-form-item v-if="menu.type === 0" class="menu-form-item" label="路由path">
                <el-input class="filter-item" placeholder="请输入路由path"
                          v-model="menu.path">
                </el-input>
              </el-form-item>

              <el-form-item class="menu-form-item" label="请求URL">
                <el-input class="filter-item" placeholder="请输入请求URL"
                          v-model="menu.url">
                </el-input>
              </el-form-item>

              <el-form-item class="menu-form-item" label="请求方法">
                <el-select v-model="menu.method" placeholder="请选择">
                  <el-option
                    v-for="item in methods"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item v-if="menu.type === 0" class="menu-form-item" label="菜单图标">
                <el-input class="filter-item" placeholder="请输入图标名称"
                          v-model="menu.icon">
                </el-input>
              </el-form-item>

              <el-form-item class="menu-form-item" label="授权标识">
                <el-input class="filter-item" placeholder="请输入授权标识,menu:add"
                          v-model="menu.perm">
                </el-input>
              </el-form-item>
              <el-form-item v-if="menu.type === 0" class="menu-form-item" label="组件路径">
                <el-input class="filter-item" placeholder="为一级菜单时填layout/Layout"
                          v-model="menu.component">
                </el-input>
              </el-form-item>
              <el-form-item v-if="menu.type === 0" class="menu-form-item" label="重定向">
                <el-input class="filter-item" placeholder="不重定向不要填"
                          v-model="menu.redirect">
                </el-input>
              </el-form-item>
              <el-form-item v-if="menu.type === 0" class="menu-form-item" label="是否隐藏">
                <el-radio-group v-model="menu.hidden">
                  <el-radio label="1">隐藏</el-radio>
                  <el-radio label="0">不隐藏</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="menu.type === 0" class="menu-form-item" label="为子菜单">
                <el-radio-group v-model="menu.alwaysShow">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item v-if="menu.type === 0" class="menu-form-item" label="排序号">
                <el-input-number v-model="menu.orderNum">
                </el-input-number>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button v-if="dialogStatus === 'create'" type="primary" @click="create">创建</el-button>
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
        btn: this.$route.params.btn,
        // 左边列表树结构的数据
        menuProps: {
          children: 'children',
          label: 'title',
          value: 'id'
        },
        // 右边菜单列表数据
        listQuery: {
          page: 1,
          size: 20,
          order: 'id',
          cond: {}
        },
        methods: [{
          value: 'GET',
          label: 'GET'
        }, {
          value: 'POST',
          label: 'POST'
        }, {
          value: 'PUT',
          label: 'PUT'
        }, {
          value: 'DELETE',
          label: 'DELETE'
        }],
        total: null,
        treeItem: '',
        displayList: null,
        listLoading: false,
        sortOptions: [{ label: '按ID升序列', key: 'id' }, { label: '按ID降序', key: 'id desc' }],
        tableKey: 0,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑菜单',
          create: '创建菜单'
        },
        menu: {
          id: undefined,
          parentId: 0,
          type: 0,
          name: '',
          title: '',
          path: '',
          icon: '',
          perm: '',
          orderNum: '',
          hidden: '1',
          alwaysShow: '0',
          component: '',
          redirect: '',
          url: '',
          method: ''
        },
        menuType: [{
          id: 0,
          name: '菜单'
        },
        {
          id: 1,
          name: '请求'
        },
        {
          id: 2,
          name: '按钮'
        }]
      };
    },
    created() {
      this.getMenuList();
    },
    computed: {
      ...mapGetters([
        'menuTree',
        'menuList'
      ])
    },
    methods: {
      ...mapActions({
        GetMenuList: 'GetMenuList',
        AddMenu: 'AddMenu',
        UpdateMenu: 'UpdateMenu',
        DeleteMenu: 'DeleteMenu'
      }),
      getMenuList() {
        this.GetMenuList().then(status => {
          if (!status) {
            this.$notify({
              title: '失败',
              message: '获取菜单失败',
              type: 'failure',
              duration: 2000
            });
          } else if (this.menuList.children !== undefined || this.menuList.children !== null) {
            this.displayList = this.menuList.children;
          }
        })
      },
      handleCascaderChange(value) {
        this.menu.parentId = value[value.length - 1];
      },
      handleFilter() {
        this.dialogStatus = '';
      },
      handleCreate() {
        this.menu.id = '';
        this.menu.parentId = '';
        this.menu.type = 0;
        this.menu.name = '';
        this.menu.title = '';
        this.menu.path = '';
        this.menu.icon = '';
        this.menu.perm = '';
        this.menu.orderNum = '';
        this.menu.hidden = '';
        this.menu.alwaysShow = '';
        this.menu.component = '';
        this.menu.redirect = '';
        this.menu.url = '';
        this.menu.method = '';

        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      handleUpdate(row) {
        this.menu.id = row.id;
        this.menu.parentId = row.parentId;
        this.menu.type = row.type;
        this.menu.name = row.name;
        this.menu.title = row.title;
        this.menu.path = row.path;
        this.menu.icon = row.icon;
        this.menu.perm = row.perm;
        this.menu.orderNum = row.orderNum;
        this.menu.hidden = row.hidden;
        this.menu.alwaysShow = row.alwaysShow;
        this.menu.component = row.component;
        this.menu.redirect = row.redirect;
        this.menu.url = row.url;
        this.menu.method = row.method;

        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      handleForbid(row) {
        this.DeleteMenu(row.id).then(status => {
          if (status) {
            this.dialogFormVisible = false;
            this.getMenuList();
          }
        });
      },
      handleDelete(row) {
        this.DeleteMenu(row.id).then(status => {
          if (status) {
            this.getMenuList();
          }
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
        this.AddMenu(this.menu).then(status => {
          if (status) {
            this.dialogFormVisible = false;
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            });
            this.getMenuList();
          }else {
            this.$notify({
              title: '失败',
              message: '创建失败',
              type: 'fail',
              duration: 2000
            })
          }
        });
      },
      update() {
        this.UpdateMenu(this.menu).then(status => {
          if (status) {
            this.dialogFormVisible = false;
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            });
            this.getMenuList();
          }else {
            this.$notify({
              title: '失败',
              message: '创建失败',
              type: 'fail',
              duration: 2000
            })
          }
        });
      },
      handleNodeClick(data) {
        this.treeItem = data.name;
      },
      // 遍历树状结构，获取当前菜单下的子菜单信息
      getMenuItem(menuName, menuList) {
        if (menuList === undefined || menuList === null || menuList === '') {
          return [];
        }
        if (menuList.children === undefined || menuList.children === null || menuList === '') {
          return [];
        }
        let result = null;
        let menu;
        for (menu in menuList.children) {
          if (menuName === menuList.children[menu].name) {
            result = menuList.children[menu].children;
            break;
          } else {
            let retResult = null;
            retResult = this.getMenuItem(menuName,menuList.children[menu]);
            if (retResult !== null) {
              result = retResult;
              break;
            }
          }
        }

        if (result === '') {
          result = [];
        }

        return result;
      }
    },
    watch: {
      treeItem: function(val) {
        if (val !== null) {
          this.displayList = null;
          this.displayList = this.getMenuItem(val, this.menuList);
        }
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .menu-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
  }

  .menu-container .left-bar {
    height: 100%;
    flex: 2;
  }

  .menu-container .left-bar .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: lightblue;
  }

  .menu-container .left-bar .el-tree {
    border: 0;
  }

  .menu-container .right-content {
    height: 100%;
    flex: 8;
    margin-left: 20px;
  }

  .menu-container .right-content .menu-form {
    width: 92%;
    margin-left: 8%;
  }

  .el-radio+.el-radio{
    margin-left: 20px;
  }
  .menu-container .right-content .menu-form .menu-form-item {
    width: 46%;
    margin-right: 20px;
  }
  /* 覆盖掉原先el-form-item__content样式，使得内容宽度占满父元素 */
  .menu-container .right-content .menu-form .menu-form-item .el-form-item__content {
    display: inline-block;
    vertical-align: top;
    width: 73%;
  }
</style>
