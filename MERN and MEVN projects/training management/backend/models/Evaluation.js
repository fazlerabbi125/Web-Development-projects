const mongoose=require('mongoose');

const evalSchema =new mongoose.Schema({
    title: {
        type: String,
        minLength:[6,'Must be at least 6 characters, got {VALUE}'],
        required:[true, 'Title is required'],
    },
    tasks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Task'
        }
    ],
    startTime:{
        type : Date,
        require: true,
        validate: {
            validator: function(value){
                return value.getTime()<this.endTime.getTime(); 
            },
            message: props => `${props.value} cannot be assigned as start time has to be earlier than end time`
        },
    },
    endTime:{
        type : Date,
        require: true,
        validate: {
            validator: function(value){
                return value.getTime()>this.startTime.getTime(); 
            },
            message: props => `${props.value} cannot be assigned as end time has to be after start time`
        },
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    batch:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Batch'
    },
    traineeScores:[
        {
            trainee:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            score:{
                type: Number,
                required: true,
                default:0,
                validate: {
                    validator: function(value){
                        return (value)=>{
                            if (value) return value>=0; 
                            return true;
                        }
                    },
                    message: props => `${props.value} has to be greater than or equal to 0`
                },
            },
        }
    ]
},{timestamps:true});



evalSchema.methods.getTotalScore = function () {
    let score=0;
    if (this.tasks.length>0){
        score=this.tasks.reduce((total, elem)=>{
            return total + elem.score;
        }, score);
    }
    return score;
};

const Evaluation = mongoose.model('Evaluation', evalSchema);

module.exports = Evaluation;
