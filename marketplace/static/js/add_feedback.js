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

form.style.transform=
"translateY(60px)";

setTimeout(()=>{

form.style.transition="1s";

form.style.opacity="1";

form.style.transform=
"translateY(0)";

},300);


// 3D Mouse Effect

document.addEventListener(
"mousemove",
(e)=>{

const x=
(window.innerWidth/2-e.clientX)/60;

const y=
(window.innerHeight/2-e.clientY)/60;

form.style.transform=
`rotateY(${x}deg)
 rotateX(${-y}deg)`;

});


// Input Animation

const fields=
document.querySelectorAll(
"input,textarea,select"
);

fields.forEach(field=>{

field.addEventListener(
"focus",
()=>{

field.style.boxShadow=
"0 0 25px #FFD700";

});

field.addEventListener(
"blur",
()=>{

field.style.boxShadow=
"none";

});

});


// Button Pulse

const btn=
document.querySelector("button");

setInterval(()=>{

btn.style.transform=
"scale(1.05)";

setTimeout(()=>{

btn.style.transform=
"scale(1)";

},700);

},2500);


// Reveal Fields

const formFields=
document.querySelectorAll("form p");

formFields.forEach((field,index)=>{

field.style.opacity="0";

field.style.transform=
"translateX(-30px)";

setTimeout(()=>{

field.style.transition=
"0.8s";

field.style.opacity="1";

field.style.transform=
"translateX(0)";

},index*150);

});