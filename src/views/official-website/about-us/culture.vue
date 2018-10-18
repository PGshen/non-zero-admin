<template>
  <div>
    <half-screen :item="item"/>
    <v-article :article="article"/>
  </div>
</template>

<script>
import { HalfScreen, VArticle } from '../components'
import { fetchFirstScreen, fetchAboutUs } from '@/api/official-site/api/website'

export default {
  name: 'Culture',
  components: { HalfScreen, VArticle },
  data() {
    return {
      item: {},
      article: {},
      firstScreenQuery: {
        page: 1,
        size: 1,
        order: 'update_time desc',
        cond: {
          isEnable: '1',
          clazzName: 'FIRST_SCREEN',
          clazzValue: '公司文化'
        }
      },
      articleQuery: {
        page: 1,
        size: 1,
        order: 'update_time desc',
        cond: {
          isEnable: '1',
          clazzName: 'ABOUT_US',
          clazzValue: '公司文化'
        }
      }
    }
  },
  created() {
    this.fetchFirstScreen()
    this.fetchCulture()
  },
  methods: {
    fetchFirstScreen() {
      fetchFirstScreen(this.firstScreenQuery).then(response => {
        this.item = response.data.data
      })
    },
    fetchCulture() {
      fetchAboutUs(this.articleQuery).then(response => {
        this.article = response.data.data
      })
    }
  }
}
</script>

<style scoped>

</style>
