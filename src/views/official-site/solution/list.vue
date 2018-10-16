<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input
        v-model="listQuery.cond.firstHeading"
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
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>

      <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>

    </div>

    <el-table v-loading.body="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80" type="index">
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.id }}</span>-->
        <!--</template>-->
      </el-table-column>

      <el-table-column width="160px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Solution_Type">
        <template slot-scope="scope">
          <span>{{ scope.row.solutionClass }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="First_Heading">
        <template slot-scope="scope">
          <span>{{ scope.row.firstHeading }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column width="180px" label="Secondary_Heading">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.secondaryHeading }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column width="180px" label="Tertiary_Heading">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.tertiaryHeading }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column class-name="status-col" label="Status" width="110px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isEnable | statusFilter">{{ scope.row.isEnable | statusFilter2 }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Solution_Synopsis">
        <template slot-scope="scope">
          <router-link :to="'/official-site/solution/edit/'+scope.row.id" class="link-type">
            <span>{{ scope.row.solutionSynopsis }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="260">
        <template slot-scope="scope">
          <router-link :to="'/official-site/solution/edit/'+scope.row.id">
            <el-button v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:update') !== -1" type="primary" size="mini">编辑</el-button>
          </router-link>
          <el-button
            v-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:ban') !== -1 && scope.row.isEnable === '1'"
            size="mini"
            type="warning"
            @click="checkoutStatus(scope.row)">草稿
          </el-button>
          <el-button
            v-else-if="typeof(permList) !== 'undefined' && permList.indexOf('sys:user:ban') !== -1 && scope.row.isEnable === '0'"
            size="mini"
            type="success"
            @click="checkoutStatus(scope.row)">发布
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

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchList, deleteSolution, checkoutStatus } from '@/api/official-site/solution/solution'

export default {
  name: 'SolutionList',
  filters: {
    statusFilter(isEnable) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      if (isEnable === '1') {
        return statusMap['published']
      } else {
        return statusMap['draft']
      }
    },
    statusFilter2(isEnable) {
      if (isEnable === '1') {
        return '已发布'
      } else {
        return '未发布'
      }
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        order: 'update_time desc',
        cond: {
          isEnable: '-1',
          firstHeading: ''
        }
      },
      solution: {
        id: null,
        updateTime: '',
        solutionClass: '',
        firstHeading: '',
        secondaryHeading: '',
        tertiaryHeading: '',
        isEnable: '',
        solutionSynopsis: ''
      },
      statusOptions: [{ label: '全部', key: '-1' }, { label: '已发布', key: '1' }, { label: '未发布', key: '0' }]
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
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.page = response.data.data.pages
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleFilter() {
      this.getList()
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSolution(row.id).then(response => {
          if (response.data.status) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    checkoutStatus(row) {
      checkoutStatus(row.id).then(response => {
        if (response.data.status) {
          this.$notify({
            title: '成功',
            message: '更新状态成功',
            type: 'success',
            duration: 2000
          })
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

<style scoped>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
