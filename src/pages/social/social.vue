<template>
  <div class="social">
    <x-header>
      <svg-icon icon-class="add_friend" slot="overwrite-left"></svg-icon>
      <svg-icon icon-class="playing" slot="right"></svg-icon>
      <button-tab>
        <button-tab-item selected>动态</button-tab-item>
        <button-tab-item>附近</button-tab-item>
      </button-tab>
    </x-header>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, ButtonTab, ButtonTabItem } from 'vux'
export default {
  components: {
    XHeader,
    ButtonTab,
    ButtonTabItem
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.social {
  @include allcover();
  @include wh(100%, 100%);
  .vux-header {
    .svg-icon {
      @include svg(1rem, #fff);
    }
    .vux-button-group {
      margin-top: .2rem;
      border: .025rem solid #fff;
      border-radius: 25px;
      a.vux-button-group-current {
        background: $juzi;
      }
    }
  }
}
</style>
