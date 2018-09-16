<template>
  <solution-detail :is-edit="false"/>
</template>

<script>
import solutionDetail from './components/solutionDetail'

export default {
  name: 'CreateSolution',
  components: {
    solutionDetail
  }
}
</script>

<style scoped>

</style>
