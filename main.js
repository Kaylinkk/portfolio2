'use strict'


const navBar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;



//Make navbar transparent when it is on the top
function handleScroll(){

if(window.scrollY > navbarHeight){
    navBar.classList.add('navbar--dark');
}else{
    navBar.classList.remove('navbar--dark');
}

}

document.addEventListener("scroll", handleScroll);

//handle click on nav menu

const navBarMenu = document.querySelector(".navbar__menu");
navBarMenu.addEventListener("click", (event)=>{
    
    const target = event.target;
    const link = target.dataset.link;
    if(link === null){
        return;
    }
        handleScrollToView(link);
} );


//handle click on "contact me"
const contactBtn = document.querySelector(".home__contact");
contactBtn.addEventListener("click", ()=> {
    handleScrollToView('#contact');
});


function handleScrollToView(selector){
   const scrollTo = document.querySelector(selector);
   scrollTo.scrollIntoView({behavior:'smooth'});
}