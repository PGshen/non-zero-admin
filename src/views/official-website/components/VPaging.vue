<template>
  <div class="vpaging">
    <el-row>
      <el-button type="primary" plain round icon="" style="float: left">上一篇</el-button>
      <el-button type="primary" plain round icon="" style="float: right">下一篇</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VPaging'
}
</script>

<style scoped>
  .vpaging {
    padding: 0 30px 0 30px;
  }
</style>
