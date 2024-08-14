let dots = document.querySelectorAll(".right-portion .dot");
let options = document.querySelectorAll(".right-portion .options");
let switchBtn = document.querySelector(".category");
let addCategoryBtn = document.querySelector(".add-category .add-box");
let categoryBox = document.querySelector(".category-box-body");
let cancelCategoryBox = document.querySelector(".cancel-add-category");

switchBtn.addEventListener("click", ()=>{
  document.querySelector(".switch").classList.toggle("active")
});

addCategoryBtn.addEventListener("click",()=>{
  categoryBox.classList.add("active")
})

cancelCategoryBox.addEventListener("click",()=>{
  categoryBox.classList.remove("active")
})

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (options[index].classList.contains("active")) {
      options[index].classList.remove("active");
    } else {
      // Deactivate all options
      options.forEach((option) => option.classList.remove("active"));
      // Activate the clicked option
      options[index].classList.add("active");
    }
  });
});
