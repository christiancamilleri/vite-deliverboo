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
            restaurant: {}
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
    <div v-if="restaurantFound">
        <div class="container">
            <h1>
                {{ restaurant.name }}
            </h1>
            <hr>
            <div class="d-flex flex-column gap-1">
                <div class="d-flex  gap-1" v-for="product in restaurant.products">
                    <ProductCard :product="product" @addToCart="addToCart"></ProductCard>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss"></style>
