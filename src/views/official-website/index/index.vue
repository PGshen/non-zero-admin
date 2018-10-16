<template>
  <div>
    <v-carousel :items="carousel"/>
  </div>
</template>

<script>
import { VCarousel } from '../components'
import { fetchCarousel } from '@/api/official-site/api/website'

export default {
  name: 'Index',
  components: { VCarousel },
  data() {
    return {
      carousel: []
    }
  },
  created() {
    this.fetchCarousel()
  },
  methods: {
    fetchCarousel() {
      fetchCarousel().then(response => {
        this.carousel = response.data.data
      })
    }
  }
}
</script>

<style scoped>

</style>
