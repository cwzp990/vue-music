<template>
  <div id="app">
    <router-view />
    <player />
  </div>
</template>

<script>
import player from "./components/player/index.vue";
export default {
  name: "App",
  components: {
    player
  }
};
</script>
