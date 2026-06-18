// Page Fade

document.body.style.opacity="0";

window.onload=()=>{

document.body.style.transition="1s";

document.body.style.opacity="1";

};


// 3D Card Effect

const card =
document.querySelector(".register-card");

document.addEventListener(
"mousemove",
(e)=>{

const x =
(window.innerWidth/2-e.clientX)/45;

const y =
(window.innerHeight/2-e.clientY)/45;

card.style.transform=
`rotateY(${x}deg)
 rotateX(${-y}deg)`;

});


// Input Animation

const inputs =
document.querySelectorAll(
"input,textarea,select"
);

inputs.forEach(input=>{

input.addEventListener(
"focus",
()=>{

input.style.transform=
"scale(1.02)";

});

input.addEventListener(
"blur",
()=>{

input.style.transform=
"scale(1)";

});

});


// Button Glow

const button =
document.querySelector("button");

setInterval(()=>{

button.style.boxShadow=
"0 0 30px #22c55e";

setTimeout(()=>{

button.style.boxShadow=
"none";

},1000);

},2500);


// Reveal Fields

const fields =
document.querySelectorAll(
".register-card p"
);

fields.forEach((field,index)=>{

field.style.opacity="0";

field.style.transform=
"translateY(30px)";

setTimeout(()=>{

field.style.transition=
"0.8s";

field.style.opacity="1";

field.style.transform=
"translateY(0)";

},index*150);

});