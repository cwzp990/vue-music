<template>
  <div class="home">
    <div class="header">
      <!-- 头部搜索框 -->
      <search @result-click="resultClick" @on-change="getResult" :results="results" v-model="value" position="absolute" auto-scroll-to-top @on-focus="onFocus" @on-cancel="onCancel" @on-submit="onSubmit" ref="search">
      </search>
    </div>
    <!-- 头部tab导航 -->
    <div class="tab">
      <tab>
        <tab-item selected @on-item-click="gotoAddress('/home/music')">音乐</tab-item>
        <tab-item @on-item-click="gotoAddress('/home/video')">视频</tab-item>
        <tab-item @on-item-click="gotoAddress('/home/radio')">电台</tab-item>
      </tab>
    </div>
    <div class="home-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Search, Group, Cell, Tab, TabItem } from 'vux'
export default {
  data () {
    return {
      results: [],
      value: ''
    }
  },
  methods: {
    gotoAddress (route) {
      this.$router.push(route)
    }
  },
  components: {
    Search,
    Group,
    Cell,
    Tab,
    TabItem
  }
}
</script>

<style lang="scss">
@import '../../style/mixin';
.home {
  @include allcover();
  bottom: 1.95rem;
  @include wh(100%, 100rem);
  .header {
    @include wh(100%, 1.95rem);
    .weui-cells,
    .vux-search_show {
      height: 100% !important;
    }
  }
}
</style>
