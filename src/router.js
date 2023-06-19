
import { createRouter, createWebHistory } from "vue-router";

import AppHome from './pages/AppHome.vue';
import AppCart from './components/AppCart.vue';
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
            path: '/restaurant/:slug',
            name: 'restaurant.show',
            component: SingleRestaurant,
        },
        {
            path: '/cart',
            name: 'cart',
            component: AppCart,
        },
    ]
});

router.beforeEach((to) => {
    document.title = to.meta?.title ? 'DeliverBoo - ' + to.meta.title : 'Deliverboo';
});

export { router };