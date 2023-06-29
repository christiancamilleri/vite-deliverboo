<script>
import axios from 'axios';
import { store } from '../store.js';
import ProductCard from '../components/ProductCard.vue';

export default {
    name: 'SingleRestaurant',

    data() {
        return {
            store,
            slug: '',
            restaurantFound: false,
            restaurant: {},
            isLoading: false,
        }
    },

    components: {
        ProductCard,
    },

    mounted() {
        this.slug = this.$route.params.slug;
        window.scrollTo(0, 0);

        this.getRestaurant();
    },

    methods: {
        getRestaurant() {
            this.isLoading = true;
            axios.get('http://127.0.0.1:8000/api/restaurants/' + this.slug).then(res => {
                if (res.data.success) {
                    this.restaurant = res.data.restaurant;
                    document.title += ' - ' + this.restaurant.name;
                    this.isLoading = false;
                    this.restaurantFound = true
                } else {
                    this.isLoading = false;
                    this.restaurantFound = false
                }
            });

        },

        addToCart(object) {
            let item = object.product;
            let quantity = object.quantityToAdd;

            if (this.store.cartItems.length != 0) {
                if (this.store.restaurant_id == item['restaurant_id']) {
                    let duplicate = this.store.cartItems.find(element => element.product.id == item.id);
                    if (duplicate) {
                        duplicate.quantity += quantity;
                    }
                    else {

                        const newItem = {
                            'product': item,
                            'quantity': quantity,
                        };
                        this.store.cartItems.push(newItem);
                    }
                    this.saveCartItems();
                }
                else {
                    alert('Stai ordinando in un altro ristorante');
                }

            } else {
                const newItem = {
                    'product': item,
                    'quantity': quantity,
                }
                this.store.restaurant_id = item['restaurant_id'];
                this.store.restaurantName = this.restaurant.name;
                this.store.restaurantSlug = this.restaurant.slug;
                this.store.cartItems.push(newItem);
                this.saveCartItems();
            }
        },

        saveCartItems() {
            localStorage.setItem('cartItems', JSON.stringify(this.store.cartItems));
            localStorage.setItem('restaurant_id', this.store.restaurant_id);
            localStorage.setItem('restaurantName', this.store.restaurantName);
            localStorage.setItem("restaurantSlug", this.store.restaurantSlug);
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
        }
    },
    computed: {
        img() {
            if (this.restaurant.logo) {
                return 'http://127.0.0.1:8000/' + this.restaurant.logo;
            } else {
                return '/img/no-logo.jpg';
            }
        },

        cover() {
            if (this.restaurant.cover) {
                return 'http://127.0.0.1:8000/' + this.restaurant.cover;
            } else {
                return '/img/no-cover.jpg';
            }
        }
    },
}
</script>

<template>
    <div id="images-wrapper" class="position-relative">
        <img class="my-img" :src="cover" alt="">
        <img class="my-logo position-absolute top-100 start-50 rounded-circle" :src="img" alt="">

        <router-link id="button-back"
            class="btn btn-warning text-primary position-absolute rounded-circle z-3 d-flex align-items-center justify-content-center"
            :to="{ name: 'home' }"><i class="fas fa-arrow-left fs-4"></i></router-link>
    </div>

    <div class="container my-menu">

        <div v-if="isLoading == true" id="loading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else-if="restaurantFound">
            <h1 class="text-center">{{ restaurant.name }}</h1>
            <hr>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 p-3" v-for="product in restaurant.products">
                    <ProductCard :product="product" @addToCart="addToCart"></ProductCard>
                </div>
            </div>
        </div>

        <div v-else class="alert alert-info mb-3" role="alert">
            Ristorante non trovato.
        </div>
    </div>
</template>

<style lang="scss" scoped>
#images-wrapper {
    height: 400px;

    .my-img {
        width: 100%;
        height: 100%;

        object-fit: cover;
    }

    .my-logo {
        height: 50%;
        aspect-ratio: 1;
        object-fit: cover;

        transform: translate(-50%, -70%);
        box-shadow: 0px 0px 10px black;
    }

    #button-back {
        width: 60px;
        height: 60px;
        bottom: 0;
        left: 20px;

        transform: translateY(50%);
    }
}

.my-menu {
    padding-top: 70px;
    padding-bottom: 70px;
}


@media screen and (min-width: 768px) {
    main {
        #images-wrapper {
            .my-logo {
                height: 80%;
            }
        }

        .my-menu {
            padding-top: 120px;
            padding-bottom: 120px;
        }
    }
}

@media screen and (min-width: 1025px) {
    main {
        #images-wrapper {
            .my-logo {
                height: 100%;
            }
        }

        .my-menu {
            padding-top: 150px;
            padding-bottom: 150px;
        }
    }
}

#loading {

    height: 500px;

    display: flex;
    justify-content: center;
    align-items: center;

}
</style>
