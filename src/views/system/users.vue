<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="名称"
                v-model="listQuery.cond.name">
      </el-input>

      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.order"
                 placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-button v-if="typeof(btn) !== 'undefined' && btn.indexOf('sys:user:list') !== -1" class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button v-if="typeof(btn) !== 'undefined' && btn.indexOf('sys:user:add') !== -1" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">
        添加
      </el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
    </div>

    <el-table :key='tableKey' :data="userList" v-loading.body="listLoading" border fit
              style="width: 100%">

      <el-table-column align="center" label="序号" width="50" type="index">
        <!-- <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template> -->
      </el-table-column>


      <el-table-column width="80" label="名称">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" label="登录名">
        <template slot-scope="scope">
          <span>{{scope.row.loginName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180" label="身份证">
        <template slot-scope="scope">
          <span>{{scope.row.idCard}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="130" label="电话">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100" label="QQ">
        <template slot-scope="scope">
          <span>{{scope.row.qq}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180" label="邮箱">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.createdTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button v-if="typeof(btn) !== 'undefined' && btn.indexOf('sys:user:update') !== -1" size="mini" type="primary"
                     @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button v-if="typeof(btn) !== 'undefined' && btn.indexOf('sys:user:ban') !== -1" size="mini" type="warning"
                     @click="handleUpdate(scope.row)">禁用
          </el-button>
          <el-button v-if="typeof(btn) !== 'undefined' && btn.indexOf('sys:user:delete') !== -1" size="mini" type="danger"
                     @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.size"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form class="small-space user-form" :rules="loginRules" :inline="true" :model="user" label-position="left" label-width="70px">

        <el-row>
          <el-col :span="12">
            <el-form-item class="user-form-item" label="名称">
              <el-input class="filter-item" style="display: flex; flex: 1" placeholder="请输入真实姓名"
                        v-model="user.name">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="loginName" class="user-form-item" label="登录名">
              <el-input name="loginName" class="filter-item" placeholder="请输入手机号"
                        v-model="user.loginName">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item class="user-form-item" label="身份证">
              <el-input class="filter-item" style="display: flex; flex: 1" placeholder="请输入身份证"
                        v-model="user.idCard">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="user-form-item" label="电话">
              <el-input class="filter-item" placeholder="请输入联系电话"
                        v-model="user.phone">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item class="user-form-item" label="QQ">
              <el-input class="filter-item" style="display: flex; flex: 1" placeholder="请输入QQ"
                        v-model="user.qq">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="user-form-item" label="邮箱">
              <el-input class="filter-item" placeholder="请输入Email"
                        v-model="user.email">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="password" class="user-form-item" label="密码">
              <el-input name="password" class="filter-item" style="display: flex; flex: 1" placeholder="请输入密码"
                        v-model="user.password">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="comfirm" class="user-form-item" label="确认密码">
              <el-input name="comfirm" class="filter-item" placeholder="请再次输入密码"
                        v-model="user.comfirm">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item class="user-form-item" label="头像">
              <el-button type="primary" icon="upload" @click="imageCropperShow=true">修改头像</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">
            角色分配
          </el-col>
          <el-col :span="24">
            <el-select style="width: 100%; padding-right: 20px; margin-top: 10px;"
                       v-model="user.role"
                       multiple
                       filterable
                       allow-create
                       placeholder="请选择角色">
              <el-option
                v-for="item in roleOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>

      <ImageCropper :width="300" :height="300" url="http://localhost/upload" @close='imageCropperClose' @crop-upload-success="imageCropperSuccess"
                    :key="imageCropperKey" v-show="imageCropperShow" />
    </el-dialog>

  </div>
</template>

<script>
  import { parseTime } from '@/utils'
  import { isMobile } from '@/utils/validate'
  import ImageCropper from '@/components/ImageCropper'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'role_manager',
    components: { ImageCropper },
    data() {
      const validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('请输入正确的合法手机号码'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value !== undefined && value.length < 6) {
          callback(new Error('密码不能小于6位'));
        } else {
          callback();
        }
      };
      const comfirmPass = (rule, value, callback) => {
        if (value !== undefined && this.user.password !== value) {
          callback(new Error('两次密码不一致'));
        } else {
          callback();
        }
      };
      return {
        btn: this.$route.params.btn,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          size: 10,
          order: 'id',
          cond: {}
        },
        user: {
          id: undefined,
          name: '',
          loginName: '',
          idCard: '',
          phone: '',
          password: '',
          qq: '',
          email: '',
          role: []
        },
        roleOption: null,
        authRoles: [],
        sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑用户',
          create: '创建用户'
        },
        loginRules: {
          loginName: [
                { required: true, trigger: 'blur', validator: validateMobile }
          ],
          password: [
                { required: true, trigger: 'blur', validator: validatePass }
          ],
          comfirm: [
                { required: false, trigger: 'blur', validator: comfirmPass }
          ]
        },
        tableKey: 0,
        imageCropperShow: false,
        imageCropperKey: 'test'
      }
    },
    created() {
      this.getList();
    },
    computed: {
      ...mapGetters([
        'userList'
      ])
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        };
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      }
    },
    methods: {
      ...mapActions({
        GetUserList: 'GetUserList',
        AddUser: 'AddUser',
        UpdateUser: 'UpdateUser',
        DeleteUser: 'DeleteUser',
        RoleListForUserAuth: 'RoleListForUserAuth',
        UserRoleListForAuth: 'UserRoleListForAuth'
      }),
      imageCropperClose() {
        this.imageCropperShow = false;
      },
      imageCropperSuccess() {
        this.imagecropperShow = false;
      },
      getList() {
        this.listLoading = true;
        this.GetUserList(this.listQuery).then(status => {
          if (status) {
            this.$notify({
              title: '成功',
              message: '获取成功',
              type: 'success',
              duration: 500
            });
            this.listLoading = false;
          } else {
            this.$notify({
              title: '失败',
              message: '获取失败',
              type: 'fail',
              duration: 2000
            });
            this.listLoading = false;
          }
        })
      },
      handleFilter() {
        this.getList();
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
        this.resetUser();
        this.RoleListForUserAuth().then(data => {
          if (data.status === 1) {
            this.roleOption = data.data;
          }
        });
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      handleUpdate(row) {
        this.user = Object.assign({}, row);
        this.RoleListForUserAuth().then(data => {
          if (data.status === 1) {
            this.roleOption = data.data;
          }
        });
        this.UserRoleListForAuth({ userId: row.id }).then(data => {
          if (data.status === 1) {
            this.user.role = data.data;
          }
        });
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      handleDelete(row) {
        this.DeleteUser(row.id).then(status => {
          if (status) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            });
            this.getList();
          } else {
            this.$notify({
              title: '失败',
              message: '删除失败',
              type: 'fail',
              duration: 2000
            });
          }
        }).catch(err => {
          this.$message.error(err);
        })
      },
      create() {
        this.AddUser(this.user).then(status => {
          if (status) {
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
            });
          }
        }).catch(err => {
          this.$message.error(err);
        })
      },
      update() {
        this.UpdateUser(this.user).then(status => {
          if (status) {
            this.dialogFormVisible = false;
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            });
            this.getList();
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
      resetUser() {
        this.user = {
          id: undefined,
          name: '',
          loginName: '',
          idCard: '',
          phone: '',
          qq: '',
          email: '',
          role: []
        }
      },
      handleDownload() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel');
          const tHeader = ['时间', '地区', '类型', '标题', '重要性'];
          const filterVal = ['timestamp', 'province', 'type', 'title', 'importance'];
          const data = this.formatJson(filterVal, this.list);
          export_json_to_excel(tHeader, data, 'table数据');
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
  .user-form {
    width: 92%;
    margin-left: 8%;
  }
  .user-form .user-form-item {
    width: 100%;
    margin-right: 20px;
  }

  /* 覆盖掉原先el-form-item__content样式，使得内容宽度占满父元素 */
  .user-form .user-form-item .el-form-item__content {
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 100px);
  }
</style>
