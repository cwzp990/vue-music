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
    <div class="svg-wrapper" @click="showPlayer">
      <svg-icon icon-class="playing" v-show="!isPlayer" style="right: 0;"></svg-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
  computed: {
    ...mapGetters(['fullScreen', 'playlist', 'playing'])
  },
  methods: {
    back () {
      this.$emit('back')
    },
    showPlayer () {
      if (!this.playlist.length) {
        return
      }
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
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
    @include nowrap;
    .subhead {
      @include sc(.5rem, #fff);
      @include nowrap;
    }
  }
}
</style>
