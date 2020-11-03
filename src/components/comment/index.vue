<template>
<div class="m-comment">
  <Scroll ref="scrollRef" @load-more="loadMore">
    <div>
      <p v-if="hotComments.length">精彩评论 ({{hotComments.length}})</p>
      <ul>
        <li v-for="item in hotComments" :key="item.commentId" class="item-comment">
          <p class="avatar">
            <img :src="item.user.avatarUrl" alt="" />
          </p>
          <div class="main">
            <div class="userinfo">
              <div>
                <p class="name">{{item.user.nickname}}</p>
                <p class="time">{{formatDate(item.time)}}</p>
              </div>
              <p>
                <span class="count">{{convertCount(item.likedCount)}}</span>
                <i :class="item.liked ? 'iconfont icon-like red' : 'iconfont icon-like'"></i>
              </p>
            </div>
            <p class="content">{{item.content}}</p>
            <p></p>
          </div>
        </li>
      </ul>

      <p>最新评论 ({{comments.length}})</p>
      <ul>
        <li v-for="item in comments" :key="item.commentId" class="item-comment">
          <p class="avatar">
            <img :src="item.user.avatarUrl" alt="" />
          </p>
          <div class="main">
            <div class="userinfo">
              <div>
                <p class="name">{{item.user.nickname}}</p>
                <p class="time">{{formatDate(item.time)}}</p>
              </div>
              <p>
                <span class="count">{{convertCount(item.likedCount)}}</span>
                <i :class="item.liked ? 'iconfont icon-like red' : 'iconfont icon-like'"></i>
              </p>
            </div>
            <p class="content">{{item.content}}</p>
            <p></p>
          </div>

        </li>
      </ul>
    </div>
  </Scroll>

</div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref
} from 'vue'
import {
  useStore
} from 'vuex';
import {
  useRouter
} from 'vue-router'
import Scroll from '../scroll/index.vue'
import api from '../../api'
import {
  formatDate,
  convertCount
} from '../../utils'

export default defineComponent({
  components: {
    Scroll
  },
  setup() {
    const hotComments = ref([])
    const comments = ref([])
    const scrollRef = ref(null);
    const store = useStore();
    const route = useRouter()
    const id = route.currentRoute.value.query.id

    onMounted(() => {
      getComments()
    })

    const getComments = () => {
      api.getCommentResource(id).then((resp) => {
        if (resp.data.code === 200) {
          comments.value = resp.data.comments
          hotComments.value = resp.data.hotComments || []
        }
      });
    }

    const loadMore = (offset) => {
      let newOffset = offset + 1
      api.getCommentResource(id, newOffset).then(resp => {
        if (resp.data.code === 200) {
          store.commit('SET_OFFSET', newOffset)
          let newList = resp.data.comments || []
          comments.value = [...comments.value, ...newList]
          scrollRef.value.isLoaded()
        }
      })
    }

    return {
      hotComments,
      comments,
      formatDate,
      convertCount,
      scrollRef,
      loadMore
    }
  }
})
</script>

<style lang="scss">
@import '../../styles/mixin.scss';

.m-comment {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;

  .comment-title {
    @include wh(100%, 100%);
    line-height: 1.5;
  }

  .item-comment {
    display: flex;
    margin: 6px 0;
    padding: 8px 0;
    border-bottom: 1px solid $bgc;

    .avatar {
      @include avatar(48px, 48px);
      flex: 0 0 48px;
      margin-right: 10px;
    }

    .main {
      display: flex;
      flex-direction: column;
      flex: 1;

      .userinfo {
        display: flex;
        justify-content: space-between;

        .name {
          @include sc($font_normal, $black);
          font-weight: 700;
          line-height: 18px;
        }

        .time {
          @include sc($font_small, $gray);
          line-height: 18px;
        }

        .count {
          @include sc($font_small, $light_gray);
          line-height: 18px;
        }
      }

      .content {
        @include sc($font_normal, $black);
        line-height: 22px;
      }
    }
  }
}
</style>
