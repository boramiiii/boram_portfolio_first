const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");
const btnGoTop = document.querySelector(".arrow_up");
console.log(btnCall);
setPos(); 
btnCall.onclick = (e)=>{
    e.preventDefault(); 

    btnCall.classList.toggle('on'); 
    menuMo.classList.toggle('on'); 
}

const navbar = document.querySelector('#header_sub');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => { 
    // console.log(window.scrollY);
    // console.log(navbarHeight);
    if(window.scrollY > navbarHeight){
        navbar.classList.add('header_dark');
    } else {
        navbar.classList.remove('header_dark');
    }
});


window.onresize = start;

let bWidth = '';

function start(){
    bWidth = document.documentElement.clientWidth;
}

window.addEventListener("scroll", e=>{
    let scroll = window.scrollY||window.pageYOffset;
    start();

    if(bWidth < 1179){
        btnGoTop.classList.add("visible");
    }else{
        btnGoTop.classList.remove("visible");
    }
})

btnGoTop.addEventListener("click",e=>{
    e.preventDefault();

    moveScroll(0);
})


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
    posArr = [0, 10]; 
    
}