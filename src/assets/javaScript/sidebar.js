
console.log("heeeeeeeeeeeeeeeeeeeeee")

let arrow = document.querySelectorAll(".arrow");
console.log(arrow)
for (var i = 0; i < arrow.length; i++) {
console.log("ss")
  arrow[i].addEventListener("click", (e)=>{
 let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
 arrowParent.classList.toggle("showMenu");
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", ()=>{
    console.log("mmm")
  sidebar.classList.toggle("close");
});
