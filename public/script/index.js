console.log("hello");
let clss1=document.getElementsByClassName('clss1')
let iddd1=document.getElementById('iddd1');
let signin=document.getElementById('signin');
let carousel=document.getElementsByClassName('carousel');
var crsl=document.getElementById('crsl');
var carouselExampleControls=document.getElementById('carouselExampleControls');
let sginn=document.getElementById('sginn');
let signup=document.getElementById('signup');
let sign_up=document.getElementById('Sign_up');
const newDiv=document.getElementsByClassName('newDiv')
signin.addEventListener('click',(event)=>{
    // toggling the class hide
    // iddd1.classList.add('hide');
    sginn.classList.remove('hide');

    sign_up.classList.add('hide');
    newDiv.classList.add('hide');
    // clss1.classList.add('hide');
    // console.log(clss1)
    // clscrsl.style.display='none';
    // clss1.classList.add('hide');
    // carousel.style.display="none";
    // carouselExampleControls.style.display='none';
    // carousel.classList.add('hide');
    // carouselExampleControls.classList.toggle('hide');
    // carouselExampleControls.style.display='none';
    // signup.classList.add('hide');
})

signup.addEventListener('click',(event)=>{
    console.log(2);
    // toggling the class hide
    // sginn.classList.toggle('hide');
    // iddd1.classList.add('hide');
    sign_up.classList.remove('hide');
    // carousel.classList.add('hide');
    sginn.classList.add('hide');
    newDiv.classList.add('hide');
    // clss1.classList.add('hide');
    // clss1.style.display=none;
    // console.log(clss1);
})
iddd1.addEventListener('hover',(event1)=>{
    console.log("clicked crousel part")
})