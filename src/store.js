import { reactive } from 'vue'

export const store = reactive({

    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),

    restaurant_id: localStorage.getItem('restaurant_id') || 0,

    restaurantName: localStorage.getItem('restaurantName') || '',

    restaurantSlug: localStorage.getItem('restaurantSlug') || '',

    cartQuantity: localStorage.getItem('quantity') || 0,

    totalPrice: localStorage.getItem('total_price') || 0,
});