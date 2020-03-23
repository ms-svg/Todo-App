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
      <input type="text" class="todo-s"readonly value="${ob.todo}"></input>
      <span class="edit">[edit]</span>
      <span class="UP">[UP]</span>
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
    console.log(String(target.firstChild.nextSibling.value));
    for (var i = 0 in itemArray) {
      console.log(itemArray[i].todo);
      if (String(itemArray[i].todo) == String(target.firstChild.nextSibling.value)) {
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

//updating a todo
var ans;
var prestate;
var todonode;
ul.addEventListener("click",e=>{

  var targetup=e.target;
  var targetedit = e.target.parentNode.firstChild.nextSibling; //li
  todonode=e.target;
  
  if(targetedit.matches(".todo-s")){
    targetedit.removeAttribute("readonly");
    targetedit.removeAttribute("class");
    prestate=targetedit.value;
    // console.log(prestate);
    targetedit.addEventListener('keyup',e=>{
      ans=targetedit.value;

    });
  }
  if(targetup.matches(".UP")){
    console.log("yes");
    console.log(ans);
    for (var i = 0 in itemArray) {
      console.log(itemArray[i].todo);
      console.log(prestate);
      if (String(itemArray[i].todo) == prestate){
        //removing array item
        // console.log("haha");
        itemArray[i].todo=ans;
        // console.log(itemArray[i].todo);
        localStorage.setItem("items", JSON.stringify(itemArray));
        // console.log(targetup);
        targetup.parentNode.firstChild.nextSibling.classList.add("todo-s");
        break;
      }
    }
  }

})