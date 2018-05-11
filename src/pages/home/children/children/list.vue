<!-- 歌单 -->
<template>
  <transition name="fade">
    <div class="list">
      <x-header :left-options="{backText: ''}">
        歌单
        <svg-icon icon-class="playing" slot="right"></svg-icon>
      </x-header>
      <h3 class="title">
        <p class="left" @click="gotoAddress('/home/list/category')">
          {{tag}}
          <svg-icon icon-class="right"></svg-icon>
        </p>
        <ul class="right">
          <li class="item vux-1px-r">欧美</li>
          <li class="item vux-1px-r">电子</li>
          <li class="item" style="padding-right: 0;">影视原声</li>
        </ul>
      </h3>
      <div class="list-content">
        <flexbox :gutter="0" wrap="wrap">
          <flexbox-item class="list-item" :span="1/2" v-for="(item, index) in list" v-if="index < 20" :key="item.id" @click.native="selectItem(item)">
            <div class="playCount">
              <svg-icon icon-class="earphone"></svg-icon>
              <span>{{item.playCount}}</span>
            </div>
            <div class="author">
              <svg-icon icon-class="user"></svg-icon>
              <span v-if="item.subscribers.length">{{item.subscribers[0].nickname}}</span>
            </div>
            <img :src="item.coverImgUrl" width="100%" height="100%">
            <p class="name">{{item.name}}</p>
          </flexbox-item>
        </flexbox>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import { XHeader, Flexbox, FlexboxItem } from 'vux'
import { api } from 'api/index'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      tag: '全部歌单',
      list: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      api.getTopPlaylistResource(this.tag).then(res => {
        if (res.status === 200) {
          this.list = res.data.playlists
        }
      })
    },
    selectItem (item) {
      this.$router.push({
        path: `/songList/${item.id}`
      })
      this.setDisc(item)
    },
    gotoAddress (path) {
      this.$router.push(path)
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
  components: {
    XHeader,
    Flexbox,
    FlexboxItem
  }
}
</script>

<style lang='scss' scoped>
@import '../../../../style/mixin';
.list {
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
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0.5rem;
    @include wh(100%, 3rem);
    .left {
      @include sc(0.7rem, #000);
      padding: 0.3rem 0.5rem;
      border: 0.025rem solid #b2b2b2;
      border-radius: 20px;
      .svg-icon {
        margin-left: 0.3rem;
        @include svg(0.6rem, #b2b2b2);
      }
    }
    .right {
      display: flex;
      align-items: center;
      @include sc(0.7rem, #000);
      .item {
        padding: 0 0.3rem;
      }
    }
  }
  .list-item {
    position: relative;
    margin-bottom: 0.5rem;
    .playCount {
      position: absolute;
      top: 0;
      right: 0;
      @include sc(0.5rem, #fff);
      .svg-icon {
        @include svg(0.7rem, #fff);
      }
    }
    .author {
      position: absolute;
      left: 0;
      bottom: 1.5rem;
      @include sc(0.5rem, #fff);
      .svg-icon {
        @include svg(0.7rem, #fff);
      }
    }
  }
  .name {
    @include sc(0.6rem, #777);
    @include txtEllipsis(2);
  }
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease
}
.fade-enter, .fade-leave-to {
  transform: translate3d(100%, 0, 0)
}
</style>
