<!-- 排行榜 -->
<template>
  <transition name="fade">
    <div class="rank">
      <x-header :left-options="{backText: ''}">
        排行榜
        <svg-icon icon-class="playing" slot="right"></svg-icon>
      </x-header>
      <div class="scroll-wrapper">
        <scroll ref="scroll" class="scroll">
          <div>
            <h3 class="title vux-1px-l">
              云音乐官方榜
            </h3>
            <ul style="overflow: hidden;">
              <li v-for="(item, index) in officialList" :key="index" class="list-item" @click="selectItem(item)">
                <div class="img-wrapper">
                  <img :src="item.data.playlist.coverImgUrl" width="100%" height="100%">
                  <span class="update">每周四更新</span>
                </div>
                <ul class="song-lists">
                  <li v-for="(song, index) in item.data.playlist.tracks" :key="song.id" v-if="index < 3" class="song-item">
                    {{index + 1}}. {{song.name}} -
                    <p class="singer">
                      <span v-for="singer in song.ar" :key="singer.id">{{singer.name}}</span>
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </scroll>
      </div>
      <!-- <h3 class="title">全球榜</h3> -->
    </div>
  </transition>
</template>

<script>
import { api } from 'api/index'
import Scroll from 'components/scroll/scroll'
import axios from 'axios'
import { XHeader } from 'vux'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      officialList: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // axios同时发送多个请求
    getData () {
      axios
        .all([
          api.getTopListResource(3),
          api.getTopListResource(0),
          api.getTopListResource(2),
          api.getTopListResource(1)
        ])
        .then(
          axios.spread((res1, res2, res3, res4) => {
            this.officialList.surge = res1
            this.officialList.new = res2
            this.officialList.original = res3
            this.officialList.hot = res4
          })
        )
    },
    selectItem (item) {
      this.$router.push({
        path: `/songList/${item.data.playlist.id}`
      })
      this.setDisc(item.data.playlist)
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

<style lang='scss' scoped>
@import '../../../../style/mixin';
.rank {
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
  .scroll-wrapper {
    @include wh(100%, 100%);
    overflow: hidden;
    .scroll {
      height: 100%;
      .title {
        padding-left: 0.5rem;
        @include sc(0.7rem, #000);
        line-height: 2rem;
        border-color: $juzi;
      }
      .list-item {
        display: flex;
        margin-bottom: 0.3rem;
        height: 5rem;
        .img-wrapper {
          flex: 0 0 5rem;
          position: relative;
          @include wh(5rem, 5rem);
          margin-right: 0.3rem;
          .update {
            position: absolute;
            left: 0.3rem;
            bottom: 0.3rem;
            @include sc(0.5rem, #fff);
          }
        }
        .song-lists {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .song-item {
            @include sc(0.7rem, #777);
            margin-bottom: 0.5rem;
            @include nowrap();
            .singer {
              display: inline;
            }
          }
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
