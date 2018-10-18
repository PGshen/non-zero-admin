<template>
  <div>
    <el-row class="v-row v-mid">
      <el-col v-for="(item, index) in items" :key="index" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <el-row>
          <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="left-icon">
            <img :src="item.icon">
          </el-col>
          <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14" class="right-text">
            <span>{{ item.digital }}</span>
            <p>{{ item.desc }}</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VDigitization',
  props: {
    items: {
      type: Array,
      require: true,
      default: null
    }
  }
}
</script>

<style scoped>
  .v-mid {
    margin: 0 auto;
  }
  .v-row {
    max-width: 1100px;
    padding: 20px 0 20px 0;
  }
  .left-icon {
    width: 80px;
    height: 80px;
  }
  .left-icon img{
    width: 100%;
  }
  .right-text {
    padding: 5px;
  }
  .right-text span {
    font-size: 32px;
    margin-bottom: 10px;
    color: red;
  }
  .right-text p {
    margin-bottom: 2px;
  }
</style>
