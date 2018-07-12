<template>
  <div class="comment-box">
    <p @click="onLike">
      <svg-icon icon-class="like" :class="info.liked ? 'like' : 'dislike'"></svg-icon>
      {{info.likedCount}}
    </p>
    <p>
      <svg-icon icon-class="comment"></svg-icon>
      {{info.commentCount}}
    </p>
    <p>
      <svg-icon icon-class="share"></svg-icon>
      {{info.shareCount}}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onLike () {
      console.log('赞')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';
.comment-box {
  display: flex;
  @include wh(100%, 100%);
  p {
    flex: 1;
    @include sc(.5rem, #777);
    line-height: 1rem;
    .svg-icon {
      @include svg(.5rem, #777);
    }
  }
}
</style>
