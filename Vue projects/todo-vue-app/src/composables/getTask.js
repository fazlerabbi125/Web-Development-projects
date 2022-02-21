import {ref} from 'vue'
function getTask(id){
    let task= ref(null);
    const error= ref(null);
    const load= async ()=>{
        try{
            let res= await fetch('http://localhost:3000/tasks/' + id);
            if (!res.ok) throw Error(`No data available`);
            task.value= await res.json();
        }
        catch(err){
            console.log(err.message);
            error.value=err.message;
        }
    }
    return {task,error,load}
}

export default getTask;