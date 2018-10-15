<template>
  <div>
    <half-screen :item="item"/>
    <div class="content-box">
      <el-row :gutter="20">
        <div v-for="(vnew, index) in news" :key="index">
          <el-col :span="12">
            <router-link :to="{path: '/website/news/detail/1'}">
              <div class="grid-content cleafix">
                <div class="left">
                  <img :src="vnew.pic">
                </div>
                <div class="right">
                  <h3>{{ vnew.heading }}</h3>
                  <p>{{ vnew.desc }}</p>
                  <span>{{ vnew.releaseTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </div>
              </div>
            </router-link>
          </el-col>
        </div>
      </el-row>
      <el-row>
        <div class="vnew-pagination">
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
import { HalfScreen } from '../components'
import dm1 from '@/assets/img/dm/dm1.jpg'
import dm4 from '@/assets/img/dm/dm4.jpg'
export default {
  name: 'Enterprise',
  components: { HalfScreen },
  data() {
    return {
      item: {
        pic: dm1,
        heading: '公司动态',
        subHeading: '公司最近动态',
        description: '零，是形声字，古同“泠”，清凉。从雨令声，令为领省，即暴雨之前零星的雨滴，《说文》，“零，余雨也”。疾雨曰骤，徐雨曰零，久雨曰苦。引申出零落、零丁等义。古文中零非数词，近代以后方假借为数词;' +
          '零字小写为〇，〇是道体。〇与一字组成中字，中字是中国上下五千年文化核心名词。最早记载为在4600年前尧传给舜的四字心法“允执厥中”，其意义为真诚的保持中道，不偏离中道，北京故宫中和殿上方匾就是乾隆皇帝御书的允执厥中。中字是由一个〇（口）字和一个一字组成，〇是大道的体，一是大道的用。中字由〇和一组成，同时拥有了大道的体和用，所以中是道的大成。中代表中国的人文哲学，是中华的密码，大道之体是仁爱、友善、宽恕、和平的，大道的用是惟精惟一的。'
      },
      news: [
        {
          pic: dm4,
          heading: '新闻标题',
          desc: '零字小写为〇，〇是道体。〇与一字组成中字，中字是中国上下五千年文化核心名词',
          releaseTime: new Date()
        },
        {
          pic: dm4,
          heading: '新闻标题',
          desc: '零字小写为〇，〇是道体。〇与一字组成中字，中字是中国上下五千年文化核心名词',
          releaseTime: new Date()
        },
        {
          pic: dm4,
          heading: '新闻标题',
          desc: '零字小写为〇，〇是道体。〇与一字组成中字，中字是中国上下五千年文化核心名词',
          releaseTime: new Date()
        },
        {
          pic: dm4,
          heading: '新闻标题',
          desc: '零字小写为〇，〇是道体。〇与一字组成中字，中字是中国上下五千年文化核心名词',
          releaseTime: new Date()
        },
        {
          pic: dm4,
          heading: '新闻标题',
          desc: '零字小写为〇，〇是道体。〇与一字组成中字，中字是中国上下五千年文化核心名词',
          releaseTime: new Date()
        },
        {
          pic: dm4,
          heading: '新闻标题',
          desc: '零字小写为〇，〇是道体。〇与一字组成中字，中字是中国上下五千年文化核心名词',
          releaseTime: new Date()
        }
      ]
    }
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
     margin-bottom: 0;
    }
  }
  .content-box {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 140px;
    padding: 10px;
  }
  .left {
    width: 30%;
    float: left;
    vertical-align: middle;
    padding: 5px;
  }
  .left img {
    width: 100%;
    overflow: hidden;
  }
  .right {
    width: 70%;
    float: left;
    vertical-align: middle;
    padding: 5px;
  }
  .right h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .right p {
    margin: 5px 0 5px 0;
  }
  .right span {
    color: #9b9b9b;
  }
  .cleafix:after {
    clear: both;
    content: "\200B";
    display: block;
    height: 0;
  }
  .vnew-pagination {
    width: 450px;
    margin: 0 auto    ;
  }
  .el-col .grid-content{
    cursor: pointer;
  }
  .el-col .grid-content:hover{
    box-shadow: 1px 1px 1px #888888;
  }
</style>
