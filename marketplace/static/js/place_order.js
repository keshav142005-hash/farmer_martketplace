// Page Fade Animation

document.body.style.opacity="0";

window.onload=()=>{

document.body.style.transition="1s";

document.body.style.opacity="1";

};


// Form Animation

const form =
document.querySelector("form");

document.addEventListener(
"mousemove",
(e)=>{

const x =
(window.innerWidth/2-e.clientX)/50;

const y =
(window.innerHeight/2-e.clientY)/50;

form.style.transform =
`rotateY(${x}deg)
 rotateX(${-y}deg)`;

});


// Input Glow

const input =
document.querySelector("input");

input.addEventListener(
"focus",
()=>{

input.style.boxShadow =
"0 0 25px #7CFC00";

});

input.addEventListener(
"blur",
()=>{

input.style.boxShadow =
"none";

});

// Removed stray closing parenthesis


// Button Pulse Effect

const button =
document.querySelector("button");

setInterval(()=>{

button.style.transform =
"scale(1.05)";

setTimeout(()=>{

button.style.transform =
"scale(1)";

},800);

},2500);


// Quantity Validation

form.addEventListener(
"submit",
(e)=>{

if(input.value <= 0){

alert(
"Please enter valid quantity"
);

e.preventDefault();

}

});