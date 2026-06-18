// Page Fade

document.body.style.opacity = "0";

window.onload = ()=>{

document.body.style.transition =
"1s";

document.body.style.opacity =
"1";

};


// Form Fields Animation

const fields =
document.querySelectorAll(
"input,textarea,select"
);

fields.forEach(field=>{

field.addEventListener(
"focus",
()=>{

field.style.transform =
"scale(1.02)";

});

field.addEventListener(
"blur",
()=>{

field.style.transform =
"scale(1)";

});

});


// Animated Button

const btn =
document.querySelector("button");

setInterval(()=>{

btn.style.boxShadow =
"0 0 25px #7CFC00";

setTimeout(()=>{

btn.style.boxShadow =
"none";

},1200);

},2500);


// 3D Form Movement

const form =
document.querySelector("form");

document.addEventListener(
"mousemove",
(e)=>{

const x =
(window.innerWidth/2 -
e.clientX)/60;

const y =
(window.innerHeight/2 -
e.clientY)/60;

form.style.transform =
`rotateY(${x}deg)
 rotateX(${-y}deg)`;

});