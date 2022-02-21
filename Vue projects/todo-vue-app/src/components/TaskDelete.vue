<template>
  <div class="modal-backdrop" @click.self="closeModal">
      <div class="modal-content">
          <form @submit.prevent="handleDelete(id)" >
              <p>Are you sure you want to delete Task-{{ id }}: {{ title }}?</p>
              <button class="btn btn-dark" @click="closeModal">Close</button>
              <button type="submit" class="btn btn-danger">Delete Task</button>
          </form>
      </div>
  </div>
</template>

<script>
export default {
props:{
  id:{
    type: Number,
    required: true
  },
  title:{
    type: String,
    required: true
  }
},
methods:{
        handleDelete(id){
            //Delete blog from JSON database via DELETE request
            fetch('http://localhost:3000/tasks/' + id, {
              method: 'DELETE'
            }).then(() => {
              
              this.$router.go(0); //for re-direct
            });
        },
        closeModal(){
          this.$emit('close');
        }
    }
}

</script>

<style>

.modal-backdrop{
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height:100%;
    top:0;
    left:0;
}

.modal-content{
    width:40%;
    background-color: white;
    margin:4% auto;
    border-radius: 0.6rem;
    padding: 5%;
    text-align: center;
}
</style>