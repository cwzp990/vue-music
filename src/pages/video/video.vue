<!-- 首页tab video栏 -->
<template>
  <div class="home-video">
    <x-header>
      <svg-icon icon-class="player"
                slot="overwrite-left"></svg-icon>
      <svg-icon icon-class="playing"
                slot="right"
                :class="{play: playing, pause: !playing}"></svg-icon>
      <span>视频</span>
    </x-header>
    <scroll class="row">
      <ul class="classify">
        <li>推荐</li>
        <li>音乐</li>
        <li>showtime</li>
        <li>MV</li>
        <li>二次元</li>
        <li>舞蹈</li>
        <li>游戏</li>
      </ul>
    </scroll>
    <scroll class="col">
      <div class="mv-list">
        <ul>
          <li v-for="item in MV"
              :key="item.id"
              class="list-item">
            <video-list :mvid="item.id"></video-list>
            <div>
              <span class="name">{{item.name}}</span>
              <span class="artist">{{item.artistName}}</span>
            </div>
            <p class="brief">{{item.briefDesc}}</p>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapGetters } from 'vuex'
import { api } from 'api/index'
import Scroll from 'components/scroll/scroll'
import VideoList from 'pages/video/children/video-list'
export default {
  created () {
    this.getData()
  },
  data () {
    return {
      MV: []
    }
  },
  computed: {
    ...mapGetters(['userid', 'playing', 'playlist'])
  },
  methods: {
    getData () {
      api.getMVRank().then(res => {
        if (res.status === 200) {
          this.MV = res.data.data
          console.log(this.MV)
        }
      })
    }
  },
  components: {
    XHeader,
    Scroll,
    VideoList
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixin';
.home-video {
  @include allcover();
  @include wh(100%, 100%);
  .vux-header {
    background: $juzi;
    .svg-icon {
      @include svg(1rem, #fff);
    }
    .play {
      top: 25%;
      animation: rotate 20s linear infinite;
    }
    .pause {
      animation-play-state: paused;
    }
  }
  .row {
    height: auto;
    .classify {
      @include wh(200%, 1rem);
      li {
        float: left;
        height: 1rem;
        padding: 0 0.7rem;
        @include font(0.7rem, 1rem);
      }
    }
  }
  .col {
    height: 100%;
    overflow: hidden;
    .mv-list {
      .list-item {
        margin-bottom: 0.5rem;
        .name {
          @include sc(0.8rem, #000);
        }
        .artist {
          @include sc(0.6rem, #666);
        }
        .brief {
          @include sc(0.6rem, #000);
          margin-top: 0.3rem;
        }
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
