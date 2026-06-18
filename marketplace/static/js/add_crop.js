// Page Fade

document.body.style.opacity="0";

window.onload=()=>{

document.body.style.transition="1s";

document.body.style.opacity="1";

};


// Form Reveal

const form =
document.querySelector("form");

form.style.opacity="0";
form.style.transform="translateY(60px)";

setTimeout(()=>{

form.style.transition="1s";

form.style.opacity="1";

form.style.transform="translateY(0)";

},300);


// 3D Mouse Effect

document.addEventListener(
"mousemove",
(e)=>{

const x =
(window.innerWidth/2-e.clientX)/50;

const y =
(window.innerHeight/2-e.clientY)/50;

form.style.transform=
`rotateY(${x}deg)
 rotateX(${-y}deg)`;

});


// Input Glow

const inputs =
document.querySelectorAll(
"input,textarea,select"
);

inputs.forEach(input=>{

input.addEventListener(
"focus",
()=>{

input.style.boxShadow=
"0 0 25px #7CFC00";

});

input.addEventListener(
"blur",
()=>{

input.style.boxShadow=
"none";

});

});


// Button Pulse

const button =
document.querySelector("button");

setInterval(()=>{

button.style.transform=
"scale(1.05)";

setTimeout(()=>{

button.style.transform=
"scale(1)";

},700);

},2500);


// Field Animation

const fields =
document.querySelectorAll("form p");

fields.forEach((field,index)=>{

field.style.opacity="0";

field.style.transform=
"translateX(-30px)";

setTimeout(()=>{

field.style.transition="0.8s";

field.style.opacity="1";

field.style.transform=
"translateX(0)";

},index*120);

});