<script>
export default {
    name: 'ProductCard',

    data() {
        return {

        }
    },

    props: {
        product: Object,
    },
}
</script>

<template>
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-12 col-md-4 col-lg-3">
                <img class="w-100"
                    src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                    alt="">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">{{ product.description }}</p>
                    <p class="card-text"><small class="text-body-secondary">€ {{ product.price }}</small></p>
                    <button @click="$emit('addToCart', product)" class="btn btn-primary"><i
                            class="fa-solid fa-cart-shopping"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>