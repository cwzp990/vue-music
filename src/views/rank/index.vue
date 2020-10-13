<template>
  <div class="m-songlist">
    <div class="songlist-wrapper">
      <div class="box-wrapper" v-for="list in rankList" :key="list.id">
        <Box :info="list" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import Box from "../../components/box/box.vue";
import api from "../../api";
export default defineComponent({
  components: {
    Box
  },
  setup () {
    const rankList = ref([]);
    onMounted(() => {
      getRankList()
    })

    const getRankList = () => {
      api.getTopListResource().then(resp => {
        if (resp.data.code === 200) {
          rankList.value = resp.data.list
        }
      })
    }

    return {
      rankList
    }
  }
})
</script>

<style lang="scss">
.m-songlist {
  .songlist-wrapper {
    display: flex;
    flex-wrap: wrap;
    .box-wrapper {
      width: 32%;
      margin-right: 2%;
      margin-bottom: 8px;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>