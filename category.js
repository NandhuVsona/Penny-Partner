let dots = document.querySelectorAll(".right-portion .dot");
let options = document.querySelectorAll(".right-portion .options");
let switchBtn = document.querySelector(".category");

switchBtn.addEventListener("click", ()=>{
  document.querySelector(".switch").classList.toggle("active")
});

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
