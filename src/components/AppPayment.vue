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
        }
    },

    methods: {
        payment() {
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
                        this.paymentLoading = false;
                    });
                });
            }
        },
    },

    mounted() {
        axios.post('http://127.0.0.1:8000/api/braintree/token').then(res => {
            let clientToken = res.data.clientToken;

            // Step two: create a dropin instance using that container (or a string
            //   that functions as a query selector such as `#dropin-container`)
            dropin.create({
                authorization: clientToken,
                container: '#dropin-container',
                locale: 'it_IT',
                // ...plus remaining configuration
            }, (error, dropinInstance) => {
                // Use `dropinInstance` here
                // Methods documented at https://braintree.github.io/braintree-web-drop-in/docs/current/Dropin.html
                this.dropinInstance = dropinInstance;
            });
        });
    },
}
</script>

<template>
    <div id="payment">
        <div v-show="!paymentMessage" id="dropin-container"></div>

        <div v-show="paymentLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-show="!paymentLoading">

            <div v-show="paymentMessage" class="alert" :class="paymentSuccess ? 'alert-success' : 'alert-danger'"
                role="alert">
                {{ paymentMessage }}
            </div>

            <button v-show="!paymentMessage" @click="payment()" id="submit-button" class="btn btn-primary mb-3"
                :class="dropinInstance == null ? 'disabled' : ''">Ordina</button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>