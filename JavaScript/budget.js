import { expenseCategories } from "../data/categories.js";
let parent = document.querySelector(".budget-list");
let budgetedCategories = [];
let clickedBudget = ""; //this for knowing user which category is clicked
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
  removeBudgetDb(btnId);
  btn.parentElement.parentElement.parentElement.parentElement.remove();
  loadDataBudgets(false, true);
  reload();
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
      clickedBudget = btn.parentElement.parentElement;
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
      clickedBudget = btn.parentElement.parentElement;
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

function setBudgetTemplate(id, name, image, budget) {
  // ulParent.innerHTML = " ";
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
}

setBudgetLimitBtn.addEventListener("click", () => {
  closeBudgetBox();
  let id = setBudgetLimitBtn.dataset.categoryId;
  let name = document.querySelector(".budget-category-name").textContent;
  let image = document.querySelector(".set-budget-icon").getAttribute("src");
  let budget = document.getElementById("budget-value").value.trim();

  // parent.innerHTML = "";

  document.getElementById("budget-value").value = " ";
  reload();

  try {
    if (Number(budget) > 0) {
      let userId = "66efd1552e03ec45ce74d5fd";
      let data = { categoryId: id, budget, userId };
      createBudgetDb(userId, data);
      setBudgetTemplate(id, name, image, budget);
      reload();
      clickedBudget.remove();
    }
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
  threeDots.forEach((dot) => {
    if (dot.contains(e.target)) {
      dots = false;
    }
  });
  options.forEach((opt) => {
    if (opt.contains(e.target)) {
      opt = false;
    }
  });
  setBudgetBtns.forEach((btn) => {
    if (btn.contains(e.target)) {
      isBtnClick = false;
    }
  });
  if (!budgetBox.contains(e.target) && isBtnClick) {
    closeBudgetBox();
  }

  changeLimitBtn.forEach((dot) => {
    if (dot.contains(e.target)) {
      isBtnClick = false;
    }
  });
  if (!editBudgetBox.contains(e.target) && isBtnClick) {
    closeEditBox();
  }
  if (dots && opt) {
    options.forEach((option) => option.classList.remove("active"));
  }
});

//-------------READ BUDGETS -----------------------
async function loadDataBudgets(budget, unBudget) {
  let req = await fetch(
    `https://penny-partner-api.onrender.com/api/v1/users/budgets/66efd1552e03ec45ce74d5fd`
  );
  let res = await req.json();

  if (res.status == "success") {
    let { data } = res;
    if (budget && unBudget) {
      ulParent.innerHTML = " ";

      let unBudgeted = data[0].unBudgeted;
      let budgeted = data[0].budgeted;

      budgeted.forEach((data) => {
        let { budget, _id } = data;
        let { image, name } = data.categoryId;
        setBudgetTemplate(_id, name, image, budget);
      });
      unBudgeted.forEach((item) => {
        baseTemplate(item.name, item.image, item._id);
      });
    } else {
      parent.innerHTML = "";

      let unBudgeted = data[0].unBudgeted;
      unBudgeted.forEach((item) => {
        baseTemplate(item.name, item.image, item._id);
      });
    }
    reload();
  }
}
loadDataBudgets(true, true);

//--------------------CREATE BUDGETS---------------------
async function createBudgetDb(userId, data) {
  const date = new Date();
  const formattedMonth = date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  data.month = formattedMonth;
  let req = await fetch(
    `https://penny-partner-api.onrender.com/api/v1/users/budgets/${userId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  let res = await req.json();
  console.log(res);
}

//--------------------REMOVE BUDGETS---------------------
async function removeBudgetDb(budgetId) {
  let req = await fetch(
    `https://penny-partner-api.onrender.com/api/v1/users/budgets/${budgetId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );

  console.log("Successfully remoed");
}
