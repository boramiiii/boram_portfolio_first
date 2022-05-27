// API ==  AIzaSyD8CO3HqgmKUUwhHdahg0c9Xpw7_AR1Q7M 

// playList  == PLfHCKVPanu7x1hzDcpdUpTfmVgtspq_Ud


const key = "AIzaSyD8CO3HqgmKUUwhHdahg0c9Xpw7_AR1Q7M ";
const playlistId = "PLfHCKVPanu7x1hzDcpdUpTfmVgtspq_Ud";
const num = 10;

const vid_list = document.querySelector(".vid_list");

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;


fetch(url)
.then(data=>{
    return data.json();
})
.then(json=>{
    let items = json.items;
    console.log(items)

    let result = '';
    items.map(item=>{

        let title = item.snippet.title;
        let desc = item.snippet.description;

        let date = item.snippet.publishedAt;
        date = date.split('T');
        date = date[0];
        
        if(title.length > 20){
            title = title.substr(0, 20)+"...";
        }

        if(desc.length > 120){
            desc = desc.substr(0,120)+"...";
        }
        
            result+=`<article>
                    <a href="#" data-vid="${item.snippet.resourceId.videoId}" class="pic">
                        <img src=${item.snippet.thumbnails.high.url}>
                    </a>
                    <div class="con">
                        <h2>${title}</h2>
                        <p>${desc}</p>
                        <span>${date}</span>
                    </div>
                </article>`;
        
            vid_list.innerHTML = result;
    })

});
const videoOpen = document.querySelector(".v_btn"); 
const aside = document.querySelector(".view_video"); 
const _top = aside.querySelector(".top");
const _right = aside.querySelector(".right");
const _bottom = aside.querySelector(".bottom");
const _left = aside.querySelector(".left");
const _inner = aside.querySelector(".inner_video");
const bgColor = document.querySelector(".video_bg");
let vidCon = aside.querySelector(".contentVid");

vid_list.addEventListener("click",(e)=>{
    e.preventDefault();

    vidCon.innerHTML='';

    //a태그 클릭한게 아니라면 return
    if(!e.target.closest("a")){
        return;
    }

    aside.style.display = 'block';
    bgColor.style.display = 'block';

    const vidId = e.target.parentElement.getAttribute("data-vid");
    
    vidCon.innerHTML += `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${vidId}" frameborder="0" allowfullscreen></iframe>`;
    
    new Anime(_top,{
        prop:"width", 
        value:"100%", 
        duration : 500, 
        callback:()=>{
            new Anime(_right,{
                prop:"height", 
                value:"100%", 
                duration : 500, 
                callback:()=>{
                    new Anime(_bottom,{
                        prop:"width", 
                        value:"100%", 
                        duration : 500, 
                        callback:()=>{
                            new Anime(_left,{
                                prop:"height", 
                                value:"100%", 
                                duration : 500, 
                                callback:()=>{
                                    new Anime(_inner,{
                                        prop:"opacity", 
                                        value:1, 
                                        duration : 500,
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
    closeBtn = aside.querySelector(".btnClose");
});

const btnClose = document.querySelector(".btnClose");

btnClose.addEventListener("click", (e)=>{
    e.preventDefault();

    new Anime(_inner,{
        prop:"opacity",
        value:0,
        duration:500,
        callback:()=>{
            new Anime(_top,{
                prop:"width",
                value:"0%",
                duration:500
            });
            new Anime(_right,{
                prop:"height",
                value:"0%",
                duration:500
            });
            new Anime(_bottom,{
                prop:"width",
                value:"0%",
                duration:500
            });
            new Anime(_left,{
                prop:"height",
                value:"0%",
                duration:500,
                callback:()=>{
                    aside.style.display = 'none';
                    bgColor.style.display = 'none';
                    vidCon.innerHTML='';
                }
            });
        }
    })
    

})
