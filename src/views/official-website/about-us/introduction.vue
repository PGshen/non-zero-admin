<template>
  <div>
    <half-screen :item="item"/>
    <div class="bg-color-white">
      <div class="content-box">
        <v-digitization :items="digitization"/>
      </div>
    </div>
    <div class="bg-color-light-grey">
      <div class="content-box">
        <v-history :history="history"/>
      </div>
    </div>
    <div class="bg-color-white">
      <div class="content-box">
        <v-article :article="article"/>
      </div>
    </div>
  </div>
</template>

<script>
import { HalfScreen, VDigitization, VHistory, VArticle } from '../components'
import { fetchFirstScreen, fetchAboutUs } from '@/api/official-site/api/website'
import business from '@/assets/img/digit/business.png'
import sale from '@/assets/img/digit/sale.png'
import staff from '@/assets/img/digit/staff.png'
import user from '@/assets/img/digit/user.png'
export default {
  name: 'Introduction',
  components: { HalfScreen, VDigitization, VHistory, VArticle },
  data() {
    return {
      item: {},
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
      ],
      article: {},
      firstScreenQuery: {
        page: 1,
        size: 1,
        order: 'update_time desc',
        cond: {
          isEnable: '1',
          clazzName: 'FIRST_SCREEN',
          clazzValue: '公司简介'
        }
      },
      articleQuery: {
        page: 1,
        size: 1,
        order: 'update_time desc',
        cond: {
          isEnable: '1',
          clazzName: 'ABOUT_US',
          clazzValue: '公司简介'
        }
      }
    }
  },
  created() {
    this.fetchFirstScreen()
    this.fetchIntroduction()
  },
  methods: {
    fetchFirstScreen() {
      fetchFirstScreen(this.firstScreenQuery).then(response => {
        this.item = response.data.data
      })
    },
    fetchIntroduction() {
      fetchAboutUs(this.articleQuery).then(response => {
        this.article = response.data.data
      })
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
  .bg-color-white {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }
  .bg-color-light-grey {
    width: 100%;
    height: 100%;
    background-color: #ebf1f4;
  }
</style>
