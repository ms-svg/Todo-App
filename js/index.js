var ul = document.getElementById("accordionExample");
let itemArray;
if (localStorage.getItem("items")) {
  itemArray = JSON.parse(localStorage.getItem("items"));
} else {
  itemArray = [];
}

let i=0;
function createlist(ob) {
  var list = document.createElement("div");
  list.classList.add("card");
  var str=ob.discription.split(',');
  var d=str.map(e=>`<span class="desc-p">${e}</span>`).join("");
  list.innerHTML = `
    <div class="card-header" id="headingOne" >
      <h4>${ob.todo}</h4>
      <img src="deletetodo.png" class="delete_todo">
      <div class="d">${d}</div>
    </div>
  `;
  document.getElementById("accordionExample").appendChild(list);


}



document.getElementById("submit_button").addEventListener("click", function (e) {
  e.preventDefault();
  
  let todo = document.getElementById("todoinputbox").value;
  let discription = document.getElementById("discription").value;
  var ob={
    todo:todo,
    discription:discription
  }
  if (todo != "" && discription != " ") {
    itemArray.push(ob); //pushing todos to array
    localStorage.setItem("items", JSON.stringify(itemArray));
    createlist(ob);
    document.getElementById("todoinputbox").value = "";
    document.getElementById("discription").value="";
  } else {
    console.log("err");
  }
});
itemArray.forEach(i => {
  createlist(i);
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
    console.log(String(target.firstChild.nextSibling.innerText));
    for (var i = 0 in itemArray) {
      console.log(itemArray[i].title);
      if (String(itemArray[i].todo) == String(target.firstChild.nextSibling.innerText)) {
        //removing array item
        console.log("haha");
        itemArray.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("items", JSON.stringify(itemArray));
    ul.removeChild(target);
  }
});