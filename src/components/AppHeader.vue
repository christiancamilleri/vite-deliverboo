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
                <div class="w-100 row align-items-center">
                    <div class="col-6 col-lg-2">
                        <router-link :to="{ name: 'home' }" class="navbar-brand" href="#">
                            <img class="w-100" src="/img/deliveboo.png" alt="">
                        </router-link>
                    </div>

                    <div class="col-6 col-lg-4 order-lg-2 d-flex justify-content-end align-items-center gap-2 p-0">
                        <div>
                            <button class="btn btn-warning" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                <i class="fa-solid fa-cart-shopping"></i>
                            </button>
                            <span v-show="store.cartQuantity > 0" class="badge rounded-pill text-bg-danger">
                                {{ store.cartQuantity }}
                            </span>
                        </div>
                        <div>
                            <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </div>

                    <div class="col-12 col-lg-4 order-lg-1 collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav text-center">
                            <li class="nav-item">
                                <router-link :to="{ name: 'home' }" class="nav-link"
                                    aria-current="page"><b>Home</b></router-link>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="http://127.0.0.1:8000/" target="_blank"><b>Sei un
                                        ristoratore?</b></a>
                            </li>
                        </ul>
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
            <div class="offcanvas-body">
                <AppCart></AppCart>

                <hr>

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
        text-shadow: 2px 2px #000000;
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