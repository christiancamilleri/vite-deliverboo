<script>
import AppCart from '../components/AppCart.vue';

export default {
    name: 'CartResume',

    data() {
        return {

        };
    },

    components: {
        AppCart
    },

    mounted() {
        window.scrollTo(0, 0);
    },
}
</script>

<template>
    <div id="cart-wrapper" class="container">
        <AppCart></AppCart>
    </div>
</template>

<style lang="scss" scoped>
#cart-wrapper {
    padding-top: 150px;
    padding-bottom: 150px;
}
</style>