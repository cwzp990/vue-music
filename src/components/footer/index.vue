<template>
  <div class="m-footer">
    <router-link to="/songlist">
      <i className="iconfont icon-songlist"></i>
      <span>歌单</span>
    </router-link>
    <router-link to="/search">
      <i className="iconfont icon-search"></i>
      <span>搜索</span>
    </router-link>
    <router-link to="/rank">
      <i className="iconfont icon-rank"></i>
      <span>排行榜</span>
    </router-link>
    <router-link to="/mine">
      <i className="iconfont icon-music"></i>
      <span>我的</span>
    </router-link>
  </div>
</template>

<style lang="scss">
@import "../../styles/mixin.scss";
.m-footer {
  display: flex;
  height: 60px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 25%;
    @include sc;
    .iconfont {
      @include sc(22px);
      margin-bottom: 5px;
    }
    &.active {
      color: $theme;
      .iconfont {
        color: $theme;
      }
    }
  }
}
</style>
