const mongoose=require('mongoose');

const batchSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: 3
    },
    startDate:{
        type: Date,
        required:true,
        validate: {
            validator: function(value){
                return value.getTime()<this.endDate.getTime(); 
            },
            message: props => `${props.value} cannot be assigned as start date has to be earlier than end date`
        },
    },
    endDate:{
        type: Date,
        required:true,
        validate: {
            validator: function(value){
                return value.getTime()>this.startDate.getTime(); 
            },
            message: props => `${props.value} cannot be assigned as end date has to be after start date`
        },
    },
    trainees:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        }
    ],
    assignedCourses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course' 
        }
    ],
    
});

batchSchema.statics.removeTrainee =  async function (traineeID){
    const batches= await this.find({trainees:traineeID}).exec();
    for (let batch of batches) {
        batch.trainees=batch.trainees.filter((trainee) => trainee.toString() !== traineeID.toString());
        await batch.save();
    }
}

const Batch= mongoose.model('Batch',batchSchema);

module.exports = Batch;
