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
}
expenseCategories.forEach((category) => {
  baseTemplate(category.name, category.image, category.id);
});

let cancelBudget = document.querySelector(".cancel-budget-box");
let cancelEdit = document.querySelector(".cancel-edit-box");
let budgetBox = document.querySelector(".budget-input-container");
let editBudgetBox = document.querySelector(".budget-edit-container");
let updatedLimitinput = document.getElementById("budget-updated-value");
let budgetContainer = document.querySelector(".budget-container");
let updateLimitBtn = document.querySelector(".updated-limit");
let setBudgetLimitBtn = document.querySelector(".set-limit");
let ulParent = document.querySelector(".set-budgeted-list");
function removeBudget(btn) {
  let btnId = btn.parentElement.dataset.categoryId;

  let data = budgetedCategories.filter((bud) => bud.id == btnId);
  budgetedCategories = budgetedCategories.filter((bud) => bud.id != btnId);

  btn.parentElement.parentElement.parentElement.parentElement.remove();
  updatedArray.push(data[0]);
  parent.innerHTML = "";
  updatedArray.forEach((item) => {
    baseTemplate(item.name, item.image, item.id);
  });
  reloadtwo();
}
cancelEdit.addEventListener("click", closeEditBox);

function closeEditBox() {
  editBudgetBox.classList.remove("active");
  budgetContainer.classList.remove("blurbg");
}

function reloadtwo() {
  let setBudgetBtns = document.querySelectorAll(".set-budget-btn");
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
reload();
function reload() {
  let setBudgetBtns = document.querySelectorAll(".set-budget-btn");
  let threeDots = document.querySelectorAll(".three-dot");
  let options = document.querySelectorAll(".budget-operations");
  let removeBtns = document.querySelectorAll(".remove-budget");
  let changeLimitBtn = document.querySelectorAll(".change-limit");

  removeBtns.forEach((btn) => {
    btn.addEventListener("click", () => removeBudget(btn));
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

  changeLimitBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      options.forEach((opt) => opt.classList.remove("active"));
      openEditBox(btn);
    });
  });
}

function openEditBox(btn) {
  
  let id = btn.parentElement.dataset.categoryId;
  let isFound = budgetedCategories.filter((item) => item.id == id);
  let data = isFound[0];
  let itemName = document.querySelector(".edit-category-name");
  let itemImage = document.querySelector(".edit-budget-icon");

  updatedLimitinput.value = data.budget;
  updateLimitBtn.dataset.categoryId = data.id;
  itemName.innerHTML = data.name;
  itemImage.setAttribute("src", data.image);
  editBudgetBox.classList.add("active");
  budgetContainer.classList.add("blurbg");

  updateLimitBtn.addEventListener("click", () => {
    closeEditBox();
    let id = updateLimitBtn.dataset.categoryId;
    budgetedCategories = budgetedCategories.map((bud) => {
      if (bud.id == id) {
        return { ...bud, budget: updatedLimitinput.value }; // Update the budget for the matching id
      } else {
        return bud; // Return the original object for non-matching ids
      }
    });

    setBudgetTemplate();
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

function setBudgetTemplate() {
  ulParent.innerHTML = " ";
  budgetedCategories.forEach((data) => {
    let { image, name, budget, id } = data;

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
  });
  reload();
}

setBudgetLimitBtn.addEventListener("click", () => {
  let budget = document.getElementById("budget-value").value.trim();
  closeBudgetBox();

  let id = setBudgetLimitBtn.dataset.categoryId;
  let data = expenseCategories.filter((item) => item.id == id);

  data[0].budget = budget;
  budgetedCategories.push(data[0]);

  parent.innerHTML = "";
  updatedArray = updatedArray.filter((item) => item.id != id);
  updatedArray.forEach((item) => {
    baseTemplate(item.name, item.image, item.id);
  });
  document.getElementById("budget-value").value = ' '
  reload();

  try {
    if (Number(budget) > 0) setBudgetTemplate();
  } catch (err) {
    console.log(err);
  }
});

document.addEventListener("click", (e) => {
  let setBudgetBtns = document.querySelectorAll(".set-budget-btn");
  let changeLimitBtn = document.querySelectorAll(".change-limit");
  let threeDots = document.querySelectorAll(".three-dot");
  let options = document.querySelectorAll(".budget-operations");
  let isBtnClick = true;
  let dots = true;
  let opt = true;
  threeDots.forEach(dot =>{
    if(dot.contains(e.target)){
      dots = false;
    }
  })
  options.forEach(opt =>{
    if(opt.contains(e.target)){
      opt = false;
    }
  })
  setBudgetBtns.forEach((btn) => {
    if (btn.contains(e.target)) {
      isBtnClick = false;
    }
  });
  if (!budgetBox.contains(e.target) && isBtnClick) {
    closeBudgetBox();
  }

  changeLimitBtn.forEach(dot =>{
    if(dot.contains(e.target)){
      isBtnClick = false
    }
  })
  if(!editBudgetBox.contains(e.target) && isBtnClick){
    closeEditBox()
  }
  if(dots && opt){
    options.forEach(option => option.classList.remove("active"))
  }
});
