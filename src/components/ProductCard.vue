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
    },

    emits: [
        'addToCart',
    ],
}
</script>

<template>
    <div class="card mb-3 rounded-pill" data-bs-toggle="modal" :data-bs-target="'#modal-' + product.id">
        <div class="h-100 row g-0">
            <div class="h-100 col-3">
                <img class="h-100 rounded-circle"
                    :src="product.photo ? 'http://127.0.0.1:8000/storage/' + product.photo : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'"
                    alt="Product photo">
            </div>
            <div class="col-9 d-flex align-items-center">
                <div class="card-body px-5">
                    <h6 class="card-title">{{ product.name }}</h6>
                    <small class="card-text">€ {{ product.price }}</small>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade text-dark " :id="'modal-' + product.id" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered  ">
            <div class="modal-content  my-modal">
                <div class="modal-header prova">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ product.name }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img class="w-100 rounded-circle p-3"
                        :src="product.photo ? 'http://127.0.0.1:8000/storage/' + product.photo : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'"
                        alt="">
                    <div class="card-text text-center p-2 cart-item">{{ product.description }}</div>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <div class="card-text"><strong>€{{ product.price }} </strong></div>
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
</template>


<style lang="scss" scoped>
.card {
    height: 120px;
    background-color: rgba($color: #ffffff, $alpha: 0.7);
}



.cart-item {
    background-color: rgba($color: #ffc109, $alpha: 1.0);
    color: #740c0d;
    font-weight: 600;
    border: 2px solid #8d1616;
    border-radius: 40px;
    margin-bottom: 10px;
    padding: 20px;


}
</style>