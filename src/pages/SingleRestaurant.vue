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

        addToCart(item) {
            if (this.store.cartItems.length) {
                if (this.store.restaurant_id == item['restaurant_id']) {
                    this.store.cartItems.push(item);
                    this.saveCartItems();
                }
                else {
                    alert('Stai ordinando in un altro ristorante');
                }
            }
            else {
                this.store.restaurant_id = item['restaurant_id'];
                this.store.cartItems.push(item);

                this.saveCartItems();
            }
        },

        saveCartItems() {
            localStorage.setItem('cartItems', JSON.stringify(this.store.cartItems));
            localStorage.setItem('restaurant_id', this.store.restaurant_id);
            this.updateTotalPrice();
        },

        updateTotalPrice() {
            let totalPrice = 0;

            this.store.cartItems.forEach(item => {
                totalPrice += parseFloat(item.price);
            });

            this.store.totalPrice = totalPrice;
            localStorage.setItem('total_price', this.store.totalPrice);
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
