
import { createRouter, createWebHistory } from "vue-router";

import AppHome from './pages/AppHome.vue';
import CartResume from './pages/CartResume.vue';
import CartCheckout from './pages/CartCheckout.vue';
import SingleRestaurant from './pages/SingleRestaurant.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome,
            meta: {
                title: 'Home'
            }
        },

        {
            path: '/restaurants/:slug',
            name: 'restaurants.show',
            component: SingleRestaurant,
        },

        {
            path: '/cart',
            name: 'cart',
            component: CartResume,
            meta: {
                title: 'Carrello'
            }
        },

        {
            path: '/checkout',
            name: 'checkout',
            component: CartCheckout,
            meta: {
                title: 'Checkout'
            }
        },
    ]
});

router.beforeEach((to) => {
    document.title = to.meta?.title ? 'DeliveBoo - ' + to.meta.title : 'DeliveBoo';
});

export { router };