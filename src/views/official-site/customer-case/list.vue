<template>
  <div class="app-container">

    <el-table v-loading.body="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Case_Type">
        <template slot-scope="scope">
          <span>{{ scope.row.case_class }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="First_Heading">
        <template slot-scope="scope">
          <span>{{ scope.row.first_heading }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="Secondary_Heading">
        <template slot-scope="scope">
          <span>{{ scope.row.secondary_heading }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="Tertiary_Heading">
        <template slot-scope="scope">
          <span>{{ scope.row.tertiary_heading }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_enable | statusFilter">{{ scope.row.is_enable }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Case_Synopsis">
        <template slot-scope="scope">

          <router-link :to="'/official-site/customer-case/edit/'+scope.row.id" class="link-type">
            <span>{{ scope.row.case_synopsis }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="'/official-site/customer-case/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
          </router-link>
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
import { fetchList } from '@/api/official-site/customer-case/customer-case'

export default {
  name: 'CustomerCaseList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
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
