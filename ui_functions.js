// -----------------------------Homepage Date
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


$("#task_list_today > .task_item").click(function() {
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

$(".back, #btn_create, #btn_complete, btn_edit").click(function(){
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

//for details pane
$(".task_item").click(function(){
   id = $(this).find(".id").html();
   title = data.tasks[id].Title;
   date = data.tasks[id].Date;
   category = data.tasks[id].Category;
   _status = data.tasks[id].status;
   
   $("#item_detail > .section > .id").html(id);
   $("#item_detail > .section > .title").html(title);
   $("#item_detail > .section > .date").html(date);
   $("#item_detail > .section > .tag_group > .tag").html(category);
   if(_status) {
      $("#btn_complete").html('Undo complete');
      $("#item_detail").addClass("complete");
   } else {
      $("#item_detail").removeClass("complete");
   }
})