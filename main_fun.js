//--------------------------------fetch arrays from local storage = initialize global array variables
var data = (localStorage.getItem('Note-ify_data')) ? JSON.parse(localStorage.getItem('Note-ify_data')):{
   tasks: [],
   categories: []
};

//localStorage.clear();
console.log(data);
renderTodoList();

editTask();
//--------------------------------Manually update the local storage "all arrays"
dataObjectUpdated();

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
//----------------------------NEW from hobie creates the divs and displays the divs under Categories/Tags
function showCategories({_id: tagId, Title: Newtag, PercentageValue: percent}){
   const tags = document.querySelector("#MyCategories");

   const tag_el = document.createElement('div');
   tag_el.classList.add("category_item")

   const tag_id = document.createElement("span");
   tag_id.classList.add("id");
   tag_el.appendChild(tag_id);

   const tag_title = document.createElement("span");
   tag_title.classList.add("title");
   tag_title.innerHTML = Newtag;
   tag_el.appendChild(tag_title);

   const tag_percent = document.createElement("span");
   tag_percent.classList.add("percent");
   tag_percent.innerHTML = percent;
   tag_el.appendChild(tag_percent);

   const tag_loading = document.createElement("div");
   tag_loading.classList.add("loading");
   tag_el.appendChild(tag_loading);

   const tag_progress = document.createElement("div");
   tag_progress.classList.add("progress");
   tag_loading.appendChild(tag_progress);

   const tag_bar= document.createElement("div");
   tag_bar.classList.add("bar");
   tag_id.appendChild(tag_bar);

   tags.appendChild(tag_el);

}


//--------------------------------Get tasks from local storage and showTasks() to browser

//----------------------------NEW from hobie //renders the all the functions
function renderTodoList() {
renderData();
renderCategories();
renderSelectOptions()
}
//----------------------------NEW from hobie //renders the data.tasks
function renderData(){
   if (!data.tasks.length) return;

   for (var i = 0; i < data.tasks.length; i++) {
      var value = data.tasks[i];
      showTasks(value);
   }
}
//----------------------------NEW from hobie //renders the data.Categories
function renderCategories(){
   if (!data.Categories.length) return;

   for (var i = 0; i < data.Categories.length; i++) {
      var value = data.Categories[i];
      showCategories(value);
   }
}
//----------------------------NEW from hobie //renders the select-tag options
function renderSelectOptions(){
 var select = document.getElementById("category");
 data.Categories.forEach(({_id, Title}) => {
   select.innerHTML += `<option value=${_id} id=${_id}>${Title}</option>`;
 });


}

//--------------------------------Set the inputvalues and update the localstorage
function dataObjectUpdated (){
   localStorage.setItem("Note-ify_data", JSON.stringify(data));
}

//-------------------------------CHECKS IF ITS COMPLETED    
function CurrentStatus(x){
   (!x) ? false : true;

}

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

function CalculatePercentage(value){
   //const bar = document.querySelector(".bar");
   //const progress = document.querySelector(".progress");
   //const x = document.querySelector(".percent")
   
   var complete = 17
   var max = 20
   
   var calculation = (complete / max) * 100;
   const percent = calculation + "%";
   //progress = calculation;
  //x = percent;
   return percent;
                        
}

function editTask(id){

   let newEditItem = data.tasks.find((elem) => {
      return elem.id === id
   })
   console.log(newEditItem);
};

//--------------------------------Add new category

$("#btn_createtag").click(function(){               //-------NEW from hobie //Creating a new tag    
   var percentValue;
   const Newtag = $("#inp_tag").val();
   const percent = CalculatePercentage(percentValue);
   const tagId = $("#inp_tag").val();

   if (!Newtag) {
      alert("Please input a tag");
      return;
   }

   data.Categories.push({ 
      _id: tagId,
      Title: Newtag,
      PercentageValue: percent
   });

   dataObjectUpdated();
   document.getElementById("inp_tag").value = " ";

   location.reload();  
})

