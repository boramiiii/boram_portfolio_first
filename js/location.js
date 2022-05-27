var mapContainer = document.getElementById('map');   
const branch_btns = document.querySelectorAll(".branch li"); 
const contents = document.querySelectorAll(".conWrap article");

var mapOption = {
    center: new kakao.maps.LatLng(37.57855540814129, 126.98008665570575), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};
var map = new kakao.maps.Map(mapContainer, mapOption);

let drag = true; //드래그 가능 
let zoom = true; //확대축소 가능 


let markerOptions = [{
        title: "국립현대미술관 서울",
        latlng: new kakao.maps.LatLng(37.57855540814129, 126.98008665570575),
        imgSrc: "img/marker1.png",
        imgSize:new kakao.maps.Size(232, 99),
        // imgPos: {
        //     offset: new kakao.maps.Point(64, 64)
        // },
        button: branch_btns[0]
    },
    {
        title: "국립현대미술관 과천",
        latlng: new kakao.maps.LatLng(37.43142121092785, 127.02005508065317),
        imgSrc: "img/marker2.png",
        imgSize:new kakao.maps.Size(232, 99),
        // imgPos: {
        //     offset: new kakao.maps.Point(64, 64)
        // },
        button: branch_btns[1]
    },
    {
        title: "국립현대미술관 청주",
        latlng: new kakao.maps.LatLng(36.65574198827506, 127.49007028069387),
        imgSrc: "img/marker3.png",
        imgSize:new kakao.maps.Size(232, 99),
        // imgPos: {
        //     offset: new kakao.maps.Point(64, 64)
        // },
        button: branch_btns[2]
    }
];

for(let i=0; i<markerOptions.length; i++){
    var marker = new kakao.maps.Marker({
        map: map, 
        position: markerOptions[i].latlng,  
        title : markerOptions[i].title,  
        image : new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)  
    });

    //branch 버튼 클릭시 지도이동 
    markerOptions[i].button.addEventListener("click", e=>{
        e.preventDefault(); 
        for(let branch of branch_btns){
            branch.classList.remove("on"); 
        }
        for(let content of contents){
            content.classList.remove("on");
        }
        markerOptions[i].button.classList.add("on"); 
        moveTo(markerOptions[i].latlng)

        contents[i].classList.add("on");
    })
}


window.addEventListener("resize",()=>{    
    let active = document.querySelector(".branch li.on"); 
    

    const branch = Array.from(branch_btns); //유사배열을 배열로 변환 
    // let active_index = branch.indexOf(active); //배열로 변환후 indexOf로 순번구하기 

    let active_index = active.getAttribute("data-index");

    map.setCenter(markerOptions[active_index].latlng);
}); 

//지도 컨트롤 보이기 
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

//zoom 컨트롤 보이기 
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//지도 이동 함수 
setDraggable(drag); 
function setDraggable(draggable) {
    map.setDraggable(draggable);    
}

//지도 축소 확대 함수 
setZoomable(zoom); 
function setZoomable(zoomable) {
    map.setZoomable(zoomable);    
} 

//지도이동함수 
function moveTo(target) {                
    var moveLatLon = target;    
    map.setCenter(moveLatLon);
}