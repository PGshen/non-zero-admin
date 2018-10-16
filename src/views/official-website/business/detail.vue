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
    <v-paging/>
  </div>
</template>

<script>
import { VPaging } from '../components'
import { fetchSolutionDetail, fetchProductDetail, fetchCustomerCaseDetail } from '@/api/official-site/api/website'
export default {
  name: 'Detail',
  components: { VPaging },
  data() {
    return {
      detail: {}
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
