<!-- 评论 -->
<template>
  <div class="comment">
    <x-header :left-options="{backText: ''}">
      评论({{comment.total}})
      <svg-icon icon-class="playing"
                slot="right"></svg-icon>
    </x-header>
    <scroll>
      <div class="comment-main">
        <div class="title">
          <div class="img-wrapper"
               v-if="song.al">
            <img :src="song.al.picUrl"
                 width="100%"
                 height="100%">
          </div>
          <div class="img-wrapper"
               v-else-if="!song.al">
            <img :src="songlist.coverImgUrl"
                 width="100%"
                 height="100%">
          </div>
          <div class="info"
               v-if="song.al">
            <h2 class="name">{{song.al.name}}</h2>
            <p class="singer">{{song.ar[0].name}}</p>
          </div>
          <div class="info"
               v-else-if="!song.al && songlist.creator">
            <h2 class="name">{{songlist.name}}</h2>
            <p class="singer">{{songlist.creator.nickname}}</p>
          </div>
        </div>
        <h3 class="comment-title">精彩评论</h3>
        <comment-list :comments="comment.hotComments"
                      songid="songid"
                      @selected="itemSelected"></comment-list>
        <h3 class="comment-title">最新评论{{comment.total}}</h3>
        <comment-list :comments="comment.comments"
                      songid="songid"></comment-list>
      </div>
    </scroll>
    <div class="input-wrapper">
      <input type="text"
             class="comment-box"
             placeholder="说点什么吧，也许ta都听得到"
             v-model="commentVal">
      <x-button mini
                class="submit"
                @click.native="submit">发送</x-button>
    </div>
  </div>
</template>

<script>
import { XHeader, XButton } from 'vux'
import { mapGetters } from 'vuex'
import Scroll from 'components/scroll/scroll'
import CommentList from 'components/comment/children/comment-list'
import { api } from 'api/index'
export default {
  data () {
    return {
      comment: {},
      commentVal: '',
      song: {},
      songlist: {}
    }
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapGetters(['userid', 'playing', 'playlist']),
    songid () {
      return this.$route.query.id
    }
  },
  methods: {
    getData () {
      let url = this.$route.path
      if (url.indexOf('song') > 0) {
        api.getCommentResource(this.$route.query.id).then(res => {
          this.comment = res.data
        })
      } else {
        api.getPlaylistCommentResource(this.$route.query.id).then(res => {
          this.comment = res.data
        })
      }
      api.getSongDetails(this.$route.query.id).then(res => {
        if (res.data.songs.length !== 0) {
          this.song = res.data.songs[0]
        }
      })

      api.getPlaylistDetailResource(this.$route.query.id).then(res => {
        this.songlist = res.data.playlist
      })
    },
    submit () {
      if (!this.commentVal) {
        this.$vux.toast.text('输入不能为空', 'top')
      } else {
        api.sendOrDelComment(1, 0, this.$route.query.id, this.commentVal).then(res => {
          if (res.data.code === 200) {
            this.$vux.toast.text('评论成功', 'top')
          } else {
            this.$vux.toast.text(res.data.msg, 'top')
          }
        })
      }
    },
    itemSelected (item) {
    }
  },
  components: {
    XHeader,
    XButton,
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
      padding: 0.5rem;
      box-sizing: border-box;
      @include wh(100%, 5rem);
      .img-wrapper {
        @include wh(3rem, 3rem);
        margin-right: 1rem;
      }
      .info {
        display: flex;
        flex-direction: column;
        .name {
          @include sc(0.7rem, #000);
          margin-bottom: 0.5rem;
        }
        .singer {
          @include sc(0.6rem, #0c73c2);
        }
      }
    }
    .comment-title {
      @include font(0.4rem, 1.2rem);
      background: #d2d2d2;
      padding: 0 0.5rem;
    }
  }
  .input-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 300;
    box-sizing: border-box;
    padding: 0 0.5rem;
    @include wh(100%, 1.7rem);
    background: #fff;
    .comment-box {
      margin-top: 0.3rem;
      @include wh(85%, 1rem);
      border: 0.025rem solid #b2b2b2;
      border-radius: 0.5rem;
      outline: none;
      box-sizing: border-box;
      padding: 0 0.5rem;
      @include sc(0.6rem, #000);
    }
    .submit {
      position: absolute;
      top: 0.3rem;
      right: 0;
      @include wh(2.5rem, 1rem);
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
