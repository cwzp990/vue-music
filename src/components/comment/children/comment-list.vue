<!-- 评论列表 -->
<template>
  <div class="comment-list vux-1px-b">
    <ul>
      <li v-for="(item, index) in comments"
          :key="index"
          class="list-item"
          @click="selectItem(item)">
        <div class="up">
          <div class="user">
            <div class="avatar">
              <img :src="item.user.avatarUrl"
                   width="100%"
                   height="100%">
            </div>
            <div class="info">
              <p class="name">{{item.user.nickname}}</p>
              <p class="date">{{new Date(item.time).toLocaleString().substring(0,9)}}</p>
            </div>
          </div>
          <div class="like"
               @click="onLiked(item.commentId, $event, index)"
               :class="[(item.liked ? 'liked' : 'dislike'),{'liked':ind1 === index},{'dislike':ind2 === index}]">
            <span>{{item.likedCount > 9999 ? (item.likedCount / 10000).toFixed(1) + '万' : item.likedCount === 0 ? '' : item.likedCount }}</span>
            <svg-icon icon-class="like"></svg-icon>
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
import { Popover } from 'vux'
export default {
  props: {
    comments: {
      type: Array,
      default: () => []
    },
    songid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      type: -1,
      ind1: '',
      ind2: ''
    }
  },
  methods: {
    // songid: 歌曲id cid：评论id t： 1点赞 0取消 type： 0歌曲 1mv 2歌单 3专辑 4电台
    onLiked (cid, e, index) {
      let classValue = e.currentTarget.className
      if (classValue.indexOf('liked') > -1) {
        api.getCommentLiked(this.songid, cid, 0, 0).then(res => {
          if (res.status === 200) {
            if (res.data.code === 200) {
              this.ind2 = index
            } else {
              this.$vux.toast.text(res.data.msg, 'top')
            }
          }
        })
      } else {
        api.getCommentLiked(this.songid, cid, 1, 0).then(res => {
          if (res.status === 200) {
            if (res.data.code === 200) {
              this.ind1 = index
            } else {
              this.$vux.toast.text(res.data.msg, 'top')
            }
          }
        })
      }
    },
    selectItem (item) {
      this.$emit('selected', item)
    }
  },
  components: {
    Popover
  }
}
</script>

<style lang='scss' scoped>
@import '../../../style/mixin';
.comment-list {
  .list-item {
    padding: 0.5rem;
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
          @include sc(0.5rem, #000);
          .name {
            margin-bottom: 0.3rem;
          }
        }
      }
      .liked {
        @include sc(0.5rem, $juzi);
        .svg-icon {
          @include svg(0.5rem, $juzi);
        }
      }
      .dislike {
        @include sc(0.5rem, #000);
        .svg-icon {
          @include svg(0.5rem, #000);
        }
      }
    }
    .content {
      margin-left: 3rem;
      @include font(0.6rem, 1rem);
    }
  }
}
</style>
