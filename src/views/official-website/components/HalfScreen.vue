<template>
  <div class="half-screen">
    <img :src="item.pic" class="half-screen-img">
    <div class="half-screen-text">
      <h2 class="heading">{{ item.heading }}</h2>
      <h3 class="sub-heading">{{ item.subHeading }}</h3>
      <p class="desc">{{ item.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HalfScreen',
  props: {
    item: {
      type: Object,
      require: true,
      default: null
    }
  }
}
</script>

<style scoped>
  .half-screen {
    width: 100%;
    height: calc(calc(100vh - 84px)/2);
    overflow: hidden;
  }
  .half-screen-img {
    width: 100%;
    overflow: hidden;
    vertical-align: middle;
  }
  .half-screen-text {
    position: absolute;
    top: calc(calc(100vh - 84px)*0.05);
    display: block;
    height: calc(calc(100vh - 84px)*0.4);
    left: 5%;
    width: 90%;
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
    line-height: 18px;
    margin: 30px auto 0 auto;
    text-align: center;
    background-color: rgba(255,255,255,0.11);
    border-radius: 5px;
    padding: 8px;
  }

</style>
