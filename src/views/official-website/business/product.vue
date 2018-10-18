<template>
  <div>
    <half-screen :item="item"/>
    <div class="content-box">
      <v-card :items="products"/>
      <el-row>
        <div class="v-pagination">
          <el-pagination
            :current-page="listQuery.page"
            :page-sizes="[10,20,30]"
            :page-size="listQuery.size"
            :total="total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { HalfScreen, VCard } from '../components'
import { fetchFirstScreen, fetchProduct } from '@/api/official-site/api/website'

export default {
  name: 'Product',
  components: { HalfScreen, VCard },
  data() {
    return {
      total: 0,
      item: {},
      products: [],
      firstScreenQuery: {
        page: 1,
        size: 1,
        order: 'update_time desc',
        cond: {
          isEnable: '1',
          clazzName: 'FIRST_SCREEN',
          clazzValue: '产品中心'
        }
      },
      listQuery: {
        page: 1,
        size: 10,
        order: 'update_time desc',
        cond: {
        }
      }
    }
  },
  created() {
    this.fetchFirstScreen()
    this.getList()
  },
  methods: {
    fetchFirstScreen() {
      fetchFirstScreen(this.firstScreenQuery).then(response => {
        this.item = response.data.data
      })
    },
    getList() {
      fetchProduct(this.listQuery).then(response => {
        this.products = response.data.data.list
        this.total = response.data.data.total
        this.page = response.data.data.pages
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
  .content-box {
    width: 80%;
    margin: 0 auto;
    padding: 30px 20px 20px 20px;
  }
  .v-pagination {
    width: 450px;
    margin: 0 auto    ;
  }
</style>
