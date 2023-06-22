<script>
import { store } from '../store.js';
import AppCart from './AppCart.vue';

export default {
    data() {
        return {
            store,
        };
    },

    components: { AppCart }
}
</script>

<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <router-link :to="{ name: 'home' }" class="navbar-brand" href="#">DeliveBoo</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div>
                    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                    <span v-show="store.cartQuantity > 0" class="badge rounded-pill text-bg-danger">
                        {{ store.cartQuantity }}
                    </span>
                </div>

                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link :to="{ name: 'home' }" class="nav-link" aria-current="page">Home</router-link>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="http://127.0.0.1:8000/" target="_blank">Sei un
                                ristoratore?</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>

            </div>

        </nav>

        <div class="offcanvas offcanvas-end w-50" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">Carrello</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <AppCart></AppCart>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>