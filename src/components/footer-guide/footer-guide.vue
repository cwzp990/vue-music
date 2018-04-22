<template>
  <div class="footer-guide">
    <router-link tag="div" to="/home" class="guide-item"><svg-icon icon-class="logo"></svg-icon>发现音乐</router-link>
    <router-link tag="div" to="/mine" class="guide-item"><svg-icon icon-class="music"></svg-icon>我的音乐</router-link>
    <router-link tag="div" to="/social" class="guide-item"><svg-icon icon-class="friends"></svg-icon>朋友</router-link>
    <router-link tag="div" to="/account" class="guide-item"><svg-icon icon-class="user"></svg-icon>账号</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .footer-guide {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    @include wh(100%, 1.95rem);
    background: #000;
    .guide-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      @include sc(.5rem, #b2b2b2);
      .svg-icon {
        @include svg(.85rem, #b2b2b2);
      }
    }
  }
</style>
