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
    }
}
</script>

<template>
    <div class="card h-100">
        <img :src="img" class="card-img-top" alt="">
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <p class="card-text">
                <span v-for="typology in restaurant.typologies" class="badge"
                    :style="{ backgroundColor: typology.color }">{{ typology.name }}</span>
            </p>
            <router-link class="btn btn-primary justify-self-end"
                :to="{ name: 'restaurant.show', params: { slug: restaurant.slug } }">Mostra
                dettagli</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
img {
    height: 300px;
    object-fit: cover;
}
</style>