<script>
import axios from 'axios';
import { store } from '../store.js';
import ProductCard from '../components/ProductCard.vue';

export default {
    name: 'SingleRestaurant',

    data() {
        return {
            store,
            slug: '',
            restaurantFound: false,
            restaurant: {},
            isLoading: true,
        }
    },

    components: {
        ProductCard,
    },

    mounted() {
        this.slug = this.$route.params.slug;

        this.getRestaurant();
    },

    methods: {
        getRestaurant() {
            axios.get('http://127.0.0.1:8000/api/restaurants/' + this.slug).then(res => {
                if (res.data.success) {
                    this.restaurant = res.data.restaurant;
                    document.title += ' - ' + this.restaurant.name;
                    this.restaurantFound = true
                } else {
                    this.restaurantFound = false
                }
            });
        },

        addToCart(object) {
            let item = object.product;
            let quantity = object.quantityToAdd;

            if (this.store.cartItems.length != 0) {
                if (this.store.restaurant_id == item['restaurant_id']) {
                    let duplicate = this.store.cartItems.find(element => element.product.id == item.id);
                    if (duplicate) {
                        duplicate.quantity += quantity;
                    }
                    else {

                        const newItem = {
                            'product': item,
                            'quantity': quantity,
                        };
                        this.store.cartItems.push(newItem);
                    }
                    this.saveCartItems();
                }
                else {
                    alert('Stai ordinando in un altro ristorante');
                }

            } else {
                const newItem = {
                    'product': item,
                    'quantity': quantity,
                }
                this.store.restaurant_id = item['restaurant_id'];
                this.store.restaurantName = this.restaurant.name;
                this.store.cartItems.push(newItem);
                this.saveCartItems();
            }
        },

        saveCartItems() {
            localStorage.setItem('cartItems', JSON.stringify(this.store.cartItems));
            localStorage.setItem('restaurant_id', this.store.restaurant_id);
            localStorage.setItem('restaurantName', this.store.restaurantName);
            this.updateCartInfo();
        },

        updateCartInfo() {
            this.store.totalPrice = 0;
            this.store.cartQuantity = 0;

            this.store.cartItems.forEach(item => {
                this.store.totalPrice += parseFloat(item.product.price * item.quantity);
                this.store.cartQuantity += parseFloat(item.quantity);
            });

            localStorage.setItem('total_price', this.store.totalPrice);
            localStorage.setItem('quantity', this.store.cartQuantity);
        }
    },
}
</script>

<template>
    <div id="images-wrapper">
        <img v-if="restaurant.cover" class="my-img" :src="'http://127.0.0.1:8000/storage/' + restaurant.cover" alt="">
        <img v-if="restaurant.logo" class="my-logo position-absolute top-100 start-50 rounded-circle"
            :src="'http://127.0.0.1:8000/storage/' + restaurant.logo" alt="">
    </div>

    <div class="container my-menu">
        <div v-if="restaurantFound">
            <h1 class="text-center">{{ restaurant.name }}</h1>
            <hr>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4" v-for="product in restaurant.products">
                    <ProductCard :product="product" @addToCart="addToCart"></ProductCard>
                </div>
            </div>
        </div>

        <div v-else class="alert alert-info mb-3" role="alert">
            Ristorante non trovato.
        </div>
    </div>
</template>

<style lang="scss" scoped>
#images-wrapper {
    height: 400px;
    position: relative;

    .my-img {
        width: 100%;
        height: 100%;

        object-fit: cover;
    }

    .my-logo {
        height: 50%;
        aspect-ratio: 1;
        object-fit: cover;

        transform: translate(-50%, -70%);
        box-shadow: 0px 0px 10px black;
    }

}

.my-menu {
    padding: 150px 0;
}


@media screen and (min-width: 768px) {
    main {
        #images-wrapper {
            .my-logo {
                height: 80%;
            }
        }
    }
}

@media screen and (min-width: 1025px) {
    main {
        #images-wrapper {
            .my-logo {
                height: 100%;
            }
        }
    }
}
</style>
