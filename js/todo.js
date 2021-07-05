const toDoBtn = document.querySelector("#todo-btn");
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
const TODOS_FLAG = "toDoFlag";

let toDos = [];                                                                     //toDoList Array(text, id, checked)

function saveCheckState(event){                                                     //Checked 확인
    const chkbox = event.target;
    const checkState = chkbox.checked;
    const label = chkbox.parentNode;
    const li = label.parentNode;
    for(i=0; i<toDos.length;i++){
        if(toDos[i].id === parseInt(li.id)){
            toDos[i].check = checkState;
            if (checkState){
                label.querySelector("span").classList.add("complete");
            }
            else{
                label.querySelector("span").classList.remove("complete");
            }
        }
    }
    saveToDos();
}

function saveFlag(flag){                                                            //Set localStorage (Key=toDoFlag, value =flag)
    localStorage.setItem(TODOS_FLAG, flag);
}

function saveToDos(){                                                               //Set locatStorage (Key=todos, value = toDos )
    localStorage.setItem(TODOS_KEY ,JSON.stringify(toDos));
}

function deleteToDo(event){                                                         //할 일 삭제
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodo, chk){                                                   //할 일 추가

    const newId = toDos.length +1;                                                  //할 일 Form
    const li = document.createElement("li");
    const label = document.createElement("label");
    label.classList.add("btn");
    const chkbox = document.createElement("input");
    chkbox.type="checkbox";
    chkbox.addEventListener("click", saveCheckState);
    chkbox.checked = chk;
    chkbox.id = newId;
    const span = document.createElement("span");
    span.innerText = newTodo;
    if(chk){
        span.classList.add("complete");
    }

    const button = document.createElement("button");                                //삭제버튼 Create
    button.innerText = "X";
    button.addEventListener("click", deleteToDo);
    button.classList.add("delbtn");
    button.classList.add("btn");


    label.appendChild(chkbox);
    label.appendChild(span);
    li.appendChild(label);
    li.appendChild(button);
    li.id = newId;
    toDoList.appendChild(li);

    const newTodoObj = {
        text: newTodo,
        id: newId,
        check: chkbox.checked
    };
    toDos.push(newTodoObj);                                                        //Push toDoList array
    saveToDos();
}

function handleToDoSubmit(event){                                                  //Submit 발생시
    event.preventDefault();
    const newTodo = toDoInput.value;
    paintToDo(newTodo, false);
    toDoInput.value = "";
}

function Open() {                                                                  //ToDoList Open(toDoFlag=true)
    document.querySelector("#clock").classList.add("leaningLeft");
    document.querySelector("#searchingPart").classList.add("leaningLeft");
    document.querySelector("#searchingPart").classList.add("widthResize");
    document.querySelector("#searchForm").classList.add("widthResize");
    document.querySelector("#greeting").classList.add("leaningLeft");
    document.querySelector("#searchingPart").classList.add("leaningLeft");
    document.querySelector("#searchingPart").classList.add("widthResize");
    document.querySelector("#quote").classList.add("leaningLeft");
    document.querySelector("#quote").classList.add("widthResize");
    document.querySelector("#searchForm").classList.add("widthResize");
    document.querySelector(".todo").classList.add("showing");
    toDoInput.focus();
}

function Close() {
    document.querySelector("#clock").classList.remove("leaningLeft");           //ToDoList Close(toDoFlag=false)
    document.querySelector("#searchingPart").classList.remove("leaningLeft");
    document.querySelector("#searchingPart").classList.remove("widthResize");
    document.querySelector("#searchForm").classList.remove("widthResize");
    document.querySelector("#greeting").classList.remove("leaningLeft");
    document.querySelector("#searchingPart").classList.remove("leaningLeft");
    document.querySelector("#searchingPart").classList.remove("widthResize");
    document.querySelector("#quote").classList.remove("leaningLeft");
    document.querySelector("#quote").classList.remove("widthResize");
    document.querySelector("#searchForm").classList.remove("widthResize");
    document.querySelector(".todo").classList.remove("showing");
    document.querySelector(".searchInput").focus();
}

function handleBtn(event){                                                      //ToDoList Btn
    if(toDoBtn.value === 0){
        toDoBtn.value = 1;
        Open();
        saveFlag(true);
    }else{
        toDoBtn.value = 0;
        Close();
        saveFlag(false);
    }
}

const currentFlag = localStorage.getItem(TODOS_FLAG);                          //toDoFlag check
if(currentFlag === null || currentFlag === 0){
    toDoBtn.value = 0;
}else{
    toDoBtn.value = 1;
    Open();
}

toDoBtn.classList.add("btn");                                                  //Add click event to toDoBtn
toDoBtn.addEventListener("click", handleBtn);

const savedToDos = localStorage.getItem(TODOS_KEY);                            //toDos 불러오기
if(savedToDos != null){
    const parsedToDos = JSON.parse(savedToDos);
    parsedToDos.forEach(function(toDo){
        paintToDo(toDo.text,toDo.check);
    });
}

toDoForm.addEventListener("submit", handleToDoSubmit);
