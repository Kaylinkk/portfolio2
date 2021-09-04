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
