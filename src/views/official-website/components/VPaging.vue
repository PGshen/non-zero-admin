<template>
  <div class="vpaging">
    <el-row>
      <router-link v-if="news && news.previous" :to="{path: '/website/news/detail/' + news.previous.id }">
        <el-button type="primary" plain round icon="" style="float: right">下一篇 : {{ news.previous ? news.previous.title : ' 没有了' }}</el-button>
      </router-link>
      <router-link v-if="news && news.next" :to="{path: '/website/news/detail/' + news.next.id }">
        <el-button type="primary" plain round icon="" style="float: left">上一篇 : {{ news.next ? news.next.title : ' 没有了' }}</el-button>
      </router-link>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VPaging',
  props: {
    news: {
      type: Object,
      default: null
    }
  }
  // data() {
  //   return {
  //     next: '',
  //     prev: ''
  //   }
  // },
  // created() {
  //   this.next = this.news.next
  //   this.prev = this.news.previous
  // }
}
</script>

<style scoped>
  .vpaging {
    padding: 0 30px 0 30px;
  }
</style>
