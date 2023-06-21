<script>
import dropin from 'braintree-web-drop-in';
import axios from 'axios';
import { store } from '../store.js';

export default {
    data() {
        return {
            store,

            dropinInstance: null,

            paymentSuccess: false,

            paymentMessage: '',

            paymentLoading: false,

            paymentReady: false,
        }
    },

    methods: {
        payment() {
            if(this.store.cartItems.length) {
                if (this.dropinInstance.isPaymentMethodRequestable()) {
                    this.paymentLoading = true;

                    this.dropinInstance.requestPaymentMethod((err, payload) => {
                        if (err) {
                            // Handle errors in requesting payment method
                            console.log('payment fallito');
                            return;
                        }

                        // Send payload.nonce to your server
                        axios.post('http://127.0.0.1:8000/api/braintree/payment', { payment_method_nonce: payload.nonce, amount: store.totalPrice }).then(res => {
                            this.paymentSuccess = res.data.success;
                            this.paymentMessage = res.data.message;

                            this.emptyCart();
                            this.initPayment();

                            this.paymentLoading= false;
                        });
                    });
                }
            }
        },

        initPayment() {
            this.paymentReady = false;

            axios.post('http://127.0.0.1:8000/api/braintree/token').then(res => {
                let clientToken = res.data.clientToken;
                
                // Step two: create a dropin instance using that container (or a string
                //   that functions as a query selector such as `#dropin-container`)
                document.getElementById('dropin-container').innerHTML = '';

                dropin.create({
                    authorization: clientToken,
                    container: '#dropin-container',
                    locale: 'it_IT',
                    // ...plus remaining configuration
                }, (error, dropinInstance) => {
                    // Use `dropinInstance` here
                    // Methods documented at https://braintree.github.io/braintree-web-drop-in/docs/current/Dropin.html
                    if(error) {
                        console.log(error.message);
                    }
                    this.dropinInstance = dropinInstance;
                    this.paymentReady = true;
                });
            });
        },

        emptyCart() {
            this.store.cartItems = [];
            this.saveCartItems();
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
    },

    mounted() {
        this.initPayment();
    },
}
</script>

<template>
    <div id="payment">
        <div v-show="paymentReady" id="dropin-container"></div>

        <div v-show="!paymentLoading">
            <button v-show="paymentReady" @click="payment()" id="submit-button" class="btn btn-primary mb-3"
                :class="store.cartItems.length ? '' : 'disabled'">Ordina</button>
        </div>

        <div v-show="paymentLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-show="paymentMessage != ''" class="alert" :class="paymentSuccess ? 'alert-success' : 'alert-danger'"
            role="alert">
            {{ paymentMessage }}
        </div>
    </div>
</template>

<style lang="scss" scoped></style>