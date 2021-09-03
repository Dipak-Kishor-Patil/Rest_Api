
const { json } = require("express");
const express = require("express");
require("./db/conn");
const student = require("./models/students");
const studentRouter = require("./routers/student")


const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(studentRouter);




app.listen(port, () => {
    console.log(`connection is ruuning on..${port}`);
})













// db.dipak.updateMany({type:"DataBase"},{$set:{name:"MySql"}})?














//SECOND METHOD FOR CREATING STUDENT
/*app.post("/students", (req, res) => {

    console.log(req.body);
    const user = new Student(req.body);
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e);
    })
});*/
