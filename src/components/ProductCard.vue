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
    <div class="card rounded-pill" data-bs-toggle="modal" :data-bs-target="'#modal-' + product.id">
        <div class="h-100 row g-0">
            <div class="h-100 col-3">
                <img class="my-img-card"
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
    <div class="modal fade text-dark  " :id="'modal-' + product.id" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered  rounded-5">
            <div class="modal-content  my-modal rounded-5">
                <div class="modal-header prova bg-primary text-light my-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ product.name }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <img class="my-img-modal"
                        :src="product.photo ? 'http://127.0.0.1:8000/storage/' + product.photo : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'"
                        alt="">
                    <div class="card-text text-center p-2 cart-item">{{ product.description }}</div>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <div class="card-text"><strong>€{{ product.price }} </strong></div>
                    <div class="d-flex gap-3">
                        <span class="d-flex align-items-center gap-2">
                            <button class="my-btn btn btn-primary" @click="decreaseQuantity()">-</button>
                            {{ quantityToAdd }}
                            <button class=" my-btn btn btn-primary " @click="increaseQuantity()">+</button>
                        </span>

                        <button @click="addToCart()" class="btn btn-primary my-cart">
                            <i class="fa-solid fa-cart-shopping"></i>
                            Aggiungi al carrello
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.my-modal {


    .my-header {
        border-radius: 30px 30px 0 0;
    }
}

.card {

    background-color: rgba($color: #ffffff, $alpha: 0.8);
    height: 100px;
    cursor: pointer;

    .my-img-card {
        height: 100px;
        width: 100px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 10px;
    }


}

:hover.card {
    background-color: rgba($color: #740c0d, $alpha: 0.6);
    color: white;
    transition: 0.3s;
    scale: 105%;
}

.my-img-modal {
    height: 300px;
    width: 300px;
    object-fit: cover;
    border-radius: 50%;
}

:hover.my-cart {

    background-color: #ffc109;

}

:hover.my-btn {
    background-color: #ffc109;
}
</style>