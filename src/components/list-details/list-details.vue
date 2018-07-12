<!-- 歌曲列表详情 -->
<template>
  <div class="list">
    <h3 class="title">
      <div class="left">
        <svg-icon icon-class="play"></svg-icon>
        播放全部
        <span class="number" v-show="count">(共{{count}}首)</span>
      </div>
      <div class="right" v-show="collect">
        <svg-icon icon-class="add"></svg-icon>
        收藏({{collect}}万)
      </div>
    </h3>
    <div class="scroll-wrapper">
      <scroll ref="scroll" class="scroll">
        <ul>
          <li v-for="(item, index) in data" :key="index" class="list-item vux-1px-b" @click="selectItem(item, index)">
            <div class="left">
              <span class="index">{{index + 1}}</span>
              <div class="title">
                <p class="name">{{item.name}}</p>
                <p class="singer">
                  <span v-for="(singer, index) in item.ar" :key="index">{{singer.name}} </span>
                </p>
              </div>
            </div>
            <div class="right">
              <span class="svg-wrapper">
                <svg-icon icon-class="play_box"></svg-icon>
              </span>
              <span class="svg-wrapper" @click.stop="onMore(item)">
                <svg-icon icon-class="more"></svg-icon>
              </span>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from 'components/scroll/scroll'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    count: {
      type: Number,
      default: null
    },
    collect: {
      type: Number,
      default: null
    }
  },
  methods: {
    selectItem (item, index) {
      this.$emit('select', item, index)
    },
    onMore (item) {
      this.$emit('more', item)
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixin';
.list {
  .title {
    display: flex;
    justify-content: space-between;
    line-height: 1.5rem;
    padding-left: .5rem;
    .left {
      @include sc(0.7rem, #000);
      .number {
        @include sc(0.5rem, #b2b2b2);
      }
    }
    .right {
      background: $juzi;
      @include sc(0.5rem, #fff);
      box-sizing: border-box;
      padding-right: .5rem;
      .svg-icon {
        @include svg(0.5rem, #fff);
      }
    }
  }
  .scroll-wrapper {
    position: absolute;
    top: 11rem;
    bottom: 0;
    @include wh(100%, 62%);
    box-sizing: border-box;
    padding: 0 .5rem;
    overflow: hidden;
    .scroll {
      height: 100%;
      .list-item {
        display: flex;
        justify-content: space-between;
        height: 2rem;
        .left {
          display: flex;
          align-items: center;
          max-width: 80%;
          .index {
            @include sc(0.7rem, #b2b2b2);
            margin-right: 0.5rem;
          }
          .title {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            line-height: 1rem;
            max-width: 11rem;
            .name {
              @include sc(0.5rem, #000);
              @include nowrap();
            }
            .singer {
              @include sc(0.5rem, #b2b2b2);
              @include nowrap();
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          .svg-wrapper {
            @include wh(1.5rem, 1.5rem);
            .svg-icon {
              @include svg(0.8rem, #b2b2b2);
              margin-left: 0.5rem;
            }
          }
        }
      }
    }
  }
}
</style>
