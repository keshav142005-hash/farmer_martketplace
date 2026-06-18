// Page Fade

document.body.style.opacity="0";

window.onload=()=>{

document.body.style.transition=
"1s";

document.body.style.opacity="1";

};


// Reveal Animation

const elements =
document.querySelectorAll(
"h3,p,img,a"
);

elements.forEach((el,index)=>{

el.style.opacity="0";

el.style.transform=
"translateY(50px)";

setTimeout(()=>{

el.style.transition=
"0.8s";

el.style.opacity="1";

el.style.transform=
"translateY(0)";

},index*80);

});


// Image Glow Effect

document.querySelectorAll("img")
.forEach(img=>{

img.addEventListener(
"mouseenter",
()=>{

img.style.filter=
"brightness(110%)";
});

img.addEventListener(
"mouseleave",
()=>{

img.style.filter=
"brightness(100%)";
});

});


// Floating Title

const title =
document.querySelector("h1");

let i = 0;

setInterval(()=>{

i += 0.05;

title.style.transform =
`translateY(${Math.sin(i)*6}px)`;

},30);