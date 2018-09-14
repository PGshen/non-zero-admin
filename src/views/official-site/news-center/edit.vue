<template>
  <article-detail :is-edit="true"/>
</template>

<script>
import ArticleDetail from './components/ArticleDetail'

export default {
  name: 'EditNews',
  components: { ArticleDetail }
}
</script>

