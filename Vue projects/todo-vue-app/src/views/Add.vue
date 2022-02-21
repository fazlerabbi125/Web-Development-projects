<template>
<div>
<h2 class="title">Add a task</h2>
<Form @submitForm="handleCreate"/>
</div>
</template>

<script>
import Form from '../components/Form.vue'

export default {
name: 'Add',
components:{
Form
},
methods:{
    handleCreate(title,date,category,isComplete){
        const task = { title, date, category, isComplete };
        //Insert task into JSON database via POST request
        fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
        }).then(() => {
            console.log('Task successfully added');
            this.$router.push({name:'Home'});//for re-direct
        }).catch((error) => {
        console.error('Error: ', error.message);
        });
        }
    }
}
</script>

<style>

</style>