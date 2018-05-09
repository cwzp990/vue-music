<!-- 头部组件封装 -->
<template>
  <div class="header">
    <svg-icon icon-class="back" @click.native="back" style="left: 0;"></svg-icon>
    <h3 class="title">
      {{title}}
      <p class="subhead" v-show="subhead.length">
        <span v-for="singer in subhead" :key="singer.id">{{singer.name}} </span>
      </p>
    </h3>
    <svg-icon icon-class="playing" v-show="!isPlayer" style="right: 0;"></svg-icon>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subhead: {
      type: Array,
      default: () => []
    },
    isPlayer: {
      type: Boolean,
      defaualt: false
    }
  },
  methods: {
    back () {
      this.$emit('back')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixin';
.header {
  position: relative;
  height: 1.95rem;
  padding: 0 0.5rem;
  .svg-icon {
    @include ct;
    @include svg(1rem, #fff);
  }
  .title {
    width: 70%;
    @include center;
    text-align: center;
    line-height: 0.8rem;
    @include sc(.7rem, #fff);
    .subhead {
      @include sc(.5rem, #fff);
    }
  }
}
</style>
