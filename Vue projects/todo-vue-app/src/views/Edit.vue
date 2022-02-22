<template>
<h2 class="title error" v-if="error"> {{error}} </h2>
<div v-else>
<Form @submitForm="handleUpdate" :title="task.title" :date="task.date" :category="task.category" 
:isComplete="task.isComplete">
Edit your task
</Form>
</div>
</template>

<script setup>
import Form from '../components/Form.vue'
import {useRouter} from 'vue-router'
import getTask from '../composables/getTask'

const router=useRouter();
const props = defineProps({
    id: {
        required: true
    }
})

const {task,error,load}= getTask(props.id)
load();

function handleUpdate(title,date,category,isComplete){
    task.value = { title, date, category, isComplete };
    //Insert task into JSON database via POST request
    fetch('http://localhost:3000/tasks/'+props.id, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task.value)
    }).then(() => {
        console.log('Task successfully updated');
        router.push({name:'Home'});//for re-direct
    }).catch((err) => {
        error.value=err.message;
        console.error('Error: ', err.message);
    });
}      
</script>

<style>

</style>