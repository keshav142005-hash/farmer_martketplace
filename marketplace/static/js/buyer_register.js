// Form Animation

const inputs =
document.querySelectorAll(
"input,select,textarea"
);

inputs.forEach(input=>{

    input.addEventListener("focus",()=>{

        input.style.transform =
        "scale(1.02)";

    });

    input.addEventListener("blur",()=>{

        input.style.transform =
        "scale(1)";

    });

});


// Button Loading Effect

const btn =
document.querySelector("button");

btn.addEventListener("click",()=>{

    btn.innerHTML =
    "Creating Account...";

});


// Mouse Move Glass Effect

const form =
document.querySelector("form");

document.addEventListener("mousemove",(e)=>{

    let x =
    (window.innerWidth/2 - e.clientX)/50;

    let y =
    (window.innerHeight/2 - e.clientY)/50;

    form.style.transform =
    `rotateY(${x}deg)
     rotateX(${-y}deg)`;

});

document.addEventListener("mouseleave",()=>{

    form.style.transform =
    "rotateY(0deg) rotateX(0deg)";

});