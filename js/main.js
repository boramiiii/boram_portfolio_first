var swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        
    },
});

//스크롤시 메뉴백그라운드 생기게
const navbar = document.querySelector('#header');
const navbarHeight = navbar.getBoundingClientRect().height;

const scroll_nav = document.querySelector(".scroll_nav");


document.addEventListener('scroll', () => { 
    // console.log(window.scrollY);
    // console.log(navbarHeight);

    if(window.scrollY > navbarHeight){
        navbar.classList.add('header_dark');
        scroll_nav.style.display = 'block';
        // scroll_nav.style.opacity = 1;

    } else {
        navbar.classList.remove('header_dark');
        scroll_nav.style.display = 'none';
        scroll_nav.style.opacity = 0;
    }
});







const sections = document.querySelectorAll("section");
const navBtns = scroll_nav.querySelectorAll("li");
const navBtns_arr = Array.from(navBtns); 

let posArr = null;
let base = -120; 

setPos(); 


navBtns.forEach((li, index)=>{
    li.addEventListener("click", e=>{
        let isOn = e.currentTarget.classList.contains("on"); 
        if(isOn) return;
        
        if(enableClick){
            enableClick = false; 
            moveScroll(index); 
        }
    })
})

window.addEventListener("scroll", e=>{
    let scroll = window.scrollY||window.pageYOffset;
    // console.log("scroll-----");
    // console.log(scroll);

    activation(scroll);

    if(window.scrollY > 700 + base){
        
        new Anime(scroll_nav,{
            prop:"opacity",
            value: 1,
            duration: 300
        })
    }
    
})

const mainScrollBtn = document.querySelector(".mainScrollBtn");
mainScrollBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    moveScroll(0);
})



function activation(scroll){
    sections.forEach((el,index)=>{
        el.classList.remove("on");
    //스크롤값이 각 섹션의 세로 위치값보다 크거나 같다면
        index = index - 1;

        if(scroll >= posArr[index] + base){
            //모든 버튼을 비활성화하고  
            for(const el of navBtns){
                el.classList.remove("on"); 
                el.classList.remove("onInfo"); 
            } 
            //해당 순번의 li만 활성화 
            navBtns[index].classList.add("on"); 
        }

        if(scroll >= posArr[2] + base && scroll < posArr[3]){
            for(const el of navBtns){
                el.classList.remove("onInfo"); 
                el.classList.add("onInfo"); 
            } 
            
        }
    })
}

function moveScroll(index){
    new Anime(window,{
        prop:"scroll", 
        value: posArr[index], 
        duration:500, 
        callback :()=>{
            enableClick = true; 
        }
    });
}


function setPos(){
    posArr = [816, 1541, 2337, 3094, 4032, 0]; 
    
}

window.addEventListener("resize", ()=>{
    setPos(); 
    //resize시 버튼과 섹션 매칭이 안되는 문제 
    //현재 활성화 버튼의 순번구하기 
    //브라우저를 활성화섹션의 위치로 고정해서 이동 
    const active = scroll_nav.querySelector("li.on"); 
    const active_index = navBtns_arr.indexOf(active); 
    //console.log(active_index); 
    window.scroll(0, posArr[active_index]); 

})




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
const aside = document.querySelector(".view_video"); 
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


    let vidCon = aside.querySelector(".contentVid");

    vidCon.innerHTML = `
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/moFhpQQwjpM" frameborder="0" allowfullscreen></iframe>`;
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
                                        duration : speed,
                                        callback:()=>{
                                            
                                        }
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





//팝업생성 & 쿠키제어
const popup = document.querySelector("#popup"); 
const popClose = popup.querySelector(".popClose"); 
const btnDel = document.querySelector(".del"); 
const btnView = document.querySelector(".view"); 

const isCookie = document.cookie.indexOf("today=done"); 
console.log(isCookie); 


btnView.addEventListener("click", e=>{
    e.preventDefault(); 
    console.log(document.cookie); 
}); 


btnDel.addEventListener("click", e=>{
    e.preventDefault(); 
    //생성된 쿠키의 time값을 0으로 설정해서 현재시간으로 만료시간 덮어쓰기 
    setCookie("today", "done", 0);
});

//쿠키가 없다면 
if(isCookie == -1){
    console.log("쿠키없음"); 
    popup.style.display = "block"

    //쿠키가 있다면
}else{
    console.log("쿠키있음")
    popup.style.display = "none"; 
}

popClose.addEventListener("click", e=>{
    e.preventDefault(); 

    //만약 체크박스에 체크가 되어있으면- 쿠키생성  
    let isChecked = popup.querySelector("input[type=checkbox]").checked; 
    if(isChecked) setCookie("today", "done", 1);
    popup.style.display = "none"; 
    
});

function setCookie(cookieName, cookieValue, time){
    const today = new Date(); 
    const date = today.getDate(); 
    today.setDate(date+ time); 

    const duedate = today.toGMTString(); 

    document.cookie=`${cookieName}=${cookieValue}; path="/"; expires=${duedate}`;  

}


//gnb tab 이동
const gnb_lis = document.querySelectorAll(".menuWeb #gnb >li"); 
let gnb_third = gnb_lis[3];

gnb_lis.forEach(li=>{
    li.addEventListener("focusin",(e)=>{
        const dropDown = e.currentTarget.querySelector("ul");
        if(dropDown){
            // let ulDrop = document.querySelector(".dropdown");
            // let dep2 = ulDrop.querySelector("li");
            // ulDrop.style.opacity = 1;
            // ulDrop.style.visibility = "visible";
            // ulDrop.style.width = "100%";
            // ulDrop.style.left = 0;
            // dep2.style.width = "100%";
            dropDown.classList.add("on");
        }
        
        
        li.querySelector("a").classList.add("on");
    });

    li.addEventListener("focusout",(e)=>{
        const dropDown = e.currentTarget.querySelector("ul");
        // e.currentTarget.closest(".sub").style.display = "none";
        li.querySelector("a").classList.remove("on");
        dropDown.classList.remove("on");
    });

});
const skipNavi = document.querySelectorAll("#skipNavi li a"); 

for(let el of skipNavi){
    el.addEventListener("focusin", e=>{
        el.classList.add("on"); 
    });

    el.addEventListener("focusout", e=>{
        el.classList.remove("on"); 
    })
}