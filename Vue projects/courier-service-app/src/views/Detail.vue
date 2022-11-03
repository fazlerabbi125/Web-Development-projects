<template>
  <h2 class="title" v-if="isPending">Loading <i class="fa fa-spinner"></i></h2>
  <h2 class="title error" v-else-if="error">{{ error }}</h2>
  <div class="order-details" v-else>
    <h2 class="title">Order Details</h2>
    <table>
      <tr>
        <th>Package Title</th>
        <td>{{ order.title }}</td>
      </tr>
      <tr>
        <th>Ordered on</th>
        <td>{{ order.date }}</td>
      </tr>
      <tr>
        <th>Package weight</th>
        <td>{{ order.weight }}</td>
      </tr>
      <tr>
        <th>Route</th>
        <td>{{ order.delivery }}</td>
      </tr>
      <tr>
        <th>Cost</th>
        <td>BDT {{ order.cost }}</td>
      </tr>
      <tr>
        <th>Payment method</th>
        <td>{{ order.method }}</td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import useFetch from "../composables/useFetch";

const router = useRouter();
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