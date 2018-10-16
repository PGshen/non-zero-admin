<template>
  <div class="nav">
    <el-menu class="cs-menu el-menu-demo" mode="horizontal" @select="handleSelect">
      <div class="cs-menu-item block">
        <el-menu-item index="0"><a><img :src="logo" width="130px"></a></el-menu-item>
        <router-link :to="{path: '/website/index'}">
          <el-menu-item index="1">首页</el-menu-item>
        </router-link>
        <el-submenu index="2">
          <template slot="title">关于我们</template>
          <router-link :to="{path: '/website/about/introduction'}">
            <el-menu-item index="2-1">企业简介</el-menu-item>
          </router-link>
          <router-link :to="{path: '/website/about/culture'}">
            <el-menu-item index="2-2">文化与价值观</el-menu-item>
          </router-link>
          <router-link :to="{path: '/website/about/contact'}">
            <el-menu-item index="2-3">联系我们</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">业务体系</template>
          <router-link :to="{path: '/website/business/customerCase'}">
            <el-menu-item index="3-1">客户案例</el-menu-item>
          </router-link>
          <router-link :to="{path: '/website/business/product'}">
            <el-menu-item index="3-2">产品中心</el-menu-item>
          </router-link>
          <router-link :to="{path: '/website/business/solution'}">
            <el-menu-item index="3-3">解决方案</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">新闻中心</template>
          <router-link :to="{path: '/website/news/industry'}">
            <el-menu-item index="4-1">行业新闻</el-menu-item>
          </router-link>
          <router-link :to="{path: '/website/news/enterprise'}">
            <el-menu-item index="4-2">公司动态</el-menu-item>
          </router-link>
        </el-submenu>
        <router-link :to="{path: '/website/recruitment/index'}">
          <el-menu-item index="5">人才招聘</el-menu-item>
        </router-link>
      </div>
    </el-menu>
  </div>
</template>

<script>
import logo from '@/assets/logo/logo.png'

export default {
  name: 'Navbar',
  data() {
    return {
      logo
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  body {
    display: table;
  }

  .nav {
    width: 100%;
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
  }

  .cs-menu {
    width: 1000px;
    margin: 20px auto 0 auto;
    height: 80px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    position: relative;
    z-index: 10;
  }

  /*居中start*/
  .block {
    position: relative;
  }

  .cs-menu-item {
    width: 800px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /*居中end*/

  .el-menu-item {
    float: left;
    margin-left: 10px;
  }

  .el-submenu {
    float: left;
    margin-left: 10px;
  }

</style>
<style>
  .nav .el-submenu .el-submenu__icon-arrow {
    right: 0;
  }
</style>

