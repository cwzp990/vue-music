<template>
<router-view />
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
