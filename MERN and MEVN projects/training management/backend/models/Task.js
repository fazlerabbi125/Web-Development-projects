const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({ 
    content:{
        type: String,
        required: [true,'content is required'],
        minLength:[5,'Must be at least 5 characters, got {VALUE}'],
    },
    score:{
        type: Number,
        required: true,
        default:0,
        validate: (value)=> value>=0
    },
    assessment:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Evaluation'
    }
},{timestamps:true});



const Task=mongoose.model('Task',taskSchema);
module.exports=Task;