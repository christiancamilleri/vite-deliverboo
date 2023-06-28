<script>
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard.vue';

export default {
    name: 'AppHome',

    data() {
        return {
            restaurants: [],
            typologies: [],
            typologiesObject: [
                {
                    id: '',
                    name: '',
                    img: '/img/chinese.webp'
                },
                {
                    id: '',
                    name: '',
                    img: '/img/thai.webp'
                },
                {
                    id: '',
                    name: '',
                    img: '/img/kebab.webp'
                },
                {
                    name: '',
                    img: '/img/burger.webp'
                },
                {
                    id: '',
                    name: '',
                    img: '/img/sushi.webp'
                },
                {
                    id: '',
                    name: '',
                    img: '/img/pizza.webp'
                },
            ],
            error: '',
            typologyId: '',
            success: false,
            isLoading: false,
            typologiesChecked: [],
            logo: false,
            // typologiesIcons: [
            //     '/img/chinese.webp',
            //     '/img/thai.webp',
            //     '/img/messicano.webp',
            //     '/img/burger.webp',
            //     '/img/sushi.webp',
            //     '/img/pizza.webp'
            // ]

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

                    for (let i = 0; i < this.typologies.length; i++) {
                        this.typologiesObject[i].name = this.typologies[i].name;
                        this.typologiesObject[i].id = this.typologies[i].id;
                    }
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
        },
        goLogo() {
            this.logo = true;
        }
    },

    components: {
        RestaurantCard,
    }
}
</script>

<template>
    <div id="carouselExampleInterval" class="carousel slide " data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="10000">
                <img src="/img/hamburger.jpg" class="d-block img-fluid my-img" alt="">
                <div class="info-container">
                    <div class="carousel-caption d-none d-md-block info animate__animated animate__backInDown">
                        <h2>Il tuo piatto preferito direttamente a casa tua!</h2>
                        <p>La scelta migliore per un pasto facile e veloce.</p>
                    </div>
                </div>
            </div>
            <div class="carousel-item" data-bs-interval="2000">
                <img src="/img/sushi.jpg" class="d-block img-fluid my-img" alt="...">
                <div class="carousel-caption d-none d-md-block info animate__animated animate__backInDown">
                    <h2>La tua fame ha trovato il suo alleato. L'app che ti fa sentire un vero gourmet a domicilio!</h2>
                    <p>Provare per credere!</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="/img/pizza.jpg" class="d-block img-fluid my-img" alt="...">
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

            <div class="d-flex justify-content-center">

                <form class="p-3 mb-3 mt-3" action="" @submit.prevent="" @change="getRestaurants()">
                    <h2 class="text-center">Scegli tra le tue categorie preferite</h2>

                    <!-- <div id="checkboxes" class="d-flex gap-3 mb-3">
                    <div v-for="typology in typologies" class="form-check">
                        <input v-model="typologiesChecked" class="form-check-input" type="checkbox" name="typologies"
                            :id="'typologies-' + typology.id" :value="typology.id">
                        <label class="form-check-label" :for="'typologies-' + typology.id">
                            {{ typology.name }}
                        </label>
                    </div>
                </div> -->
                    <div class="d-flex justify-content-center gap-2 flex-wrap animate__animated animate__flip">
                        <div v-for="typology in typologiesObject" class="my-typology btn-group form-check" role="group"
                            aria-label="Basic checkbox toggle button group">

                            <input v-model="typologiesChecked" type="checkbox" name="typologies"
                                class="btn-check form-check-input" :id="'typologies-' + typology.id" :value="typology.id">
                            <label class="btn btn-outline-danger d-flex flex-column align-items-center"
                                :for="'typologies-' + typology.id">
                                <img style=" width: 80px; " :src="typology.img" alt="">
                                <span>{{ typology.name }}</span>
                            </label>

                        </div>
                    </div>

                    <div class="d-flex justify-content-center">
                        <button v-show="typologiesChecked.length" @click="removeFilters()"
                            class="btn btn-danger m-3">Rimuovi
                            filtri</button>
                    </div>
                </form>
            </div>

            <h1 class="py-4">Ristoranti</h1>
            <h6>Dai un'occhiata alla nostra selezione</h6>

            <div v-if="isLoading == true" class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>

            <div v-else-if="success" class="row g-3 mt-4">
                <div v-for="restaurant in restaurants" class="col-12  col-md-4 col-lg-3">
                    <RestaurantCard :restaurant="restaurant"></RestaurantCard>
                </div>
            </div>
            <div v-else class="alert alert-danger">
                {{ error }}
            </div>
        </div>
        <div class="my-forum bg-primary">

            <div class="container ">
                <h2 class="py-3">Domande frequenti</h2>
                <div class="accordion animate__animated animate__fadeInLeft pb-4" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Ma è vero che siete il servizio più efficiente del mondo?
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>Certo! me l ha detto mmio cuggino </strong>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Accordion Item #2
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>This is the second item's accordion body.</strong> It is hidden by default, until
                                the
                                collapse plugin adds the appropriate classes that we use to style each element. These
                                classes
                                control the overall appearance, as well as the showing and hiding via CSS transitions. You
                                can
                                modify any of this with custom CSS or overriding our default variables. It's also worth
                                noting
                                that just about any HTML can go within the <code>.accordion-body</code>, though the
                                transition
                                does limit overflow.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Accordion Item #3
                            </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
                                collapse plugin adds the appropriate classes that we use to style each element. These
                                classes
                                control the overall appearance, as well as the showing and hiding via CSS transitions. You
                                can
                                modify any of this with custom CSS or overriding our default variables. It's also worth
                                noting
                                that just about any HTML can go within the <code>.accordion-body</code>, though the
                                transition
                                does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section class="my-section">
            <div class="container d-flex justify-content-between align-items-center">
                <div class="">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta vero sint animi quos aut, labore, sequi
                    vel mollitia reprehenderit nam maxime. Eaque, cum porro? Laboriosam sapiente illo cumque praesentium
                    earum?
                </div>
                <img @click="goLogo()" :class="logo ? 'animate__animated animate__bounceOutRight' : ''"
                    class="img-fluid logo" src="/img/logoR3.png" alt="">
                <div id="section-right">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum nobis possimus sit dolores aliquam, labore
                    neque tempora velit, voluptates obcaecati, asperiores sint quo tempore aliquid ab nesciunt accusantium
                    recusandae cupiditate.
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped lang="scss">
.my-img {
    width: 100%;
    height: 400px;

    object-fit: cover;
}

.info {
    background-color: rgba($color: #000000, $alpha: 0.3);

    border-radius: 20px;
}

.my-typology {
    width: 200px;
}

form {
    label {

        background-color: rgba($color: #000000, $alpha: 0.6);
    }
}

.my-forum {
    background-color: rgb(196, 169, 169);
}

.my-section {
    height: 300px;
    background-color: black;

    .logo {
        height: 290px;

    }

}
</style>
