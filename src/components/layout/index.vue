<template>
<div class="m-juzi-music">
  <!-- <m-header /> -->
  <div class="m-main">
    <router-view></router-view>
  </div>
  <m-footer />
  <player />
</div>
</template>

<script>
// import MHeader from '../header/index.vue'
import MFooter from '../footer/index.vue'
import player from '../player/index.vue'
export default {
  components: {
    // MHeader,
    MFooter,
    player,
  },
}
</script>

<style lang="scss">
@import '../../styles/mixin.scss';

.m-juzi-music {
  @include wh(100%, 100%);

  .m-main {
    @include wh(100%, calc(100% - 60px));
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
