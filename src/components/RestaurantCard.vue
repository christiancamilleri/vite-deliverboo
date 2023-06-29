<script>
export default {
    name: 'RestaurantCard',

    data() {
        return {
        }
    },

    props: {
        restaurant: Object,
    },

    computed: {
        img() {
            if (this.restaurant.logo) {
                return 'http://127.0.0.1:8000/' + this.restaurant.logo;
            } else {
                return '/img/no-logo.jpg';
            }
        },

        cover() {
            if (this.restaurant.cover) {
                return 'http://127.0.0.1:8000/' + this.restaurant.cover;
            } else {
                return '/img/no-cover.jpg';
            }
        }
    },
}
</script>

<template>
    <div class="card h-100 my-card">
        <div id="cover-img-wrapper">
            <img :src="cover" class="card-img-top" alt="cover-img">
        </div>

        <div class="card-body d-flex flex-column justify-content-between">
            <img :src="img" class="card-img-top my-img" alt="restaurant-img">
            <h3 class="card-title text-center py-3">{{ restaurant.name }}</h3>
            <p>
                <span v-for="typology in restaurant.typologies" class="badge me-1 "
                    :style="{ backgroundColor: typology.color }">{{ typology.name }}</span>
            </p>
            <router-link class="btn btn-primary justify-self-end"
                :to="{ name: 'restaurants.show', params: { slug: restaurant.slug } }">Mostra
                dettagli</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.my-card {

    background-color: rgba($color: #ffffff, $alpha: 0.5);
    border-radius: 20px;

    &:hover .my-img {
        transform: translateY(-80%) scale(1.1);
    }

    .card-body {
        position: relative;
    }

    .my-img {
        height: 100px;
        width: 100px;
        position: absolute;
        top: 0;
        left: 10px;
        transform: translateY(-80%);
        // border-radius: 50%;
        box-shadow: 0px 0px 8px black;
        transition: 0.4s;
        border-radius: 50%;

    }

    #cover-img-wrapper {
        img {
            height: 200px;
            object-fit: cover;
            border-radius: 20px 20px 0px 0px;
        }
    }
}
</style>