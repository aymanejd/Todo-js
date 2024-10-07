let creattodo = document.querySelector(".ck");
console.log(creattodo);

document.addEventListener("DOMContentLoaded", function () {
    window.localStorage.removeItem("checkedItems")
    loadItemsFromLocalStorage();
    updateItemCount()
});

creattodo.addEventListener("click", function () {
    let todoinput = document.querySelector("#tod").value;
    if (todoinput !== "") {
        createNewItem(todoinput);
    }
});

function createNewItem(text) {
    let list = document.querySelector(".todolist");

    let todocont = document.createElement("div");
    todocont.classList.add("todocontain");
    let img = document.createElement("img");
    let compl = document.createElement("div");
    compl.appendChild(img);
    compl.classList.add("todocomplate");

    let texttodo = document.createElement("div");
    texttodo.textContent = text;
    texttodo.classList.add("todotext");
    todocont.appendChild(compl);
    todocont.appendChild(texttodo);
    list.appendChild(todocont);
    let comp = document.querySelectorAll(".todocomplate");
    comp.forEach(function (el) {
        el.addEventListener("click", function (e) {
            let firt = e.target.firstChild;
            e.target.style.backgroundImage = "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
            let sib = e.target.nextElementSibling;
            sib.style.cssText = "text-decoration: line-through; color : hsl(237, 14%, 26%) "
            firt.setAttribute("src", "icon-check.svg");
            let targett = e.target.nextElementSibling.textContent;
            console.log(targett)
            saveCheckedStateToLocalStorage(targett);
        });
    });
    document.querySelector("#tod").value="";
    updateItemCount();
    saveItemsToLocalStorage();
}

function updateItemCount() {
    let totalItems = document.querySelectorAll(".todocontain").length;
    let nm = document.querySelector(".num");
    nm.textContent = totalItems; 
}
function subtract() {
    let nme = document.querySelector(".num");
    nme.textContent -= 1
}


function loadItemsFromLocalStorage() {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    items.forEach(function (itemText) {
        createNewItem(itemText);
    });
}
function saveItemsToLocalStorage() {
    let items = [];
    let textto = document.querySelectorAll(".todotext");
    textto.forEach(function (e) {
        items.push(e.textContent);
    });
    localStorage.setItem("items", JSON.stringify(items));
}
let lis = document.querySelector(".todolist");
let clear = document.querySelector(".clear");
clear.addEventListener("click", function () {
    while (lis.firstChild) {
        lis.removeChild(lis.firstChild);
    }
    localStorage.removeItem("items");
    let nm = document.querySelector(".numb");
    nm.textContent = ` 0 items left`;
});
