<template>
  <div class="contact-box">
    <el-row v-for="(contact, index) in contacts" :key="index" class="v-row">
      <div v-if="index % 2">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="left-img">
          <img :src="contact.pic">
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="right-text">
          <div>
            <ul class="clearfix">
              <li>
                <h3>{{ contact.name }}</h3>
                <span>地址：{{ contact.address }}</span>
                <span>邮编：{{ contact.zipCode }}</span>
                <span>办公电话：{{ contact.officeTelephone }}</span>
                <span>商业计划书请发送邮箱：{{ contact.cooperationEmail }}</span>
                <span>咨询热线：{{ contact.hotline }}</span>
              </li>
            </ul>
          </div>
        </el-col>
      </div>
      <div v-else>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="right-text">
          <div>
            <ul class="clearfix">
              <li>
                <h3>{{ contact.name }}</h3>
                <span>地址：{{ contact.address }}</span>
                <span>邮编：{{ contact.zipCode }}</span>
                <span>办公电话：{{ contact.officeTelephone }}</span>
                <span>商业计划书请发送邮箱：{{ contact.cooperationEmail }}</span>
                <span>咨询热线：{{ contact.hotline }}</span>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="left-img">
          <img :src="contact.pic">
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VContact',
  props: {
    contacts: {
      type: Array,
      require: true,
      default: null
    }
  }
}
</script>

<style scoped>
  .contact-box {
    max-width: 1100px;
    margin: 0 auto 0px auto;
  }
  .v-row {
    margin-bottom: 35px;
  }
  .left-img {
    overflow: hidden;
    max-height: 280px;
    padding: 15px;
  }
  .left-img img {
    width: 100%;
  }
  ul, ol {
    list-style: none;
    margin-top: 0;
  }
  .clearfix:after {
    clear: both;
    content: "\200B";
    display: block;
    height: 0;
  }

  .right-text {
    padding: 15px;
  }

  .right-text li {
    float: left;
    cursor: pointer;
  }

  .right-text li h3 {
    font-size: 24px;
    color: #000000;
  }

  .right-text li span {
    display: block;
    font-size: 18px;
    font-weight: lighter;
    color: #999;
    margin-top: 10px;
  }
</style>
