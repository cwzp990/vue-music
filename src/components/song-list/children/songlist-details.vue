<!-- 歌单详情 -->
<template>
  <div class="details">
    111
    <div class="header">
      <svg-icon icon-class="close"></svg-icon>
    </div>
    <div class="main">
      <div class="img-wrapper">
        <img src="" width="100%" height="100%">
      </div>
      <h3 class="title"></h3>
      <div class="tag"></div>
      <p class="brief"></p>
    </div>
    <div class="bg-img">
      <img src="" width="100%" height="100%">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
@import '../../../style/mixin';
.details {
  position: fixed;
  top: 0;
  bottom: 0;
  @include wh(100%, 100%);
  background: #fff;
  z-index: 400;
}
</style>
