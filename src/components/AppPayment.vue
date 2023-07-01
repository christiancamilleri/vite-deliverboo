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

        generatePayload() {
            if (this.store.cartItems.length) {
                if (this.dropinInstance.isPaymentMethodRequestable()) {
                    this.paymentLoading = true;

                    this.dropinInstance.requestPaymentMethod((err, payload) => {
                        if (err) {
                            // Handle errors in requesting payment method
                            console.log(err);
                        }
                        else {
                            this.payload.nonce = payload.nonce;
                            this.payload.cartItems = this.store.cartItems;
                            this.payload.amount = this.store.totalPrice;
                            this.completePayment();
                        }
                    });
                }
            }
        },

        completePayment() {
            // Send payload.nonce to your server
            axios.post('http://127.0.0.1:8000/api/braintree/payment', this.payload).then(res => {
                this.paymentSuccess = res.data.success;
                this.paymentMessage = res.data.message;


                if (this.paymentSuccess) {
                    this.emptyCart();
                    this.payload.user = {};
                }
                else {
                    this.errors = res.data.errors;
                }
                this.initPayment();
                this.paymentLoading = false;
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
    <form @submit.prevent="generatePayload()" id="payment" class=" p-3 rounded-2">
        <div class="form-check ps-0 mb-3">
            <label class="form-label" id="name-addon">Nome *</label>
            <input v-model="payload.user.name" type="text" class="form-control"
                :class="errors && errors['user.name'] ? 'is-invalid' : ''" aria-describedby="name-addon">
            <div v-if="errors && errors['user.name']" class="invalid-feedback">
                <em> {{ errors['user.name'][0] }} </em>
            </div>
        </div>

        <div class="form-check ps-0 mb-3">
            <label class="form-label" id="email-addon">Indirizzo E-mail *</label>
            <input v-model="payload.user.email" :class="errors && errors['user.email'] ? 'is-invalid' : ''" type="email"
                class="form-control" aria-describedby="email-addon">
            <div v-if="errors && errors['user.email']" class="invalid-feedback">
                <em> {{ errors['user.email'][0] }} </em>
            </div>
        </div>

        <div class="form-check ps-0 mb-3">
            <label class="form-label" id="postal_code-addon">CAP *</label>
            <input v-model="payload.user.postal_code" :class="errors && errors['user.postal_code'] ? 'is-invalid' : ''"
                type="text" class="form-control" aria-describedby="postal_code-addon" pattern="[0-9]{5}" maxlength="5">
            <div v-if="errors && errors['user.postal_code']" class="invalid-feedback">
                <em> {{ errors['user.postal_code'][0] }} </em>
            </div>
        </div>

        <div class="form-check ps-0 mb-3">
            <label class="form-label" id="address-addon">Indirizzo *</label>
            <input v-model="payload.user.address" :class="errors && errors['user.address'] ? 'is-invalid' : ''"
                type="address" class="form-control" aria-describedby="address-addon">
            <div v-if="errors && errors['user.address']" class="invalid-feedback">
                <em> {{ errors['user.address'][0] }} </em>
            </div>
        </div>

        <div class="form-check ps-0 mb-3">
            <label class="form-label" id="phone-addon">Telefono *</label>
            <input v-model="payload.user.phone" :class="errors && errors['user.phone'] ? 'is-invalid' : ''" type="phone"
                class="form-control" aria-describedby="phone-addon">
            <div v-if="errors && errors['user.phone']" class="invalid-feedback">
                <em> {{ errors['user.phone'][0] }} </em>
            </div>
        </div>

        <div class="form-check ps-0 mb-3">
            <label class="form-label" id="optional-info-addon">Informazioni aggiuntive (opzionali)</label>
            <textarea v-model="payload.user.optional_info" class="form-control" name="optional-info" id="optional-info"
                aria-describedby="optional-info-addon"></textarea>
        </div>


        <div v-show="paymentReady" id="dropin-container"></div>

        <button v-show="!paymentLoading && paymentReady" type="submit" id="submit-button" class="btn btn-primary mb-3"
            :class="store.cartItems.length ? '' : 'disabled'">Effettua pagamento</button>

        <div v-show="paymentLoading || !paymentReady" id="loading">
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

<style lang="scss" scoped>
#payment {
    background-color: rgba(0, 0, 0, 0.206);
}

#loading {
    background-color: #0000006f;
    width: 100vw;
    height: 100vh;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>