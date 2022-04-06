//--------------------------------fetch arrays from local storage = initialize global array variables
var data = (localStorage.getItem('Note-ify_data')) ? JSON.parse(localStorage.getItem('Note-ify_data')):{
   tasks: [],
   categories: []
};

//localStorage.clear();
console.log(data);
renderTodoList();

//--------------------------------Manually update the local storage "Note-ify"
function dataObjectUpdated (){
   localStorage.setItem("Note-ify_data", JSON.stringify(data));
}

//--------------------------------Get tasks from local storage and showTasks() to browser
function renderTodoList() {
   if (!data.tasks.length) return;

   for (var i = 0; i < data.tasks.length; i++) {
      var value = data.tasks[i];
      showTasks(value);
   }
}

//--------------------------------Reset,fix the ids of the updated array
function resetIds(){
   for (var i = 0; i < data.tasks.length; i++) {
      var value = data.tasks[i];
      if(value.id != i) {
         data.tasks[i].id = i;
      }
   }
}

//--------------------------------Creating divs and displaying single tasks
function showTasks({id: item_id, Title: item_title, Date: item_date, Category: item_category, status: item_status}) {
   const tasks = document.querySelector("#task_list_today");

   const task_el = document.createElement("div");
      if(!item_status) {
         task_el.classList.add("task_item");
      } else {
         task_el.classList.add("task_item");
         task_el.classList.add("completed");
      }

         const task_circle = document.createElement("span");
         task_circle.classList.add("circle");
         task_el.appendChild(task_circle);

         const task_id = document.createElement("span");
         task_id.classList.add("id");
         task_id.innerHTML = item_id;
         task_el.appendChild(task_id);

         const task_status = document.createElement("span");
         task_status.classList.add("status");
         task_status.innerHTML = item_status;
         task_el.appendChild(task_status);

         const task_title = document.createElement("span");
         task_title.classList.add("title");
         task_title.innerHTML = item_title;
         task_el.appendChild(task_title);

         const task_date = document.createElement("span");
         task_date.classList.add("date");
            let dateObj = new Date(item_date);
            let FormattedDate = dateObj.toLocaleString("en-US", {
               month: "long", 
               day: "numeric",
               year: "numeric"
            });
         task_date.innerHTML = FormattedDate;
         task_el.appendChild(task_date);

      tasks.appendChild(task_el);
}

//--------------------------------Add new task, Update task
let isCreateTask = true;

$("#btn_newtask").click(function(){
   isCreateTask = true;
})
$(".edit").click(function(){
   isCreateTask = false;

   task_id = $(this).parent().parent().find(".id").html();
   task_title = data.tasks[task_id].Title;
   task_date = data.tasks[task_id].Date;
   task_category = data.tasks[task_id].Category;

   $("#inp_title").val(task_title);
   $("#category").val(task_category);
   $("#inp_date").val(task_date);
})

$("#btn_create").click(function(e){
   e.preventDefault();
   
   input_title = $("#inp_title").val();
   input_date = $("#inp_date").val();
   input_category = $("#category").val();
   input_id = data.tasks.length;
   input_status = false;

   if (!input_date) {
      alert("Please input a date");
      return;
   }
   if (!input_title) {
      alert("Please input a task");
      return;
   }
   
   if(isCreateTask) {
      let dataValue = {
         id: input_id,
         Title: input_title, 
         Date: input_date,
         Category: input_category, 
         status: input_status
      };

      data.tasks.push(dataValue);
      dataObjectUpdated();

      $("#inp_title").val();
      $("#inp_date").val();
      $("#category").val();
      location.reload();
   } else {
      data.tasks[task_id].Title = input_title;
      data.tasks[task_id].Date = input_date;
      data.tasks[task_id].Category = input_category;
      
      dataObjectUpdated();

      $("#inp_title").val();
      $("#inp_date").val();
      $("#category").val();
      location.reload();
   }
})

//--------------------------------Delete an item
$(".delete").click(function(){         
   id_new = $(this).parent().parent().find(".id").html();

   for (var i = 0; i < data.tasks.length; i++) {
      var value = data.tasks[i];

      if(value.id == id_new) {
         data.tasks = $.grep(data.tasks, function(value) {
            return value != data.tasks[i];
         });
      }
   }
   resetIds();
   dataObjectUpdated();
   location.reload();
})

//--------------------------------Complete task
$(".circle").click(function() {
   task_id = $(this).parent().find(".id").html();
   task_status = data.tasks[task_id].status;
      task_status = !task_status;
   data.tasks[task_id].status = task_status;

   dataObjectUpdated();
   location.reload();
})

//! PINK MODE PLEASE (rosely) :D