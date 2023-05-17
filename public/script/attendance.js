
console.log("inside attendance");
require("../../source/db/conn");
const Student=require("../../source/models/student");


let show=document.getElementById("show");
show.addEventListener('click',async (event)=>{
    console.log("hahahaha");
    let obj=await Student.find();
    console.log(obj);
})
