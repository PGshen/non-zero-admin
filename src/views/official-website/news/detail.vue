<template>
  <div class="content-box">
    <h1>{{ detail.title }}</h1>
    <span>作者:{{ detail.author }}&nbsp;&nbsp;&nbsp;发布时间:{{ detail.releaseTime | parseTime('{y}-{m}-{d} {h}:{i}') }}&nbsp;&nbsp;&nbsp;阅读次数: {{ detail.readingTimes }}</span>
    <div class="content">
      <p v-html="detail.content">&nbsp;</p>
    </div>
    <v-paging/>
  </div>
</template>

<script>
import { VPaging } from '../components'
import { fetchNewsDetail } from '@/api/official-site/api/website'
export default {
  name: 'Detail',
  components: { VPaging },
  data() {
    return {
      detail: {}
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchDetail(id)
  },
  methods: {
    fetchDetail(id) {
      fetchNewsDetail(id).then(response => {
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
