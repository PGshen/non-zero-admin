<template>
  <div>
    <half-screen :item="item"/>
    <div class="content-box">
      <el-row :gutter="20">
        <div v-for="(vnew, index) in news" :key="index">
          <el-col :span="12">
            <router-link :to="{path: '/website/news/detail/'+vnew.id}">
              <div class="grid-content cleafix">
                <div class="left">
                  <img :src="vnew.titlePic">
                </div>
                <div class="right">
                  <h3>{{ vnew.title }}</h3>
                  <p>{{ vnew.synopsis | shortStr }}</p>
                  <span>{{ vnew.releaseTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </div>
              </div>
            </router-link>
          </el-col>
        </div>
      </el-row>
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
import { HalfScreen } from '../components'
import { fetchFirstScreen, fetchNews } from '@/api/official-site/api/website'

export default {
  name: 'Industry',
  components: { HalfScreen },
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
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .content-box {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 140px;
    padding: 10px;
  }
  .left {
    width: 30%;
    float: left;
    vertical-align: middle;
    padding: 5px;
  }
  .left img {
    width: 100%;
    overflow: hidden;
  }
  .right {
    width: 70%;
    float: left;
    vertical-align: middle;
    padding: 5px;
  }
  .right h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .right p {
    margin: 5px 0 5px 0;
  }
  .right span {
    color: #9b9b9b;
  }
  .cleafix:after {
    clear: both;
    content: "\200B";
    display: block;
    height: 0;
  }
  .vnew-pagination {
    width: 450px;
    margin: 0 auto    ;
  }
  .el-col .grid-content{
    cursor: pointer;
  }
  .el-col .grid-content:hover{
    box-shadow: 1px 1px 1px #888888;
  }
</style>
