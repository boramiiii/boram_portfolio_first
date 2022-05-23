

const form = document.querySelector("#member"); 
const btnSubmit = form.querySelector("input[type=submit]"); 

btnSubmit.addEventListener("click", e=>{
    
    if(!isTxt("name", 1)) e.preventDefault();
    if(!isTxt("id", 5)) e.preventDefault();
    if(!isPwd("pwd1", "pwd2", 5)) e.preventDefault();
    if(!isEmail("email", 5)) e.preventDefault();  
    if(!isSelect("memYear","memMonth", "memDay")) e.preventDefault(); 
    if(!isSelectTxt("memCTel1","memCTel2", "memCTel3", 3)) e.preventDefault(); 
    if(!isCheck("gender")) e.preventDefault(); 
    if(!isCheck("news")) e.preventDefault(); 
    if(!isAgreeCheck("agree1", "terms1")) e.preventDefault();
    if(!isAgreeCheck2("agree2", "disagree", "terms2")) e.preventDefault();

}); 

function checkOnlyOne(element) {

    const checkboxes = document.getElementsByName("agree2");

    checkboxes.forEach((cb) => {
        cb.checked = false;
    })

    element.checked = true;
}

// 동의 함수
function isAgreeCheck(name, terms){
    let inputs = form.querySelector(`[name=${name}]`); 
    let isChecked = false; 

    let txtArea = form.querySelector(`[name=${terms}]`); 

    let agreement = form.querySelector(".agreement");
    
    //agree check 확인
    if(inputs.checked == true){
        isChecked = true; 
        txtArea.value = 'agree'; 
    }

    console.log(isChecked);

    if(isChecked){
        txtVal.empty();

        const errMsgs = agreement.querySelectorAll("p"); 
        if(errMsgs.length >0) agreement.querySelector("p").remove();

        txtArea.value = 'agree'; 
        return true; 

    }else{
        const errMsgs = agreement.querySelectorAll("p"); 
        if(errMsgs.length >0) agreement.querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append("이용약관에 동의하셔야 합니다."); 
        agreement.append(errMsg); 

        return false; 
    }
}
function isAgreeCheck2(name1, name2, terms2){
    let agree = form.querySelector(`[name=${name1}]`); 
    let disagree = form.querySelector(`[id=${name2}]`); 
    let isChecked = false; 

    let agreement = form.querySelector(".disagreement");

    let txtArea = form.querySelector(`[name=${terms2}]`); 

    
    //하나라도 check 확인
    if(agree.checked || disagree.checked){
        isChecked = true;  
        txtArea.value = 'agree'; 
    }

    if(isChecked){
        // txtVal.empty();
        const errMsgs = agreement.querySelectorAll("p"); 
        if(errMsgs.length >0) agreement.querySelector("p").remove(); 
        txtArea.value = 'agree'; 

        return true; 
    }else{
        const errMsgs = agreement.querySelectorAll("p"); 
        if(errMsgs.length >0) agreement.querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append("항목을 체크해주세요."); 
        agreement.append(errMsg); 

        return false; 
    }
}


// 텍스트 인증 함수 
function isTxt(name, len){
    let input = form.querySelector(`[name=${name}]`); 
    let txt = input.value; 
    
    if(txt.length >=len){
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0 ) input.closest("td").querySelector("p").remove(); 

        return true; 
    }else{
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0) input.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 

        if(name === "id"){
            errMsg.append(`아이디는 ${len}글자 이상 입력하셔야 합니다.`); 
        }else{
            errMsg.append(`이름을 입력해주세요`); 
        }


        
        input.closest("td").append(errMsg);

        return false; 
    }
}


//비밀번호 인증
function isPwd(name1, name2, len){
    let pwd1 = form.querySelector(`[name=${name1}]`);
    let pwd2 = form.querySelector(`[name=${name2}]`);

    let pwd1_val = pwd1.value;
    let pwd2_val = pwd2.value;

    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const spc = /[~!@#$%^&*()_+]/;

    if(pwd1_val === pwd2_val && pwd1_val.length > len && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val)){
        const errMsgs = pwd1.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) pwd1.closest("td").querySelector("p").remove(); 

        return true;
    }else{
        const errMsgs = pwd1.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) pwd1.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append(`비밀번호는 ${len}글자 이상, 숫자, 특수문자 포함 동일하게 입력하세요`);
        pwd1.closest("td").append(errMsg);

        return false;
    }
}

// 이메일 인증 함수 
function isEmail(name, len){
    let input = form.querySelector(`[name=${name}]`); 
    let txt = input.value; 

    if(txt.length > len && /@/.test(txt) ){
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) input.closest("td").querySelector("p").remove(); 

        return true; 
    }else{
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) input.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append(`이메일 주소를 ${len}글자 이상 '@'를 포함하여 입력해 주세요.`); 
        input.closest("td").append(errMsg); 
        
        return false; 
    }
}

//연락처 함수
function isSelectTxt(name1, name2, name3, len){
    let sel = form.querySelector(`[name=${name1}]`); 
    let sel_index = sel.options.selectedIndex; 
    let val = sel[sel_index].value; 

    let input1 = form.querySelector(`[name=${name2}]`);
    let txt1 = input1.value;  
    let input2 = form.querySelector(`[name=${name3}]`);
    let txt2 = input2.value;  

    let phone = form.querySelector(".phoneNumber");

    if(val !== "" && txt1.length > len && txt2.length > len){
        const errMsgs = phone.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) phone.closest("td").querySelector("p").remove(); 

        return true; 
    }else{
        const errMsgs = phone.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) phone.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append(`연락처를 양식에 맞게 입력해주세요`); 
        phone.closest("td").append(errMsg); 
        
        return false; 
    }
}

//셀렉트박스 함수
function isSelect(name1, name2, name3){
    let sel1 = form.querySelector(`[name=${name1}]`); 
    let sel2 = form.querySelector(`[name=${name2}]`); 
    let sel3 = form.querySelector(`[name=${name3}]`); 
    let sel_index1 = sel1.options.selectedIndex; 
    let sel_index2 = sel2.options.selectedIndex; 
    let sel_index3 = sel3.options.selectedIndex; 

    let val1 = sel1[sel_index1].value; 
    let val2 = sel2[sel_index2].value; 
    let val3 = sel3[sel_index3].value; 

    let hypen = form.querySelector(".hyphen");
    
    if(val1 !=="" && val2 !=="" && val3 !==""){
        const errMsgs = hypen.closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0) hypen.closest("td").querySelector("p").remove();

        return true; 
    }else{
        const errMsgs = hypen.closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0) hypen.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append("항목을 선택해 주세요."); 
        hypen.closest("td").append(errMsg); 
        return false; 
    }
}

// 체크박스 인증 함수 
function isCheck(name){
    let inputs = form.querySelectorAll(`[name=${name}]`); 
    let isChecked = false; 

    //input의 갯수만큼 반복을 돌면서
    for(let el of inputs){
        //하나라도 체크되어 있다면 true를 반환  
        if(el.checked) isChecked = true;  
    }

    if(isChecked){
        const errMsgs = inputs[0].closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0) inputs[0].closest("td").querySelector("p").remove(); 

        return true; 
    }else{
        const errMsgs = inputs[0].closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0) inputs[0].closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 

        if(name === "news"){
            errMsg.append("항목을 하나라도 체크해주세요."); 
        }else{
            errMsg.append("항목을 체크해 주세요."); 
        }
        inputs[0].closest("td").append(errMsg); 

        return false; 
    }
}