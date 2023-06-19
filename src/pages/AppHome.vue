<script>
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard.vue';

export default {
    name: 'AppHome',

    data() {
        return {
            restaurants: [],
            typologies: [],
            error: '',
            typologyId: '',
            success: false,

            isLoading: false,
        }
    },

    created() {
        this.getRestaurants();
    },

    methods: {
        getRestaurants() {
            this.isLoading = true;

            axios.get('http://127.0.0.1:8000/api/restaurants' + '?typology_id=' + this.typologyId).then(res => {
                this.success = res.data.success;
                if (this.success) {
                    this.restaurants = res.data.results;
                    this.typologies = res.data.allTypologies;
                }
                else {
                    this.error = res.data.error;
                }
                this.isLoading = false;
            });
        },
    },

    components: {
        RestaurantCard,
    }
}
</script>

<template>
    <main>
        <div class="container py-3">
            <h1>Ristoranti</h1>

            <form class="mb-3" action="" @submit.prevent="" @change="getRestaurants()">
                <select class="form-select" v-model="typologyId" name="typology_id" id="typology_id">
                    <option value="" selected>Tutte</option>
                    <option v-for="typology in typologies" :value="typology.id"> {{ typology.name }}</option>
                </select>
            </form>

            <div v-if="isLoading == true" class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>

            <div v-else-if="success" class="row g-3">
                <div v-for="restaurant in restaurants" class="col-12  col-md-4 col-lg-3">
                    <RestaurantCard :restaurant="restaurant"></RestaurantCard>
                </div>
            </div>
            <div v-else class="alert alert-danger">
                {{ error }}
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss"></style>
