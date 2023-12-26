

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







//Projects
const categories= document.querySelector(".categories");
const projects = document.querySelectorAll('.project');
const projectContainer =document.querySelector('.work__projects')

categories.addEventListener('click',(event)=>{
    const filter = event.target.dataset.filter;
    if(filter == null){
        return ;
    }

handleActiveSelection(event.target);
filterProjects(filter);
    
});


function handleActiveSelection(target){
    
       const active = document.querySelector('.category__selected');
       active.classList.remove('category__selected');
       target.classList.add('category__selected');
   
   
}

function filterProjects(filter){
    projectContainer.classList.add('anime-out');
    projects.forEach(project=>{
        if(filter == 'all' || filter === project.dataset.type){
            project.style.display='block';
        } else{
            project.style.display='none';
        }
    });
    setTimeout(()=>{
        projects.forEach((project)=>{
            if(filter === 'all' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        })
        projectContainer.classList.remove('anime-out');
    },250)
};






// const sectionIds = [
//     "#home",
//     "#about",
//     "#skills",
//     '#work',
//     "#contact"
// ];

// const sections = sectionIds.map(id =>document.querySelector(id));
// const navItems = sectionIds.map(id =>document.querySelector(`[data-link="${id}"]`));


// let selectedNavIndex = 0;
// let selectedNavItem = navItems[0];
// function selectNavItem(selected){
//     selectedNavItem.classList.remove('active');
//     selectedNavItem =selected;
//     selectedNavItem.classList.add('active');
// }

// function handleScrollToView(selector){
//     const scrollTo = document.querySelector(selector);
//     scrollTo.scrollIntoView({behavior:'smooth'});
//     selectNavItem(navItems[sectionIds.indexOf(selector)]);
// }

// const observerOptions = {
//     root:null, 
//     rootMargin:"0px", 
//     threshold:0.3
// };

// const observerCallback =(entries, observer) => {
//     entries.forEach(entry =>{
//         if(!entry.isIntersecting && entry.intersectionRatio >0 ){
           
//             const index = sectionIds.indexOf(`#${entry.target.id}`);
           
//             //스크롤링이 아래로 되어서 페이지가 올라옴
//             if(entry.boundingClientRect.y <0){
//                 selectedNavIndex = index + 1;
//             }else{
//                 selectedNavIndex = index - 1;
//             }
            
//         }
//     });
// };
// const observer = new IntersectionObserver(observerCallback,observerOptions);
// sections.forEach(section =>observer.observe(section));

// window.addEventListener("wheel", ()=>{
//     if(window.scrollY === 0){
//         selectedNavIndex = 0;
//     }else if (window.scrollY + window.innerHeight ===document.body.clientHeight){
//         selectedNavIndex =navItems.length - 1;
//     }
//     selectNavItem(navItems[selectedNavIndex]);
// })




//스킬바 만들기 + 뷰포트에 스킬화면이 보일 경우에 checkSkills함수 이벤트 실행

function checkSkills() {
    const skillSections = document.querySelectorAll('.skill__section');
  
    skillSections.forEach(skillSection => {
      const skillSectionPosition = skillSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
  
      if (
        //windowHeight / 1.5 는 뷰포트를 의미
        skillSectionPosition.top <= windowHeight / 1.5 &&
        skillSectionPosition.bottom >= 0
      ) {
        const progressBar = skillSection.querySelector('.skill__progress');
        const targetWidth = skillSection.getAttribute('data-percent');
  
        progressBar.style.width = targetWidth;
        skillSection.style.opacity = '1';
        skillSection.style.visibility = 'visible';
      } else {
        const progressBar = skillSection.querySelector('.skill__progress');
        progressBar.style.width = '0';
      }
    });
  }
  
  window.addEventListener('scroll', checkSkills);
  window.addEventListener('DOMContentLoaded', checkSkills);


//모달창 만들기

const svgWrapper = document.querySelectorAll('.svg__wrapper');
svgWrapper.forEach((wrapper)=>{
    wrapper.addEventListener('click', ()=>{
        const modalId = wrapper.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.classList.add('active');

        const closeModal = modal.querySelector('.close');
        closeModal.addEventListener('click', ()=>{
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (event)=>{
            if(event.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
});




// circular 언어 프로그레스 바 만들기

const progText = document.querySelectorAll('.progText');
const progress = document.querySelectorAll('.progress');
const progContainer= document.querySelector('.language__container');
let bol = false;

window.addEventListener("scroll", ()=>{
    if(scrollY> progContainer.offsetTop -600 && bol === false){
        
        for(let i = 0; i< progText.length; i++){
            progText[i].innerText = 0;
            count = 0;

            progress[i].style.bottom ="83%";

            progress[i].style.bottom = progText[i].dataset.count - 100 + "%";

            function updateCount(){
                target = parseInt(progText[i].dataset.count);
                
                if(count < target){
                    count++;
                    progText[i].innerText = count;
                    setTimeout(updateCount, 50);

                }else {
                    progText[i].innerText=target + "%";
                }
            }
            updateCount();
            bol = true;

        }


    }
    
});

