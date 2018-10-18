<template>
  <div class="article-box">
    <h1>{{ article.heading }}</h1>
    <h2>{{ article.subHeading }}</h2>
    <!--<span v-if="article.updateTime">{{ article.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>-->
    <div class="content">
      <p v-html="article.text">&nbsp;</p>
    </div>
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
export default {
  name: 'VArticle',
  components: { BackToTop },
  props: {
    article: {
      type: Object,
      require: true,
      default: null
    }
  },
  data() {
    return {
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
  }
}
</script>

<style scoped>
  .article-box {
    max-width: 1100px;
    margin: 0 auto 0 auto;
    padding: 20px;
  }
  .article-box h1 {
    text-align: center;
  }
  .article-box h2 {
    text-align: center;
  }
  .article-box span {
    display: block;
    text-align: center;
    margin: 0 auto;
  }
  .article-box .content {
    padding-top: 20px;
    padding-bottom: 30px;
  }
  .article-box .content p {
    line-height: 20px;
  }
</style>
