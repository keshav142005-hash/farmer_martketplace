// Page Fade

document.body.style.opacity = "0";

window.onload = ()=>{

    document.body.style.transition =
    "1s";

    document.body.style.opacity =
    "1";
};


// Input Glow Animation

const inputs =
document.querySelectorAll(
"input,textarea"
);

inputs.forEach(input=>{

input.addEventListener(
"focus",
()=>{

input.style.transform =
"scale(1.02)";
});

input.addEventListener(
"blur",
()=>{

input.style.transform =
"scale(1)";
});

});


// Button Ripple

const btn =
document.querySelector("button");

btn.addEventListener(
"mouseenter",
()=>{

btn.style.letterSpacing =
"2px";
});

btn.addEventListener(
"mouseleave",
()=>{

btn.style.letterSpacing =
"0";
});


// Floating Card Effect

const card =
document.querySelector(
".contact-container"
);

document.addEventListener(
"mousemove",
(e)=>{

const x =
(window.innerWidth/2 - e.clientX)/40;

const y =
(window.innerHeight/2 - e.clientY)/40;

card.style.transform =
`rotateY(${x}deg)
 rotateX(${-y}deg)`;

});