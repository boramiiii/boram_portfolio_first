// API ----  81b2f445aad649a087ba3c1435fed50f
//secret 7af097c6786785eb
//https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

//flickr.interestingness.getList
// flickr.photos.search

//사진경로 --- https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg


//버디아이콘
// 대표이미지 http://farm{icon-farm}.staticflickr.com/{icon-server}/buddyicons/{nsid}.jpg
// https://www.flickr.com/images/buddyicon.gif

//195706456@N03


const frame = document.querySelector("#list"); 

const loading = document.querySelector(".loading");

const key = "81b2f445aad649a087ba3c1435fed50f";
const base = "https://www.flickr.com/services/rest/?";
const method_interest = "flickr.interestingness.getList";
const method_search = "flickr.photos.search";

const per_page = 50; 
const url = `${base}method=${method_interest}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`; 

const btnSearch = document.querySelector(".btn_search");
const input = document.querySelector("#search");

// const url = `${base}method=${method_search}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=museum&`; 

const user_name = "195706456@N03";


//내가ㅣ올린사진
const method_3 = "flickr.people.getPhotos";
const url_3 = `${base}method=${method_3}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&user_id=${user_name}`; 


//내ㅔ가 만든 앨범
const gallery = "72157720771376765";
const method_4 = "flickr.galleries.getPhotos";
const url_4 = `${base}method=${method_4}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&user_id=${user_name}&gallery_id=${gallery}`; 

callData(url_4);

//callData(url);

btnSearch.addEventListener("click", e=>{
    let tag = input.value.trim(); 

    //if(!tag) return; //검색어 입력없이 버튼 클릭시 아래 코드를 실행하지 않고 중지 

    if(tag){
        //경고문구 있는 경우 지우고 데이터 호출 
        const errMsgs = input.parentElement.querySelectorAll("p"); 
        if(errMsgs.length >0) errMsgs[0].remove(); 

        const url = `${base}method=${method_search}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;
    
        callData(url);

    //입력한 검색어가 없을 경우 경고문구 생성
    }else{
        //전에 호출했던 데이터 지우기 
        frame.innerHTML =""; 
        frame.style.height = "auto"; 

        const errMsgs = input.parentElement.querySelectorAll("p"); 
        if(errMsgs.length >0) errMsgs[0].remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append("검색어를 입력해주세요"); 
        input.parentElement.append(errMsg); 
    }   
});


input.addEventListener("keyup", e=>{
    if(e.key === "Enter"){
        let tag = input.value.trim(); //검색어문자열앞뒤의 공백제거
        console.log(tag)
        //if(!tag) return; //검색어 입력없이 버튼 클릭시 아래 코드를 실행하지 않고 중지 

        if(tag){
            //경고문구 있는 경우 지우고 데이터 호출 
            const errMsgs = input.parentElement.querySelectorAll("p"); 
            if(errMsgs.length >0) errMsgs[0].remove(); 

            const url = `${base}method=${method_search}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;
        
            callData(url);           

        //입력한 검색어가 없을 경우 경고문구 생성
        }else{
            frame.innerHTML = ""; 
            frame.style.height = "auto"; 

            const errMsgs = input.parentElement.querySelectorAll("p"); 
            if(errMsgs.length >0) errMsgs[0].remove(); 

            //검색어 존재 안할경우 이미지 보여줄래
            const errMsg = document.createElement("p"); 
            errMsg.append("검색어를 입력해주세요"); 
            input.parentElement.append(errMsg); 
        }
    }
})



frame.addEventListener("click", e=>{
    e.preventDefault(); 

    let target = e.target.parentElement.querySelector("img"); 
    
    if(e.target == target){
        let imgSrc = target.parentElement.getAttribute("href"); 

        let pop = document.createElement("aside"); 
        pop.classList.add("pop"); 
        let pops = `
                    <div class="con">
                        <img src=${imgSrc}/>
                    </div>
                    <span class="close"><img src="img/close.png"></span>
        `; 
        pop.innerHTML = pops; 
        document.body.append(pop); 
        document.body.style.overflow = "hidden"; 
    }

}); 

