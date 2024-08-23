const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");



function addGoal(){
    if(inputBox.value === ''){
        alert("enter your goal");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.prepend(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        
        li.appendChild(span);
        
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        let result = confirm("Are you sure you want to delete this?");
        if(result){
            e.target.parentElement.remove();
            saveData();
        }
        
    }
    
}, false);


function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function sortList(){
    const frag = document.createDocumentFragment();
    const items = listContainer.querySelectorAll("li");
    for (let item of items){
        if(!item.classList.contains("checked")){
            frag.appendChild(item);
        }
    }
    for (let item of items){
        if(item.classList.contains("checked")){
            frag.appendChild(item);
        }
    }
    
    listContainer.appendChild(frag);
}

function showList(){
    
    listContainer.innerHTML = localStorage.getItem("data");
    
    sortList();

    
}

showList();