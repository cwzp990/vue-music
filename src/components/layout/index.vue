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
    @include wh(100%, calc(100% - 120px));
  }
}
</style>
