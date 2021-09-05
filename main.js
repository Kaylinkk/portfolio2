
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
    if(link == null){
        return;
    }
        navBarMenu.classList.remove("open")
        handleScrollToView(link);
    });

//Navbar toogle button for small screern
const navBarToggleBtn = document.querySelector(".navbar__toggle-btn");
navBarToggleBtn.addEventListener("click",()=>{
   navBarMenu.classList.toggle('open');
});



//handle click on "contact me"
const contactBtn = document.querySelector(".home__contact");
contactBtn.addEventListener("click", ()=> {
    handleScrollToView('#contact');
});


//Make home slowly fade to transparanet 

const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=> {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});



// when scrolling, it will show button "arrow up"

document.addEventListener("scroll",()=>{
    const arrowUp =document.querySelector(".arrow-up")
if(window.scrollY >homeHeight/2){
    arrowUp.classList.add("visible");
}else{
    arrowUp.classList.remove("visible");
}
//click -> up to home
arrowUp.addEventListener("click",()=>{
    handleScrollToView('#home');
});

});


//Projects
const workBtnContainer= document.querySelector(".work__categories");
const projectContainer= document.querySelector(".work__projects");
const projects =document.querySelectorAll(".project");
workBtnContainer.addEventListener("click",(event)=>{
    const filter = event.target.dataset.filter ||event.target.parentNode.dataset.filter;
    if(filter ==null){
        return;
    }

    //remove selection from the previous item and select the nav
    const active = document.querySelector(".category__btn.selected");
    active.classList.remove("selected");
    const target = event.target.nodeName === "BUTTON" ? event.target :event.target.parentNode;
   target.classList.add("selected");
    

    projectContainer.classList.add("anime-out");
   
setTimeout(()=>{
    projects.forEach((project)=>{
        
        if(filter === '*' || filter=== project.dataset.type){
            project.classList.remove('invisible');
        }else
        {
            project.classList.add('invisible');
    }
});
    projectContainer.classList.remove("anime-out");
},300);
});


function handleScrollToView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
}
