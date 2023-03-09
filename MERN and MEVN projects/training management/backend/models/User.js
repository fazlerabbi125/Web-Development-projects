const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const schemaOptions = { discriminatorKey: "role" };

const userRoles = {
    ADMIN: "admin",
    TRAINER: "trainer",
    TRAINEE: "trainee",
};

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            minLength: [3, "Must be at least 3 characters, got {VALUE}"],
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            require: true,
            unique: true,
            validate: [validator.isEmail, "Please enter a valid email address"],
        },
        password: {
            type: String,
            require: true,
            trim: true,
            minLength: [6, "Must be at least 6 characters, got {VALUE}"],
        },
        role: {
            type: String,
            enum: Object.values(userRoles),
            default: userRoles.ADMIN,
        },
        gender: {
            type: String,
            required: [true, "Gender is required"],
            enum: ["Male", "Female", "Others"],
        },
        birth_date: {
            type: Date,
            require: true,
        },
        photo: {
            type: String,
            default: "",
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        emailVerificationToken: String,
        emailVerificationExpire: Date,

        /*
        assignedCourses: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Course",
                },
            ],
            validate: {
                validator: function (value) {
                    // Access the 'title' field using the 'this' keyword
                    return this.role === userRoles.TRAINER;
                },
                message: 'Only assignable when role is trainer'
            }
        },
        assignedBatches: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Batch",
                },
            ],
            validate: {
                validator: function (value) {
                    // Access the 'title' field using the 'this' keyword
                    return this.role === userRoles.TRAINEE;
                },
                message: 'Only assignable when role is trainee'
            }
        },
        */
    },
    schemaOptions
);

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email }).exec();
    if (user) {
        const passMatch = await bcrypt.compare(password, user.password);
        if (passMatch) return user;
    }
    return null;
};

const User = mongoose.model("User", userSchema);

// Discriminator uses same collection and returns a model whose schema is the union of the base schema and the discriminator schema

const Trainer = User.discriminator(
    userRoles.TRAINER,
    new mongoose.Schema(
        {
            assignedCourses: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Course",
                },
            ],
        },
        schemaOptions
    )
);

const Admin = User.discriminator(
    userRoles.ADMIN,
    new mongoose.Schema({}, schemaOptions)
);

const Trainee = User.discriminator(
    userRoles.TRAINEE,
    new mongoose.Schema(
        {
            assignedBatches: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Batch",
                },
            ],
        },
        schemaOptions
    )
);

module.exports = User;
