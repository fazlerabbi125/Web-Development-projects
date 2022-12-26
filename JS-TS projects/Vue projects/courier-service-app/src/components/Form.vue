<template>
  <form @submit.prevent="handleSubmit" class="order-form">
    <h2 class="title">
      <slot>
        Form
        <!-- fallback content -->
      </slot>
    </h2>

    <div class="form-group">
      <label for="title">Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        class="form-input"
        v-model.trim="formInputs.title"
        required
      />
    </div>

    <div class="form-group">
      <label for="receiver_name">Receiver's name:</label>
      <input
        type="text"
        name="receiver_name"
        id="receiver_name"
        class="form-input"
        v-model.trim="formInputs.receiverName"
        required
      />
    </div>

    <div class="form-group">
      <label for="receiver_phone">Receiver's phone:</label>
      <input
        type="tel"
        name="receiver_phone"
        id="receiver_phone"
        class="form-input"
        v-model.trim="formInputs.receiverPhone"
        required
      />
    </div>
    <div class="form-group">
      <label for="location">Location:</label>
      <select
        name="location"
        id="location"
        class="form-select"
        v-model="formInputs.location"
        required
      >
        <option disabled value="">Select Location</option>
        <option
          v-for="(option, i) in locationOptions"
          :key="option.route"
          :value="locationOptions[i]"
        >
          {{ option.route }}
        </option>
      </select>
    </div>

    <div>
      <label for="address">Address:</label>
      <textarea v-model="formInputs.address" rows="3" cols="30"></textarea>
    </div>

    <div class="form-group">
      <label for="weight">Weight:</label>
      <select
        name="weight"
        id="weight"
        class="form-select"
        v-model="formInputs.weight"
        required
      >
        <option disabled value="">Select Parcel Weight</option>
        <option
          v-for="(weight, i) in weightOptions"
          :key="weight.name"
          :value="weightOptions[i]"
        >
          {{ weight.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="method">Payment:</label>
      <select
        name="method"
        id="method"
        class="form-select"
        v-model="formInputs.paymentMethod"
        required
      >
        <option disabled value="">Select Payment Method</option>
        <option v-for="m in pay" :key="m" :value="m">
          {{ m }}
        </option>
      </select>
    </div>

    <h5 v-if="cost">Total cost: BDT {{ cost }}</h5>

    <div class="form-group">
      <button @click="$router.push({ name: 'Home' })" class="btn btn-dark">
        Back to Home
      </button>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

const emit = defineEmits(["submitForm"]);

const formInputs = reactive({
  title: "",
  location: "",
  weight: "",
  paymentMethod: "",
  address: "",
  receiverName: "",
  receiverPhone: "",
});

const locationOptions = ref([
  { price: 50, route: "Inside Dhaka" },
  { price: 150, route: "Outside Dhaka" },
]);
const pay = ref(["Cash", "Bkash"]);
const weightOptions = ref([
  { price: 50, name: "Upto 0.5kg" },
  { price: 100, name: "Upto 1kg" },
  { price: 250, name: "Upto 2.5kg" },
  { price: 500, name: "Upto 5kg" },
]);

const cost = computed(() => {
  if (formInputs.weight && formInputs.location) {
    return formInputs.weight.price + formInputs.location.price;
  } else return null;
});

const handleSubmit = () => {
  if (formInputs.title.length >= 3) {
    emit("submitForm", {
      ...formInputs,
      weight: formInputs.weight.name,
      location: formInputs.location.route,
      date: new Date(),
      cost: cost.value,
    });
  } else {
    alert("Title should at least have 3 characters");
  }
};
</script>

<style>
.order-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}

label {
  font-weight: bold;
  display: block;
}

textarea {
  display: block;
  padding: 0.375rem 1rem;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.6;
  color: #212529;
  background-color: #f8fafc;
  border: 1px solid #ced4da;
  margin-top: 0.5rem;
}

.form-input {
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
.form-input:focus,
textarea:focus {
  outline: none;
}
</style>
