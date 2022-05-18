var swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

//스크롤시 메뉴위로
const navbar = document.querySelector('#header');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => { 
    // console.log(window.scrollY);
    // console.log(navbarHeight);

    if(window.scrollY > navbarHeight){
        navbar.classList.add('header_dark');
        console.log("add!!!!!!");
    } else {
        navbar.classList.remove('header_dark');
        console.log("remove!!!!!!");
    }
});

//모바읾메뉴 나오게
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

btnCall.onclick = (e)=>{
    e.preventDefault(); 

    btnCall.classList.toggle('on'); 
    menuMo.classList.toggle('on'); 
}

//현재진행중 전시 슬라이드
const slide = document.querySelector(".slideWrap");
const panel = slide.querySelector(".panel");
const article = panel.querySelectorAll("article");
const prev = document.querySelector(".btns .prev");
const next = document.querySelector(".btns .next");
const speed = 400; 
const len = article.length; 
let enableClick = true;

init(); 

next.addEventListener("click", e=>{
    e.preventDefault(); 

    if(enableClick){
        enableClick = false; 
        nextSlide();
    }
}); 

prev.addEventListener("click", e=>{
    e.preventDefault(); 
    if(enableClick){
        enableClick = false; 
        prevSlide(); 
    }
}); 


function nextSlide(){
    new Anime(panel, {
        prop:"left", 
        value:"-80%", 
        duration: speed, 
        callback:()=>{
            panel.append(panel.firstElementChild); 
            panel.style.left = "-40%"; 
            enableClick = true; 
        }
    })
}

function prevSlide(){
    new Anime(panel, {
        prop:"left", 
        value:"0%", 
        duration:speed, 
        callback:()=>{
            panel.prepend(panel.lastElementChild);
            panel.style.left = "-40%"; 
            enableClick = true; 
        }
    })
}

function init(){
    panel.style.left = "-40%";    
    // panel.style.width = `${40 * len}%`; 
    panel.prepend(panel.lastElementChild);
    // lis.forEach((article)=>article.style.width = `${100 / len}%`)
}



//선그어지는 효과 - 박스 - inner 보이게 처리

const videoOpen = document.querySelector(".v_btn"); 
const main = document.querySelector("#gallery");
const aside = document.querySelector("aside"); 
const _top = aside.querySelector(".top");
const _right = aside.querySelector(".right");
const _bottom = aside.querySelector(".bottom");
const _left = aside.querySelector(".left");
const _inner = aside.querySelector(".inner_video");
const bgColor = main.querySelector(".video_bg");


videoOpen.addEventListener("click", (e)=>{
    e.preventDefault();
    aside.style.display = 'block';
    bgColor.style.display = 'block';

    new Anime(_top,{
        prop:"width", 
        value:"100%", 
        duration : speed, 
        callback:()=>{
            new Anime(_right,{
                prop:"height", 
                value:"100%", 
                duration : speed, 
                callback:()=>{
                    new Anime(_bottom,{
                        prop:"width", 
                        value:"100%", 
                        duration : speed, 
                        callback:()=>{
                            new Anime(_left,{
                                prop:"height", 
                                value:"100%", 
                                duration : speed, 
                                callback:()=>{
                                    new Anime(bgColor,{
                                        prop:"opacity", 
                                        value:0.6, 
                                        duration : speed
                                    });
                                    new Anime(_inner,{
                                        prop:"opacity", 
                                        value:1, 
                                        duration : speed
                                    });
                                } 
                            })
                        } 
                    })
                } 
            })
        } 
    })
})


const btnClose = document.querySelector(".btnClose");

btnClose.addEventListener("click", (e)=>{
    e.preventDefault();

    new Anime(_inner,{
        prop:"opacity",
        value:0,
        duration:speed,
        callback:()=>{
            new Anime(_top,{
                prop:"width",
                value:"0%",
                duration:speed
            });
            new Anime(_right,{
                prop:"height",
                value:"0%",
                duration:speed
            });
            new Anime(_bottom,{
                prop:"width",
                value:"0%",
                duration:speed
            });
            new Anime(_left,{
                prop:"height",
                value:"0%",
                duration:speed,
                callback:()=>{
                    aside.style.display = 'none';
                    bgColor.style.display = 'none';
                }
            });
        }
    })
    

})




