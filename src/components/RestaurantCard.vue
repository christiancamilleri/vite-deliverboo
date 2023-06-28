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
        },

        cover() {
            if (this.restaurant.cover) {
                return 'http://127.0.0.1:8000/' + 'storage/' + this.restaurant.cover;
            } else {
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAJFBMVEX4+vvb4OTx9PXl6ezf4+f19/nt8PLz9vfq7fDi5unc4eTs7/GWhAgrAAACGUlEQVR4nO3b23KqMBiAUQEtsn3/961OtydIJEUmaXCtS7n5v5FTEHc7AAAAAAAAAAAAAAAAAAAAAAAAzvr2PX3pgNf6oXnf8Icjjyv0XZxKh8R8rRTYNF+lU8IOqwU2zaF0TNBa++jFsXRM0H7Fwn3pmKAVA5umdEzQhxXuT/3h0B7/bbbwdrpfevopGRIVnq/dZOHT1WzZfUCpiJdu040uZovuVcskzIhNt2g/LVIw5zrcENuwmcLJHdeS3bREwKzrcJO1z+YKJ99h/IZ138bOtCUCZl2HSz8OL/fXkTVXgfnnxaaLnkt/FhDhxPzjJ7hNNzoQY4fhdYUUTMw+fYr7eEn3NPclYCgx+/QpwvPF9tHHNW4gMffwSR4HbK8fxtYWz4v4aWL26VM8F5z68/cXXTuNn1JMEosUzInVJAROEwvMP++dwEli9ulTvBU4Tsw8e5r3AkeJWSdPFaoZ+lNq4HNixrnTBQK73eSC+OpZ7+H+aC7X0L8SDhwlvn6Y3VVW2P3f0KYG1lbY3ba0iYGVFXYPm9q0wLoKu6dtbVJgVYXdaGOb9ItZRYXjwPMyMeUnwXoKp4FpqilcGlhN4eRhW7JaChd/hQpLU5hAYWEfVDgsfrl0qKRwDaVjghTWX7j9dxO3/37pmrtp6ZSIzb/nvdtNnm8v9Gff1f+A/1tcbPw/MwAAAAAAAAAAAAAAAAAAAAAAALl8A7+jEA62Pbx2AAAAAElFTkSuQmCC'
            }
        }
    },
}
</script>

<template>
    <!-- <div class="card h-100 my-restaurant-card">
        <img :src="img" class="card-img-top" alt="restaurant-img">
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title my-restaurant-title">{{ restaurant.name }}</h5>
            <p class="card-text">
                <span v-for="typology in restaurant.typologies" class="badge my-typology-badge"
                    :style="{ backgroundColor: typology.color }">{{ typology.name }}</span>
            </p>
            <router-link class="btn btn-primary justify-self-end"
                :to="{ name: 'restaurants.show', params: { slug: restaurant.slug } }">Mostra
                dettagli</router-link>
        </div>
    </div> -->
    <div class="card my-restaurant-card" style="width: 18rem;">
        <img :src="cover" class="card-img-top my-cover" alt="restaurant-jumbo">
        <div class="card-body my-card-body">
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
.my-restaurant-card {

    text-align: center;
    border-radius: 15px;
    height: 350px;
    background-color: rgba($color: #ffffff, $alpha: 0.6);

    .my-cover {
        object-fit: cover;
        object-position: center;
        border-radius: 15px 15px 0px 0px;
    }

    .my-card-body {
        position: relative;
        padding-top: 38px;

        .my-img {
            position: absolute;
            top: -50%;
            left: 5%;
            transform: translateY(50%);
            border-radius: 50%;
            width: 30%;
            // height: 300px;
            box-shadow: 0px 0px 8px black;

            transition: 0.4s;
        }
    }

    &:hover .my-img {
        transform: translateY(50%) scale(1.2);
    }
}
</style>