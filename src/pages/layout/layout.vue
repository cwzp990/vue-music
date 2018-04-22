<template>
  <div class="layout">
    <router-view></router-view>
    <footer-guide></footer-guide>
  </div>
</template>

<script type="text/ecmascript-6">
import footerGuide from 'components/footer-guide/footer-guide'
export default {
  components: {
    footerGuide
  }
}
</script>

<style lang="scss" scoped>
</style>
