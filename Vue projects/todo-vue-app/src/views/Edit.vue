<template>
<h2 class="title error" v-if="error"> {{error}} </h2>
<div v-else>
<h2 class="title">Edit your task</h2>

<Form @submitForm="handleUpdate" :title="task.title" :date="task.date" :category="task.category" 
:isComplete="task.isComplete" />
</div>
</template>

<script>
import Form from '../components/Form.vue'
import {useRouter} from 'vue-router'
import getTask from '../composables/getTask'
export default {
    name: 'Edit',
    components:{
    Form
    },
    props:{
        id:{
            required: true
        }
    },
    setup(props){
        const router=useRouter();

        let {task,error,load}= getTask(props.id)
        load();

        function handleUpdate(title,date,category,isComplete){
            task = { title, date, category, isComplete };
            //Insert task into JSON database via POST request
            fetch('http://localhost:3000/tasks/'+props.id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
            }).then(() => {
                console.log('Task successfully updated');
                router.push({name:'Home'});//for re-direct
            }).catch((err) => {
            console.error('Error: ', err.message);
            });
        }
        return {task,error,handleUpdate};
    }
}
</script>

<style>

</style>