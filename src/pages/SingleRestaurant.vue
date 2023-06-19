<script>
import axios from 'axios';
export default {
    name: 'SingleRestaurant',

    data() {
        return {
            slug: '',
            restaurantFound: false,
            restaurant: {}
        }
    },

    components: {

    },

    mounted() {
        this.slug = this.$route.params.slug;

        this.getRestaurant();
    },

    methods: {
        getRestaurant() {
            axios.get('http://127.0.0.1:8000/api/restaurants/' + this.slug).then(res => {

                console.log(res);
                if (res.data.success) {
                    this.restaurant = res.data.restaurant;
                    this.restaurantFound = true
                } else {
                    this.restaurantFound = false
                }
            });
        }
    }
}
</script>

<template>
    <div v-if="restaurantFound">
        <div class="container">
            <h1>
                {{ restaurant.name }}
            </h1>
            <hr>
            <div v-for="product in restaurant.products">
                {{ product.name }}
                <div>
                    <button @click="$emit('aggiungi', product)">aggiungi</button>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss"></style>
