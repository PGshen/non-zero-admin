<template>
  <div :style="customStyle" class="backspace-ceiling" @click="back">
    <i class="el-icon-back">&nbsp;</i>
  </div>
</template>

<script>
export default {
  name: 'VBackspace',
  props: {
    customStyle: {
      type: Object,
      default: function() {
        return {
          right: '50px',
          bottom: '160px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px',
          background: '#e7eaf1'
        }
      }
    }
  },
  methods: {
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/website' })
        return false
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped>
  .backspace-ceiling {
    position: fixed;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }

  .backspace-ceiling:hover {
    background: #d5dbe7;
  }

  .backspace-ceiling .Icon {
    fill: #9aaabf;
    background: none;
  }
</style>
