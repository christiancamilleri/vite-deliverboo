<script>
import AppHome from './pages/AppHome.vue';
export default {
  name: 'App',

  data() {
    return {

    }
  },

  components: {
    AppHome,
  }
}
</script>

<template>
  <div>

    <router-view></router-view>


  </div>
</template>

<style scoped lang="scss"></style>
