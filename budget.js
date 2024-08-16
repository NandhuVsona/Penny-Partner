import { expenseCategories } from "./data/categories.js";
let parent = document.querySelector(".budget-list");

function baseTemplate(name, image) {
  let template = `<li>
                  <div class="left-portion">
                    <img
                      class="icon"
                      src="${image}"
                      alt=""
                    />
                    <p class="change-font-style">${name}</p>
                  </div>
                  <div class="right-portion">
                    <button class="set-budget-btn">SET BUDGET</button>
                  </div>
                </li>`;

  return template;
}
expenseCategories.forEach((category) => {
  parent.innerHTML += baseTemplate(category.name, category.image);
});

let cancelBudget = document.querySelector(".cancel-budget-box");
let budgetBox = document.querySelector(".budget-input-container");
let setBudgetBtns = document.querySelectorAll(".set-budget-btn");

reload();
function reload() {
  setBudgetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let image =
        btn.parentElement.parentElement.children[0].children[0].getAttribute(
          "src"
        );
      let name =
        btn.parentElement.parentElement.children[0].children[1].textContent;
      openBudgetBox(name, image);
    });
  });
}
function openBudgetBox(category, src) {
  let name = document.querySelector(".budget-category-name");
  let image = document.querySelector(".set-budget-icon");

  name.innerHTML = category;
  image.setAttribute("src",src)

  budgetBox.classList.add("active");
}

function closeBudgetBox() {
  budgetBox.classList.remove("active");
}
cancelBudget.addEventListener("click", closeBudgetBox);
