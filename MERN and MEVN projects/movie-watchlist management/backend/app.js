const express = require('express');
const path = require('path');
const cors = require('cors');


const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors
app.use(cors({ origin: true, credentials: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const movieRoutes = require('./routes/movieRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');


const { failure } = require('./utils/commonResponse');
const HTTP_STATUS = require('./utils/httpStatus');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { dbName: "watchlist-app" })
    .then((result) => {
        console.log("MongoDB database is connected!!");
        app.listen(process.env.PORT_NO, () => console.log(`App running on port ${process.env.PORT_NO}`));
    })
    .catch((err) => console.log(err))//"catch" promise for errors

app.use(authRoutes);
app.use(movieRoutes);
app.use('/movie-series', adminRoutes);


app.use((req, res, next) => {
    res.status(HTTP_STATUS.NOT_FOUND).send(failure('NOT FOUND'));
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(
        failure('Internal Server Error!', err.message)
    );
})