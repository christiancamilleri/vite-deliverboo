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
    tornaSu() {
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

    <span class="position-fixed position-absolute bottom-0 end-0 bg-warning p-3 z-3" @click="tornaSu()">torna
      su</span>
  </div>
</template>

<style scoped lang="scss">
div {
  background-image: url('/img/sfondo-4.JPG');
  color: white;
  background-size: 30%;
}
</style>
