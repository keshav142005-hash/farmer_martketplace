// Scroll Reveal Animation

const reveals = document.querySelectorAll(
'.card,.about'
);

window.addEventListener('scroll', revealElements);

function revealElements(){

    reveals.forEach(element=>{

        const top =
        element.getBoundingClientRect().top;

        const visible = 150;

        if(top < window.innerHeight - visible){

            element.classList.add('active');

        }

    });

}

// Add Reveal Class

reveals.forEach(item=>{

    item.classList.add('reveal');

});

// Hero Parallax

window.addEventListener('scroll',()=>{

    const scroll =
    window.pageYOffset;

    document.querySelector('.hero')
    .style.backgroundPositionY =
    scroll * 0.5 + 'px';

});

// Button Hover Sound Effect Style

const buttons =
document.querySelectorAll('.btn,.btn-outline');

buttons.forEach(btn=>{

    btn.addEventListener('mouseenter',()=>{

        btn.style.transition='0.3s';

    });

});