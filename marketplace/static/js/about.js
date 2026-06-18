// Counter Animation

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute('data-target');

        const count = +counter.innerText;

        const increment = target / 100;

        if(count < target){

            counter.innerText = Math.ceil(count + increment);

            setTimeout(updateCounter, 20);

        }else{

            counter.innerText = target;

        }

    };

    updateCounter();

});

// Scroll Animation

const cards = document.querySelectorAll(
'.feature-card,.about-card,.stat-box'
);

window.addEventListener('scroll',()=>{

    cards.forEach(card=>{

        const cardTop = card.getBoundingClientRect().top;

        if(cardTop < window.innerHeight - 100){

            card.style.opacity="1";
            card.style.transform="translateY(0)";
        }

    });

});

cards.forEach(card=>{

    card.style.opacity="0";
    card.style.transform="translateY(100px)";
    card.style.transition="all 1s ease";

});