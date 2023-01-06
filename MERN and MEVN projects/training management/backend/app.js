const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require("morgan");

const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true })); //cors
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(morgan("dev"));

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const adminRoutes = require('./routes/adminRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const traineeRoutes = require('./routes/traineeRoutes');

const { failure } = require('./utils/commonResponse');
const HTTP_STATUS = require('./utils/httpStatus');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { dbName: "training-management" })
    .then((result) => {
        console.log("MongoDB database is connected!!");
        app.listen(process.env.PORT_NO, () => console.log(`App running on port ${process.env.PORT_NO}`));
    })
    .catch((err) => console.log(err))//"catch" promise for errors

app.use(authRoutes);
app.use(courseRoutes);
app.use('/admin', adminRoutes);
app.use('/trainer', trainerRoutes);
app.use('/trainee', traineeRoutes)

app.use((req, res, next) => {
    res.status(HTTP_STATUS.NOT_FOUND).send(failure('NOT FOUND'));
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(
        failure('Internal Server Error!', err.message)
    );
})