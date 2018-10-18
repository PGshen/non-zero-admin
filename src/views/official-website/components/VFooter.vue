<template>
  <div class="cs-footer-box">
    <div class="cs-footer">
      <div class="link">
        <a>投资者关系</a>
        <a>人才招聘</a>
        <a>法律声明</a>
        <a>职业准则</a>
      </div>
      <p class="p1">Copyright © 2018 non-zero版权所有 粤ICP备13145200号</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VFooter'
}
</script>

<style scoped>
  .el-footer {
    margin: 0;
    padding: 0;
  }
  .cs-footer-box {
    padding: 12px 0;
    width: 100%;
    height: 84px;
    background: #eaeaea;
    /*position: fixed;*/
    /*left: 0;*/
    /*bottom: 0;*/
    /*z-index: 12;*/
  }

  .cs-footer {
    width: 550px;
    height: 50px;
    margin: 0 auto;
  }

  .link {
    margin: 5px auto 5px auto;
    height: 15px;
    width: 440px;
    position: relative;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  .p1 {
    line-height: 18px;
    margin: 10px auto 0 auto;
    text-align: center;
    display: block;
    clear: left;
  }

  .link a{
    display: block;
    float: left;
    border-right: 1px solid #555555;
    padding: 0 20px;
    text-decoration: none;
  }

  .link a:last-child{
    border-right: 0;
  }
</style>
