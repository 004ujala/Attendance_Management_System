const mongoose=require("mongoose");
const validator=require("validator");
// create schema
const studentSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    fname:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email")
            }
        }
    },
    mb_nmbr:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    dor:{
        type:Date,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    ad_no:{
        type:String,
        required:true,
        minlength:12,
        maxlength:12,
        unique:[true,"aadhar number should be unique"]
    },
    t_count:{
        type:Number,
        default:0
    },
    count:{
        type:Number,
        default:0
    }
})


// creating collection
const  Student =new mongoose.model("Student",studentSchema);

// exporting created collection
module.exports=Student;