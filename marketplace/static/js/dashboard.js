// Page Animation

document.body.style.opacity="0";

window.onload=()=>{

document.body.style.transition="1s";

document.body.style.opacity="1";

};

// Scroll Reveal

const cards=document.querySelectorAll(
'.stat-card,.graph-card,.analytics-card,.weather-card,.order-item,.feedback-card'
);

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

cards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(50px)";

card.style.transition="0.8s";

observer.observe(card);

});

// Counter Animation

document.querySelectorAll('.stat-card span')
.forEach(counter=>{

let target=parseInt(counter.innerText)||0;

let count=0;

let speed=target/50;

const update=()=>{

if(count<target){

count+=speed;

counter.innerText=Math.floor(count);

requestAnimationFrame(update);

}
else{

counter.innerText=target;

}

};

update();

});

// Floating Heading

const heading=document.querySelector(".welcome-card h1");

let i=0;

setInterval(()=>{

i+=0.05;

heading.style.transform=
`translateY(${Math.sin(i)*5}px)`;

},30);