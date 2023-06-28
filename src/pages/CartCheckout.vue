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
    <main>
        <div class="container py-5">
            <AppPayment></AppPayment>
        </div>
    </main>
</template>

<style lang="scss" scoped>
main {
    padding-top: 100px;
}
</style>