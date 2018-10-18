<template>
  <div class="app-wrapper">
    <navbar/>
    <section class="app-main">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key"/>
      </transition>
    </section>
    <v-footer/>
  </div>
</template>

<script>
import { Navbar, VFooter } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    VFooter
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
  /*@import "src/styles/mixin.scss";*/
  .app-wrapper {
  @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    min-width: 1000px;
  }

  .app-main {
    /*84 = navbar + tags-view = 50 +34 */
    min-height: calc(100vh - 84px);
    position: relative;
    overflow: hidden;
  }
</style>
