const titleView = document.querySelector("#view h1"); //미리보기
const mainView = document.querySelector("#view p");
const viewParent = document.querySelector("#view");

const main_form = document.querySelector("#main_form"); //메인form
const w_title = document.querySelector("#w_title");// 제목
const w_main = document.querySelector("#w_main"); //본문
const saved = document.querySelector("#main_form saved"); //저장

const fixed = document.querySelector("#fix_form");//수정버튼위한form

const TODOS_KEY = "todos";
let toDos = []; //localstorage로 이용하여 저장하기위한 Array



// const list_link = "listlink"; //링크대신쓸변수

const title_list = document.querySelector("#title_list");//임시제목리스트보여주기
const button_list = document.querySelector("#button_list");

const HIDE = "listHide"; //ul에 class이름부여하기위한 변수만들기
const btnHIDE = "btnHide"; //저장버튼 class이름부여

function mainTo(dd) {//보여주기 버튼 눌렀을때 나오는 화면보여주기위한 함수, dd는 우리가 클릭했을때 필요한이벤트, 나중에 console.log(dd)해서 확인하면 path에서 부모랑 관련된걸볼수있고 클릭target이 무엇인지를 체크할수 있다.
    const li = dd.target.parentElement;
    // console.dir(li);
    titleView.innerText = li.textContent;
    mainView.innerText = li.name;

    
    const fixBtn = document.createElement("button"); //수정버튼생성
    fixBtn.innerText = "수정";  
    li.appendChild(fixBtn);

    title_list.classList.add(HIDE); //ul class에 이름부여
    
    main_form.classList.add(btnHIDE); //button부모의 form에 class추가

    fixBtn.addEventListener('click', fixIng);
    
}

function fixIng(event) { //수정버튼눌렀을때 수정이 일어나는 함수
    // event.preventDefault();

    
    const li = event.target.parentElement;
    // console.log(event.target);
    w_title.value = titleView.textContent;
    w_main.value = mainView.textContent;

    const fixSaved = document.createElement("button"); //수정저장하기버튼
    fixSaved.innerText = "수정저장하기";
    li.appendChild(fixSaved);

    const liDel = event.target;
    liDel.remove();
    fixSaved.addEventListener('click', fixCompleted);

}


function saveToDos() { //저장하기위한함수
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //string으로 만들어준다
}

function fixCompleted(event) { //수정완료함수
    event.preventDefault();//끝나면 삭제필요!
    const li = event.target.parentElement; //li를가르킨다

    li.firstChild.innerText = w_title.value;
    li.name = w_main.value;
    for(let i = 0; i < toDos.length; i++){ //toDos를 배열을 하나씩돌려서 같은아이디를 찾기위해
        if(toDos[i].id === parseInt(li.id)){
            
            toDos[i].title = li.firstChild.innerText;
            toDos[i].main = li.name;
        }
    }
    saveToDos(); //다시 localstorage에 반영
    

    // titleView.innerText = liName.innerText;
    
}





function fixTo(check) { //임시
    // fixBtn.addEventListener('click', fixIng);
    // !! console.dir(check.target.parentElement.innerText); //dir로 확인하면 자세하게 객체가보여주는데, 여기서 parentNode를 확인해보면 부모가누구인지 알려준다. target까지하면 target까지 알수있다 거기에 parentElement를 하면 부모가 누구인지 알수있다!!
}


function drawTo(event){ //화면출력 함수
    const listMake = document.createElement("li"); //li생성
    listMake.name = event.main; //부모elementli에 객체안에 랜덤으로 만든 id를 넣어준다
    listMake.id = event.id; //li에 아이디를 넣어준다

    const span = document.createElement("p"); //span생성
    span.innerText = event.title; //여기title은 인자를 객체를 가져왔기때문
    span.value = event.title;
    listMake.appendChild(span); //li자식으로span을 설정
    span.addEventListener('click', mainTo);
    
     //set을 주어서 갈링크를 준다.
    // span.classList.add(list_link); //span에 class를 추가하여 포인트주기
    title_list.appendChild(listMake); //ul(listMake)자식으로 li설정
    // span.addEventListener('click', mainTo(event2));


}


function enterText(event){ //버튼클릭했을때 사용할함수 text함수
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

