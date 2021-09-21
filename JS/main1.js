const preview = document.querySelector("h1"); //미리보기
const main_form = document.querySelector("#main_form"); //메인form
const w_title = document.querySelector("#w_title");// 제목
const w_main = document.querySelector("#w_main"); //본문
const saved = document.querySelector("#main_form saved");

const title_list = document.querySelector("#title_list");//임시제목리스트보여주기


function drawTo(event){ 
    const listMake = document.createElement("li"); //li생성
    const span = document.createElement("span"); //span생성
    listMake.appendChild(span); //li자식으로span을 설정
    span.innerText = event;
    title_list.appendChild(listMake); //ul(listMake)자식으로 li설정
}


function enterText(event){
    event.preventDefault();
    const titleV = w_title.value;
    const mainV = w_main.value;
    if((titleV && mainV) === ""){ //논리연산자 단축평가
        alert("내용을 입력해주세요");
    } else { //title과 main에 값이 있으면, title을값을 바탕화면으로보낸다
        w_title.value = "";
        w_main.value = "";
        drawTo(titleV);
    }
    
}



main_form.addEventListener("click", enterText); //form의 이벤트리스너




