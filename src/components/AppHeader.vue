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
    <div>
        <nav class="my-nav navbar navbar-expand-lg">
            <router-link :to="{ name: 'home' }" class="navbar-brand" href="#"><img src="/img/deliveboo.png"
                    alt=""></router-link>
            <div class="container">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>


                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
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
                <div>
                    <button class="btn btn-warning" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                    <span v-show="store.cartQuantity > 0" class="badge rounded-pill text-bg-danger">
                        {{ store.cartQuantity }}
                    </span>
                </div>
            </div>
            <div>

            </div>

        </nav>

        <div class="offcanvas offcanvas-end w-3 my-cart" tabindex="-1" id="offcanvasRight"
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
    </div>
</template>

<style scoped lang="scss">
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