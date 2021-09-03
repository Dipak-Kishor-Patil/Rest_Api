const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//DEFINED A DRUCTURE OF STUDENT COLLECTION
const studentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    middel_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: [true, "Email id already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error("invalid Email")
            }
        }
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        required: true,
        unique: [true, "phone number is already present"],

    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    confirm_password: {
        type: String,
        required: true,
    },
})

// GENERATING TOKEN

studentSchema.methods.generateAuthToken = async function () {
    try {
        console.log(this._id);
        const token = jwt.sign({_id:this._id},"mynaneisdipakkishorpatilandimbcastudent");
        console.log(token);
        return token;
    } catch (error) {
        res.send(`the error part${error}`);
        console.log(`the error part${error}`);
    }
}



studentSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirm_password = undefined;
    }
    next();
})

// WE WILL CREATE A NEW COLLECTION

const Student = new mongoose.model("Student", studentSchema);


module.exports = Student;
