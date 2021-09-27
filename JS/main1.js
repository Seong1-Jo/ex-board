const preview = document.querySelector("h1"); //미리보기
const main_form = document.querySelector("#main_form"); //메인form
const w_title = document.querySelector("#w_title");// 제목
const w_main = document.querySelector("#w_main"); //본문
const saved = document.querySelector("#main_form saved"); //저장

const fixed = document.querySelector("#fix_form");//수정버튼위한form

const TODOS_KEY = "todos";
let toDos = []; //localstorage로 이용하여 저장하기위한 Array

// const list_link = "listlink"; //링크대신쓸변수

const title_list = document.querySelector("#title_list");//임시제목리스트보여주기

const HIDE = "listHide"; //ul에 class이름부여하기위한 변수만들기
const btnHIDE = "btnHide"; //저장버튼 class이름부여

function mainTo(dd) {//보여주기 버튼 눌렀을때 나오는 화면보여주기위한 함수, dd는 우리가 클릭했을때 필요한이벤트, 나중에 console.log(dd)해서 확인하면 path에서 부모랑 관련된걸볼수있고 클릭target이 무엇인지를 체크할수 있다.
    const li = dd.target.parentElement;
    preview.innerText = li.name;//일단 대충이해감
}


function saveToDos() { //저장하기위한함수
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //string으로 만들어준다
}


function fixTo(check) { //수정할것을 불러오기 위한 함수 
    const li = check.target;
    console.dir(li.id);
    w_title.value = li.parentElement.id;
    w_main.value = li.parentElement.name;
    
    title_list.classList.add(HIDE); //ul class에 이름부여
    main_form.classList.add(btnHIDE); //button부모의 form에 class추가

    const fixBtn = document.createElement("button"); //수정버튼생성
    fixBtn.innerText = "수정";  
    fixed.appendChild(fixBtn);



    // fixBtn.addEventListener('click', fixIng);

    
    // !! console.dir(check.target.parentElement.innerText); //dir로 확인하면 자세하게 객체가보여주는데, 여기서 parentNode를 확인해보면 부모가누구인지 알려준다. target까지하면 target까지 알수있다 거기에 parentElement를 하면 부모가 누구인지 알수있다!!
}


function drawTo(event){ 
    const listMake = document.createElement("li"); //li생성
    listMake.name = event.main; //부모elementli에 객체안에 랜덤으로 만든 id를 넣어준다
    listMake.id = event.title; //li에 아이디를 넣어준다
    const span = document.createElement("a"); //span생성
    span.innerText = event.title; //여기title은 인자를 객체를 가져왔기때문
    
    const button = document.createElement("button");
    button.innerText = '내용보기';
    button.addEventListener('click', mainTo);

    const fixBtn = document.createElement("button"); //수정버튼만들기
    fixBtn.innerText = '수정하기' ;
    fixBtn.addEventListener('click', fixTo);
    
    listMake.appendChild(span); //li자식으로span을 설정
    listMake.appendChild(button); 
    listMake.appendChild(fixBtn);

     //set을 주어서 갈링크를 준다.
    // span.classList.add(list_link); //span에 class를 추가하여 포인트주기
    title_list.appendChild(listMake); //ul(listMake)자식으로 li설정
    // span.addEventListener('click', mainTo(event2));


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
        const newTodoObj = { //객체로만듬
            title:titleV, 
            main:mainV,
            id: Date.now()
        };
        toDos.push(newTodoObj); //화면에 나오기전에 푸시를 먼저,push를 array가아닌 object로 주기위해
        drawTo(newTodoObj); //일반 text가 아닌 객체를 준다
        saveToDos(); //저장함수 실행
    }
    
}




main_form.addEventListener("click", enterText); //form의 이벤트리스너


// function foreachToDos(item) { //forEach에 전할 함수
    
// }


const savedToDos = localStorage.getItem(TODOS_KEY);   //localstorge값들을 변수로 준다

if(savedToDos !== null) { //아무것도 없으면 null이 담겨져있기때문에 조건을준다
    const parsedToDos = JSON.parse(savedToDos);//이역할은 set에서 string으로 저장한값들을 다시 배열로 주는
    toDos = parsedToDos; //이것은 새로운값을 저장해도 기존의남아있는 localstorage전에있던것을 복원하기위해
    parsedToDos.forEach(drawTo); //저장되어있는 Array에 각키값들에게 함수를 주는
} 

