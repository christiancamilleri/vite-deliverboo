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
            <div class="container h-100">
                <div class="w-100 h-100 row align-items-center">
                    <div class="col-10 h-100 d-flex align-items-center">
                        <router-link :to="{ name: 'home' }" class="navbar-brand h-100" href="#">
                            <img class="img-grande h-100" src="/img/deliveboo.png" alt="">
                            <img class="img-logo h-100" src="/img/logo-primary.png" alt="">
                        </router-link>

                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav text-center">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'home' }" class="nav-link text-shadow"
                                        aria-current="page"><b>Home</b></router-link>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link text-shadow" aria-current="page" href="http://127.0.0.1:8000/"
                                        target="_blank"><b>Sei
                                            un
                                            ristoratore?</b></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-2 d-flex justify-content-end align-items-center gap-2 p-0">
                        <div>
                            <button type="button" class="btn btn-warning position-relative text-light"
                                data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                <i class="fa-solid fa-cart-shopping"></i>
                                <span v-show="store.cartQuantity > 0"
                                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {{ store.cartQuantity }}
                                </span>
                            </button>
                        </div>
                        <div>
                            <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </div>
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

                <router-link class="btn btn-warning text-primary fw-bold" :to="{ name: 'cart' }">Vai al
                    carrello</router-link>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.my-nav {
    position: fixed;
    height: 80px;
    width: 100%;
    z-index: 2;
    background-color: rgba($color: #000000, $alpha: 0.3);
    box-shadow: 3px 3px 5px black;

    b {
        color: white;
        font-size: larger;

    }

    .img-grande {
        display: none;
    }

    .img-logo {
        display: block;
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

@media screen and (min-width: 576px) {
    .my-nav {
        .img-grande {
            display: block;
        }

        .img-logo {
            display: none;
        }
    }
}
</style>