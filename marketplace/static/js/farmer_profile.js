// Page Fade Effect

document.body.style.opacity="0";

window.onload=()=>{

document.body.style.transition="1s";

document.body.style.opacity="1";

};


// Stats Animation

const stats=
document.querySelectorAll(
".profile-container h3"
);

stats.forEach((card,index)=>{

setTimeout(()=>{

card.style.transform=
"translateY(0)";

card.style.opacity="1";

},index*250);

});


// 3D Profile Image

const image=
document.querySelector(
".profile-container img"
);

image.addEventListener(
"mousemove",
()=>{

image.style.transform=
"scale(1.1) rotate(5deg)";

});

image.addEventListener(
"mouseleave",
()=>{

image.style.transform=
"scale(1) rotate(0deg)";

});


// Button Pulse

const buttons=
document.querySelectorAll(
".profile-container a"
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


// Profile Card Reveal

const profile=
document.querySelector(
".profile-container"
);

profile.style.opacity="0";

profile.style.transform=
"translateY(60px)";

setTimeout(()=>{

profile.style.transition=
"1s";

profile.style.opacity="1";

profile.style.transform=
"translateY(0)";

},300);