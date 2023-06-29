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
    <section id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="5000">
                <img src="/img/hamburger.jpg" class="d-block img-fluid my-img w-100 object-fit-cover" alt="">
                <div class="carousel-caption d-md-block info animate__animated animate__backInDown p-3">
                    <h2>Il tuo piatto preferito direttamente a casa tua!</h2>
                    <p>La scelta migliore per un pasto facile e veloce.</p>
                </div>
            </div>
            <div class="carousel-item" data-bs-interval="5000">
                <img src="/img/sushi.jpg" class="d-block img-fluid my-img w-100 object-fit-cover" alt="...">
                <div class="carousel-caption d-md-block info animate__animated animate__backInDown p-3">
                    <h2>La tua fame ha trovato il suo alleato. L'app che ti fa sentire un vero gourmet a domicilio!</h2>
                    <p>Provare per credere!</p>
                </div>
            </div>
            <div class="carousel-item" data-bs-interval="5000">
                <img src="/img/pizza.jpg" class="d-block img-fluid my-img w-100 object-fit-cover" alt="...">
                <div class="carousel-caption d-md-block info animate__animated animate__backInDown p-3">
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
    </section>

    <section>
        <div class="container py-5">
            <form class="mb-5 " action="" @submit.prevent="" @change="getRestaurants()">
                <h2 class="text-center pb-4 text-shadow animate__animated  animate__fadeIn animate__slow 2s">Scegli tra le
                    tue categorie
                    preferite</h2>

                <div class="row g-3 animate__animated  animate__zoomInUp animate__slow 2s">
                    <div v-for="typology in typologiesObject"
                        class="my-typology btn-group form-check col-6 col-md-4 col-lg-2 px-1 " role="group"
                        aria-label="Basic checkbox toggle button group">

                        <input v-model="typologiesChecked" type="checkbox" name="typologies"
                            class="btn-check form-check-input " :id="'typologies-' + typology.id" :value="typology.id">
                        <label class="btn btn-outline-danger d-flex flex-column align-items-center"
                            :for="'typologies-' + typology.id">
                            <img class="w-80" :src="typology.img" alt="">
                            <span class="text-shadow my-typologies"><b>{{ typology.name }}</b></span>
                        </label>
                    </div>
                </div>

                <div class="d-flex justify-content-center">
                    <button v-show="typologiesChecked.length" @click="removeFilters()" class="btn btn-danger m-3">Rimuovi
                        filtri</button>
                </div>
            </form>


            <h1 id="restaurants-title"
                class="text-center text-shadow animate__animated animate__zoomInRight animate__slow	2s restaurants-title">
                Ristoranti</h1>
            <h4 class="text-center pb-4 text-shadow animate__animated animate__zoomInLeft animate__slow	2s">Dai un'occhiata
                alla nostra
                selezione</h4>

            <div v-if="isLoading == true" id="loading">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div v-else-if="success" class="row g-5">
                <div v-for="restaurant in restaurants" class="col-12 col-md-6 col-lg-4 my-container-restaurant">
                    <RestaurantCard :restaurant="restaurant"></RestaurantCard>
                </div>
            </div>
            <div v-else class="alert alert-danger">
                {{ error }}
            </div>
        </div>
    </section>

    <section class="bg-primary">
        <div class="container py-5">
            <h2 class="py-3">Domande frequenti</h2>
            <div class="accordion animate__animated animate__fadeInLeft pb-4" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Qual è il tempo di consegna medio?
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Il tempo di consegna medio dipende dalla distanza tra il ristorante e il tuo indirizzo di
                            consegna, nonché dal volume di ordini in quel momento. Di solito, il tempo di consegna varia da
                            30 a 60 minuti. Puoi controllare il tempo stimato di consegna durante l'ordine.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Cosa succede se l'ordine è errato o manca qualcosa?
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Ci scusiamo sinceramente se l'ordine è errato o manca qualcosa. In caso di problemi con il tuo
                            ordine, ti invitiamo a contattarci immediatamente al numero di assistenza clienti indicato
                            nell'app. Faremo del nostro meglio per risolvere la situazione il più rapidamente possibile,
                            fornendo un rimborso o organizzando una nuova consegna.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Quali sono i metodi di pagamento accettati?
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Ci scusiamo sinceramente se l'ordine è errato o manca qualcosa. In caso di problemi con il tuo
                            ordine, ti invitiamo a contattarci immediatamente al numero di assistenza clienti indicato
                            nell'app. Faremo del nostro meglio per risolvere la situazione il più rapidamente possibile,
                            fornendo un rimborso o organizzando una nuova consegna.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="my-bg position-relative">
        <div class="container py-5">
            <div class="row justify-content-between align-items-center">

                <div class="col-12 col-md-4 section-left text-shadow">
                    La nostra app offre un servizio di consegna di cibo con un'impareggiabile efficienza. Grazie alla nostra
                    piattaforma intuitiva e facile da usare, puoi ordinare i tuoi pasti preferiti con pochi semplici clic.
                    Il nostro sistema di gestione degli ordini è progettato per ottimizzare i tempi di preparazione e
                    consegna, garantendo che il cibo arrivi fresco e pronto da gustare. Con il nostro team dedicato di
                    corrieri altamente affidabili e ben addestrati, puoi contare su di noi per offrirti un servizio veloce
                    ed efficiente ogni volta che ordini.
                </div>
                <img @click="goLogo()" :class="logo ? 'animate__animated animate__bounceOutRight' : ''"
                    class="col-12 col-md-4 img-fluid logo p-5" src="/img/logo-primary.png" alt="">
                <div class="col-12 col-md-4 section-right text-shadow">
                    La velocità è fondamentale quando si tratta di servizi di consegna di cibo, e siamo fieri di offrire la
                    massima velocità possibile ai nostri clienti. Con la nostra app, puoi goderti un'esperienza di consegna
                    rapida e senza problemi. I nostri corrieri sono attentamente selezionati e utilizzano percorsi
                    ottimizzati per raggiungere il tuo indirizzo nel minor tempo possibile. Inoltre, lavoriamo a stretto
                    contatto con i nostri partner ristoranti per garantire che i tuoi ordini vengano preparati e consegnati
                    in modo tempestivo. La nostra priorità assoluta è soddisfare le tue aspettative di velocità, portandoti
                    il tuo cibo preferito in modo rapido e senza intoppi.
                </div>

            </div>
        </div>

    </section>
</template>

<style lang="scss" scoped>
.my-img {
    height: 500px;
}

.info {
    background-color: rgba($color: #000000, $alpha: 0.3);

    border-radius: 20px;
}

.my-typology:hover .my-typologies {
    color: white;
}

form {
    label {
        background-color: rgba($color: #000000, $alpha: 0.6);
    }
}

.my-bg {
    background-color: #00000073;
}

#loading {

    height: 500px;

    display: flex;
    justify-content: center;

}
</style>
