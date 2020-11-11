<template>
<div class="m-toast">
  {{message}}
</div>
</template>

<script>
import {
  defineComponent
} from 'vue'
export default defineComponent({
  props: {
    message: String
  },
})
</script>

<style lang="scss">
@import '../../styles/mixin.scss';

.m-toast {
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0);
  align-items: center;
  line-height: 1.5;
  background: $theme;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 1996;
}
</style>
