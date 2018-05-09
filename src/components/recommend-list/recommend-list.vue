<!-- 主页推荐列表抽离 -->
<template>
  <div class="recommendList">
    <h3 v-show="title">{{title}}<svg-icon icon-class="right" v-show="title"></svg-icon></h3>
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item
      class="list-item"
      :span="number % 3 === 0? 1/3: 1/2"
      v-for="(item, index) in data" v-if="index < number"
      :key="item.id"
      @click.native="selectItem(item)">
        <div class="svg-wrapper">
          <svg-icon v-show="music" icon-class="earphone"></svg-icon>
          <svg-icon v-show="!music" icon-class="player"></svg-icon>
          <span v-show="item.playCount">{{item.playCount}}</span>
        </div>
        <img :src="item.picUrl" width="100%" height="100%">
        <p class="title">{{item.name}}</p>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux'
import { mapMutations } from 'vuex'
export default {
  props: {
    /*  传参说明：
      title: 标题
      date: 列表数据
      number: 列表个数
      music: 右上角图标样式
    */
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    number: {
      type: String,
      default: ''
    },
    music: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
  },
  methods: {
    selectItem (item) {
      this.$router.push({
        path: `/songList/${item.id}`
      })
      this.setDisc(item)
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
  components: {
    Flexbox,
    FlexboxItem
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixin';
.recommendList {
  h3 {
    @include sc(.8rem, #000);
    line-height: 1.5rem;
  }
  .list-item {
    position: relative;
    margin-bottom: .5rem;
    .svg-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      @include sc(.5rem, #fff);
      .svg-icon {
        @include svg(.7rem, #fff);
      }
    }
  }
  .title {
    text-align: center;
    @include sc(.6rem, #777);
    @include nowrap();
  }
}
</style>
