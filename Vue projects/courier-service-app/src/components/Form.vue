<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="title">
      <slot>
        Form
        <!-- fallback content --></slot
      >
    </h2>
    <p>
      <label for="title">Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        class="form-input"
        v-model="title"
        required
      />
    </p>
    <p>
      <label for="route">Route:</label>
      <select
        name="route"
        id="route"
        class="form-select"
        v-model="delivery"
        required
      >
        <option disabled value="">Select Route</option>
        <option
          v-for="(option, i) in options"
          :key="option.route"
          :value="options[i]"
        >
          {{ option.route }}
        </option>
      </select>
    </p>
    <p>
      <label for="weight">Weight:</label>
      <select
        name="weight"
        id="weight"
        class="form-select"
        v-model="weight"
        required
      >
        <option disabled value="">Select Parcel Weight</option>
        <option v-for="(weight, i) in wo" :key="weight.name" :value="wo[i]">
          {{ weight.name }}
        </option>
      </select>
    </p>

    <p>
      <label for="method">Payment:</label>
      <select
        name="method"
        id="method"
        class="form-select"
        v-model="method"
        required
      >
        <option disabled value="">Select Payment Method</option>
        <option v-for="m in pay" :key="m" :value="m">
          {{ m }}
        </option>
      </select>
    </p>
    <h5 v-if="cost">Total cost: BDT {{ cost }}</h5>
    <p>
      <button @click="$router.push({ name: 'Home' })" class="btn btn-dark">
        Back to Home
      </button>
      <button type="submit" class="btn btn-primary">Submit</button>
    </p>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["submitForm"]);

const title = ref("");
const delivery = ref("");
const options = ref([
  { price: 50, route: "Inside Dhaka" },
  { price: 150, route: "Outside Dhaka" },
]);
const weight = ref("");
const pay = ref(["Cash", "Bkash"]);
const method = ref("");
const date = ref(new Date());
const wo = ref([
  { price: 50, name: "Upto 0.5kg" },
  { price: 100, name: "Upto 1kg" },
  { price: 250, name: "Upto 2.5kg" },
  { price: 500, name: "Upto 5kg" },
]);

const cost = computed(() => {
  if (weight.value && delivery.value) {
    return weight.value.price + delivery.value.price;
  } else return null;
});

const handleSubmit = () => {
  if (title.value.length >= 3) {
    emit(
      "submitForm",
      title.value,
      delivery.value.route,
      weight.value.name,
      cost.value,
      method.value,
      date.value.toLocaleString()
    );
  } else {
    alert("Title should at least have 3 characters");
  }
};
</script>

<style>
form {
  text-align: center;
}
label {
  font-weight: bold;
  display: inline-block;
  margin-right: 0.25rem;
}
.form-input {
  width: 35%;
  padding: 0.375rem 0.75rem;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.6;
  color: #212529;
  background-color: #f8fafc;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.form-select {
  width: 35%;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.6;
  color: #212529;
  background-color: #f8fafc;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid #ced4da;
  border-radius: 0.15rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.form-select:focus,
.form-input:focus {
  outline: none;
}
</style>