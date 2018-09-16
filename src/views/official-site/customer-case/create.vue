<template>
  <customer-case-detail :is-edit="false"/>
</template>

<script>
import customerCaseDetail from './components/customerCaseDetail'

export default {
  name: 'CreateCustomerCase',
  components: {
    customerCaseDetail
  }
}
</script>

<style scoped>

</style>
