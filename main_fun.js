//--------hobie 

//TODO hobie - storage: edit and delete

//--------jam
//TODO bind events to new divs
//TODO scroll within the list 
//TODO isotope filtering (sort by category)
//TODO > circle



// -----------------------------Getting the date
const months = ["January","February","March","April","May","June","July","August","September","October","November","December",];
const week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

const n = new Date();
const m = n.getMonth();
const d = n.getDate();
const x = n.getDay();

document.getElementById("date").innerHTML = `${months[m]} ${d}`;
document.getElementById("day").innerHTML = `${week[x]}, `;

// -----------------------------Show/Hide Elements
const div_newItem = document.getElementById("new_item");
const div_itemDetail = document.getElementById("item_detail");
const div_newTag = document.getElementById("new_tag");

$("#btn_newtask, .edit").click(function(){
   $("#new_item").fadeIn();
   $("#new_tag").fadeOut();
   $("#item_detail").fadeOut();
   div_newItem.style.display = "grid";
   div_itemDetail.style.display = "none";
   div_newTag.style.display = "none";
})

$(".task_item").click(function() {
   $("#item_detail").fadeIn();
   $("#new_tag").fadeOut();
   $("#new_item").fadeOut();
   div_newItem.style.display = "none";
   div_itemDetail.style.display = "grid";
   div_newTag.style.display = "none";
})

$("#btn_newtag").click(function() {
   $("#new_tag").fadeIn();
   $("#new_item").fadeOut();
   $("#item_detail").fadeOut();
   div_newItem.style.display = "none";
   div_itemDetail.style.display = "none";
   div_newTag.style.display = "grid";
})

$(".back, #btn_create, #btn_complete").click(function(){
   document.querySelector("#anchor_home").scrollIntoView();
   $(".fade").fadeOut();
})

$(".goto_float, .task_item").click(function(){
   document.querySelector("#anchor_floating").scrollIntoView();
})

//for dynamically generated divs
$("#task_list_today").on("click", ".task_item", function(){
   document.querySelector("#anchor_floating").scrollIntoView();
})

//--------------------------------Adding task
window.addEventListener("load", () => {
   const form = document.querySelector("#form_newtask");
   const title = document.querySelector("#inp_title");      //input
   const tasks = document.querySelector("#task_list_today");//list_el

   form.addEventListener("submit", (e) => {
      e.preventDefault();

      const task = title.value;
      if (!task) {
         alert("Please input a task");
         return;
      }

      //yung mismong container = a single task item
      const task_el = document.createElement("div");
      task_el.classList.add("task_item");
      

         const task_circle = document.createElement("span");
         task_circle.classList.add("circle");

         const task_title = document.createElement("span");
         task_title.classList.add("title");
         task_title.innerHTML = task;
         task_el.appendChild(task_title);

         const task_date = document.createElement("span");
         task_date.classList.add("date");
         task_date.innerHTML = "replace this";
         task_el.appendChild(task_date);

      tasks.appendChild(task_el);

      input.value=""; //reset the value of input 
   });
});







// //-----------------------------Turning the items in the array back into JSON
// var data = (localStorage.getItem('Note-tify')) ? JSON.parse(localStorage.getItem('Note-tify')) : {
//    tasks: [],
//    unfinished_tasks: []
// };

// renderTodoList();

// //-----------------------------InputVal
// document.getElementById('btn_create').addEventListener('click', function () {
//    var value = document.getElementById('inp_title').value;
//    if (value) {

//       addTask(value);
//       document.getElementById('inp_title').value = '';

//       data.tasks.push(value);
//       dataObjectUpdated();
//    }
// });

// //-----------------------------Rendering the local storage
// function renderTodoList() {
//    if (!data.tasks.length) return;

//    for (var i = 0; i < data.tasks.length; i++) {
//       var value = data.tasks[i];
//       addTask(value);
//    }
// }

// //-----------------------------Adding the items to the storage and turning them into strings
// function dataObjectUpdated() {
//    localStorage.setItem('Note-tify', JSON.stringify(data));
// }

// //-----------------------------Creating a new task
// function addTask(text) {
//    var list = document.getElementById('today');

//    var div = document.createElement('div');
//    div.classList.add('task_item');

//    var titles = document.createElement('span');
//    titles.classList.add('title');
//    titles.innerText = text;

//    var circles = document.createElement('span')
//    circles.classList.add('circle');

//    list.appendChild(div);
//    div.appendChild(titles);
//    div.appendChild(circles);
// }
