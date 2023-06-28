<script>
import AppCart from '../components/AppCart.vue';

export default {
    name: 'CartResume',

    data() {
        return {};
    },

    components: {
        AppCart
    }
}
</script>

<template>
    <div id="cart-wrapper" class="container">
        <AppCart></AppCart>
    </div>
</template>

<style lang="scss" scoped>
#cart-wrapper {
    padding-top: 100px;
}
</style>