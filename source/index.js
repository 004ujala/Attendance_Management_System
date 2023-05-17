const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const hbs = require('hbs');
var csv=require('csvtojson');
const multer  = require('multer');
const excelToJson=require('convert-excel-to-json');

// const csv = require('csv-parser')
const fs = require('fs')

// establishing db and express connection
require("./db/conn");
// obtaining created collection of students
const Student = require("./models/student");
// obtaining created collection of staffs
const Staff = require("./models/staff");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 8000;
// console.log(path.join(__dirname,"../template/partials"))
const pb_path = path.join(__dirname, "../public");
const vw_path = path.join(__dirname, "../template/views");
const prtls_path = path.join(__dirname, "../template/partials");
// built in middleware to use the public folder
app.use(express.static(pb_path));
// setting hbs engine 
app.set("view engine", "hbs");
// setting the path to views folder
app.set("views", vw_path);
// registring the partials
hbs.registerPartials(prtls_path);
// rendering the different pages
app.get("/", (req, res) => {
    res.render("index");
})
app.get("/home", (req, res) => {
    res.render("home");
})
app.get("/display", (req, res) => {
    res.render("display");
})
app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/attendance", async (req, res) => {
    obj = await Student.find();
    console.log(obj[0]);
    console.log(obj.length);
    res.render("attendance");
})
app.get("/data", async (req, res) => {
    const obj = await Student.find();
    // console.log(obj);
    res.send(obj);
})
// staff registration
app.post("/tregister", async (req, res) => {
    try {
        const stff = new Staff({
            email: req.body.email,
            mb_nmbr: req.body.mb_nmbr,
            pswrd: req.body.pswrd,
            ad_no: req.body.ad_no
        })
        const save_std = await stff.save();
        // console.log(save_std);
        res.render("index");
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

})

// verification for redirecting to home page
app.post("/verify", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.pswrd;

        // if(password==="my1234"){
        console.log(req.body.mb_nmbr);
        let obj = await Staff.findOne({ email: email });
        // console.log(obj);
        if (obj) {
            if (obj.pswrd == password) {
                console.log(`${obj.pswrd} and ${password}`)
                res.status(201).render("home");
            } else {
                res.status(500).send("Invalid login credentials");
            }
        } else {
            res.status(500).send("Invalid login credentials");
        }

        // }else{
        //     res.send("Invalid login credentials")
        // }
    } catch (e) {
        console.log(e);
        res.status(400).send("Invalid login credentials")
    }
})

// global.__basedir=__dirname;

// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,__basedir+'/uploads/')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname+"-"+Date.now()+file.originalname)
//     }
// });
// const upload=multer({storage:storage});
// // csvtojson registration
// app.post("/uploadfile/",upload.single("uploadfile",(req,res)=>{
//     importExcelData2MongoDB(__basedir+'/uploads'+req.file.filename);
//     res.json({
//         'msg':'File uploaded/import successfully','file':req.file
//     })
// }))

// function importExcelData2MongoDB(filePath){
//     const excelData=excelToJson({
//         sourceFile:filePath,
//         sheets:[{
//             name:'Customers',
//             header:{
//                 rows:1
//             },
//             columnToKey:{
//                 A:'_id',
//                 B:'name',
//                 C:'address',
//             }
//         }]
//     });
//     console.log(excelData);
// }

app.post("/uploadfile",async (req,res)=>{
    console.log(req.body);
    res.render("home");
})






















app.post("/sregister", async (req, res) => {
    try {
        const std = new Student({
            name: req.body.name,
            fname: req.body.fname,
            email: req.body.email,
            mb_nmbr: req.body.mb_nmbr,
            dor: req.body.dor,
            dob: req.body.dob,
            ad_no: req.body.ad_no
        })
        const save_std = await std.save();
        // console.log(save_std);
        res.render("home");
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

})
// for db updation
async function updateValue(arr, res) {
    let tstd = await Student.find();
    let tcount = tstd.length;
    console.log(tstd[5].name);
    console.log(`count is ${tcount}`);
    for (let j = 0; j < tcount; j++) {
        try {
            let val = tstd[j].t_count;
            let _id = tstd[j]._id;
            let val2 = tstd[j].count;
            let updateStudent = await Student.findByIdAndUpdate({ _id: _id }, {
                t_count: val +1,
                count:val2+1
            })
            console.log(`${tstd[j].name} is updated properly`)
        } catch (e) {
            console.log(e);
        }
    }

    for (let i = 0; i < arr.length; i++) {

        let email = arr[i];
        try {
            let std = await Student.findOne({ email: email });
            let val = await std.count;
            let _id = await std._id;
            let updateStudent = await Student.findByIdAndUpdate({ _id: _id }, {
                count: val - 1
            })
        } catch (e) {
            console.log("error in updating");
        }
    }
    console.log("hello updated")
    res.redirect("home");
    return "1";
}
app.post("/update", async (req, res) => {
    try {
        let arr = await req.body.total_id;
        let x = await updateValue(arr, res);

        res.render("home");
        // return false;

    } catch (e) {
        console.log(e);
    }

})

// listening to this particular port
app.listen(port, () => {
    console.log(`listening on the port ${port}`);
})
