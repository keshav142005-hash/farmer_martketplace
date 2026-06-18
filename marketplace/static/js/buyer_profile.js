// Fade In Animation

document.body.style.opacity = "0";

window.onload = ()=>{

    document.body.style.transition =
    "1s";

    document.body.style.opacity =
    "1";
};


// Mouse Move Image Effect

const image =
document.querySelector("img");

document.addEventListener(
"mousemove",
(e)=>{

const x =
(window.innerWidth/2 - e.clientX)/40;

const y =
(window.innerHeight/2 - e.clientY)/40;

image.style.transform =
`rotateY(${x}deg)
 rotateX(${-y}deg)`;

});


// Card Reveal

const cards =
document.querySelectorAll(
"h2,p"
);

cards.forEach((card,index)=>{

card.style.opacity="0";

card.style.transform=
"translateY(40px)";

setTimeout(()=>{

card.style.transition=
".8s";

card.style.opacity="1";

card.style.transform=
"translateY(0)";

},index*200);

});