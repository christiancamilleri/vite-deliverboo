<script>
import AppPayment from '../components/AppPayment.vue';

export default {
    name: 'CartCheckout',

    data() {
        return {};
    },

    components: {
        AppPayment
    }
}
</script>

<template>
    <div class="container py-5">
        <AppPayment></AppPayment>
    </div>
</template>

<style lang="scss" scoped></style>