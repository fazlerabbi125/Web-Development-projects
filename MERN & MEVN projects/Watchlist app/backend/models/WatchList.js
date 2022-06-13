const mongoose=require('mongoose');

const watchListSchema=new mongoose.Schema({ 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    movies: [
        {
            movie: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Movie',
            },
            status: {
                type: String,
                required: true,
                enum: ["N/A", 'Completed','Watching','Considering','Skipping'],
                default: 'N/A'
            },
        },
    ],
},{timestamps:true});

watchListSchema.methods.addToList = async function (eID) {
    try {
        this.movies.push({movie:eID});
        await this.save();
    } catch (error) {
        throw new Error(error);
    }
};

watchListSchema.methods.removeFromList = async function (eID) {
    try {
        this.movies = this.movies.filter(
            (mov) => mov.movie.toString() !== eID.toString()
        );
        await this.save();
    } catch (error) {
        throw new Error(error);
    }
};

watchListSchema.methods.changeStatus = async function (eID,status) {
    try {
        const idx = this.movies.findIndex(
            (mov) => mov.movie.toString() === eID.toString()
        );
        this.movies[idx].status=status;
        await this.save();
    } catch (error) {
        throw new Error(error);
    }
};

const WatchList=mongoose.model('WatchList',watchListSchema);
module.exports=WatchList;