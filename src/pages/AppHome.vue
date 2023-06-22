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
            typologiesChecked: [],
        }
    },

    created() {
        this.getRestaurants();
    },

    methods: {
        getRestaurants() {
            this.isLoading = true;

            let apiRequest = 'http://127.0.0.1:8000/api/restaurants';

            if (this.typologiesChecked.length) {
                this.typologiesChecked.forEach((typology, index) => {
                    if (index == 0) {
                        apiRequest += '?typology_ids[]=';
                    }
                    else {
                        apiRequest += '&typology_ids[]=';
                    }

                    apiRequest += typology;
                });
            }

            axios.get(apiRequest).then(res => {
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

        removeFilters() {
            this.typologiesChecked = [];
            this.getRestaurants();
        }
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

            <form class="border rounded p-3 mb-3" action="" @submit.prevent="" @change="getRestaurants()">
                <h2>Filtra per tipologia</h2>

                <div id="checkboxes" class="d-flex gap-3 mb-3">
                    <div v-for="typology in typologies" class="form-check">
                        <input v-model="typologiesChecked" class="form-check-input" type="checkbox" name="typologies"
                            :id="'typologies-' + typology.id" :value="typology.id">
                        <label class="form-check-label" :for="'typologies-' + typology.id">
                            {{ typology.name }}
                        </label>
                    </div>
                </div>

                <button v-show="typologiesChecked.length" @click="removeFilters()" class="btn btn-primary">Rimuovi
                    filtri</button>
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
