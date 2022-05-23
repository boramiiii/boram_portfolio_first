// const cursor = document.querySelector('#cursor');
// const cursorCircle = cursor.querySelector('.cursor__circle');
// const inner = document.querySelector(".inner");

// const mouse = {
//     x: -500,
//     y: -500
// }; // mouse pointer's coordinates
// const pos = {
//     x: 0,
//     y: 0
// }; // cursor's coordinates
// const speed = 0.1; // between 0 and 1

// const updateCoordinates = e => {
//     mouse.x = e.clientX;
//     mouse.y = e.clientY;
// }

// window.addEventListener('mousemove', updateCoordinates);


// function getAngle(diffX, diffY) {
//     return Math.atan2(diffY, diffX) * 180 / Math.PI;
// }

// function getSqueeze(diffX, diffY) {
//     const distance = Math.sqrt(
//         Math.pow(diffX, 2) + Math.pow(diffY, 2)
//     );
//     const maxSqueeze = 0.15;
//     const accelerator = 1500;
//     return Math.min(distance / accelerator, maxSqueeze);
// }


// const updateCursor = () => {
//     const diffX = Math.round(mouse.x - pos.x);
//     const diffY = Math.round(mouse.y - pos.y);

//     pos.x += diffX * speed;
//     pos.y += diffY * speed;

//     const angle = getAngle(diffX, diffY);
//     const squeeze = getSqueeze(diffX, diffY);

//     const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
//     const rotate = 'rotate(' + angle + 'deg)';
//     const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

//     cursor.style.transform = translate;
//     cursorCircle.style.transform = rotate + scale;
// };

// function loop() {
//     updateCursor();
//     requestAnimationFrame(loop);
// }

// requestAnimationFrame(loop);



// const cursorModifiers = document.querySelectorAll('[cursor-class]');

// cursorModifiers.forEach(curosrModifier => {
//     curosrModifier.addEventListener('mouseenter', function () {
//         const attribute = this.getAttribute('cursor-class');
//         cursor.classList.add(attribute);
//     });

//     curosrModifier.addEventListener('mouseleave', function () {
//         const attribute = this.getAttribute('cursor-class');
//         cursor.classList.remove(attribute);
//     });
// });





//////////////////////////////////////////////////////////////////////////////////////////////


const exhi = document.querySelector("#exhi");
const rolling = exhi.querySelector(".rolling"); 
const prev = document.querySelector(".prev"); 
const next = document.querySelector(".next"); 
let num = -320; 
let wid = 0; 
let timer = null; 
// let enableClick = true; 


createList("data.json");


setInterval(move,20);
timer = setInterval( move,20);

exhi.addEventListener("mouseenter", ()=>{
    console.log("들어옴")
    clearInterval(timer); 
});

exhi.addEventListener("mouseleave", ()=>{
    console.log("나감")
    timer = setInterval(move,20);
}); 




function createList(url){
    fetch(url)
    .then(data=>{ 
        return data.json();   
    })
    .then(json=>{   
    
        let items = json.imgSrc; 
    
        let tags =''; 
    
        items.forEach(item=>{
            tags+=`
                    <article class="swiper-slide">
                    <div class="pic"">
                        <img src=${item.pic} alt="서울전시-히토슈라이얼">
                    </div>
                    <div class="con">
                        <h2>
                            <span>${item.loca}</span>
                            ${item.name}
                        </h2>
                        <p>
                            ${item.date}
                        </p>
                    </div>
                </article>
            `; 
        }); 
    
        rolling.innerHTML = tags; 
    
        initList(); 
    });
}


function initList(){
    const article = rolling.querySelectorAll("article"); 
    const len = article.length; 
    wid = parseInt(getComputedStyle(article[0]).width);
    wid = wid + 20;
    rolling.style.width = len * wid +"px"; 
    rolling.style.marginLeft = -wid +"px";
    rolling.prepend(rolling.lastElementChild); 
}



function move(){
    if(num < -wid *2){
        num = -wid; 
        rolling.append(rolling.firstElementChild); 
    }else{
        num-=2; 
    }    
    rolling.style.marginLeft = num +"px"; 
}
