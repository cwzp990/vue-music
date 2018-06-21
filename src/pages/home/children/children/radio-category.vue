<!-- 电台-电台分类 -->
<template>
  <div class="radio-category">
    <x-header :left-options="{backText: ''}">
      <svg-icon icon-class="playing" slot="right" :class="{play: playing, pause: !playing}"></svg-icon>
      <span>电台分类</span>
    </x-header>
    <h2>热门分类</h2>
    <ul class="list">
      <li v-for="(item, index) in categories" v-if="index < 6" :key="item.id" class="list-item">
        <div class="category-icon">
          <img :src="item.picUrl" width="100%" height="100%"/>
        </div>
        <h4 class="category-name">{{item.name}}</h4>
      </li>
    </ul>
    <h2>更多分类</h2>
    <ul class="list">
      <li v-for="(item, index) in categories" v-if="index > 5" :key="item.id" class="list-item">
        <div class="category-icon">
          <img :src="item.picUrl" width="100%" height="100%"/>
        </div>
        <h4 class="category-name">{{item.name}}</h4>
      </li>
    </ul>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { api } from 'api/index'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      categories: []
    }
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapGetters(['playing'])
  },
  methods: {
    getData () {
      api.getDjClassify().then(res => {
        if (res.status === 200) {
          this.categories = this._normalizeData(res.data.categories)
        }
      })
    },
    _normalizeData (data) {
      let result = []
      data.forEach(item => {
        let temp = {
          id: item.id,
          name: item.name,
          picUrl: item.pic84x84IdUrl
        }
        result.push(temp)
      })
      return result
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
  },
  components: {
    XHeader
  }
}
</script>

<style lang='scss' scoped>
@import '../../../../style/mixin';
.radio-category {
  @include allcover();
  @include wh(100%, 100%);
  background: #fff;
  z-index: 100;
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
  h2 {
    @include font(.7rem, 1.7rem);
    color: #000;
    text-align: center;
  }
  .list {
    display: flex;
    flex-flow: row wrap;
    .list-item {
      width: 50%;
      box-sizing: border-box;
      padding: .6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .category-icon {
        @include wh(.8rem, .8rem);
        margin-right: .8rem;
      }
      .category-name {
        @include sc(.6rem, #000);
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
