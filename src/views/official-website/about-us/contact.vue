<template>
  <div>
    <half-screen :item="item"/>
    <div class="bg-color-white">
      <div class="content-box">
        <v-contact :contacts="contacts"/>
      </div>
    </div>
  </div>
</template>

<script>
import { HalfScreen, VContact } from '../components'
import { fetchFirstScreen, fetchContact } from '@/api/official-site/api/website'
export default {
  name: 'Contact',
  components: { HalfScreen, VContact },
  data() {
    return {
      item: {
      },
      contacts: [],
      listQuery: {
        page: 1,
        size: 1,
        order: 'update_time desc',
        cond: {
          isEnable: '1',
          clazzName: 'FIRST_SCREEN',
          clazzValue: '联系我们'
        }
      }
    }
  },
  created() {
    this.fetchFirstScreen()
    this.fetchContact()
  },
  methods: {
    fetchFirstScreen() {
      fetchFirstScreen(this.listQuery).then(response => {
        this.item = response.data.data
      })
    },
    fetchContact() {
      fetchContact().then(response => {
        this.contacts = response.data.data
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
</style>
