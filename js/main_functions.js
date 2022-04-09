import { db, addDoc, collection, deleteDoc, doc } from "./Firebase.js";

//--------------------------------Initialize global arrays from storage
var data = (localStorage.getItem('Note-ify_data')) ? JSON.parse(localStorage.getItem('Note-ify_data')):{
   "tasks": [],
   "categories": [],
};
//--------------------------------Testing
console.log(data);
//console.log(db);
//localStorage.clear();
//--------------------------------Display content onload
renderTodoList();


//--------------------------------Set the input values and update the localstorage
function dataObjectUpdated (){
   localStorage.setItem("Note-ify_data", JSON.stringify(data));
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

//--------------------------------Render all content to browser
function renderTodoList() {
   renderData();
   renderCategories();
   renderSelectOptions();
}
   function renderData(){
      if (data.tasks == null) {return;}
      for (var i = 0; i < data.tasks.length; i++) {
         var value = data.tasks[i];
         showTasks(value);
      }
   }
   function renderCategories(){
      if (data.categories == null) {return;}
      for (var i = 0; i < data.categories.length; i++) {
         var value = data.categories[i];
         showCategories(value);
      }
      percentCounter();
   }
   function renderSelectOptions(){
      if (data.categories == null) {return;}
      var select = document.querySelector("#category");
      
      for (var i = 0; i < data.categories.length; i++) {
         var value = data.categories[i].title;
         const option = document.createElement("option");
         option.value = value;
         option.innerHTML = value;
         select.appendChild(option);
      }
   }

//--------------------------------Creating divs and displaying single tasks
function showTasks({id: item_id, Title: item_title, Date: item_date, Category: item_category, status: item_status}) {
   const tasks = document.querySelector("#task_list_today");

      const task_el = document.createElement("div");
      //task_el.setAttribute                       //?don't need this?, app runs ok when commented out
         if(!item_status) {
            task_el.classList.add("task_item");
         } else {
            task_el.classList.add("task_item");
            task_el.classList.add("completed");
         }
         task_el.classList.add(item_category); //!Cannot add a new task under another tag if the tags has a white space. Ex "Project A" DOM TOKEN does not accept classes that have white space in them.

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

//--------------------------------Creating divs and displaying single categories
function showCategories({id: categ_id, title: categ_title, percent: categ_percent}){
   
   const tags = document.querySelector(".category_cont");

      const tag_el = document.createElement('div');
      tag_el.classList.add("category_item");
      tag_el.id = categ_id;

      const tag_id = document.createElement("span");
      tag_id.classList.add("id");
      tag_id.innerHTML = categ_id;
      tag_el.appendChild(tag_id);

      const tag_title = document.createElement("span");
      tag_title.classList.add("title");
      tag_title.innerHTML = categ_title;
      tag_el.appendChild(tag_title);

      const tag_percent = document.createElement("span");
      tag_percent.classList.add("percent");
      tag_percent.innerHTML = categ_percent + "%";
      tag_el.appendChild(tag_percent);

      const tag_loading = document.createElement("div");
      tag_loading.classList.add("loading");
      tag_el.appendChild(tag_loading);

      const tag_progress = document.createElement("div");
      tag_progress.classList.add("progress");
      tag_loading.appendChild(tag_progress);

      const tag_bar= document.createElement("div");
      tag_bar.classList.add("bar");
      tag_loading.appendChild(tag_bar);

   tags.appendChild(tag_el);
}

//--------------------------------Add new task, Update task
let isCreateTask = true;

$("#btn_newtask").click(function(){
   isCreateTask = true;
})
$(".edit").click(function(){
   isCreateTask = false;

   const task_id = $(this).parent().parent().find(".id").html();
   const task_title = data.tasks[task_id].Title;
   const task_date = data.tasks[task_id].Date;
   const task_category = data.tasks[task_id].Category;

   $("#inp_title").val(task_title);
   $("#category").val(task_category);
   $("#inp_date").val(task_date);
})

$("#btn_create").click(function (e){
   e.preventDefault();
   const task_id = $(this).parent().parent().find(".id").html();
   const input_title = $("#inp_title").val();
   const input_date = $("#inp_date").val();
   const input_category = $("#category").val();
   const input_id = (!data.tasks) ? 0 : data.tasks.length;
   const input_status = false;

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
      percentCounter();
      dataObjectUpdated();
      addNewTask(input_title, input_category, input_date, input_id, input_status); 
      $("#inp_title").val();
      $("#inp_date").val();
      $("#category").val();
   } else {

      //! Any way u can fix this part?
      data.tasks[task_id].Title = input_title;       //!  They dont exist daw. it error when i changed the type from text/Javascript to module
      data.tasks[task_id].Date = input_date;         //!
      data.tasks[task_id].Category = input_category; //!
      
      percentCounter();
      dataObjectUpdated();
      $("#inp_title").val();
      $("#inp_date").val();
      $("#category").val();
      location.reload();
   }
})

//--------------------------------Add new category 
$("#btn_createtag").click(function(){               
   const input_id = (!data.categories) ? 0 : data.categories.length;
   const input_title = $("#inp_tag").val();

   if (!input_title) {
      alert("Please input a tag");
      return;
   }

   console.log(input_title);

   for (var c = 0; c < data.categories.length; c++) {
     let category = data.categories[c].title;
         if (input_title == category) {
            alert("Tag is already existing!");
            return;
         } 
   }

   let categoryItem = {
      id: input_id,
      title: input_title,
      percent: 0
   };
   console.log(categoryItem);

   if(!Array.isArray(data.categories)) {
      console.log("categories is NOT an array");
   }

   data.categories.push(categoryItem);
   dataObjectUpdated();
   addNewTag(input_id, input_title)
   $("#inp_tag").val()
})

//--------------------------------Delete an item
$(".delete").click(function(){         
   const id_new = $(this).parent().parent().find(".id").html();

   for (var i = 0; i < data.tasks.length; i++) {
      var value = data.tasks[i];

      if(value.id == id_new) {
         data.tasks = $.grep(data.tasks, function(value) {
            return value != data.tasks[i];
         });
      }
   }
   resetIds();
   percentCounter();
   dataObjectUpdated();
   location.reload();
})

//--------------------------------Complete task
$(".circle, #btn_complete").click(function() {
  const task_id = $(this).parent().find(".id").html();
  var task_status = data.tasks[task_id].status;
      task_status = !task_status;
   data.tasks[task_id].status = task_status;

   percentCounter();
   dataObjectUpdated();
   location.reload();
})
const addNewTask = async (title, category, date, id, status) => {
   const collectionRef = collection(db, "Tasks");
   const payload = {
      Title: title,
      Category: category,
      Date:date,
      Id: id,
      Status: status

   };

   await addDoc(collectionRef, payload);
   location.reload();
};

const addNewTag = async(id, title) => {
   const collectionRef = collection(db, "Categories");
   const payload = {
      ID: id,
      Title: title,
   };

   await addDoc(collectionRef, payload);
   location.reload();
};

//--------------------------------Sync progress bar and percentage
function percentCounter() {
   var all = 0;
   var done = 0;

   for (var c = 0; c < data.categories.length; c++) {
      const category = data.categories[c].title;
      for (var i = 0; i < data.tasks.length; i++) {
         const task = data.tasks[i].Category;
         const task_status = data.tasks[i].status;
         if (task == category) {
            all++;
            (task_status) ? done++ : null;
         } 
      }
      if (all == 0) {
         data.categories[c].percent = 0;
      } else {
         var percentage = calcPercent(done, all);
         data.categories[c].percent = percentage;
      }

      displayProgress(c);
      all = 0;
      done = 0;
   }
}
   function calcPercent(complete, max){
      var percent = ((complete / max) * 100);
      percent = Math.trunc(percent);
      return percent;                     
   }

   function displayProgress(id) {
      const divId = "#" + id;   
      const divItem = $(".category_cont").children(divId).find(".bar");
      const width = data.categories[id].percent;
      divItem.width(width + '%');
   }
//--------------------------------Filter tasks by category
var selectedItem = null;
var sameClickCtr = 0;

$(".category_item").click(function(){
   if ($(this).find(".title").html() != selectedItem) {
      $(".category_item").removeClass("activeCategory");
      $(this).addClass("activeCategory");
     const filter_categ = $(this).find(".title").html();
      showSome(filter_categ);
   } else {
      sameClickCtr++;
      if(sameClickCtr > 1 && sameClickCtr%2 == 1) {
         $(".category_item").removeClass("activeCategory");
         $(this).addClass("activeCategory");
         const filter_categ = $(this).find(".title").html();
         showSome(filter_categ);
      } else {
         $(this).removeClass("activeCategory");
         showAll();
      }
   }

   selectedItem = $(this).find(".title").html();

   function showAll() {
      for (var c = 0; c < data.categories.length; c++) {
       const current_item = data.categories[c].title;
         $("#task_list_today").find("." + current_item).show();
      }
   }
   
   function showSome(filter) {
      for (var c = 0; c < data.categories.length; c++) {
         const current_item = data.categories[c].title;

         if (current_item != filter) {
            $("#task_list_today").find("." + current_item).hide();
         } else {
            $("#task_list_today").find("." + current_item).show();
         }
      }
   }
})

export {data};