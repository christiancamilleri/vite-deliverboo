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

    <router-view></router-view>

    <AppFooter></AppFooter>


  </div>
</template>

<style scoped lang="scss">
div {
  background-image: url('/img/sfondo-4.JPG');
  color: white;
  background-size: 30%;
}
</style>
