<template>
<form @submit.prevent="handleSubmit" >
  <h5 class="title error" v-if="err"> {{err}} </h5>
    <p>
        <label for="title">Title:</label>
        <input type="text" name="title" id="title" class="form-input" v-model="title" required></p>
    <p>
      <label for="date">Date:</label>
      <input type="date" name="date" id="date" class="form-input" v-model="date" required></p>
    <p>
        <label for="category">Category:</label>
        <select name="category" id="category" class="form-select" v-model="category" required>
        <option disabled value="">Select Category</option>
        <option v-for="option in options" :key="option" :value="option">
          {{option}}
        </option>
        </select>
    </p>

    <p>
    <button @click="$router.push({name:'Home'})" class="btn btn-dark">Back to Home</button>
     <button type="submit" class="btn btn-primary" >Submit</button></p>
</form>
</template>

<script>
import {ref} from 'vue'

export default {
  props:{
    title:{
      type:String,
      default:''
    },
    category:{
      type:String,
      default:''
    },
    date:{
      type:String,
      default:''
    },
    isComplete:{
      type:Boolean,
      default:false
    }
  },
  setup(props,context){
    let err = ref(null);
    const title= ref(props.title);
    const date= ref(props.date);
    const category= ref(props.category);
    const isComplete= ref(props.isComplete);
    const options= ref(["Health","Fitness","Work","Chore","Education","Entertainment"]);
    const handleSubmit= ()=>{
      if (title.value.length>=3){
          context.emit('submitForm',title.value,date.value,category.value,isComplete.value);
      }
      else {
        err.value='Title should at least have 3 characters';
        console.warn(err.value);
      }
    };
    return {title,date,category,options,err,handleSubmit};
  }
}
</script>

<style>
form{
  text-align:center;
}
label{
  font-weight: bold;
  display:inline-block;
  margin-right:0.25rem;
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
</style>