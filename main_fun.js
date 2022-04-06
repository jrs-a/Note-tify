//-------------------------------fetch arrays from local storage = initialize array variables
var data = (localStorage.getItem('Note-ify_data')) ? JSON.parse(localStorage.getItem('Note-ify_data')):{
   tasks: [],
   Categories: []
};

//localStorage.clear();
console.log(data);
renderTodoList();

//--------------------------------Manually update the local storage "Note-ify"
function dataObjectUpdated (){
   localStorage.setItem("Note-ify_data", JSON.stringify(data));
}

//--------------------------------Get values from input and push to local storage
window.addEventListener("load", () => {
   const form = document.querySelector("#form_newtask");          //---getting the data from the input form
   const title = document.querySelector("#inp_title");
   const dateInp = document.querySelector("#inp_date");
   const category = document.getElementById("category").value;
   
   form.addEventListener("submit", (e) => {                       //----adding the data to the storage
      e.preventDefault();

      const task = title.value;
      const dateValue = dateInp.value;
      const status = false;
      const idValue = data.tasks.length;

      const ItemStatus = CurrentStatus(status);
      //const idValue = ItemId(idval);                   //*! use data.tasks.length nalang

      let dataValue = {
         id: idValue,
         Title: task, 
         Date: dateValue,
         Category: category, 
         status: ItemStatus
      };

      if (!dateValue) {
         alert("Please input a date");
         return;
      }

      if (!task) {
         alert("Please input a task");
         return;
      }

      //showTasks(dataValue);                            //*! no need, browser will reload immediately

      data.tasks.push(dataValue);                        //adding to array
      dataObjectUpdated();
      
      document.getElementById("inp_title").value="";     //reset the value of inputs 
      document.querySelector("#inp_date").value = "";
      document.getElementById("category").value = "";

      location.reload();                                 //reload window
   });
});

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

//--------------------------------Get tasks from local storage and showTasks() to browser
function renderTodoList() {
   if (!data.tasks.length) return;

   for (var i = 0; i < data.tasks.length; i++) {
      var value = data.tasks[i];
      showTasks(value);
   }
}


//--------------------------------gives every task an id  //*! just use the data.tasks.length
// function ItemId(y){
//    for (var i = 0; i<= data.tasks.length; i++){
//       j = i + data.tasks.length
//       var y = j;
//       return y;
//    }
// }

//-------------------------------CHECKS IF ITS COMPLETED    
function CurrentStatus(x){
   (!x) ? false : true;

   // let complete = false;
   // if (x == complete){
   //    return false;
   // } else {
   //    return true;
   // }
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
   // location.reload();      //*! no need, these are done in the resetIds()
   // dataObjectUpdated();    //*! no need, these are done in the resetIds()
   //renderTodoList();        //*! remove this to remove the wonkiness
})

//--------------------------------Reset,fix the ids of the updated array
function resetIds(){
   for (var i = 0; i < data.tasks.length; i++) {
      var value = data.tasks[i];
      if(value.id != i) {
         data.tasks[i].id = i;
      }
   }
   dataObjectUpdated();
   location.reload();
}

//--------------------------------Complete task
$(".circle").click(function() {
   task_id = $(this).parent().find(".id").html();
   task_status = data.tasks[task_id].status;
      task_status = !task_status;
   data.tasks[task_id].status = task_status;

   dataObjectUpdated();
   location.reload();
})

//--------------------------------Add new category
