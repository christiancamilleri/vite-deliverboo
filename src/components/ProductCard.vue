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
            if (this.quantityToAdd > 1) {
                this.quantityToAdd--;
            }
        },

        addToCart() {
            if (this.quantityToAdd > 0) {
                this.$emit('addToCart', { product: this.product, quantityToAdd: this.quantityToAdd });
                this.quantityToAdd = 1;
            }
        }
    }
}
</script>

<template>
    <!-- <div class="card mb-3 rounded-pill align-items-center">
        <div class="row g-0">
            <div class="h-100 col-md-4 rounded-circle border border-primary">
                <img class="img-fluid ratio ratio-1x1"
                    :src="product.photo ? 'http://127.0.0.1:8000/storage/' + product.photo : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'"
                    alt="">
            </div>
            <div class="col-md-8 d-flex align-items-center">
                <div class="card-body">
                    <div
                        class="h-100 d-flex flex-column justify-content-around align-items-center align-items-md-start gap-2">
                        <h5 class="card-title">{{ product.name }}</h5>

                        <span class="my-text card-text text-lg-start">{{ product.description }}</span>
                        <span class="card-text"><small class="text-body-secondary"><strong>€ {{ product.price
                        }}</strong></small>
                        </span>

                        <div class="d-flex gap-3">
                            <span class="d-flex align-items-center gap-2">
                            

                                <button class="btn">
                                    <i @click="decreaseQuantity()" class="fa-solid fa-minus fw-bold"></i>
                                </button>
                                {{ quantityToAdd }}
                                <button class="btn">
                                    <i @click="increaseQuantity()" class="fa-solid fa-plus fw-bold"></i>
                                </button>
                            </span>

                            <button @click="addToCart()" class="btn btn-primary">
                                <i class="fa-solid fa-cart-shopping"></i>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="product.photo ? 'http://127.0.0.1:8000/storage/' + product.photo : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'"
                    class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">{{ product.description }}</p>
                    <div class="card-text">{{ product.price }}</div>
                    <div class="card-text">
                        <div class="d-flex gap-3">
                            <span class="d-flex align-items-center gap-2">
                                <button class="btn border border-2 rounded-3" @click="decreaseQuantity()">-</button>
                                {{ quantityToAdd }}
                                <button class="btn border border-2" @click="increaseQuantity()">+</button>
                            </span>

                            <button @click="addToCart()" class="btn btn-primary">
                                <i class="fa-solid fa-cart-shopping"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
// .card {
//     background-color: rgba($color: #ffffff, $alpha: 0.7);
//     font-weight: 600;
//     color: #740c0d;
//     height: 200px;

//     .row.g-0 {
//         height: 100%;
//     }

//     strong {
//         color: #740c0d;
//     }

//     // }

//     img {
//         height: 100%;
//         object-fit: cover;
//         border-radius: 50%;
//     }

//     .card-body {
//         height: 100%;

//         .my-text {
//             // font-size: .8em;
//             overflow-y: auto;
//         }
//     }
// }
</style>