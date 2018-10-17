<template>
  <div class="content-box">
    <h1>{{ detail.title }}</h1>
    <span>作者:{{ detail.author }}&nbsp;&nbsp;&nbsp;发布时间:{{ detail.releaseTime | parseTime('{y}-{m}-{d} {h}:{i}') }}&nbsp;&nbsp;&nbsp;阅读次数: {{ detail.readingTimes }}</span>
    <div class="content">
      <p v-html="detail.content">&nbsp;</p>
    </div>
    <el-tooltip placement="top" content="返回上一页">
      <v-backspace/>
    </el-tooltip>
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
    </el-tooltip>
    <v-paging :news="paging"/>
  </div>
</template>

<script>
import { VPaging, VBackspace } from '../components'
import BackToTop from '@/components/BackToTop'
import { fetchNewsDetail } from '@/api/official-site/api/website'
export default {
  name: 'Detail',
  components: { VPaging, BackToTop, VBackspace },
  data() {
    return {
      detail: {},
      paging: {},
      myBackToTopStyle: {
        right: '50px',
        bottom: '100px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchDetail(id)
  },
  methods: {
    fetchDetail(id) {
      fetchNewsDetail(id).then(response => {
        this.detail = response.data.data.news
        this.paging = response.data.data
      })
    }
  }
}
</script>

<style scoped>
  .content-box {
    width: 80%;
    margin: 110px auto 0 auto;
    padding: 20px;
    max-width: 1100px;
  }
  .content-box h1 {
    text-align: center;
  }
  .content-box h2 {
    text-align: center;
  }
  .content-box span {
    display: block;
    text-align: center;
    margin: 0 auto;
  }
  .content-box .content {
    padding-top: 20px;
    padding-bottom: 30px;
  }
  .content-box .content p {
    line-height: 20px;
  }
</style>
