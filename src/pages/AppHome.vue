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
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="10000">
                <img src="/img/hamburger.jpg" class="d-block w- my-img" alt="">
                <div class="info-container">
                    <div class="carousel-caption d-none d-md-block info animate__animated animate__backInDown">
                        <h2>Il tuo piatto preferito direttamente a casa tua!</h2>
                        <p>La scelta migliore per un pasto facile e veloce.</p>
                    </div>

                </div>


            </div>
            <div class="carousel-item" data-bs-interval="2000">
                <img src="/img/sushi.jpg" class="d-block w- my-img" alt="...">
                <div class="carousel-caption d-none d-md-block info animate__animated animate__backInDown">
                    <h2>La tua fame ha trovato il suo alleato. L'app che ti fa sentire un vero gourmet a domicilio!</h2>
                    <p>Provare per credere!</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="/img/pizza.jpg" class="d-block w- my-img" alt="...">
                <div class="carousel-caption d-none d-md-block info animate__animated animate__backInDown">
                    <h2>Ordina, gusta, ripeti: l'app che porta il tuo cibo preferito a portata di tap!</h2>
                    <p>Tutto cio di cui hai bisogno te lo portiamo noi!</p>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    <main>
        <div class="container py-3">


            <form class="p-3 mb-3 mt-3" action="" @submit.prevent="" @change="getRestaurants()">
                <h2>Scegli tra le tue categorie preferite</h2>

                <!-- <div id="checkboxes" class="d-flex gap-3 mb-3">
                    <div v-for="typology in typologies" class="form-check">
                        <input v-model="typologiesChecked" class="form-check-input" type="checkbox" name="typologies"
                            :id="'typologies-' + typology.id" :value="typology.id">
                        <label class="form-check-label" :for="'typologies-' + typology.id">
                            {{ typology.name }}
                        </label>
                    </div>
                </div> -->

                <div v-for="typology in typologies" class="btn-group form-check" role="group"
                    aria-label="Basic checkbox toggle button group">
                    <input v-model="typologiesChecked" type="checkbox" name="typologies" class="btn-check form-check-input"
                        :id="'typologies-' + typology.id" :value="typology.id">
                    <label class="btn btn-outline-danger" :for="'typologies-' + typology.id">{{ typology.name }}</label>

                </div>

                <button v-show="typologiesChecked.length" @click="removeFilters()" class="btn btn-danger m-3">Rimuovi
                    filtri</button>
            </form>

            <h1>Ristoranti</h1>

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

<style scoped lang="scss">
.my-img {
    width: 100%;
    height: 500px;

    object-fit: cover;
}

.info {
    background-color: rgba($color: #000000, $alpha: 0.3);

    border-radius: 20px;
}

form {
    label {

        background-color: rgba($color: #000000, $alpha: 0.6);
    }
}
</style>
