// Page Fade Animation

document.body.style.opacity = "0";

window.onload = ()=>{

document.body.style.transition =
"1s";

document.body.style.opacity =
"1";

};


// Scroll Reveal

const cards =
document.querySelectorAll(
".order-card"
);

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


// Mouse 3D Effect

cards.forEach(card=>{

card.addEventListener(
"mousemove",
(e)=>{

const x =
(e.offsetX/card.offsetWidth-0.5)*20;

const y =
(e.offsetY/card.offsetHeight-0.5)*20;

card.style.transform=
`rotateY(${x}deg)
 rotateX(${-y}deg)
 scale(1.03)`;

});

card.addEventListener(
"mouseleave",
()=>{

card.style.transform=
"rotateY(0) rotateX(0)";

});

});


// Button Pulse

const buttons =
document.querySelectorAll(
".accept-btn,.reject-btn"
);

setInterval(()=>{

buttons.forEach(btn=>{

btn.style.transform=
"scale(1.05)";

setTimeout(()=>{

btn.style.transform=
"scale(1)";

},800);

});

},3000);