
const mongoose = require("mongoose");

// CREATE A CONNECTION BETWEEN DATABASE OND MONGOOSE

mongoose.connect("mongodb://localhost:27017/students_api", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then(() => {
    console.log("connection is successful");
}).catch(() => {
    console.log("no connection");
})

