<template>
  <div class="content-box">
    <h1>{{ detail.firstHeading }}</h1>
    <h2>{{ detail.secondaryHeading }}</h2>
    <h3 style="text-align: center">{{ detail.tertiaryHeading }}</h3>
    <span v-if="detail.caseClass">类型:{{ detail.caseClass }}&nbsp;&nbsp;&nbsp;发布时间:{{ detail.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
    <span v-if="detail.solutionClass">类型:{{ detail.solutionClass }}&nbsp;&nbsp;&nbsp;发布时间:{{ detail.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
    <span v-if="detail.productClass">类型:{{ detail.productClass }}&nbsp;&nbsp;&nbsp;发布时间:{{ detail.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
    <div class="content">
      <p v-if="detail.caseText" v-html="detail.caseText">&nbsp;</p>
      <p v-else-if="detail.solutionText" v-html="detail.solutionText">&nbsp;</p>
      <p v-else-if="detail.productText" v-html="detail.productText">&nbsp;</p>
    </div>
    <el-tooltip placement="top" content="返回上一页">
      <v-backspace/>
    </el-tooltip>
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
    </el-tooltip>
    <v-paging/>
  </div>
</template>

<script>
import { VPaging, VBackspace } from '../components'
import BackToTop from '@/components/BackToTop'
import { fetchSolutionDetail, fetchProductDetail, fetchCustomerCaseDetail } from '@/api/official-site/api/website'
export default {
  name: 'Detail',
  components: { VPaging, BackToTop, VBackspace },
  data() {
    return {
      detail: {},
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
    const type = this.$route.params && this.$route.params.type
    const id = this.$route.params && this.$route.params.id
    if (type === 'solution') {
      this.fetchSolutionDetail(id)
    } else if (type === 'product') {
      this.fetchProductDetail(id)
    } else if (type === 'case') {
      this.fetchCustomerCaseDetail(id)
    }
  },
  methods: {
    fetchSolutionDetail(id) {
      fetchSolutionDetail(id).then(response => {
        this.detail = response.data.data
      })
    },
    fetchProductDetail(id) {
      fetchProductDetail(id).then(response => {
        this.detail = response.data.data
      })
    },
    fetchCustomerCaseDetail(id) {
      fetchCustomerCaseDetail(id).then(response => {
        this.detail = response.data.data
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
