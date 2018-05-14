<!-- 歌单详情 -->
<template>
  <div class="details">
    <div class="wrapper">
      <div class="header">
        <div class="svg-wrapper" @click="back">
          <svg-icon icon-class="close"></svg-icon>
        </div>
      </div>
      <div class="main">
        <div class="img-wrapper">
          <img :src="details.coverImgUrl" width="100%" height="100%">
        </div>
        <h3 class="title vux-1px-b">{{details.name}}</h3>
        <div class="tag">
          标签:
          <span v-for="(item, index) in details.tags" :key="index" class="tag-item">{{item}}</span>
        </div>
        <p class="brief" v-html="details.description"></p>
      </div>
      <div class="save">
        保存封面
      </div>
      <div class="bg-img">
        <img :src="details.coverImgUrl" width="100%" height="100%">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      details: this.$route.query.details
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../../style/mixin';
.details {
  position: fixed;
  top: 0;
  bottom: 0;
  @include wh(100%, 100%);
  background: #fff;
  z-index: 300;
  .wrapper {
    @include wh(100%, 100%);
    box-sizing: border-box;
    padding: 0 .5rem;
    background: rgba(0, 0, 0, .2);
    .header {
      position: relative;
      line-height: 1.95rem;
      text-align: right;
      .svg-icon {
        @include svg(1rem, #fff);
      }
    }
    .main {
      .img-wrapper {
        @include wh(50%, 50%);
        margin: 1rem auto;
      }
      .title {
        text-align: center;
        @include sc(.8rem, #fff);
        padding-bottom: .5rem;
      }
      .tag {
        margin: .5rem 0;
        @include sc(.7rem, #fff);
        .tag-item {
          @include sc(.5rem, #fff);
          padding: .1rem .3rem;
          border: .025rem solid #fff;
          border-radius: 10px;
        }
      }
      .brief {
        @include sc(.7rem, #fff);
      }
    }
    .save {
      display: inline-block;
      @include cl;
      bottom: 1rem;
      @include sc(.6rem, #fff);
      padding: .2rem .5rem;
      border: .025rem solid #fff;
      border-radius: 10px;
    }
    .bg-img {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: -1;
      @include wh(100%, 100%);
      filter: blur(20px);
      opacity: 0.6;
    }
  }
}
</style>
