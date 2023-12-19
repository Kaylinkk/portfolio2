

//Make navbar transparent when it is on the top
//Header 에 페이지 아래로 스크롤 시에 다크 스타일 적용


const header = document.querySelector(".header");
const headerHeight = header.offsetHeight;

function handleScroll(){

    if(window.scrollY > headerHeight){
        header.classList.add('header--dark');
    }else{
        header.classList.remove('header--dark');
    }
    } 
    document.addEventListener("scroll", handleScroll);




    //Make home slowly fade to transparanet 
    //Home 섹션을 아래로 스크롤 시 투명하게 처리

const home = document.querySelector(".home__container");
const homeHeight = home.offsetHeight;
document.addEventListener('scroll', ()=>{
    home.style.opacity = 1 - window.scrollY /homeHeight;

})




//handle click on nav menu
//Navbar 토글버튼 클릭 처리

const navBarMenu = document.querySelector(".header__menu");
const navBarToggleBtn = document.querySelector(".header__toggle-btn");


//navbar 메뉴 클릭시 자동으로 닫음
navBarMenu.addEventListener("click",() =>{
    navBarMenu.classList.remove("open");
} )

//토글버튼 열고 닫기


 navBarToggleBtn.addEventListener("click",()=>{
    navBarMenu.classList.toggle('open');});




//handle click on "contact me"
const contactBtn = document.querySelector(".home__contact");
contactBtn.addEventListener("click", ()=> {
    handleScrollToView('#contact');
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




const sectionIds = [
    "#home",
    "#about",
    "#skills",
    '#work',
    "#contact"
];

const sections = sectionIds.map(id =>document.querySelector(id));
const navItems = sectionIds.map(id =>document.querySelector(`[data-link="${id}"]`));


let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem =selected;
    selectedNavItem.classList.add('active');
}

function handleScrollToView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root:null, 
    rootMargin:"0px", 
    threshold:0.3
};

const observerCallback =(entries, observer) => {
    entries.forEach(entry =>{
        if(!entry.isIntersecting && entry.intersectionRatio >0 ){
           
            const index = sectionIds.indexOf(`#${entry.target.id}`);
           
            //스크롤링이 아래로 되어서 페이지가 올라옴
            if(entry.boundingClientRect.y <0){
                selectedNavIndex = index + 1;
            }else{
                selectedNavIndex = index - 1;
            }
            
        }
    });
};
const observer = new IntersectionObserver(observerCallback,observerOptions);
sections.forEach(section =>observer.observe(section));

window.addEventListener("wheel", ()=>{
    if(window.scrollY === 0){
        selectedNavIndex = 0;
    }else if (window.scrollY + window.innerHeight ===document.body.clientHeight){
        selectedNavIndex =navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
})