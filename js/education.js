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