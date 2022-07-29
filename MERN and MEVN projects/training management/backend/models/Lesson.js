const mongoose=require('mongoose');

const lessonSchema =new mongoose.Schema({
    title: {
        type: String,
        minLength:[3,'Must be at least 3 characters, got {VALUE}'],
        required:[true, 'Title is required'],
    },
    content:{
        type: String,
        minLength:[10,'Must be at least 10 characters, got {VALUE}'],
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Course'
    }
},{timestamps:true});


const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;
