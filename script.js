let navIcons = document.querySelectorAll("footer nav ul li");
let pages = document.querySelectorAll("main section");
let closeSideBar = document.querySelector(".close");
let sideBar = document.querySelector(".sidebar");
let accountPage = document.querySelector(".account");
let hamburger = document.querySelector(".hamburger");
let addAccountBtn = document.querySelector(".add-account")
let accountBox = document.querySelector(".box-body")
navIcons.forEach((icon, index) => {
  icon.addEventListener("click", () => changePage(icon, index));
});

function changePage(page, index) {
  pages.forEach((page) => page.classList.remove("active"));
  pages[index].classList.add("active");
}

closeSideBar.addEventListener("click", () => {
  sideBar.classList.remove("active");
});
hamburger.addEventListener("click", () => sideBar.classList.add("active"));

document.addEventListener('click',(e)=>{
    if(!sideBar.contains(e.target) && !hamburger.contains(e.target)){
        sideBar.classList.remove("active");
    }
})

addAccountBtn.addEventListener("click",()=>{
  accountBox.classList.add('active')
  accountPage.classList.add('blurbg')
})

function closeAccountBox(){
  accountBox.classList.remove('active')
  accountPage.classList.remove('blurbg')
}