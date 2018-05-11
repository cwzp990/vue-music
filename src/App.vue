<template>
  <div id="app">
    <router-view></router-view>
    <player></player>
  </div>
</template>

<script>
import player from 'components/player/player'
export default {
  name: 'App',
  components: {
    player
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
</style>
