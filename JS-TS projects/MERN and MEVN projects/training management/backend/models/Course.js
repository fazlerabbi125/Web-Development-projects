const mongoose=require('mongoose');
const slugify = require('slugify');

const courseSchema =new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        minLength:[3,'Must be at least 3 characters, got {VALUE}'],
        required:[true, 'Title is required'],
    },
    details:{
        type: String,
        minLength:[10,'Must be at least 10 characters, got {VALUE}'],
    },
    slug:{
        type: String
    },
    trainer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    image:{
        type: String,
        default:'',
    },
    lessons:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Lesson'
        }
    ],
    timing:{
        type: String,
        required: true,
        enum: ['9:00 AM to 10:30 AM','11:00 AM to 12:30 PM','3:30 PM to 5:00 PM']
    },
    trainingBatches:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Batch'
        }
    ]
},{timestamps:true});

courseSchema.pre('save', function(next) { 
    this.slug= slugify(this.title+"-"+this._id); 
    next();//To go to the next process
});

courseSchema.methods.addTrainer =  async function (trainer){
    this.trainer=trainer;
    await this.save();
}

courseSchema.statics.removeTrainer =  async function (trainer){
    const courseList= await this.find({trainer}).exec();
    for (let course of courseList) {
        course.trainer=undefined;
        await course.save();
    }
    return courseList;
}

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
