const main = document.querySelector(".contentWrap");
const btns = document.querySelectorAll(".btns li");
const contents = document.querySelectorAll(".contentWrap div");

let enableClick = true;
const delay = 1000;

btns.forEach((el,index)=>{
    el.addEventListener("click", (e)=>{
        e.preventDefault();

        let isOn =  e.currentTarget.classList.contains("on");
        if(isOn == true){
            return;
        }
        if(enableClick){
            enableClick = false;
            activation(btns, index);
            activation(contents, index);
        }

        new Anime(main, {
            prop:"height",
            value: matchHeight(index),
            duration:500
        })

    })
})

function activation(arr, index){
    for(const item of arr){
        item.classList.remove("on");
    }
    arr[index].classList.add("on");

    setTimeout(()=>{
        enableClick = true;
    },delay)
}

function matchHeight(index){
    let ht = '';
    ht = getComputedStyle(contents[index]).height;

    ht = parseInt(ht);

    return ht;
}