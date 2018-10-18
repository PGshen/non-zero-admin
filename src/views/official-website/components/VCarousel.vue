<template>
  <div class="v-carousel">
    <el-carousel>
      <el-carousel-item v-for="(item, index) in items" :key="index">
        <img :src="item.pic" class="v-carousel-img">
        <div class="v-carousel-text">
          <h2 class="heading">{{ item.heading }}</h2>
          <h3 class="sub-heading">{{ item.subHeading }}</h3>
          <p class="desc">{{ item.description }}</p>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>

export default {
  name: 'VCarousel',
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
  }
}
</script>

<style scoped>
  .v-carousel {
    width: 100%;
    height: calc(100vh - 84px);
    overflow: hidden;
  }
  .v-carousel-img {
    width: 100%;
    overflow: hidden;
    vertical-align: middle;
  }
  .v-carousel-text {
    position: absolute;
    top: calc(calc(100vh - 84px)*0.1);
    display: block;
    height: calc(calc(100vh - 84px)*0.8);
    left: 10%;
    width: 80%;
  }

  .heading {
    color: #FFFFFF;
    margin: 90px auto 0 auto;
    text-align: center;
  }
  .sub-heading {
    color: #FFFFFF;
    font-size: 18px;
    margin: 20px auto 0 auto;
    text-align: center;
  }
  .desc {
    color: #FFFFFF;
    font-size: 14px;
    line-height: 20px;
    margin: 30px auto 0 auto;
    text-align: center;
    background-color: rgba(255,255,255,0.11);
    border-radius: 5px;
    padding: 8px;
  }

</style>
<style>
  .v-carousel .el-carousel__container {
    width: inherit;
    height: calc(100vh - 84px);
    overflow: hidden;
    vertical-align: middle;
  }
</style>
