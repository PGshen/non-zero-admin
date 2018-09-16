<template>
  <product-detail :is-edit="false"/>
</template>

<script>
import productDetail from './components/productDetail'

export default {
  name: 'CreateProduct',
  components: {
    productDetail
  }
}
</script>

<style scoped>

</style>
