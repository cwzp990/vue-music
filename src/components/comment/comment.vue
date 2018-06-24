<!-- 评论 -->
<template>
  <div class="comment">
    <x-header :left-options="{backText: ''}">
      评论
      <svg-icon icon-class="playing" slot="right"></svg-icon>
    </x-header>
    <scroll>
      <div class="comment-main">
        <div class="title">
          <div class="img-wrapper">
            <img src="" width="100%" height="100%">
          </div>
          <div class="info">
            <h2></h2>
            <p>by </p>
          </div>
        </div>
        <h3>精彩评论</h3>
        <comment-list></comment-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapGetters } from 'vuex'
import Scroll from 'components/scroll/scroll'
import CommentList from 'components/comment/children/comment-list'
import { api } from 'api/index'
export default {
  created () {
    this.getData()
  },
  computed: {
    ...mapGetters(['userid', 'playing', 'playlist'])
  },
  methods: {
    getData () {
      api.getCommentResource(this.$route.params.id).then(res => {
        console.log(res)
      })
    }
  },
  components: {
    XHeader,
    Scroll,
    CommentList
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixin';
.comment {
  @include allcover();
  @include wh(100%, 100%);
  z-index: 700;
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
