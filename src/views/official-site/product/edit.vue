<template>
  <product-detail :is-edit="true"/>
</template>

<script>
import productDetail from './components/productDetail'

export default {
  name: 'EditProduct',
  components: {
    productDetail
  }
}
</script>

<style scoped>

</style>
