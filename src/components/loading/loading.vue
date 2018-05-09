<template>
  <div class="mf-loading-container">
    <img src="./loading.gif">
  </div>
</template>
<script type="text/ecmascript-6">
const COMPONENT_NAME = 'loading'
export default {
  name: COMPONENT_NAME
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
  .mf-loading-container {
    img {
      @include wh(20px, 20px);
      display: block;
    }
  }
</style>
