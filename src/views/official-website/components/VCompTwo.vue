<template>
  <div>
    <el-row v-for="(item, index) in items" :key="index" class="v-row v-mid">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="18" class="top-text">
          <h2>{{ item.heading }}</h2>
        </el-col>
      </el-row>
      <div v-if="index % 2">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="bottom-left1">
          <img :src="item.pic">
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="bottom-right1">
          <h4>{{ item.subHeading }}</h4>
          <p>{{ item.synopsis }}</p>
          <h4>{{ item.subHeading }}</h4>
          <p>{{ item.synopsis }}</p>
        </el-col>
      </div>
      <div v-else>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="bottom-left2">
          <h4>{{ item.subHeading }}</h4>
          <p>{{ item.synopsis }}</p>
          <h4>{{ item.subHeading }}</h4>
          <p>{{ item.synopsis }}</p>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="bottom-right2">
          <img :src="item.pic">
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VCompTwo',
  props: {
    items: {
      type: Array,
      require: true,
      default: null
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped>
  .v-mid {
    margin: 0 auto;
  }
  .v-row {
    max-width: 1100px;
    padding: 0 0 40px 0;
  }
  .bottom-right1 {
    /*background-color: #13ce66;*/
    border-radius: 0 5px 5px 0;
    border: 2px solid #13ce66;
    border-left: none;
    padding: 10px 40px 10px 40px;
    height: 400px;
    color: #000000;
    overflow: hidden;
    text-align: left;
  }
  .bottom-right1 p {
    line-height: 20px;
  }
  .bottom-left1 {
    height: 400px;
    border-radius: 5px 0 0 5px;
    overflow: hidden;
  }
  .bottom-left1 img {
    /*width: 100%;*/
    height: 100%;
  }
  .bottom-left2 {
    /*background-color: #13ce66;*/
    border-radius: 5px 0 0 5px;
    border: 2px solid #13ce66;
    border-right: none;
    padding: 10px 40px 10px 40px;
    height: 400px;
    color: #000000;
    overflow: hidden;
    text-align: left;
  }
  .bottom-left2 p {
    line-height: 20px;
  }
  .bottom-right2 {
    height: 400px;
    border-radius: 0 5px 5px 0;
    overflow: hidden;
  }
  .bottom-right2 img {
    width: 100%;
    height: 100%;
  }
  .top-text {
    height: 55px;
    padding: 0 15px;
    text-align: center;
  }
</style>
