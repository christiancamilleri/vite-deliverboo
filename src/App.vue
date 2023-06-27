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
  // background-image: url('/img/sushi.png');
  background-image: url('/img/hambu2.png');
  // background-repeat: no-repeat;
  background-size: 20%;
  // background-color: #f47f7f;

  color: white;
}
</style>
