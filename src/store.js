import { reactive } from 'vue'

export const store = reactive({

    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),


    restaurant_id: 0,

});