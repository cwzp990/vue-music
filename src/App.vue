<template>
  <router-view />
  <player />
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
