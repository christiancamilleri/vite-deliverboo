<script>
import { store } from '../store.js';
import AppCart from './AppCart.vue';

export default {
    data() {
        return {
            store,
            index: 0,
        };
    },

    components: {
        AppCart
    },

}
</script>

<template>
    <header>
        <nav class="my-nav navbar navbar-expand-lg">
            <div class="container-fluid">
                <router-link :to="{ name: 'home' }" class="navbar-brand h-100" href="#">
                    <img class="img-logo-lg d-none d-md-block" src="/img/deliveboo.png" alt="">
                    <img class="img-logo d-md-none" src="/img/logoR3.png" alt="">
                </router-link>

                <div class="me-3">
                    <button type="button" class="d-lg-none btn btn-warning position-relative text-light me-3"
                        data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span v-show="store.cartQuantity > 0"
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {{ store.cartQuantity }}
                        </span>
                    </button>

                    <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav text-center">
                        <li class="nav-item" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                            <router-link :to="{ name: 'home' }" class="nav-link text-shadow"
                                aria-current="page"><b>Home</b></router-link>
                        </li>

                        <li class="nav-item" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                            <a class="nav-link text-shadow" aria-current="page" href="http://127.0.0.1:8000/"
                                target="_blank"><b>Sei
                                    un
                                    ristoratore?</b></a>
                        </li>
                    </ul>
                </div>

                <div class="d-none d-lg-block me-3">
                    <button type="button" class="btn btn-warning position-relative text-light" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span v-show="store.cartQuantity > 0"
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {{ store.cartQuantity }}
                        </span>
                    </button>
                </div>
            </div>
        </nav>

        <div class="offcanvas offcanvas-end my-cart" tabindex="-1" id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header" data-bs-theme="dark">
                <h5 class="offcanvas-title text-light" id="offcanvasRightLabel">Carrello</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body d-flex flex-column">
                <AppCart></AppCart>

                <hr>

                <button v-if="store.cartItems.length" type="button" class="btn btn-warning" data-bs-dismiss="offcanvas"
                    aria-label="Close">
                    <router-link class="text-primary fw-bold text-decoration-none" :to="{ name: 'cart' }">Vai al
                        carrello</router-link>
                </button>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.my-nav {
    position: fixed;
    width: 100%;
    z-index: 2;
    background-color: rgba($color: #000000, $alpha: 0.3);
    box-shadow: 3px 3px 5px black;

    b {
        color: white;
        font-size: larger;

    }

    .img-logo {
        height: 80px;
    }
}

#offcanvasRight {
    border-left: 5px solid #ffc109;
}

.my-cart {
    background-color: rgba($color: #740c0d, $alpha: 0.8);

    background-image: url('/img/contornoY.png');
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: 60%;
}
</style>