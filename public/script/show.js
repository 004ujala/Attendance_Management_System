console.log("showing students data")
const url="http://localhost:8000/data"
var count=1;

let tbldata=document.getElementById("tbldata");
function insertData(dataa,len){
    for(let i=0;i<len;i++){
        let str=`
            <tr>
            <td>${count++}</td>
            <td>${dataa[i].ad_no}</td>
            <td>${dataa[i].name}</td>
            <td>${dataa[i].mb_nmbr}</td>
            <td>${dataa[i].email}</td>
            <td>${Math.round((dataa[i].count*100)/dataa[i].t_count)}%</td>
            </tr>
        `
        tbldata.innerHTML+=str;
    }
}

async function fetchData(){
    const response = await fetch(url);
    const dataa=await response.json();
    console.log(dataa.length);
    let len=dataa.length;
    insertData(dataa,len);
}
fetchData();