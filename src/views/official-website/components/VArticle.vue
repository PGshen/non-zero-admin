<template>
  <div class="article-box">
    <h1>{{ article.heading }}</h1>
    <h2>{{ article.subHeading }}</h2>
    <!--<span v-if="article.updateTime">{{ article.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>-->
    <div class="content">
      <p v-html="article.text">&nbsp;</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VArticle',
  props: {
    article: {
      type: Object,
      require: true,
      default: null
    }
  },
  data() {
    return {
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
