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
            console.log(this.restaurant_id);
            this.store.cartItems.push(item);
            this.saveCartItems();
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
        },
    },
};
</script>

<template>
    <div class="container">
        <ul v-if="store.cartItems.length" class="list-group">
            <li class="list-group-item" v-for="item in store.cartItems">
                {{ item.name }} -<button class="btn btn-danger" @click="removeFromCart(item)"><i
                        class="fa-solid fa-trash"></i></button>
            </li>

        </ul>

        <div v-else class="alert alert-info" role="alert">
            Carrello vuoto.
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
