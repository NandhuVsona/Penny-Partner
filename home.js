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

document.addEventListener("dblclick", goFullscreen);
// Call the function when the page is loaded or based on user action

//heme page functionality------------------------------------------------------------

import { transactionHistory } from "./data/homedata.js";

let mainContent = document.querySelector(".main-content");
let dataAnalysContainer = document.querySelector(".data-container");

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

transactionHistory.forEach((data) => {
  let { transactions } = data;
  transactions.forEach(item => {
    if (item.category.type == "income") {
      let amount = item.amount;
      let name = item.category.name;
      let src = item.category.icon;
      let percentage = ((amount / incomeAmount) * 100).toFixed('2');
      analysis(src, name, amount, percentage);
    }
  });
});
