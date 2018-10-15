<template>
  <div>
    <half-screen :item="item"/>
  </div>
</template>

<script>
import { HalfScreen } from '../components'
import dm4 from '@/assets/img/dm/dm4.jpg'
export default {
  name: 'Product',
  components: { HalfScreen },
  data() {
    return {
      item: {
        pic: dm4,
        heading: '产品中心',
        subHeading: '公司产品介绍',
        description: '零，是形声字，古同“泠”，清凉。从雨令声，令为领省，即暴雨之前零星的雨滴，《说文》，“零，余雨也”。疾雨曰骤，徐雨曰零，久雨曰苦。引申出零落、零丁等义。古文中零非数词，近代以后方假借为数词;' +
            '零字小写为〇，〇是道体。〇与一字组成中字，中字是中国上下五千年文化核心名词。最早记载为在4600年前尧传给舜的四字心法“允执厥中”，其意义为真诚的保持中道，不偏离中道，北京故宫中和殿上方匾就是乾隆皇帝御书的允执厥中。中字是由一个〇（口）字和一个一字组成，〇是大道的体，一是大道的用。中字由〇和一组成，同时拥有了大道的体和用，所以中是道的大成。中代表中国的人文哲学，是中华的密码，大道之体是仁爱、友善、宽恕、和平的，大道的用是惟精惟一的。'
      }
    }
  }
}
</script>

<style scoped>

</style>
