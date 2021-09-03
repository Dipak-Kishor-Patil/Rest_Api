const express = require("express")
const router = new express.Router();
const Student = require("../models/students");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// CREATE A NEW STUDENT
router.post("/students", async (req, res) => {
    try {
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;

        if (password === confirm_password) {
            const user = new Student(req.body);

            // const token = await createUser.generateAuthToken();

            const createUser = await user.save()
            res.status(201).send(createUser)
        } else {
            res.status(400).send("Invalid Password Or Missing Confirm_Password")
        }

    } catch (err) { res.status(400).send(err) }
});

//LOGING USER USING EMAIL AND PASSWORD

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const studentemail = await Student.findOne({ email: email });

        const isMatch = await bcrypt.compare(password, studentemail.password);

        if (isMatch) {
            res.status(201).send(studentemail)
        } else {
            res.send("invalid user or password");
        }
    } catch (err) {
        res.status(400).send(`invalid email${err}`);

    }
})


// DISPLAY ALL THE STUDENTS OF DATABASE
router.get("/students", async (req, res) => {
    try {   
        const studentsData = await Student.find()
        res.send(studentsData)
    } catch (err) {
        res.send(err)
    }
})

//DISPLAY SINGLE STUDENT BY ID 
router.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);

        if (!studentData) {
            return res.status(400).send();
        } else {
            res.send(studentData);
        }
    } catch (e) {
        res.status(500).send(e);

    }
})

// UPADATE STUDENT BY ID 
router.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });

        res.send(updateStudent);
    } catch (err) {
        res.status(500).send(err);

    }
})

// DELETE A STUDENT BY ID
router.delete("/students/:id", async (req, res) => {
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send(deleteStudent)
        }
        res.send(deleteStudent)

    } catch (err) {
        res.send(err)
    }
})

module.exports = router;
