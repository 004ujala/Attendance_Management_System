console.log("logout");
let logout=document.getElementById('logout');
logout.addEventListener('click',(event)=>{
    console.log(window.location.href);
    console.log(window.location.origin);
    window.location.href=window.location.origin;
})