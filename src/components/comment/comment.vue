<!-- 评论 -->
<template>
  <div class="comment">
    <x-header :left-options="{backText: ''}">
      评论({{comment.total}})
      <svg-icon icon-class="playing" slot="right"></svg-icon>
    </x-header>
    <scroll>
      <div class="comment-main">
        <div class="title">
          <div class="img-wrapper">
            <img src="" width="100%" height="100%">
          </div>
          <div class="info">
            <h2 class="name">江南</h2>
            <p class="singer">林俊杰</p>
          </div>
        </div>
        <h3 class="comment-title">精彩评论</h3>
        <comment-list :data="comment.hotComments"></comment-list>
        <h3 class="comment-title">最新评论{{comment.total}}</h3>
        <comment-list :data="comment.comments"></comment-list>
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
  data () {
    return {
      comment: {}
    }
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapGetters(['userid', 'playing', 'playlist'])
  },
  methods: {
    getData () {
      let url = this.$route.path
      if (url.indexOf('song') > 0) {
        api.getCommentResource(this.$route.params.id).then(res => {
          this.comment = res.data
        })
      } else {
        api.getPlaylistCommentResource(this.$route.params.id).then(res => {
          console.log(res)
          this.comment = res.data
        })
      }
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
  .list-wrapper {
    height: 100%;
    overflow: hidden;
    .title {
      display: flex;
      justify-content: start;
      align-items: center;
      padding: .5rem;
      box-sizing: border-box;
      @include wh(100%, 5rem);
      .img-wrapper {
        @include wh(3rem, 3rem);
        margin-right: 1rem;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .name {
          @include sc(.7rem, #000);
          margin-bottom: .5rem;
        }
        .singer {
          @include sc(.6rem, #0C73C2);
        }
      }
    }
    .comment-title {
      @include font(.4rem, 1.2rem);
      background: #d2d2d2;
      padding: 0 .5rem;
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
