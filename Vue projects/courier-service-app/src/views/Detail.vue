<template>
  <h2 class="title" v-if="isPending">Loading <i class="fa fa-spinner"></i></h2>
  <h2 class="title error" v-else-if="error">{{ error }}</h2>
  <div class="order-details" v-else>
    <h2 class="title">Order Details</h2>
    <table>
      <tr>
        <th>Package ID</th>
        <td>{{ order.id }}</td>
      </tr>
      <tr>
        <th>Package Title</th>
        <td>{{ order.title }}</td>
      </tr>
      <tr>
        <th>Ordered on</th>
        <td>{{ moment(order.date).local().format("DD-MM-YYYY, h:mm a") }}</td>
      </tr>
      <tr>
        <th>Recipient's name</th>
        <td>{{ order.receiverName }}</td>
      </tr>
      <tr>
        <th>Recipient's phone number</th>
        <td>{{ order.receiverPhone }}</td>
      </tr>
      <tr>
        <th>Package weight</th>
        <td>{{ order.weight }}</td>
      </tr>
      <tr>
        <th>Location</th>
        <td>{{ order.location }}</td>
      </tr>
      <tr>
        <th>Cost</th>
        <td>BDT {{ order.cost }}</td>
      </tr>
      <tr>
        <th>Payment method</th>
        <td>{{ order.paymentMethod }}</td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import useFetch from "../composables/useFetch";
import moment from "moment";

const props = defineProps({
  id: {
    required: true,
  },
});

const {
  data: order,
  error,
  isPending,
} = useFetch("http://localhost:3000/orders/" + props.id);
</script>

<style>
.order-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

table,
td,
th {
  border: 1px solid;
}

table {
  margin-bottom: 3rem;
  border-collapse: collapse;
  font-size: 1.05rem;
  text-align: center;
  width: 70%;
}
</style>