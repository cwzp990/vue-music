<template>
  <div class="mine">
    <x-header>
      <svg-icon icon-class="cloud" slot="overwrite-left"></svg-icon>
      <svg-icon icon-class="playing" slot="right"></svg-icon>
      <span>我的音乐</span>
    </x-header>
    <div class="scroll-wrapper">
      <scroll ref="scroll" class="scroll">
        <div>
          <div class="mine-list">
            <div class="list-item vux-1px-b">
              <svg-icon icon-class="music"></svg-icon>
              <span class="title">本地音乐</span>
              <span class="count">0</span>
              <svg-icon icon-class="right"></svg-icon>
            </div>
            <div class="list-item vux-1px-b">
              <svg-icon icon-class="list"></svg-icon>
              <span class="title">最近播放</span>
              <span class="count">0</span>
              <svg-icon icon-class="right"></svg-icon>
            </div>
            <div class="list-item vux-1px-b">
              <svg-icon icon-class="radio"></svg-icon>
              <span class="title">我的电台</span>
              <span class="count">0</span>
              <svg-icon icon-class="right"></svg-icon>
            </div>
            <div class="list-item vux-1px-b">
              <svg-icon icon-class="fav"></svg-icon>
              <span class="title">我的收藏</span>
              <span class="count">0</span>
              <svg-icon icon-class="right"></svg-icon>
            </div>
          </div>
          <div class="setList">
            <h3 class="title">
              <svg-icon icon-class="right"></svg-icon>我的歌单
              <span class="count">({{userList.length}})</span>
            </h3>
            <ul>
              <li class="list-item" v-for="item in userList" :key="item.id" @click="selectItem(item)">
                <div class="img-wrapper">
                  <img :src="item.coverImgUrl" width="100%" height="100%">
                </div>
                <div class="content vux-1px-b">
                  <h4 class="name">{{item.name}}</h4>
                  <span class="brief">{{item.trackCount}}首, by {{item.creator.nickname}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'
import Scroll from 'components/scroll/scroll'
import { api } from 'api/index'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      userList: []
    }
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapGetters(['userid'])
  },
  methods: {
    getData () {
      api.getUserPlaylistResource(this.userid).then(res => {
        if (res.status === 200) {
          this.userList = res.data.playlist
        }
      })
    },
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
    XHeader,
    Scroll
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.mine {
  @include allcover();
  @include wh(100%, 100%);
  .vux-header {
    background: $juzi;
    .svg-icon {
      @include svg(1rem, #fff);
    }
  }
  .scroll-wrapper {
    @include wh(100%, 86%);
    overflow: hidden;
    .scroll {
      height: 100%;
      .mine-list {
        .list-item {
          padding: 0 0.3rem;
          height: 1.7rem;
          line-height: 1.7rem;
          @include sc(0.8rem, #b2b2b2);
          .svg-icon:first-child {
            @include svg(1rem, $juzi);
            margin-right: 1rem;
          }
          .title {
            display: inline-block;
            width: 74%;
            color: #333;
          }
          .svg-icon:last-child {
            @include svg(0.8rem, #b2b2b2);
          }
        }
      }
      .setList {
        position: relative;
        .title {
          padding: 0 0.3rem;
          background: #e2e2e2;
          height: 1rem;
          line-height: 1rem;
          @include sc(0.5rem, #777);
          .svg-icon {
            @include svg(0.5rem, #777);
          }
        }
        .list-item {
          display: flex;
          .img-wrapper {
            flex: 0 0 2.7rem;
            @include wh(2.7rem, 2.7rem);
          }
          .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            margin-left: 0.5rem;
            .name {
              @include sc(0.7rem, #333);
            }
            .brief {
              margin-top: 0.3rem;
              @include sc(0.6rem, #b2b2b2);
            }
          }
        }
      }
    }
  }
}
</style>
