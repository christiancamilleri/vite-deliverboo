<script>
import axios from 'axios';

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

    components: {

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
                <div v-for="restaurant in restaurants" class="col-4">
                    <div class="card">
                        <img src="" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">{{ restaurant.name }}</h5>
                            <button class="btn btn-primary" disabled>Dettagli</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="alert alert-danger">
                {{ error }}
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss"></style>
