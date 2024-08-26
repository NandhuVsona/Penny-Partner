import { expenseCategories } from "./data/categories.js";

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

//function for localstorage
let data = JSON.parse(localStorage.getItem("data")) || [];
data.forEach((item) => {
  let existingAccounts = document.querySelector(".parent-box");
  let template = `<li data-id="${item.id}" class="bunch-account">
                  <div class="left-part">
                    <img src="${item.imageSrc}" alt="">
                    <p class="semi-bold">${item.accountName}</p>
                  </div>
                  <p class="semi-bold green">₹${item.formatedAmount}</p>
                </li>`;
  existingAccounts.innerHTML += template;
});

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
let selectAccountBtn = document.querySelector(".sub-head-two .account-body");
let selectCatBtn = document.querySelector(".sub-head-two .category-body");
let selectAccountBody = document.querySelector(".account-options-body");
let bunchAccounts = document.querySelectorAll(".bunch-account");
let selectedCatImg = document.querySelector(".category-body .child-body img");
let selectedCatName = document.querySelector(".category-body .child-body p");
let saveTransactionBtn = document.querySelector(".add-transcation-save-btn");

let selectedCatBody = document.querySelector(".category-options-body");
let addtransactonAccImg = document.querySelector(
  ".account-body .child-body img"
);
let addtransactonAccName = document.querySelector(
  ".account-body .child-body p"
);
let categoryOptions = document.querySelector(
  ".category-options-body .parent-box"
);

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
  document.querySelector(".parent-detail-view").classList.add("active");
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
    detailView.classList.remove("verified");
  }
});

addItem.addEventListener("click", () => {
  selectAccountBody.classList.remove("active");
  selectedCatBody.classList.remove("active");
  document.querySelector(".input-containers").classList.add("active");
  // history.pushState({ cardOpened: true }, " ", "card");
});
InputBoxClose.addEventListener("click", () => {
  document.querySelector(".input-containers").classList.remove("active");
  // history.back();
});
window.addEventListener("popstate", (e) => {
  document.querySelector(".input-containers").classList.remove("active");
});
let calcBtns = document.querySelectorAll(".btns");
let values = document.querySelector(".calc-values");
let result = document.querySelector(".calc-answer");
let query = " ";
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

selectAccountBtn.addEventListener("click", () => {
  selectedCatBody.classList.remove("active");
  selectAccountBody.classList.toggle("active");
});

bunchAccounts.forEach((acc) => {
  acc.addEventListener("click", () => {
    selectAccountBody.classList.remove("active");
    let selectedAccount = acc.dataset.id;

    document.querySelector(".account-body .child-body").dataset.id =
      selectedAccount;

    let accountData = data.filter((d) => d.id == selectedAccount);
    addtransactonAccImg.setAttribute("src", accountData[0].imageSrc);
    addtransactonAccImg.style.filter = "invert(0)";
    addtransactonAccName.textContent =
      accountData[0].accountName.length > 6
        ? accountData[0].accountName.slice(0, 6) + ".."
        : accountData[0].accountName;
  });
});

expenseCategories.forEach((cat) => {
  let template = `<li data-id=${cat.id} class="bunch-category">
                  <img src="${cat.image}" alt="" />
                  <small>${cat.name}</small>
                </li>`;
  categoryOptions.innerHTML += template;
});

selectCatBtn.addEventListener("click", () => {
  selectAccountBody.classList.remove("active");
  selectedCatBody.classList.toggle("active");
});

let bunchCategory = document.querySelectorAll(".bunch-category");

bunchCategory.forEach((cat) => {
  cat.addEventListener("click", () => {
    selectedCatBody.classList.remove("active");
    let selectedCat = cat.dataset.id;
    let accountData = expenseCategories.filter((d) => d.id == selectedCat);
    document.querySelector(".category-body .child-body").dataset.id =
      selectedCat;

    selectedCatImg.setAttribute("src", accountData[0].image);
    selectedCatImg.style.filter = "invert(0)";
    selectedCatName.textContent =
      accountData[0].name.length > 8
        ? accountData[0].name.slice(0, 8) + ".."
        : accountData[0].name;
  });
});

function verification() {
  let accId = document.querySelector(".account-body .child-body").dataset.id;

  let accIdIsSame = accId != "7876543310" ? false : true;
  if (accIdIsSame) {
    let errorData = {
      title: "Account Error",
      message: "Please select an account.",
    };
    showMessage(errorData);
    return false;
  }
  let catId = document.querySelector(".category-body .child-body").dataset.id;

  let catIdIsSame = catId != "2876543210" ? false : true;
  if (catIdIsSame) {
    let errorData = {
      title: "Category Error",
      message: "Please select category.",
    };
    showMessage(errorData);
    return false;
  }
  let amount;
  let isValid = false;
  let calcAnswer = document.querySelector(".calc-values").textContent;
  try {
    if (calcAnswer < 0) {
      let errorData = {
        title: "Negative number",
        message: "Please provide positive number ",
      };
      showMessage(errorData);
      return false;
    } else if (calcAnswer == "" || calcAnswer == 0) {
      let errorData = {
        title: "Amount Error !",
        message: "please enter the amount.. ",
      };
      showMessage(errorData);
      return false;
    }
    amount = eval(calcAnswer);
    isValid = true;
  } catch (err) {
    let errorData = {
      title: "Math Error",
      message: "Invalid expression",
    };
    showMessage(errorData);
    return false;
  }

  let description =
    document.getElementById("description-notes").value.trim() || "No notes";

  let { accountName, imageSrc, id } = data.filter((d) => d.id == accId)[0];

  let { name, image } = expenseCategories.filter((e) => e.id == catId)[0];

  let trans = [
    {
      id: Math.ceil(Math.random() * 10000000),
      category: {
        name,
        icon: image,
        type: "expense",
      },
      account: {
        id,
        name: accountName,
        icon: imageSrc,
      },
      amount,
      date: "2024-08-01",
      description,
    },
  ];
  let sturcturedData = {
    date: "Aug 17, Saturday",
    transactions: trans,
  };
  return sturcturedData;
}
saveTransactionBtn.addEventListener("click", () => {
  
  let isVerified = verification();

  if (isVerified) {
    // transactionHistory.push(isVerified);
    parentTemplate(isVerified.date,isVerified.transactions)
    document.querySelectorAll(".sub-content li").forEach((li) => {
      li.addEventListener("click", () => {
        let id = li.dataset.id;
        document.querySelector(".parent-detail-view").classList.add('verified')
        openDetailView(id);
      });
    });
    document.querySelector(".input-containers").classList.remove("active");
  }
  
});

function showMessage(value) {
  let title = document.querySelector(".message-box .message");
  let text = document.querySelector(".message-box .text");
  text.textContent = value.message;
  title.textContent = value.title;
  //for tostal
  let successWidth = 100;

  document.querySelector(".success-tostal").style.display = "flex";
  const successIntervalId = setInterval(() => {
    document.querySelector(".success-line").style.width =
      successWidth - 1 + "%";
    if (successWidth <= -10) {
      clearInterval(successIntervalId);
      document.querySelector(".success-tostal").style.display = "none";
      document.querySelector(".success-line").style.width = "100%";
      successWidth = 0;
    }
    successWidth--;
  }, 50);
}
