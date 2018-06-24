<!-- 筛选歌单-分类 -->
<template>
  <div class="boxs">
    <div class="top">
      <h2><svg-icon :icon-class="icon"></svg-icon><p>{{title}}</p></h2>
      <ul class="lists">
        <li v-for="(item, index) in list" v-if="index < 6" :key="index" class="list-item-t" @click="selectItem($event)">
          <svg-icon icon-class="hot" v-show="item.hot"></svg-icon>
          {{item.name}}
          <svg-icon icon-class="selected-triangle" v-show="tick"></svg-icon>
        </li>
      </ul>
    </div>
    <div class="down">
      <ul class="lists">
        <li v-for="(item, index) in list" v-if="index > 5" :key="index" class="list-item-d" @click="selectItem($event)">
          <svg-icon icon-class="hot" v-show="item.hot"></svg-icon>
          {{item.name}}
          <svg-icon icon-class="selected-triangle" v-show="tick"></svg-icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { saveCategory } from 'utils/cache'
export default {
  data () {
    return {
      tick: false
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this.getCategory()
  },
  methods: {
    getCategory () {
    },
    selectItem (event) {
      let category = event.currentTarget.innerText
      saveCategory(category)
      this.gotoAddress('/home/list')
    },
    gotoAddress (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../../../../../style/mixin';
.boxs {
  display: flex;
  flex-direction: column;
  @include wh(100%, 100%);
  .top {
    display: flex;
    h2 {
      display: flex;
      flex: 0 0 25%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @include wh(25%, 3.4rem);
      .svg-icon {
        @include svg(1rem, #000);
        margin-bottom: .3rem;
      }
      p {
        @include sc(.7rem, #000);
      }
    }
    .lists {
      display: flex;
      flex: 1;
      flex-flow: row wrap;
      .list-item-t {
        position: relative;
        @include wh(33%, 1.7rem);
        @include font(.6rem, 1.7rem);
        text-align: center;
        color: #000;
        .svg-icon:first-child {
          position: absolute;
          top: 0;
          left: 0;
          transform:scaleX(-1);
          @include svg(1rem, $juzi);
        }
        .svg-icon:last-child {
          position: absolute;
          bottom: -.4rem;
          right: -.4rem;
          @include svg(1.5rem, $juzi);
        }
      }
    }
  }
  .down {
    .lists {
      display: flex;
      flex-flow: row wrap;
      .list-item-d {
        position: relative;
        @include wh(25%, 1.7rem);
        @include font(.6rem, 1.7rem);
        text-align: center;
        color: #000;
        .svg-icon:first-child {
          position: absolute;
          top: 0;
          left: 0;
          transform:scaleX(-1);
          @include svg(1rem, $juzi);
        }
        .svg-icon:last-child {
          position: absolute;
          bottom: -.4rem;
          right: -.4rem;
          @include svg(1.5rem, $juzi);
        }
      }
    }
  }
}
</style>
