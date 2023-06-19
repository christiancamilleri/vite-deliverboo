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
        // addToCart(item) {
        //     console.log(this.restaurant_id);
        //     this.store.cartItems.push(item);

        //     this.saveCartItems();
        // },

        removeFromCart(item) {
            const index = this.store.cartItems.indexOf(item);
            if (index !== -1) {
                this.store.cartItems.splice(index, 1);
                // this.store.totalPrice = this.store.totalPrice - item.price;
                this.saveCartItems();
            }
        },

        saveCartItems() {
            localStorage.setItem('cartItems', JSON.stringify(this.store.cartItems));
            localStorage.setItem('restaurant_id', this.store.restaurant_id)
            // localStorage.setItem('totalPrice', 0)
            
        },

    },
};
</script>

<template>
    <div class="container">
        <div v-if="store.cartItems.length">
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in store.cartItems">
                    <span>
                        {{ item.price }}€ - {{ item.name }}
                    </span>
                    <button class="btn btn-danger" @click="removeFromCart(item)"><i
                            class="fa-solid fa-trash"></i></button>
                </li>
            </ul>
            <!-- <div>
                Totale: {{ store.totalPrice}}
            </div> -->
        </div>



        <div v-else class="alert alert-info" role="alert">
            Carrello vuoto.
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
