<template>
  <div class="m-juzi-music">
    <m-header />
    <div class="m-main">
      <router-view></router-view>
    </div>
    <m-footer />
  </div>
</template>

<script>
import MHeader from "../header/index.vue";
import MFooter from "../footer/index.vue";
export default {
  components: {
    MHeader,
    MFooter
  }
};
</script>

<style lang="scss">
@import "../../styles/mixin.scss";
.m-juzi-music {
  @include wh(100%, 100%);
  .m-main {
    padding: 0 10px;
    @include wh(100%, calc(100% - 120px));
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
