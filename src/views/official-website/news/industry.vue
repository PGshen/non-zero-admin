<template>
  <div>
    <half-screen :item="item"/>
    <div class="content-box">
      <v-news :news="news"/>
      <el-row>
        <div class="vnew-pagination">
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
import { HalfScreen, VNews } from '../components'
import { fetchFirstScreen, fetchNews } from '@/api/official-site/api/website'

export default {
  name: 'Industry',
  components: { HalfScreen, VNews },
  data() {
    return {
      total: 0,
      item: {},
      news: [],
      firstScreenQuery: {
        page: 1,
        size: 1,
        order: 'update_time desc',
        cond: {
          isEnable: '1',
          clazzName: 'FIRST_SCREEN',
          clazzValue: '行业新闻'
        }
      },
      listQuery: {
        page: 1,
        size: 10,
        order: 'release_time desc',
        cond: {
          clazzName: 'NEWS',
          clazzValue: '行业新闻'
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
      fetchNews(this.listQuery).then(response => {
        this.news = response.data.data.list
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
    }
  }
}
</script>

<style scoped>
  .content-box {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
  }
  .vnew-pagination {
    width: 450px;
    margin: 0 auto    ;
  }
</style>
