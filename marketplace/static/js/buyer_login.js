// Card 3D Hover Effect

const card =
document.querySelector(".login-card");

document.addEventListener("mousemove",(e)=>{

    let x =
    (window.innerWidth / 2 - e.clientX) / 35;

    let y =
    (window.innerHeight / 2 - e.clientY) / 35;

    card.style.transform =
    `rotateY(${x}deg) rotateX(${-y}deg)`;

});

document.addEventListener("mouseleave",()=>{

    card.style.transform =
    "rotateY(0deg) rotateX(0deg)";

});


// Login Button Effect

const btn =
document.querySelector("button");

btn.addEventListener("click",()=>{

    btn.innerHTML =
    "Logging In...";

});


// Input Glow

const inputs =
document.querySelectorAll("input");

inputs.forEach(input=>{

    input.addEventListener("focus",()=>{

        input.style.boxShadow =
        "0 0 20px #7CFC00";

    });

    input.addEventListener("blur",()=>{

        input.style.boxShadow =
        "none";

    });

});