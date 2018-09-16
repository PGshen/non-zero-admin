<template>
  <solution-detail :is-edit="true"/>
</template>

<script>
import solutionDetail from './components/solutionDetail'

export default {
  name: 'EditSolution',
  components: {
    solutionDetail
  }
}
</script>

<style scoped>

</style>
