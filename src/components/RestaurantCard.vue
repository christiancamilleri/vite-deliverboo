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
                return 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
            }
        }
    },
}
</script>

<template>
    <div v-on:mouseover="overRestaurant()" v-on:mouseleave="leaveRestaurant()" class="card h-100 my-restaurant-card">
        <img :src="img" class="card-img-top" alt="restaurant-img">
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title my-restaurant-title">{{ restaurant.name }}</h5>
            <p class="card-text">
                <span v-for="typology in restaurant.typologies" class="badge"
                    :style="{ backgroundColor: typology.color }">{{ typology.name }}</span>
            </p>
            <router-link class="btn btn-primary justify-self-end"
                :to="{ name: 'restaurants.show', params: { slug: restaurant.slug } }">Mostra
                dettagli</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.my-restaurant-card {
    box-shadow: 6px 6px 5px rgba($color: #000000, $alpha: 0.5);

    transition: transform .5s;

    &:hover {
        transform: scale(1.2);
        z-index: 1;
    }

    img {
        height: 300px;
        object-fit: cover;
    }

    .my-restaurant-title {
        font-weight: 600;
        text-shadow: 1px 1px rgba($color: #000000, $alpha: 0.5);
    }
}
</style>