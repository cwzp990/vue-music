<template>
<keep-alive>
  <router-view />
</keep-alive>
<Modal :visible="showModal" />
</template>

<script>
import {
  computed,
  defineComponent
} from 'vue'
import {
  useStore
} from 'vuex'
import Modal from './components/modal/index.vue'

export default defineComponent({
  components: {
    Modal
  },

  setup() {
    const store = useStore()
    const showModal = computed(() => store.getters.showModal)

    return {
      showModal
    }
  }
})
</script>

<style lang="scss">
.slide-enter-active {
  transition: all .5s linear;
}

.slide-leave-active {
  transition: all .1s linear;
}

.slide-enter {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(110%);
  opacity: 0;
}
</style>
