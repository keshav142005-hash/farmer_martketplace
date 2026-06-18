// Password Toggle

function togglePassword(){

    let password =
    document.getElementById("password");

    if(password.type === "password"){

        password.type = "text";

    }else{

        password.type = "password";
    }
}


// Page Fade

document.body.style.opacity = "0";

window.onload = ()=>{

    document.body.style.transition =
    "1s";

    document.body.style.opacity =
    "1";
};


// 3D Card Effect

const card =
document.querySelector(".login-card");

document.addEventListener(
"mousemove",
(e)=>{

const x =
(window.innerWidth/2 -
e.clientX)/40;

const y =
(window.innerHeight/2 -
e.clientY)/40;

card.style.transform =
`rotateY(${x}deg)
 rotateX(${-y}deg)`;

});


// Button Glow Pulse

const button =
document.querySelector("button");

setInterval(()=>{

button.style.boxShadow =
"0 0 25px #22c55e";

setTimeout(()=>{

button.style.boxShadow =
"none";

},1000);

},2500);


// Input Animation

const inputs =
document.querySelectorAll("input");

inputs.forEach(input=>{

input.addEventListener(
"focus",
()=>{

input.style.transform =
"scale(1.03)";

});

input.addEventListener(
"blur",
()=>{

input.style.transform =
"scale(1)";

});

});