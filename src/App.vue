<script>
import AppHeader from './components/AppHeader.vue'
import AppHome from './pages/AppHome.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',

  data() {
    return {

    }
  },

  methods: {
    scrollUp() {
      window.scrollTo(0, 0);
    }
  },

  components: {
    AppHeader,
    AppHome,
    AppFooter,
  },
}
</script>

<template>
  <div>
    <AppHeader></AppHeader>

    <main>
      <router-view></router-view>
    </main>

    <AppFooter></AppFooter>

    <button id="button-up"
      class="btn btn-warning text-primary position-fixed rounded-circle z-3 d-none d-lg-flex align-items-center justify-content-center"
      @click="scrollUp()">
      <i class="fas fa-arrow-up fs-4"></i>
    </button>
  </div>
</template>

<style scoped lang="scss">
div {
  background-image: url('/img/sfondo-4.JPG');
  color: white;
  background-size: 30%;
}

#button-up {
  width: 50px;
  height: 50px;
  bottom: 20px;
  right: 20px;
}
</style>
