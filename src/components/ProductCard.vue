<script>
export default {
    name: 'ProductCard',

    data() {
        return {
            quantityToAdd: 1,
        }
    },

    props: {
        product: Object,
    },

    methods: {
        increaseQuantity() {
            this.quantityToAdd++;
        },

        decreaseQuantity() {
            if (this.quantityToAdd > 0) {
                this.quantityToAdd--;
            }
        },

        addToCart() {
            this.$emit('addToCart', { product: this.product, quantityToAdd: this.quantityToAdd });
            this.quantityToAdd = 1;
        }
    }
}
</script>

<template>
    <div class="card">
        <div class="row g-0">
            <div class="col-12 col-md-4 col-lg-3">
                <img :src="product.photo ? 'http://127.0.0.1:8000/storage/' + product.photo : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'"
                    alt="">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">{{ product.description }}</p>
                    <p class="card-text"><small class="text-body-secondary"><strong>€ {{ product.price }}</strong></small>
                    </p>

                    <div class="d-flex gap-3">
                        <span class="d-flex align-items-center gap-2">
                            <button class="btn btn-secondary" @click="decreaseQuantity()">-</button>
                            {{ quantityToAdd }}
                            <button class="btn btn-secondary" @click="increaseQuantity()">+</button>
                        </span>

                        <button @click="addToCart()" class="btn btn-primary">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.card {
    border-radius: 150px;
    margin-bottom: 15px;
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    height: 250px;

    // background-color: #ffca2cc5;
    // background-color: #000000a1;
    background-color: rgb(255, 255, 255);
    font-weight: 600;
    color: #740c0d;
    border: 2px solid #740c0d;

    .row.g-0 {
        height: 100%;
    }

    .col-md-8 {
        height: 100%;
    }

    .card-body {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px 0 20px 0;

        strong {
            color: #740c0d;
        }
    }

    img {
        height: 100%;
        border-radius: 50%;
        position: absolute;

    }
}
</style>