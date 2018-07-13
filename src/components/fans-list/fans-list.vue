<template>
  <div class="fans-list">
    <x-header :left-options="{backText: ''}">
      {{title}}
      <svg-icon icon-class="playing" slot="right"></svg-icon>
    </x-header>
    <ul>
      <li v-for="item in list" :key="item.id" class="list-item">
        <div class="avatar">
          <div class="img-wrapper">
            <img :src="item.avatarUrl" width="100%" height="100%">
          </div>
          <svg-icon icon-class="music" v-show="item.authStatus"></svg-icon>
        </div>
        <div class="name">
          <p>{{item.nickname}} <span v-show="item.gender" style="color: #79C3EB">♂</span><span v-show="!item.gender" style="color: #F699B4">♀</span></p>
          <p class="sign">{{item.signature}}</p>
        </div>
        <div class="more">
          <svg-icon icon-class="more"></svg-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
  computed: {
    title () {
      return this.$route.query.title
    },
    list () {
      return this.$route.query.list
    }
  },
  methods: {
  },
  components: {
    XHeader
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.fans-list {
  position: fixed;
  top: 0;
  bottom: 1.95rem;
  @include wh(100%, 100%);
  background: #fff;
  z-index: 100;
  .vux-header {
    .vux-header-right {
      .svg-icon {
        @include svg(0.9rem, #fff);
      }
    }
  }
  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include wh(100%, 3rem);
    box-sizing: border-box;
    padding: 0 .5rem;
    .avatar {
      position: relative;
      .img-wrapper {
        @include wh(2.5rem, 2.5rem);
        flex: 0 0 2.5rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 1rem;
      }
      .svg-icon {
        @include svg(.5rem, #fff);
        padding: .1rem;
        background: $juzi;
        position: absolute;
        left: 1.7rem;
        bottom: 0;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .name {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      flex: 1;
      height: 100%;
      @include sc(.5rem, #000);
      .sign {
        margin-top: .3rem;
        @include txtEllipsis(1);
      }
    }
    .more {
      @include wh(1.5rem, 100%);
      flex: 0 0 10%;
    }
  }
}
</style>
