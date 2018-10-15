<template>
  <div>
    <half-screen :item="item"/>
    <div class="content-box">
      <v-comp-two :items="customerCase"/>
      <el-row>
        <div class="v-pagination">
          <el-pagination
            :total="500"
            background
            layout="prev, pager, next"/>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { HalfScreen, VCompTwo } from '../components'
import dm3 from '@/assets/img/dm/dm3.jpg'
import fj1 from '@/assets/img/fj/fj1.jpg'
import fj2 from '@/assets/img/fj/fj2.jpg'
import fj4 from '@/assets/img/fj/fj4.jpg'
export default {
  name: 'CustomerCase',
  components: { HalfScreen, VCompTwo },
  data() {
    return {
      item: {
        pic: dm3,
        heading: '客户案例',
        subHeading: '经典客户案例',
        description: '零，是形声字，古同“泠”，清凉。从雨令声，令为领省，即暴雨之前零星的雨滴，《说文》，“零，余雨也”。疾雨曰骤，徐雨曰零，久雨曰苦。引申出零落、零丁等义。古文中零非数词，近代以后方假借为数词;' +
            '零字小写为〇，〇是道体。〇与一字组成中字，中字是中国上下五千年文化核心名词。最早记载为在4600年前尧传给舜的四字心法“允执厥中”，其意义为真诚的保持中道，不偏离中道，北京故宫中和殿上方匾就是乾隆皇帝御书的允执厥中。中字是由一个〇（口）字和一个一字组成，〇是大道的体，一是大道的用。中字由〇和一组成，同时拥有了大道的体和用，所以中是道的大成。中代表中国的人文哲学，是中华的密码，大道之体是仁爱、友善、宽恕、和平的，大道的用是惟精惟一的。'
      },
      customerCase: [
        {
          pic: fj2,
          heading: '卡片展示',
          subHeading: '卡片副标题',
          synopsis: '零，是形声字，古同“泠”，清凉。从雨令声，令为领省，即暴雨之前零星的雨滴，《说文》，“零，余雨也”。疾雨曰骤，徐雨曰零，久雨曰苦。引申出零落、零丁等义。古文中零非数词，近代以后方假借为数词;',
          updateTime: new Date()
        },
        {
          pic: fj4,
          heading: 'Spring Boot',
          subHeading: '卡片副标题',
          synopsis: 'Spring Boot是由Pivotal团队提供的全新框架，其设计目的是用来简化新Spring应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。通过这种方式，Spring Boot致力于在蓬勃发展的快速应用开发领域(rapid application development)成为领导者。',
          updateTime: new Date()
        },
        {
          pic: fj1,
          heading: '卡片展示',
          subHeading: '卡片副标题',
          synopsis: '零，是形声字，古同“泠”，清凉。从雨令声，令为领省，即暴雨之前零星的雨滴，',
          updateTime: new Date()
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
  .v-pagination {
    width: 450px;
    margin: 0 auto    ;
  }
</style>
