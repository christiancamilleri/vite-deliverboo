<script>
import { store } from '../store.js';
import AppPayment from './AppPayment.vue';

export default {
    name: "Cart",

    data() {
        return {
            store,
        };
    },

    methods: {

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
                        console.log('nuovo');
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

        removeFromCart(item) {
            const index = this.store.cartItems.indexOf(item);
            if (index !== -1) {
                this.store.cartItems.splice(index, 1);
                this.saveCartItems();
            }
        },

        saveCartItems() {
            localStorage.setItem("cartItems", JSON.stringify(this.store.cartItems));
            localStorage.setItem("restaurant_id", this.store.restaurant_id);
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
        },

        emptyCart() {
            this.store.cartItems = [];
            this.saveCartItems();
        },

        increaseQuantity(item) {
            item.quantity++;
            this.saveCartItems();
        },

        decreaseQuantity(item) {
            item.quantity--;
            if (item.quantity > 0) {
                this.saveCartItems();
            }
            else {
                this.removeFromCart(item);
            }
        }
    },
    components: {
        AppPayment,
    }
};
</script>

<template>
    <div class="container">
        <div class="mb-3" v-if="store.cartItems.length">
            <h1>{{ store?.restaurantName }}</h1>

            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center"
                    v-for="item in store.cartItems">
                    <div>
                        <span>
                            {{ item.product.name }} - {{ parseFloat(item.product.price).toFixed(2) }}€
                        </span>
                    </div>

                    <div class="d-flex gap-3">
                        <span class="d-flex align-items-center gap-2">
                            <button class="btn btn-secondary" @click="decreaseQuantity(item)">-</button>
                            {{ item.quantity }}
                            <button class="btn btn-secondary" @click="increaseQuantity(item)">+</button>
                        </span>

                        <button class="btn btn-danger" @click="removeFromCart(item)"><i
                                class="fa-solid fa-trash"></i></button>
                    </div>
                </li>
            </ul>

            <p class="text-center my-5">Totale: € {{ parseFloat(store.totalPrice).toFixed(2) }}</p>

            <button @click="emptyCart()" class="btn btn-primary">Svuota carrello</button>
        </div>

        <div v-else class="alert alert-info mb-3" role="alert">
            Carrello vuoto.
        </div>

        <AppPayment></AppPayment>
    </div>
</template>

<style scoped lang="scss"></style>
