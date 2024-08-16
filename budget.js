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
let budgetContainer = document.querySelector(".budget-container");

let setBudgetLimitBtn = document.querySelector(".set-limit");
let ulParent = document.querySelector(".set-budgeted-list");

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
  image.setAttribute("src", src);

  budgetBox.classList.add("active");
  budgetContainer.classList.add("blur");
}

function closeBudgetBox() {
  budgetBox.classList.remove("active");
  budgetContainer.classList.remove("blur");
}
cancelBudget.addEventListener("click", closeBudgetBox);

function setBudgetTemplate(name,src,budget) {
  let template = `<li>
                    <div class="text-container">
                      <div class="left-portion">
                        <img
                          class="icon"
                          src="${src}"
                          alt=""
                        />
                        <div class="budget-details">
                          <p class="change-font-style">${name}</p>
                          <div class="spent-box">
                            <p>Spent:</p>
                            <p class="amount-spent red">₹0.00</p>
                          </div>
                          <div class="remaining-box">
                            <p>Remaining:</p>
                            <p class="amount-remaining green">₹${budget}</p>
                          </div>
                        </div>
                      </div>
                      <div class="right-portion">
                        <img class="three-dot svg" src="icons/dot.svg" alt="" />
                        <small class="added-time opacity">(Aug,2004)</small>
                      </div>
                    </div>
                    <div class="bar-container">
                      <div class="label-content">
                        <div class="label">₹${budget}</div>
                      </div>
                      <div class="bar-status"></div>
                    </div>
                  </li>`;
  ulParent.innerHTML += template;
}

setBudgetLimitBtn.addEventListener("click", () => {
  closeBudgetBox()
  let budget = document.getElementById("budget-value").value.trim();
  let categoryName = document.querySelector(".budget-category-name").textContent;
  let categoryIcon = document.querySelector(".set-budget-icon").getAttribute("src");
  try {
    if (Number(budget) > 0)
      setBudgetTemplate(categoryName, categoryIcon, budget);
  } catch {
    return;
  }
});
