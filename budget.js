import { expenseCategories } from "./data/categories.js";
let parent = document.querySelector(".budget-list");
let budgetedCategories = [];
let updatedArray = expenseCategories;
function baseTemplate(name, image, id) {
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
                    <button class="set-budget-btn" data-category-id="${id}">SET BUDGET</button>
                  </div>
                </li>`;

  parent.innerHTML += template;
  reload()
}
expenseCategories.forEach((category) => {
  baseTemplate(category.name, category.image, category.id);
});

let cancelBudget = document.querySelector(".cancel-budget-box");
let budgetBox = document.querySelector(".budget-input-container");

let budgetContainer = document.querySelector(".budget-container");

let setBudgetLimitBtn = document.querySelector(".set-limit");
let ulParent = document.querySelector(".set-budgeted-list");

reload();
function reload() {
  let setBudgetBtns = document.querySelectorAll(".set-budget-btn");
  let threeDots = document.querySelectorAll(".three-dot");
  let options = document.querySelectorAll(".budget-operations");
  let removeBtns = document.querySelectorAll(".remove-budget");

  removeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let btnId = btn.parentElement.dataset.categoryId;

      let data = budgetedCategories.filter((bud) => bud.id == btnId);
      budgetedCategories = budgetedCategories.filter((bud) => bud.id !== btnId);

      btn.parentElement.parentElement.parentElement.parentElement.remove();
      updatedArray.push(data[0]);
      parent.innerHTML = "";
      updatedArray.forEach((item) => {
        baseTemplate(item.name, item.image, item.id);
       
      });
     
    });
  });

  threeDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (options[index].classList.contains("active")) {
        options[index].classList.remove("active");
      } else {
        options.forEach((opt) => opt.classList.remove("active"));

        options[index].classList.toggle("active");
      }
    });
  });

  setBudgetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let image =
        btn.parentElement.parentElement.children[0].children[0].getAttribute(
          "src"
        );
      let name =
        btn.parentElement.parentElement.children[0].children[1].textContent;
      let id = btn.dataset.categoryId;
      openBudgetBox(name, image, id);
    });
  });
}
function openBudgetBox(category, src, id) {
  let name = document.querySelector(".budget-category-name");
  let image = document.querySelector(".set-budget-icon");
  setBudgetLimitBtn.dataset.categoryId = id;
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

function setBudgetTemplate(id, budget) {
  let data = budgetedCategories.filter((item) => item.id == id);

  let { image, name } = data[0];
  let template = `<li>
                    <div class="text-container">
                      <div class="left-portion">
                        <img
                          class="icon"
                          src="${image}"
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
                        <div class="budget-operations" data-category-id="${id}">
                          <p class="change-limit">Change limit</p>
                          <p class="remove-budget">Remove budget</p>
                      </div>
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
  reload();
}

setBudgetLimitBtn.addEventListener("click", () => {
  closeBudgetBox();
  let id = setBudgetLimitBtn.dataset.categoryId;
  let data = expenseCategories.filter((item) => item.id == id);
  budgetedCategories.push(data[0]);

  parent.innerHTML = "";
  updatedArray = updatedArray.filter((item) => item.id != id);
  updatedArray.forEach((item) => {
    baseTemplate(item.name, item.image, item.id);
  });
  reload();

  let budget = document.getElementById("budget-value").value.trim();
  try {
    if (Number(budget) > 0) setBudgetTemplate(id, budget);
  } catch {
    return;
  }
});

document.addEventListener("click", (e) => {
  let setBudgetBtns = document.querySelectorAll(".set-budget-btn");
  let isBtnClick = true;
  setBudgetBtns.forEach((btn) => {
    if (btn.contains(e.target)) {
      isBtnClick = false;
    }
  });
  if (!budgetBox.contains(e.target) && isBtnClick) {
    closeBudgetBox();
  }
});
