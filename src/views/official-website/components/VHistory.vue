<template>
  <div>
    <h1 class="cs-content-his-title">发展历程</h1>
    <el-row v-for="(item, index) in history" :key="index">
      <div class="cs-content-his cleafix">
        <span/>
        <strong>{{ item.year }}</strong>
        <ul class="cleafix">
          <li v-for="(tm, i) in item.events" :key="i">{{ tm.his }}</li>
        </ul>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VHistory',
  props: {
    history: {
      type: Array,
      require: true,
      default: null
    }
  }
}
</script>

<style scoped>
  .cleafix:after {
    clear: both;
    content: "\200B";
    display: block;
    height: 0;
  }
  .cs-content-his-title {
    max-width: 1100px;
    margin: 15px auto;
    color: #3a8ee6;
    font-size: 36px;
  }
  .cs-content-his {
    max-width: 1100px;
    border-left: 2px solid #0280bb;
    padding: 30px 0;
    margin: 0 auto;
  }

  .cs-content-his span {
    display: block;
    width: 60px;
    height: 2px;
    background: #0280bb;
    margin: 80px 0;
    float: left;
  }

  .cs-content-his strong {
    width: 160px;
    height: 160px;
    line-height: 160px;
    display: block;
    border-radius: 100%;
    border: 2px solid #0280bb;
    color: #0280bb;
    font-size: 36px;
    text-align: center;
    margin: 0 auto;
    float: left;
  }

  .cs-content-his ul {
    float: left;
    margin: 30px 50px;
    padding: 0;
  }

  .cs-content-his ul li {
    font-size: 18px;
    line-height: 30px;
  }
</style>
