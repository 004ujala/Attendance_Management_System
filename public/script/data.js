var arr = [];
var f = 0;
function total_fun() {
    console.log("hello data");
    f = 1;
    const url = "http://localhost:8000/data";
    var count = 1;

    const idd = document.getElementById('hlo');
    function insertData(dataa, len) {
        for (let i = 0; i < len; i++) {
            let str = `
            <tr>
            <td>${count++}</td>
            <td>${dataa[i].name}</td>
            <td>${dataa[i].ad_no}</td>
            <td><button type="button" class="btn btn-outline-danger btn-sm" id=${dataa[i].email} onclick="doTask(id)" >A</button></td>
            </tr> `
            idd.innerHTML += str;
        }
    }
    async function fetchData() {
        const response = await fetch(url);
        const dataa = await response.json();
        console.log(dataa.length);
        let len = dataa.length;
        insertData(dataa, len);
    }
    fetchData();
}
// working on onclick
function doTask(id) {
    console.log(id);
    document.getElementById(id).style.display = "none"
    arr.push(id);
}
if (f == 0) {
    total_fun();
}

var getDevices = async (urll, options) => {
    let response = await fetch(urll, options);
    let data = await response.json();
    // if (response.status !== 200) console.log("error occurred");
    // console.log("hello data");
    return data;
}
let smt = document.getElementById('asmt');

smt.addEventListener('click', (event) => {

    // console.log()
    console.log(arr);
    event.preventDefault();
    const urll = "http://localhost:8000/update";
    let options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "total_id": arr
        })
    }

    fetch(urll, options)
        .then(response =>
            window.location.pathname = "/home"
            // response.json()
        )
    // .then(response => console.log(response));




    //     fetch(urll,options)
    //   .then(response => {
    //     //handle response            
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then(data => {
    //     //handle data
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     //handle error
    //   });
    // let data=getDevices(urll,options);
    // console.log(dt);  
})




