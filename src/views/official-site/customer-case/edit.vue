<template>
  <customer-case-detail :is-edit="true"/>
</template>

<script>
import customerCaseDetail from './components/customerCaseDetail'

export default {
  name: 'EditCustomerCase',
  components: {
    customerCaseDetail
  }
}
</script>

<style scoped>

</style>
