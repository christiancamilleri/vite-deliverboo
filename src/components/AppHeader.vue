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
            <div class="container-fluid">
                <router-link :to="{ name: 'home' }" class="navbar-brand" href="#">DeliveBoo</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link :to="{ name: 'home' }" class="nav-link active"
                                aria-current="page">Home</router-link>
                        </li>


                        <li class="nav-item dropdown d-flex align-items-center">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="fa-solid fa-cart-shopping"></i>
                            </a>
                            <div class="dropdown-menu">
                                <AppCart></AppCart>
                            </div>
                            <span v-show="store.cartItems.length" class="badge rounded-pill text-bg-danger">{{
                                store.cartItems.length }}</span>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="http://127.0.0.1:8000/">Sei un
                                ristoratore?</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped lang="scss"></style>