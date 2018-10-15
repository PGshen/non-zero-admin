<template>
  <div>
    <el-row :gutter="30">
      <el-col v-for="(vcard, index) in items" :key="index" :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img :src="vcard.pic" class="image">
          <div style="padding: 14px;">
            <span>{{ vcard.heading }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ vcard.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</time>
              <el-button type="text" class="button">查看详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VCard',
  props: {
    items: {
      type: Array,
      require: true,
      default: null
    }
  }
}
</script>

<style scoped>
  .el-col {
    margin-bottom: 30px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
