<template>
  <h4 class="title" v-if="isPending">Loading <i class="fa fa-spinner"></i></h4>
  <h4 class="title error" v-else-if="error">{{ error }}</h4>
  <div v-else-if="orders.length > 0">
    <ul class="flex-container">
      <li class="flex-item" v-for="order in orders" :key="order.id">
        <div class="dropdown-right">
          <button class="btn dropbtn" @click="toggleDropdown(order.id)">
            <i
              class="fa fa-caret-up"
              aria-hidden="true"
              v-if="showDropdown['order-' + order.id]"
            ></i>
            <i class="fa fa-caret-down" aria-hidden="true" v-else></i>
          </button>
          <div
            class="dropdown-content"
            :style="{
              display: showDropdown['order-' + order.id] ? 'block' : 'none',
            }"
          >
            <router-link
              :to="{ name: 'Detail', params: { id: order.id } }"
              class="dropdown-item"
              >View Details</router-link
            >
            <div
              @click="toggleModal(order.id)"
              class="dropdown-item"
              style="color: #dc3545"
            >
              Cancel Order
            </div>
            <div v-if="showModal['order-' + order.id]">
              <OrderDelete :id="order.id" @close="toggleModal(order.id)" />
            </div>
          </div>
        </div>
        <h3>To <em>{{order.receiverName}}</em>, 
          {{ moment(order.date).local().format("MMM DD, YYYY h:mm a") }}</h3>
        <div class="text-muted">{{ order.title }}</div>
        <div class="text-muted"><b>Location:</b> {{ order.location }}</div>
        <div class="text-muted"><b>Price:</b> BDT {{ order.cost }}</div>
      </li>
    </ul>
  </div>
  <h4 class="title" v-else style="color: #148772">No orders placed</h4>
</template>


<script setup>
import OrderDelete from "./OrderDelete.vue";
import { ref } from "vue";
import { onMounted } from "vue";
import useFetch from "../composables/useFetch";
import moment from "moment";

const showModal = ref({});
const showDropdown = ref({});
const {
  data: orders,
  error,
  isPending,
} = useFetch("http://localhost:3000/orders");

function toggleModal(id) {
  this.showModal["order-" + id] = !this.showModal["order-" + id];
}
function toggleDropdown(id) {
  this.showDropdown = {
    ["order-" + id]: !this.showDropdown["order-" + id],
  };
}
</script>

<style>
.flex-container {
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style-type: none;
  gap: 1rem;
}

.flex-item {
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  max-width: 94.5%;
}

.flex-item:first-child {
  margin-top: 0.5rem;
}

.flex-item h3 {
  margin-top: 0;
}

.flex-item:hover {
  background-color: #f1f1f1;
}

/* Style The Dropdown Button */
.dropbtn {
  font-weight: 400;
  color: #000;
  background-color: inherit;
  border-color: #f8f9fa;
}

.dropbtn:hover {
  color: #0a58ca;
}
.dropbtn i {
  font-size: 1.5em;
}
/* Change the background color of the dropdown button when the dropdown content is shown */

/* The container <div> - needed to position the dropdown content */
.dropdown-right {
  position: relative;
  float: right;
  margin: 1rem;
  background-color: inherit;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  right: 0;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content > .dropdown-item {
  color: black;
  padding: 0.5rem;
  text-align: center;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

/* Change color of dropdown links on hover */
.dropdown-content .dropdown-item:hover {
  background-color: #f1f1f1;
}
</style>