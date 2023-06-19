<script>
import AppHeader from './components/AppHeader.vue'
import AppHome from './pages/AppHome.vue';

export default {
  name: 'App',

  data() {
    return {

    }
  },

  components: {
    AppHeader,
    AppHome,
  },
}
</script>

<template>
  <div>
    <AppHeader></AppHeader>

    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss"></style>
