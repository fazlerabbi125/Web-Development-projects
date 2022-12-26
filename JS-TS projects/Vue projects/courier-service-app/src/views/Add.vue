<template>
<div>
<Form @submitForm="handleCreate">
Place Your Order
</Form>
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
    handleCreate(order){
        console.log(order.cost);
        //Insert task into JSON database via POST request
        fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
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