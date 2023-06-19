<script>

import { reactive } from 'vue';
import AppCart from './components/AppCart.vue';
import AppHome from './pages/AppHome.vue';
export default {
  name: 'App',

  data() {
    return {
      cartItems: reactive([]),
    }
  },

  components: {
    AppHome,
    AppCart,
  },

  created() {

    // this.loadCartItems(); // Carica i dati del carrello dai cookie quando il componente viene creato

    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  },
  
  methods: {

//---------------------------------
    addToCart(item) {
      this.cartItems.push(item);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },

    // addToCart(item) {
    //   console.log('aggiunto')
    //   this.cartItems.push(item);
    //   this.saveCartItems();
    //   // Salva i dati del carrello nel LocalStorage dopo l'aggiunta di un elemento
    // },
//---------------------------------



//---------------------------------
    removeFromCart(item) {
      const index = this.cartItems.indexOf(item);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      }
    },
    // removeFromCart(item) {
    //   const index = this.cartItems.indexOf(item);
    //   if (index !== -1) {
    //     this.cartItems.splice(index, 1);
    //     this.saveCartItems();
    //     // Salva i dati del carrello nel LocalStorage dopo la rimozione di un elemento
    //   }
    // },
//---------------------------------



    // loadCartItems() {
    //   const savedCartItems = localStorage.getItem('cartItems');
    //   if (savedCartItems) {
    //     this.cartItems = JSON.parse(savedCartItems);
    //   }
    // },
    // saveCartItems() {
    //   localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    // },
  },
}
</script>

<template>
  <div>

    <div class="container">
      <div v-for="item in cartItems"> 
        <span>{{ item.name }} ...  {{ item.price }}</span> <span><button @click="removeFromCart(item)" >elimina</button></span>
      </div>
    </div>

    <!-- <AppCart @aggiungi="addToCart"></AppCart> -->

    <router-view @aggiungi="addToCart"></router-view>


  </div>
</template>

<style scoped lang="scss"></style>
