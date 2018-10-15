<template>
  <div class="content-box">
    <h1>{{ detail.heading }}</h1>
    <h2>{{ detail.subHeading }}</h2>
    <span>{{ detail.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}&nbsp;&nbsp;&nbsp;阅读次数: {{ detail.readingTimes }}</span>
    <div class="content">
      <p v-html="detail.text">&nbsp;</p>
    </div>
    <v-paging/>
  </div>
</template>

<script>
import { VPaging } from '../components'
export default {
  name: 'Detail',
  components: { VPaging },
  data() {
    return {
      detail: {
        heading: '贝佐斯称蓝色起源很重要，能为未来太空创业者奠定基础',
        subHeading: '建造低成本的基础设施来帮助下一代成为太空创业者',
        updateTime: new Date(),
        readingTimes: 1000,
        text: '贝佐斯称蓝色起源很重要，能为未来太空创业者奠定基础.亚马逊CEO杰夫-贝佐斯想要建造低成本的基础设施来帮助下一代成为太空创业者.<br>' +
          '<img src="http://111.230.146.130:8088/upload/avatar/2018/10/12160740778.png"><br>身价1617亿美元的贝索斯也是私人航天服务公司蓝色起源的创始人。贝佐斯称：“我认为蓝色起源是非常重要的。在太阳系中有着足够的能量和资源供后代开发，但是大多数都是无法获取的，除非太空旅行的成本能够大大降低。”行业利益相关者称，可回收火箭或许能够为太空投资者节省大量的资金。'
      }
    }
  }
}
</script>

<style scoped>
  .content-box {
    width: 80%;
    margin: 110px auto 0 auto;
    padding: 20px;
  }
  .content-box h1 {
    text-align: center;
  }
  .content-box h2 {
    text-align: center;
  }
  .content-box span {
    display: block;
    text-align: center;
    margin: 0 auto;
  }
  .content-box .content {
    padding-top: 20px;
    padding-bottom: 30px;
  }
  .content-box .content p {
    line-height: 20px;
  }
</style>