document.body.addEventListener("click", e=>{
    let pop = document.querySelector(".pop"); 

    if(pop){
        const close = pop.querySelector("span img"); 

        if(e.target == close){
            pop.remove(); 
            document.body.style.overflow = "auto"; 
        }
    }
})

function callData(url){

    loading.classList.remove("off");
    frame.classList.remove("on");

    fetch(url)
    .then(data=>{
        return data.json(); 
    })
    .then(json=>{
        let items = json.photos.photo; 
        console.log(items); 

        if(items.length >0){
            //동적으로 태그 생성 
            createList(items); 
            //이미지로딩완료후 isotope플러그인 적용 ㄴ
            imgLoaded(); 
            // document.body.classList.remove("msgWrap");
        }else{
            //검색한 이미지 없을경우 이미지 없다는 이미지 넣어주기
            console.log("검색하신 검색어의 이미지가 없습니다"); 

            let msgs = `
                        <div class="errorMsg">
                            <h3>
                                <i class="fas fa-exclamation-circle"></i>
                            </h3>
                            <p>검색하신 검색어의 이미지가 없습니다</p>
                        </div>
                        
            `; 
            

            frame.classList.remove("on");
            frame.style.opacity = 1;
            loading.classList.add("off"); 
            frame.innerHTML = msgs;
            // frame.append(errMsg); 
            frame.style.height = "auto"; 
        }

    }); 
}
function imgLoaded(){
    const thumb = document.querySelectorAll(".pic img"); 
    const len = thumb.length; 
    let count = 0; 
    
    thumb.forEach(img =>{
        //이미지가 하나씩 로딩이 완료될때마다 count값 1씩 증가 
        img.onload =()=>{
            count++; 
            //모든 thumb이미지가 로딩되면 isotope 적용 
            if(count == len ) isoLayout(); 
        }
        //썸네일 이미지 엑박시 대체이미지로 변경  
        img.onerror=()=>{
            img.setAttribute("src", "img/default.jpg");
        }
    }); 

    //버디아이콘 엑박시 대체이미지로 변경 
    const buddies = document.querySelectorAll(".profile img"); 
    buddies.forEach(buddy=>{
        buddy.onerror=()=>{
        buddy.setAttribute("src", "https://www.flickr.com/images/buddyicon.gif");
            
        }
    })
}
function createList(items){
    let htmls = '';
    items.forEach(item=>{

        let imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;

        let imgBig = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`;

        htmls += `
                <li class="item">
                    <div>
                        <a href="${imgBig}" class="pic">
                            <img src="${imgBig}">
                        </a>
                    </div>
                </li>
                `
    });

    frame.innerHTML = htmls;
}

function delayload(){
    const imgs = frame.querySelectorAll("img");
    const len = imgs.length;
    let count = 0;

    const thumbs = document.querySelectorAll(".pic img");
    const buddys = document.querySelectorAll(".profile img");
    

    for(let el of imgs){
        el.onload =()=>{
            count++

            if(count === len){
                isolayout();
            }
        }
        
        //이미지 없을때 대체이미지 설정
        thumbs.forEach(img=>{
            img.onerror=()=>{
                img.setAttribute("src", "img/info_bg.jpg");
            }
        })
    
        // //프로필 대체이미지
        // buddys.forEach(buddy=>{
        //     buddy.onerror=()=>{
        //         buddy.setAttribute("src", "https://www.flickr.com/images/buddyicon.gif");
        //     }
        // })

    }
}

function isoLayout(){
    new Isotope("#list",{
        itemSelector:".item",
        columnWidth:".item",
        trasitionDutation : "0.8s"
    });
    loading.classList.add("off");
    frame.classList.add("on");
}