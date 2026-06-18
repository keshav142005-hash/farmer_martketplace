// Page Fade

document.body.style.opacity="0";

window.onload=()=>{

document.body.style.transition=
"1s";

document.body.style.opacity=
"1";

};


// Input Animation

const fields =
document.querySelectorAll(
"input,textarea,select"
);

fields.forEach(field=>{

field.addEventListener(
"focus",
()=>{

field.style.transform=
"scale(1.02)";

});

field.addEventListener(
"blur",
()=>{

field.style.transform=
"scale(1)";

});

});


// Button Pulse

const button =
document.querySelector("button");

setInterval(()=>{

button.style.boxShadow=
"0 0 25px #22c55e";

setTimeout(()=>{

button.style.boxShadow=
"none";

},1000);

},2500);


// Form Tilt Effect

const form =
document.querySelector("form");

document.addEventListener(
"mousemove",
(e)=>{

const x =
(window.innerWidth/2 - e.clientX)/50;

const y =
(window.innerHeight/2 - e.clientY)/50;

form.style.transform =
`rotateY(${x}deg)
 rotateX(${-y}deg)`;

});