<!-- 歌曲列表详情 -->
<template>
  <div class="list">
    <h3 class="title">
      <div class="left">
        <svg-icon icon-class="play"></svg-icon>
        播放全部
        <span class="number">(共{{count}}首)</span>
      </div>
      <div class="right">
        <svg-icon icon-class="list"></svg-icon>
        多选
      </div>
    </h3>
    <ul>
      <li v-for="(item, index) in data" :key="item.id" class="list-item" @click="selectItem(item, index)">
        <div class="left">
          <span class="index">{{index + 1}}</span>
          <div class="title">
            <p class="name">{{item.name}}</p>
            <p class="singer"><span v-for="singer in item.artists" :key="singer.id">{{singer.name}} </span></p>
          </div>
        </div>
        <div class="right">
          <svg-icon icon-class="play_box"></svg-icon>
          <svg-icon icon-class="more"></svg-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    count: {
      type: Number,
      default: null
    }
  },
  created () {
  },
  methods: {
    selectItem (item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixin';
.list {
  padding: 0 .5rem;
  .title {
    display: flex;
    justify-content: space-between;
    line-height: 1.5rem;
    .left {
      @include sc(.7rem, #000);
      .number {
        @include sc(.5rem, #b2b2b2);
      }
    }
    .right {
      @include sc(.7rem, #000);
      .svg-icon {
        @include svg(.7rem, #b2b2b2);
      }
    }
  }
  .list-item {
    display: flex;
    justify-content: space-between;
    height: 2rem;
    .left {
      display: flex;
      align-items: center;
      max-width: 80%;
      .index {
        @include sc(.7rem, #b2b2b2);
        margin-right: .5rem;
      }
      .title {
        display: flex;
        flex-direction: column;
        line-height: 1rem;
        max-width: 11rem;
        .name {
          @include sc(.7rem, #000);
          @include nowrap();
        }
        .singer {
          @include sc(.5rem, #b2b2b2);
          @include nowrap();
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      .svg-icon {
        @include svg(.8rem, #b2b2b2);
        margin-left: .5rem;
      }
    }
  }
}
</style>
