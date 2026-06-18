// Page Fade

document.body.style.opacity="0";

window.onload=()=>{

document.body.style.transition="1s";

document.body.style.opacity="1";

};


// Crop Card Reveal

const cards =
document.querySelectorAll("body > div");

const observer =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform=
"translateY(0)";

}

});

});

cards.forEach(card=>{

card.style.opacity="0";

card.style.transform=
"translateY(80px)";

card.style.transition=
"0.8s";

observer.observe(card);

});


// 3D Hover Effect

cards.forEach(card=>{

card.addEventListener(
"mousemove",
(e)=>{

const x =
(e.offsetX/card.offsetWidth-0.5)*15;

const y =
(e.offsetY/card.offsetHeight-0.5)*15;

card.style.transform=
`rotateY(${x}deg)
 rotateX(${-y}deg)
 scale(1.02)`;

});

card.addEventListener(
"mouseleave",
()=>{

card.style.transform=
"rotateY(0) rotateX(0)";

});

});


// Search Input Glow

const inputs =
document.querySelectorAll("input");

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

const buttons =
document.querySelectorAll("button");

setInterval(()=>{

buttons.forEach(btn=>{

btn.style.transform=
"scale(1.05)";

setTimeout(()=>{

btn.style.transform=
"scale(1)";

},700);

});

},3000);