<template>
  <h1 class="banner">DeliveriesBD</h1>
  <nav class="navbar">
    <button @click="toggleNav" class="navbar-toggler">
      <i class="fa fa-bars" style="font-size: 1.5rem"></i>
    </button>
    <ul class="navbar-items">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/order/add">Place Order</router-link></li>
    </ul>
    <!--
    <ul class="navbar-items nav-right">
      <li ><router-link to="/about" >Login</router-link></li>
      <li ><router-link to="/about" >Register</router-link></li>
    </ul>
    -->
  </nav>
  <router-view class="content col-lg-7 col-md-7 col-sm-9" />
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const toggleNav = () => {
      const navbarItems = ref(null);
      navbarItems.value = document.getElementsByClassName("navbar-items");
      console.log(typeof navbarItems.value);
      for (let x of navbarItems.value) {
        x.classList.toggle("nav-show");
      }
    };
    return { toggleNav };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
}

.navbar {
  margin: 0 0 2%;
  background-color: white;
  width: 100%;
  display: flex;
  align-items: center;
}

.navbar-items {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.navbar-items li a,
button,
span {
  display: block;
  text-align: center;
  padding: 1em;
  font-weight: bold;
  text-decoration: none;
  color: #2c3e50;
  text-transform: capitalize;
}
.nav-right {
  margin-left: auto;
}
.navbar-items li a.router-link-exact-active {
  color: rgb(15, 200, 185);
}

.navbar-items li a:hover {
  background-color: rgb(180, 180, 180);
  color: white;
}

.navbar-toggler {
  background-color: inherit;
  border: none;
  display: none;
  cursor: pointer;
  align-self: flex-start;
}

.nav-show {
  display: flex !important;
}
.content {
  margin: 0 auto 2rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.banner {
  font-family: cursive;
  font-style: italic;
  padding: 0.25rem 0 0.5rem 0.35rem;
  background-color: black;
  color: white;
  margin: 0;
}
</style>
