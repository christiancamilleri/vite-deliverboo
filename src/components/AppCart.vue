<script>
import { store } from '../store.js';

export default {
    name: 'Cart',

    data() {
        return {
            store,
        };
    },

    methods: {
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

        removeFromCart(item) {
            const index = this.store.cartItems.indexOf(item);
            if (index !== -1) {
                this.store.cartItems.splice(index, 1);
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
};
</script>

<template>
    <div class="container">
        <div v-if="store.cartItems.length">
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center"
                    v-for="item in store.cartItems">
                    <span>
                        {{ item.price }}€ - {{ item.name }}
                    </span>
                    <button class="btn btn-danger" @click="removeFromCart(item)"><i class="fa-solid fa-trash"></i></button>
                </li>
            </ul>

            <strong>Totale: € {{ parseFloat(store.totalPrice).toFixed(2) }}</strong>
        </div>

        <div v-else class="alert alert-info" role="alert">
            Carrello vuoto.
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
