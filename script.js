let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");



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
    saveData('goal');
}
function addRef(){
    l = document.getElementsByClassName("left-option");
    if(l[0].classList.contains("selected")){
        // on www page
        addWWW();
    }else{
        addEBI();
        
    } 
}
function addWWW(){
    if(inputBox.value === ''){
        alert("enter your reflection");
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
    saveData('www');
}
function addEBI(){
    if(inputBox.value === ''){
        alert("enter your reflection");
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
    saveData('ebi');
}

function flip(){
    l = document.getElementsByClassName("left-option");
    r = document.getElementsByClassName("right-option");
    l[0].classList.toggle("selected");
    r[0].classList.toggle("selected");
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        if(window.location.pathname==='/reflectionManager.html'){
            l = document.getElementsByClassName("left-option");
            if(l[0].classList.contains("selected")){
                // on www page
                saveData('www')
            }else{
                saveData('ebi');
            }
        } else{
            saveData('goal');
        }
    }
    else if(e.target.tagName === "SPAN"){
        let result = confirm("Are you sure you want to delete this?");
        if(result){
            e.target.parentElement.remove();
            // check which should be saved

            if(window.location.pathname==='/reflectionManager.html'){
                l = document.getElementsByClassName("left-option");
                if(l[0].classList.contains("selected")){
                    // on www page
                    saveData('www')
                }else{
                    saveData('ebi');
                }
            } else{
                saveData('goal');
            }
        }
        
    }
    
    
}, false);


function saveData(data){
    localStorage.setItem(data, listContainer.innerHTML);
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

function showList(data){
    if(data==='www'){
        l = document.getElementsByClassName("left-option");
        r = document.getElementsByClassName("right-option");
        if(!l[0].classList.contains("selected")){
            l[0].classList.toggle("selected");
            r[0].classList.toggle("selected");
        }
        
    }
    else if(data === 'ebi'){
        l = document.getElementsByClassName("left-option");
        r = document.getElementsByClassName("right-option");
        if(!r[0].classList.contains("selected")){
            l[0].classList.toggle("selected");
            r[0].classList.toggle("selected");
        }
    }
    listContainer.innerHTML = localStorage.getItem(data);
    
    sortList();

    
}
// need to do 
if(window.location.pathname==='/reflectionManager.html'){
    l = document.getElementsByClassName("left-option");
    if(l[0].classList.contains("selected")){
        // on www page
        showList('www')
    }else{
        showList('ebi');
    }
} else{
    showList('goal');
}
