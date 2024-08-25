function goFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    /* Safari */
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    /* IE11 */
    document.documentElement.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

let fullScreenMode = document.querySelector(".view-mode");
fullScreenMode.addEventListener("click", () => {
  fullScreenMode.classList.toggle("activate");

  if (fullScreenMode.classList.contains("activate")) {
    goFullscreen();
  } else {
    exitFullscreen();
  }
});

// Call the function when the page is loaded or based on user action

//heme page functionality------------------------------------------------------------

import { transactionHistory } from "./data/homedata.js";

let mainContent = document.querySelector(".main-content");

let dataAnalysContainer = document.querySelector(".data-container");
let analysisOpt = document.querySelectorAll(".category-options p");
let currentView = document.querySelector(".current-view");
let detailView = document.querySelector(".parent-detail-view");
let addItem = document.querySelector(".add-item");
let InputBoxClose = document.querySelector(".input-box-close");

transactionHistory.forEach((item) => {
  let { date, transactions } = item;
  parentTemplate(date, transactions);
});

function childTemplate(transactions) {
  let content = "";
  transactions.forEach((item) => {
    let template = `<li data-id="${item.id}">
                    <div class="transaction-info">
                      <img
                        src="${item.category.icon}"
                        alt=""
                        class="transaction-icon"
                      />
                      <div class="cat-account">
                        <div class="category-name little-bold">${item.category.name}</div>
                        <div class="transaction-account-info">
                          <img
                            src="${item.account.icon}"
                            alt=""
                            class="account-icon"
                          />
                          <small class="account-name">${item.account.name}</small>
                        </div>
                      </div>
                    </div>
                    <div class="transaction-amount">
                      <p class="amount ${item.category.type}">₹${item.amount}</p>
                    </div>
                  </li>`;
    content += template;
  });
  return content;
}
function parentTemplate(date, transactions) {
  let template = `<div class="sub-content">
                <div class="added-day-info semi-bold">${date}</div>
                <ul class="transaction-history">
                  ${childTemplate(transactions)}
                </ul>
              </div>`;
  mainContent.innerHTML += template;
}

let expenseTags = document.querySelectorAll(".expense-box p+p");
let incomeTags = document.querySelectorAll(".income-box p+p");
let totalTags = document.querySelectorAll(".total-box p+p");
let incomeAmount = 0;
let expenseAmount = 0;

//for incomes
transactionHistory.forEach((data) => {
  let { transactions } = data;
  incomeAmount += transactions.reduce((accumulator, item) => {
    if (item.category.type == "income") {
      return accumulator + item.amount;
    } else {
      return accumulator + 0;
    }
  }, 0);

  expenseAmount += transactions.reduce((accumulator, item) => {
    if (item.category.type == "expense") {
      return accumulator + item.amount;
    } else {
      return accumulator + 0;
    }
  }, 0);
});

incomeTags.forEach((tag) => {
  tag.innerHTML = "₹" + incomeAmount.toLocaleString();
});

expenseTags.forEach((tag) => {
  tag.innerHTML = "₹" + expenseAmount.toLocaleString();
});

totalTags.forEach((tag) => {
  tag.innerHTML = "₹" + (incomeAmount - expenseAmount).toLocaleString();
});

function analysis(src, name, amount, percentage) {
  let template = `<li>
                  <div class="img-container">
                    <img src="${src}" alt="" />
                  </div>
                  <div class="text-amount-bar">
                    <div class="category-name-analysis">
                      <p class="little-bold">${name}</p>
                      <div class="money-value">₹${amount}</div>
                    </div>
                    <div class="analysis-bar-container">
                      <div class="analysis-bar" style="width:${percentage}%;"></div>
                    </div>
                  </div>
                  <div class="percentage little-bold">${percentage}%</div>
                </li>`;
  dataAnalysContainer.innerHTML += template;
}
overview("income");

function overview(category) {
  dataAnalysContainer.innerHTML = " ";
  transactionHistory.forEach((data) => {
    let { transactions } = data;
    transactions.forEach((item) => {
      if (item.category.type == category) {
        let amount = item.amount;
        let divideValue = category == "income" ? incomeAmount : expenseAmount;
        let name = item.category.name;
        let src = item.category.icon;
        let percentage = ((amount / divideValue) * 100).toFixed("2");
        analysis(src, name, amount, percentage);
      }
    });
  });
}

analysisOpt.forEach((opt) => {
  opt.addEventListener("click", (e) => {
    document.querySelector(".category-options").classList.remove("active");
    currentView.innerHTML = e.target.textContent.toUpperCase();

    if (e.target.classList.contains("expense-view")) {
      overview("expense");
    } else {
      overview("income");
    }
  });
});

//Detail view box
let viewLi = document.querySelectorAll(".sub-content li");

viewLi.forEach((li) => {
  li.addEventListener("click", () => {
    let id = li.dataset.id;
    openDetailView(id);
  });
});
function openDetailView(id) {
  detailView.classList.add("active");
  let incomeName = document.querySelector(".category-name-detail");
  let amount = document.querySelector(".respective-amount");
  let notes = document.querySelector(".notes p");
  let accountImg = document.querySelector(".accountImg");
  let categoryImg = document.querySelector(".categoryImg");
  let card = document.querySelector(".card-top");
  let cInfo = document.querySelector(".c-info");
  let aInfo = document.querySelector(".a-info");
  if (
    card.classList.contains("incomeBg") ||
    card.classList.contains("expenseBg")
  ) {
    card.classList.remove("incomeBg");
    card.classList.remove("expenseBg");
  }

  let data = new Array();
  let togetherData = [];
  transactionHistory.forEach((item) => {
    let { transactions } = item;

    transactions.forEach((i) => togetherData.push(i));
  });
  data.push(togetherData.filter((data) => data.id == id));
  let info = data[0][0];
  notes.textContent = info.description;
  amount.textContent = "₹" + info.amount;
  incomeName.textContent = info.category.type;
  accountImg.setAttribute("src", info.account.icon);
  categoryImg.setAttribute("src", info.category.icon);
  aInfo.textContent = info.account.name;
  cInfo.textContent = info.category.name;
  card.classList.add(info.category.type + "Bg");
}

document.addEventListener("click", (e) => {
  let isList = true;
  viewLi.forEach((li) => {
    if (li.contains(e.target)) {
      isList = false;
    }
  });
  if (
    !document.querySelector(".detail-view-container").contains(e.target) &&
    isList
  ) {
    detailView.classList.remove("active");
  }
});

addItem.addEventListener("click", () => {
  document.querySelector(".input-containers").classList.add("active")
 
});
InputBoxClose.addEventListener("click", () => {
  document.querySelector(".input-containers").classList.remove("active")

});

let calcBtns = document.querySelectorAll(".btns");
let values = document.querySelector(".calc-values");
let result = document.querySelector(".calc-answer");
let query = "";
calcBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.value == "=") {
      values.innerHTML = eval(query);
      result.innerHTML = "";
      query = eval(query);
      return;
    } else if (btn.value === "c") {
      values.innerHTML = "";
      query = " ";
      result.innerHTML = "";
      return;
    }
    values.innerHTML += btn.value;
    query += btn.value;

    result.innerHTML = eval(query);
  });
});
