<!-- 每日推荐 -->
<template>
  <transition name="fade">
    <div class="daily">
      <x-header :left-options="{backText: ''}">
        每日推荐
        <svg-icon icon-class="playing"
                  slot="right"></svg-icon>
      </x-header>
      <div class="title">
        <svg-icon icon-class="date"></svg-icon>
        根据你的音乐口味生成，每天6:00更新
        <span class="date">{{date}}</span>
      </div>
      <list-details @select="selectItem"
                    @more="selectMore"
                    :data="songList"
                    :count="count"
                    :vtop="2"></list-details>
    </div>
  </transition>
</template>

<script>
import { XHeader } from 'vux'
import ListDetails from 'components/list-details/list-details'
import { api } from 'api/index'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      songList: [],
      count: 0
    }
  },
  created () {
    this.getData()
  },
  computed: {
    date () {
      return new Date().getDate()
    }
  },
  methods: {
    getData () {
      api.getRecommendSongsResource().then(res => {
        this.songList = res.data.recommend
        this.count = res.data.recommend.length
      })
    },
    selectItem (item, index) {
      this.selectPlay({
        list: this.songList,
        index: index
      })
    },
    selectMore (item) {
      this.show = true
      this.songInfo = item
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  components: {
    XHeader,
    ListDetails
  }
}
</script>

<style lang='scss' scoped>
@import '../../../../style/mixin';
.daily {
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
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    box-sizing: border-box;
    padding: 0 0.5rem;
    @include wh(100%, 4rem);
    @include sc(0.5rem, #b2b2b2);
    .svg-icon {
      @include svg(2.5rem, #000);
      margin-bottom: 0.5rem;
    }
    .date {
      position: absolute;
      top: 1.3rem;
      left: 1.2rem;
      @include sc(0.8rem, #000);
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
