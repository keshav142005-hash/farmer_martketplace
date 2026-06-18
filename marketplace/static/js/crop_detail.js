// Page Fade

document.body.style.opacity="0";

window.onload=()=>{

    document.body.style.transition="1.2s";

    document.body.style.opacity="1";
};


// Reveal Animation

const cards =
document.querySelectorAll(
"p,div,img,h2,a"
);

cards.forEach((card,index)=>{

card.style.opacity="0";

card.style.transform=
"translateY(50px)";

setTimeout(()=>{

card.style.transition=
"0.8s";

card.style.opacity="1";

card.style.transform=
"translateY(0)";

},index*120);

});


// Image 3D Effect

const image =
document.querySelector("img");

if(image){

document.addEventListener(
"mousemove",
(e)=>{

const x =
(window.innerWidth/2 - e.clientX)/60;

const y =
(window.innerHeight/2 - e.clientY)/60;

image.style.transform =
`rotateY(${x}deg)
 rotateX(${-y}deg)`;

});

}


// Review Hover Glow

const reviews =
document.querySelectorAll("div");

reviews.forEach(review=>{

review.addEventListener(
"mouseenter",
()=>{

review.style.boxShadow=
"0 0 25px rgba(124,252,0,.5)";
});

review.addEventListener(
"mouseleave",
()=>{

review.style.boxShadow=
"none";
});

});