var ul = document.getElementById("list_ul");
let itemArray;
if (localStorage.getItem("items")) {
  itemArray = JSON.parse(localStorage.getItem("items"));
} else {
  itemArray = [];
}

localStorage.setItem("items", JSON.stringify(itemArray)); //setting todo to local storage
const data = JSON.parse(localStorage.getItem("items")); // getting todo back from local storage

function createlist(todo) {
  console.log(todo);
  var list = document.createElement("li");
  list.classList.add("list-group-item");
  list.innerHTML = `<span id="list_value">${todo}</span> <img src="/deletetodo.png" width="32px;" class="delete_todo"></img>`;
  document.getElementById("list_ul").appendChild(list);
}

document.getElementById("submit_button").addEventListener("click", function (e) {
  e.preventDefault();
  let todo = document.getElementById("todoinputbox").value;
  if (todo != "" && todo != " ") {
    itemArray.push(todo); //pushing todos to array
    localStorage.setItem("items", JSON.stringify(itemArray));
    createlist(todo);
    document.getElementById("todoinputbox").value = "";
  } else {
    console.log("err");
  }
});
data.forEach(i => {
  // createlist(i);
});

//removing whole todo list from UI as well as from local Storage
document.getElementById("reset_button").addEventListener("click", e => {
  console.log("finished");
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  itemArray = [];
});

//event Delegation
// here we are removing/deleting todo by using event delegation
ul.addEventListener("click", e => {
  if (e.target.matches(".delete_todo")) {
    var ul = e.target.parentNode.parentNode; //ul
    var target = e.target.parentNode; //li
    for (var i = 0 in itemArray) {
      if (itemArray[i] == String(target.firstChild.innerHTML)) {
        //removing array item
        itemArray.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("items", JSON.stringify(itemArray));
    ul.removeChild(target);
  }
});