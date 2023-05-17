const mongoose=require("mongoose");
const validator=require("validator");
// create schema
const staffSchema= new mongoose.Schema({
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
    pswrd:{
        type:String,
        required:true,
        minlength:6
    },
    ad_no:{
        type:String,
        required:true,
        unique:true,
        minlength:12,
        maxlength:12
    }
})


// creating collection
const  Staff =new mongoose.model("Staff",staffSchema);

// exporting created collection
module.exports=Staff;