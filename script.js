let myNotes = []
const inputEl = document.getElementById("inputEl")
const addBtn = document.getElementById("addBtn")
let list = document.getElementById("list")
const clearBtn = document.getElementById("clearBtn")

function renderList() {
    let listItems = ""
    for (let i = 0; i < myNotes.length; i++) {
        listItems += `<div class='small-container'><li class='item'>${myNotes[i]}</li><button class='doneBtn'>DONE</button></div>`
    }
    list.innerHTML = listItems
}

addBtn.addEventListener("click", () => {
    if (inputEl.value === "") {
        inputEl.textContent = "You need to enter your note first!"
    } else {
        myNotes.push(inputEl.value)
    }
    inputEl.value = ""
    localStorage.setItem("myNotes", JSON.stringify(myNotes))
    renderList()
})

clearBtn.addEventListener("click", () => {
    while (myNotes.length > 0) {
        myNotes.pop()
    }
    list.innerHTML = " "
    localStorage.clear()
})

let notesFromLocalStorage = JSON.parse(localStorage.getItem("myNotes"))

if (notesFromLocalStorage) {
    myNotes = notesFromLocalStorage
    renderList()
}

let doneBtns = document.querySelectorAll(".doneBtn")
let items = document.querySelectorAll(".item")

document.addEventListener("DOMContentLoaded", function () {
    loadCompletedNotes();
});

for (let i = 0; i < doneBtns.length; i++) {
    doneBtns[i].addEventListener('click', function () {
        let currentBtn = doneBtns[i];
        let currentItem = items[i];

        if (currentBtn.textContent === "DONE") {
            currentItem.classList.add("done");
            currentBtn.textContent = "UNDONE";
        } else {
            currentItem.classList.remove("done");
            currentBtn.textContent = "DONE";
        }

        updateCompletedNotes();
    });
}

function updateCompletedNotes() {
    let completedNotes = getCompletedNotes();
    localStorage.setItem("completedNotes", JSON.stringify(completedNotes));
}

function getCompletedNotes() {
    let completedNotes = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains("done")) {
            completedNotes.push(i);
        }
    }
    return completedNotes;
}

function loadCompletedNotes() {
    let completedNotesFromStorage = JSON.parse(localStorage.getItem("completedNotes"));

    if (completedNotesFromStorage) {
        for (let i = 0; i < completedNotesFromStorage.length; i++) {
            let index = completedNotesFromStorage[i];
            items[index].classList.add("done");
            doneBtns[index].textContent = "UNDONE";
        }
    }
}