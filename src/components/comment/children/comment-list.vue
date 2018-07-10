<!-- 评论列表 -->
<template>
  <div class="comment-list vux-1px-b">
    <ul>
      <li v-for="(item, index) in data" :key="index" class="list-item">
        <div class="up">
          <div class="user">
            <div class="avatar">
              <img :src="item.user.avatarUrl" width="100%" height="100%">
            </div>
            <div class="info">
              <p class="name">{{item.user.nickname}}</p>
              <p class="date">{{new Date(item.time).toLocaleString().substring(0,9)}}</p>
            </div>
          </div>
          <div class="like" @click="onLiked(item.commentId)">
            <span>{{item.likedCount > 9999 ? (item.likedCount / 10000).toFixed(1) + '万' : item.likedCount === 0 ? '' : item.likedCount }}</span>
            <svg-icon icon-class="like" :class="liked"></svg-icon>
          </div>
        </div>
        <div class="content">
          {{item.content}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { api } from 'api/index'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    songid: {
      type: String,
      default: ''
    }
  },
  computed: {
    liked () {
      return this.data.liked ? 'red-like' : 'gray-like'
    }
  },
  methods: {
    // songid: 歌曲id cid：评论id t： 1点赞 0取消 type： 0歌曲 1mv 2歌单 3专辑 4电台
    onLiked (cid) {
      api.getCommentLiked(this.songid, cid, 1, 0).then(res => {
        if (res.status === 200) {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../../style/mixin';
.comment-list {
  .list-item {
    padding: .5rem;
    .up {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user {
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar {
          @include wh(2.3rem, 2.3rem);
          margin-right: 1rem;
          border-radius: 50%;
          overflow: hidden;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
          @include sc(.5rem, #000);
          .name {
            margin-bottom: .3rem;
          }
        }
      }
      .like {
        @include sc(.5rem, #000);
        .red-like {
          @include svg(.5rem, $juzi);
        }
        .gray-like {
          @include svg(.5rem, #000);
        }
      }
    }
    .content {
      margin-left: 3rem;
      @include font(.6rem, 1rem);
    }
  }
}
</style>
