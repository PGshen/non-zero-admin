<template>
  <div>
    <el-row v-for="(item, index) in items" :key="index" class="v-row v-mid">
      <div v-if="index % 2">
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" class="top-left2">
          <img :src="item.solutionPic">
        </el-col>
        <router-link :to="{path: '/website/business/solution/detail/' + item.id }">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="top-right2">
            <h3>{{ item.firstHeading }}</h3>
            <h4>{{ item.secondaryHeading }}</h4>
            <h5>{{ item.tertiaryHeading }}</h5>
          </el-col>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{path: '/website/business/solution/detail/' + item.id }">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="top-left1">
            <h3>{{ item.firstHeading }}</h3>
            <h4>{{ item.secondaryHeading }}</h4>
            <h5>{{ item.tertiaryHeading }}</h5>
          </el-col>
        </router-link>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" class="top-right1">
          <img :src="item.solutionPic">
        </el-col>
      </div>
      <!--<el-row>标签不能放在这,否则会导致父div置顶,不知为何???-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="bottom-text">
        <p>{{ item.solutionSynopsis }}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VCompOne',
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
    padding: 0 0 30px 0;
  }
  .top-left1 {
    background-color: #ff7663;
    border-radius: 5px 0 0 5px;
    padding: 10px 40px 10px 40px;
    height: 220px;
    color: #FFFFFF;
    text-align: right;
  }
  .top-right1 {
    border-radius: 0 5px 5px 0;
    height: 220px;
    overflow: hidden;
  }
  .top-right1 img {
    width: 100%;
  }
  .top-right2 {
    background-color: #13ce66;
    border-radius: 0 5px 5px 0;
    padding: 10px 40px 10px 40px;
    height: 220px;
    color: #FFFFFF;
    text-align: left;
  }
  .top-left2 {
    height: 220px;
    border-radius: 5px 0 0 5px;
    overflow: hidden;
  }
  .top-left2 img {
    width: 100%;
  }
  .bottom-text {
    height: 120px;
    padding: 0 15px;
  }
</style>
