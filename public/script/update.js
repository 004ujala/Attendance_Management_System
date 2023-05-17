console.log("update file");
import  arr from "./data";
require("../../source/db/conn");
const student=require("../../source/models/student");

console.log("outside")
async function updateValue(arr){
    for(let i=0;i<arr.length;i++){
console.log("inside arr")

        const email=arr[i];
        try{
            const std=await student.findOne({email:email});
            const val=await std.count;
            const _id=await std._id;
            const updateStudent= await student.findByIdAndUpdate({_id:_id},{
                count:val+1
            }) 
        }catch(e){
            console.log("error in updating");
        }
    }
}
updateValue();


