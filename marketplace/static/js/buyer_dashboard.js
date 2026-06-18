// Reveal Animation

const cards =
document.querySelectorAll(
'.stat-card,.analytics-card,.notification-card,.graph-card,.feedback-card,.support-card'
);

function revealCards(){

cards.forEach(card=>{

const top =
card.getBoundingClientRect().top;

if(top < window.innerHeight - 100){

card.style.opacity='1';

card.style.transform=
'translateY(0)';
}

});

}

cards.forEach(card=>{

card.style.opacity='0';

card.style.transform=
'translateY(80px)';

card.style.transition=
'all 0.8s ease';

});

window.addEventListener(
'scroll',
revealCards
);

revealCards();


// Counter Animation

const counters =
document.querySelectorAll(
'.stat-card span'
);

counters.forEach(counter=>{

const target =
parseInt(counter.innerText) || 0;

let count = 0;

const update = ()=>{

if(count < target){

count += Math.ceil(target/40);

counter.innerText = count;

setTimeout(update,40);

}

else{

counter.innerText = target;

}

};

update();

});


// Sidebar Hover Sound Style

const links =
document.querySelectorAll('.sidebar a');

links.forEach(link=>{

link.addEventListener('mouseenter',()=>{

link.style.letterSpacing='1px';

});

link.addEventListener('mouseleave',()=>{

link.style.letterSpacing='0';

});

});


// Graph Floating Effect

document.querySelectorAll('img')
.forEach(img=>{

img.addEventListener('mousemove',()=>{

img.style.transform=
'scale(1.05) rotate(1deg)';

});

img.addEventListener('mouseleave',()=>{

img.style.transform=
'scale(1)';

});

});