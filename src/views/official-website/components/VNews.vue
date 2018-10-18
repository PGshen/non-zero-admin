<template>
  <div>
    <el-row :gutter="20">
      <div v-for="(vnew, index) in news" :key="index">
        <el-col :span="12">
          <router-link :to="{path: '/website/news/detail/'+vnew.id}">
            <div class="grid-content cleafix">
              <div class="left">
                <img :src="vnew.titlePic">
              </div>
              <div class="right">
                <h3>{{ vnew.title }}</h3>
                <p>{{ vnew.synopsis | shortStr }}</p>
                <span>{{ vnew.releaseTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
              </div>
            </div>
          </router-link>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VNews',
  props: {
    news: {
      type: Array,
      require: true,
      default: null
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
  .el-col .grid-content{
    cursor: pointer;
  }
  .el-col .grid-content:hover{
    box-shadow: 1px 1px 1px #888888;
  }
</style>
