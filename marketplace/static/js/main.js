// Navbar Scroll Effect

window.addEventListener('scroll',()=>{

    const navbar =
    document.querySelector('.navbar');

    if(window.scrollY > 50){

        navbar.style.boxShadow =
        "0 5px 20px rgba(0,0,0,0.3)";

    }

    else{

        navbar.style.boxShadow =
        "none";

    }

});