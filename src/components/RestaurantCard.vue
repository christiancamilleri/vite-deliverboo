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
                return 'http://127.0.0.1:8000/' + 'storage/' + this.restaurant.logo;
            } else {
                return '/img/no-logo.jpg';
            }
        },

        cover() {
            if (this.restaurant.cover) {
                return 'http://127.0.0.1:8000/' + 'storage/' + this.restaurant.cover;
            } else {
                return '/img/no-cover.jpg';
            }
        }
    },
}
</script>

<template>
    <div class="card h-100">
        <div id="cover-img-wrapper">
            <img :src="cover" class="card-img-top" alt="cover-img">
        </div>

        <div class="card-body d-flex flex-column justify-content-between">
            <img :src="img" class="card-img-top my-img" alt="restaurant-img">
            <h5 class="card-title">{{ restaurant.name }}</h5>
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
.card-body {
    position: relative;
    background-color: rgba($color: #ffffff, $alpha: 0.7);
}

.my-img {
    height: 100px;
    width: auto;
    position: absolute;
    top: 0;
    left: 10px;
    transform: translateY(-90%);
    border-radius: 50%;
    box-shadow: 0px 0px 8px black;
    transition: 0.4s;
}

#cover-img-wrapper {
    img {
        height: 200px;
        object-fit: cover;
    }
}
</style>