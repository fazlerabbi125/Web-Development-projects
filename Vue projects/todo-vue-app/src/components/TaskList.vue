<template>
  <h2 class="title" v-if="loading">Loading <i class="fa fa-spinner"></i></h2>
  <h2 class="title error" v-else-if="error">{{ error }}</h2>
  <div v-else-if="tasks.length>0">
    <h2 class="title">Tasks</h2>
    <ul class="flex-container" >
      <li class="flex-item" v-for="task in tasks" :key="task.id" >
      <div class="dropdown-right">
        <button class="btn dropbtn" @click="toggleDropdown(task.id)">
          <i class="fa fa-caret-up" aria-hidden="true" v-if="showDropdown['task-'+task.id]"></i>
          <i class="fa fa-caret-down" aria-hidden="true" v-else></i>
          </button>
        <div class="dropdown-content" :style="{ display: showDropdown['task-'+task.id]? 'block' : 'none' }">
          <div @click="toggleState(task)" class="dropdown-item"> 
            <span v-if="task.isComplete">Incomplete</span>
            <span v-else>Complete</span>
            </div>
          <router-link :to="{name: 'Edit', params: {id:task.id}}" class="dropdown-item">Edit</router-link>
          <div @click="toggleModal(task.id)" class="dropdown-item" style="color: #dc3545;">Delete</div>
          <div v-if="showModal['task-'+task.id]">
              <TaskDelete :id="task.id" :title="task.title" @close="toggleModal(task.id)"/>
          </div>
        </div>
      </div>
      <h3> {{ task.title }} <span v-if="task.isComplete" style="color:#198754;"> <i class="fa fa-check"></i></span> </h3>
      <div class="text-muted">{{ task.date }} </div>
      <div class="text-muted"><b>Category:</b> {{ task.category }}</div>
      </li>
    </ul>
  </div>
  <h2 class="title" v-else>No tasks added</h2>
</template>

<script>
import TaskDelete from './TaskDelete.vue'

export default {
  data(){
    return {
      tasks:[],
      loading: true,
      showModal:{},
      showDropdown:{},
      error:null
      }
  },
  components: {
    TaskDelete
  },
  methods:{
    toggleModal(id){
      this.showModal['task-'+id]=!this.showModal['task-'+id];
    },
    toggleDropdown(id){
      this.showDropdown['task-'+id]=!this.showDropdown['task-'+id];
    },
    toggleState(task){
      task.isComplete=!task.isComplete;
      fetch('http://localhost:3000/tasks/'+task.id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
            }).then((res) => {
                if (!res.ok) throw Error(`Update unsuccessful`);
                console.log('State successfully updated');
            }).catch((error) => {
              this.error=error.message;
              console.error('Error: ',this.error);
            });
      this.toggleDropdown(task.id);
    }
  },
  mounted(){
    fetch('http://localhost:3000/tasks')
    .then(res => {
          if (!res.ok) throw Error(`Data can't be fetched for that resource`);//Throw error if there are errors coming back from server
          return res.json();//to get data from response object. Converts JSON to JS object
    })
    .then(data =>{
      this.tasks=data;
      this.loading=false;
      })
    .catch((error) => {
      console.error(error.message);
      this.error=error.message;
    });
  }
}

</script>

<style>
.flex-container{
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style-type: none;
}

.flex-item{
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  max-width: 94.5%;
  margin-bottom: 2rem;
}

.flex-item:first-child {
  margin-top: 0.5rem;
}

.flex-item h3{
  margin-top:0;
}

.flex-item:hover{
  background-color: #f1f1f1;
}

/* Style The Dropdown Button */
.dropbtn {
  font-weight: 400;
  color: #000;
  background-color: inherit;
  border-color: #f8f9fa;
  
}

.dropbtn:hover{
  color: #0a58ca;
}
.dropbtn i{
font-size: 1.5em;
}
/* Change the background color of the dropdown button when the dropdown content is shown */

/* The container <div> - needed to position the dropdown content */
.dropdown-right {
  position: relative;
  float: right;
  margin: 1rem ;
  background-color: inherit;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  right: 0;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content> .dropdown-item {
  color: black;
  padding: 0.5rem;
  text-align: center;
  text-decoration: none;
  display: block;
  cursor:pointer;
}

/* Change color of dropdown links on hover */
.dropdown-content .dropdown-item:hover {background-color: #f1f1f1}


</style>