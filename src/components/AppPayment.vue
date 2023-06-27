<script>
import dropin from 'braintree-web-drop-in';
import axios from 'axios';
import { store } from '../store.js';

export default {
    data() {
        return {

            errors: [],

            store,

            dropinInstance: null,

            paymentSuccess: false,

            paymentMessage: '',

            paymentLoading: false,

            paymentReady: false,

            payload: {
                user: {},
            },
        }
    },

    methods: {
        payment() {
            if (this.store.cartItems.length) {
                if (this.dropinInstance.isPaymentMethodRequestable()) {
                    this.paymentLoading = true;

                    this.dropinInstance.requestPaymentMethod((err, payload) => {
                        if (err) {
                            // Handle errors in requesting payment method
                            return;
                        }

                        this.payload.nonce = payload.nonce;
                        this.payload.cartItems = this.store.cartItems;
                        this.payload.amount = this.store.totalPrice;

                        // Send payload.nonce to your server
                        axios.post('http://127.0.0.1:8000/api/braintree/payment', this.payload).then(res => {
                            this.paymentSuccess = res.data.success;
                            this.paymentMessage = res.data.message;


                            if (this.paymentSuccess) {
                                this.emptyCart();
                            }
                            else {
                                this.errors = res.data.errors;
                            }
                            this.initPayment();
                            this.paymentLoading = false;
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
                let dropinEl = document.getElementById('dropin-container');
                if (dropinEl.innerHTML != '') {
                    dropinEl.innerHTML = '';
                }

                dropin.create({
                    authorization: clientToken,
                    container: '#dropin-container',
                    locale: 'it_IT',
                    // ...plus remaining configuration
                }, (error, dropinInstance) => {
                    // Use `dropinInstance` here
                    // Methods documented at https://braintree.github.io/braintree-web-drop-in/docs/current/Dropin.html
                    if (error) {
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
    <form @submit.prevent="payment()" id="payment">
        <div class="input-group mb-3">
            <span class="input-group-text" id="name-addon">Nome *</span>
            <input v-model="payload.user.name" type="text" class="form-control"
                :class="errors && errors['user.name'] ? 'is-invalid' : ''" aria-describedby="name-addon">
            <div v-if="errors && errors['user.name']" class="invalid-feedback">
                <em> {{ errors['user.name'][0] }} </em>
            </div>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text" id="email-addon">Indirizzo E-mail *</span>
            <input v-model="payload.user.email" :class="errors && errors['user.email'] ? 'is-invalid' : ''" type="email"
                class="form-control" aria-describedby="email-addon">
            <div v-if="errors && errors['user.email']" class="invalid-feedback">
                <em> {{ errors['user.email'][0] }} </em>
            </div>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text" id="postal_code-addon">CAP *</span>
            <input v-model="payload.user.postal_code" :class="errors && errors['user.postal_code'] ? 'is-invalid' : ''"
                type="text" class="form-control" aria-describedby="postal_code-addon" pattern="[0-9]{5}" maxlength="5">
            <div v-if="errors && errors['user.postal_code']" class="invalid-feedback">
                <em> {{ errors['user.postal_code'][0] }} </em>
            </div>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text" id="address-addon">Indirizzo *</span>
            <input v-model="payload.user.address" :class="errors && errors['user.address'] ? 'is-invalid' : ''"
                type="address" class="form-control" aria-describedby="address-addon">
            <div v-if="errors && errors['user.address']" class="invalid-feedback">
                <em> {{ errors['user.address'][0] }} </em>
            </div>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text" id="phone-addon">Telefono *</span>
            <input v-model="payload.user.phone" :class="errors && errors['user.phone'] ? 'is-invalid' : ''" type="phone"
                class="form-control" aria-describedby="phone-addon">
            <div v-if="errors && errors['user.phone']" class="invalid-feedback">
                <em> {{ errors['user.phone'][0] }} </em>
            </div>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text" id="optional-info-addon">Informazioni aggiuntive (opzionali)</span>
            <textarea v-model="payload.user.optional_info" class="form-control" name="optional-info" id="optional-info"
                aria-describedby="optional-info-addon"></textarea>
        </div>


        <div v-show="paymentReady" id="dropin-container"></div>

        <div v-show="!paymentLoading">
            <button v-show="paymentReady" type="submit" id="submit-button" class="btn btn-primary mb-3"
                :class="store.cartItems.length ? '' : 'disabled'">Effettua pagamento</button>
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

    </form>
</template>

<style lang="scss" scoped></style>