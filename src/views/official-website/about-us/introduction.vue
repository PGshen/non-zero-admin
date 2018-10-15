<template>
  <div>
    <half-screen :item="item"/>
    <div class="content-box">
      <v-digitization :items="digitization"/>
      <v-history :history="history"/>
    </div>
  </div>
</template>

<script>
import { HalfScreen, VDigitization, VHistory } from '../components'
import fj4 from '@/assets/img/fj/fj4.jpg'
import business from '@/assets/img/digit/business.png'
import sale from '@/assets/img/digit/sale.png'
import staff from '@/assets/img/digit/staff.png'
import user from '@/assets/img/digit/user.png'
export default {
  name: 'Introduction',
  components: { HalfScreen, VDigitization, VHistory },
  data() {
    return {
      item: {
        pic: fj4,
        heading: '公司简介',
        subHeading: '公司简单介绍',
        description: '零，是形声字，古同“泠”，清凉。从雨令声，令为领省，即暴雨之前零星的雨滴，《说文》，“零，余雨也”。疾雨曰骤，徐雨曰零，久雨曰苦。引申出零落、零丁等义。古文中零非数词，近代以后方假借为数词;' +
            '零字小写为〇，〇是道体。〇与一字组成中字，中字是中国上下五千年文化核心名词。最早记载为在4600年前尧传给舜的四字心法“允执厥中”，其意义为真诚的保持中道，不偏离中道，北京故宫中和殿上方匾就是乾隆皇帝御书的允执厥中。中字是由一个〇（口）字和一个一字组成，〇是大道的体，一是大道的用。中字由〇和一组成，同时拥有了大道的体和用，所以中是道的大成。中代表中国的人文哲学，是中华的密码，大道之体是仁爱、友善、宽恕、和平的，大道的用是惟精惟一的。'
      },
      digitization: [
        {
          'icon': business,
          'digital': '50',
          'desc': '业务涉及50多种'
        },
        {
          'icon': staff,
          'digital': '2000+',
          'desc': '员工人数5000+'
        },
        {
          'icon': sale,
          'digital': '10亿',
          'desc': '销售额达10亿'
        },
        {
          'icon': user,
          'digital': '200w+',
          'desc': '服务用户达200万以上'
        }
      ],
      history: [
        {
          year: 2018,
          events: [
            { his: '2月公司正式成立物联网应用部，主要研发物联网相关产品' },
            { his: '6月公司正式员工突破2000人' },
            { his: '8月公司截至8月份销售已超去年全年总额，提前完成公司今年目标' }
          ]
        },
        {
          year: 2017,
          events: [
            { his: '2月公司正式成立物联网应用部，主要研发物联网相关产品' },
            { his: '6月公司正式员工突破2000人' },
            { his: '8月公司截至8月份销售已超去年全年总额，提前完成公司今年目标' }
          ]
        },
        {
          year: 2016,
          events: [
            { his: '2月公司正式成立物联网应用部，主要研发物联网相关产品' },
            { his: '6月公司正式员工突破2000人' },
            { his: '8月公司截至8月份销售已超去年全年总额，提前完成公司今年目标' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
  .content-box {
    width: 80%;
    margin: 0 auto;
    padding: 30px 20px 20px 20px;
  }
</style>
