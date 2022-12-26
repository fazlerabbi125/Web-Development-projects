<template>
  <h1 class="banner">ToDo App</h1>
  <ul id="nav">
    <li class="col-sm-12"><router-link to="/">Home</router-link></li>
    <li class="col-sm-12"><router-link to="/about">About</router-link></li>
    <li class="col-sm-12">
      <router-link to="/task/add">Add Task</router-link>
    </li>
  </ul>
  <router-view class="content col-lg-7 col-md-7 col-sm-9" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
}

#nav {
  list-style-type: none;
  margin-top: 1%;
  margin-bottom: 2%;
  margin-left: 0;
  margin-right: 0;
  padding: 0;
  background-color: white;
  width: 100%;
}

#nav li {
  display: inline-block;
}

#nav li a {
  display: block;
  text-align: center;
  padding: 1em;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav li a.router-link-exact-active {
  color: #42b983;
}

#nav li a:hover {
  color: #38e3e9;
  background-color: black;
}

.content {
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.banner {
  font-family: cursive;
  font-style: italic;
  margin-left: 0.25rem;
}
</style>
