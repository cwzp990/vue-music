<template>
<div class="m-juzi-music">
    <m-header />
    <router-view></router-view>
    <m-footer />
</div>
</template>

<script>
import MHeader from '../header/index.vue'
import MFooter from '../footer/index.vue'
export default {
    components: {
        MHeader,
        MFooter
    }
}
</script>
