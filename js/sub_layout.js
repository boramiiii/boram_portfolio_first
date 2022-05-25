const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");
console.log(btnCall);

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