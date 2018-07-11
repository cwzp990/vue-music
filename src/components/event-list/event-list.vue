<template>
  <div class="event-list">
    <ul>
      <li v-for="item in list" :key="item.id" class="list-item">
        <div class="up">
          <div class="user">
            <div class="avatar">
              <img :src="item.user.avatarUrl" width="100%" height="100%">
            </div>
            <div class="info">
              <p class="name">{{item.user.nickname}} 分享</p>
              <p class="date">{{new Date(item.eventTime).toLocaleString().substring(0,9)}}</p>
            </div>
          </div>
        </div>
        <div class="down">
          <p class="article">{{JSON.parse(item.json).msg}}</p>
          <ul class="pic-wrapper">
            <li v-for="(pic, index) in item.pics" :key="index" class="pic-item">
              <img :src="pic.squareUrl" :width="pic.width" :height="pic.height">
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  created () {
    console.log(this.list)
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.event-list {
  .list-item {
    @include wh(100%, 4rem);
    box-sizing: border-box;
    padding: 0 .5rem;
    .up {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user {
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar {
          @include wh(1.5rem, 1.5rem);
          margin-right: .5rem;
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
      .liked {
        @include sc(.5rem, $juzi);
        .svg-icon {
          @include svg(.5rem, $juzi);
        }
      }
      .dislike {
        @include sc(.5rem, #000);
        .svg-icon {
          @include svg(.5rem, #000);
        }
      }
    }
    .down {
      .article {
        margin-left: 2rem;
        @include sc(.5rem, #000);
        line-height: 1rem;
      }
      .pic-wrapper {
        display: flex;
        .pic-item {
          flex: 0 0 33%;
          @include wh(33%, 5rem);
        }
      }
    }
  }
}
</style>
