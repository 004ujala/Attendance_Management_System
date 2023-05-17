const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/attendance-data')
.then(()=>{
    console.log("established connection for students");
}).catch((err)=>{
    console.log("did not establish connection for students")
});