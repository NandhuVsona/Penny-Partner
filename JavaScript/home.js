// import {
//   expenseCategories,
//   incomeCategories,
//   transferCategories,
// } from "../data/categories.js";

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

// let togetherCategories = [];
// expenseCategories.forEach((i) => togetherCategories.push(i));
// incomeCategories.forEach((i) => togetherCategories.push(i));
// transferCategories.forEach((i) => togetherCategories.push(i));

// ==============================================
let expenseCategories;
let incomeCategories;
let accounts;
async function getAccountsAndCategories() {
  let req = await fetch(
    `https://penny-partner-api.onrender.com/api/v1/users/data/66efd1552e03ec45ce74d5fd`
  );
  let res = await req.json();

  if (res.status === "success") {
    expenseCategories = res.expenseCategories;
    incomeCategories = res.incomeCategories;
    accounts = res.accounts;
    changeCategory(1);
    loadUserAccounts(accounts);
  }
}
getAccountsAndCategories();

function loadUserAccounts(data) {
  data.forEach((item) => {
    let existingAccounts = document.querySelector(".parent-box");
    let template = `<li data-account-id="${item._id}" class="bunch-account">
                  <div class="left-part">
                    <img src="${item.icon}" alt="">
                    <p class="semi-bold">${item.accountName}</p>
                  </div>
                  <p class="semi-bold green">₹${item.balance}</p>
                </li>`;
    existingAccounts.innerHTML += template;
    accountEventListener();
  });
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

import { transactionHistory } from "../data/homedata.js";

let mainContent = document.querySelector(".main-content");
let clickedView;
let categoryTicked = document.getElementById("category-ticked");
let dataAnalysContainer = document.querySelector(".data-container");
let analysisOpt = document.querySelectorAll(".category-options p");
let currentView = document.querySelector(".current-view");
let detailView = document.querySelector(".parent-detail-view");
let addItem = document.querySelector(".add-item");
let InputBoxClose = document.querySelector(".input-box-close");
let selectAccountBtn = document.querySelector(".sub-head-two .account-body");
let selectCatBtn = document.querySelector(".sub-head-two .category-body");
let selectAccountBody = document.querySelector(".account-options-body");

let categoryTick = document.querySelectorAll(".sub-head-one li");
let selectedCatImg = document.querySelector(".category-body .child-body img");
let selectedCatName = document.querySelector(".category-body .child-body p");
let saveTransactionBtn = document.querySelector(".add-transcation-save-btn");
let deleteHis = document.getElementsByClassName("delete-history");
let selectedCatBody = document.querySelector(".category-options-body");
let showReviews = document.querySelector(".rating-reviews");
let rrContainer = document.querySelector(".rr-container");
let myAccount = document.querySelector(".my-account-container");
let myAccountBtn = document.querySelector(".show-my-account");
let addtransactonAccImg = document.querySelector(
  ".account-body .child-body img"
);
let addtransactonAccName = document.querySelector(
  ".account-body .child-body p"
);
let categoryOptions = document.querySelector(
  ".category-options-body .parent-box"
);

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function childTemplate(transactions) {
  let content = "";
  transactions.forEach((item) => {
    if (item.category.type == "transfer") {
      let transferTemplate = `<li data-transaction-id="${item._id}">
                      <div class="transaction-info">
                        <img
                          src="icons/Income-expense/transfer.jpg"
                          alt=""
                          class="transaction-icon"
                        />
                        <div class="cat-account">
                          <div class="category-name little-bold">Transfer</div>
                          <div class="transaction-account-info">
                            <img
                              src="${item.account[0].icon}"
                              alt=""
                              class="account-icon"
                            />
                             <small class="account-name">${item.account[0].accountName}</small>
                              <img
                              src="icons/tarrow.svg"
                              alt=""
                              class="account-icon"
                            />
                            <img
                              src="${item.category[0].image}"
                              alt=""
                              class="account-icon"
                            />
                             <small class="account-name">${item.category[0].name}</small>
                          </div>
                        </div>
                      </div>
                     
                      <div class="transaction-amount">
                        <p class="amount ${item.category[0].type}">₹${item.amount}</p>
                      </div>
                       <small style="display: none;" >${item.description}</small>
                    </li>`;
      content += transferTemplate;
    } else {
      let template = `<li data-transaction-id="${item._id}">
                      <div class="transaction-info">
                        <img
                          src="${item.category[0].image}"
                          alt=""
                          class="transaction-icon"
                        />
                        <div class="cat-account">
                          <div class="category-name little-bold">${item.category[0].name}</div>
                          <div class="transaction-account-info">
                            <img
                              src="${item.account[0].icon}"
                              alt=""
                              class="account-icon"
                            />
                            <small class="account-name">${item.account[0].accountName}</small>
                          </div>
                        </div>
                      </div>
                    
                      <div class="transaction-amount">
                        <p class="amount ${item.category[0].type}">₹${item.amount}</p>
                      </div>
                      <small style="display: none;" >${item.description}</small>
                    </li>`;
      content += template;
    }
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

// //for incomes
// transactionHistory.forEach((data) => {
//   let { transactions } = data;
//   incomeAmount += transactions.reduce((accumulator, item) => {
//     if (item.category.type == "income") {
//       return accumulator + item.amount;
//     } else {
//       return accumulator + 0;
//     }
//   }, 0);

//   expenseAmount += transactions.reduce((accumulator, item) => {
//     if (item.category.type == "expense") {
//       return accumulator + item.amount;
//     } else {
//       return accumulator + 0;
//     }
//   }, 0);
// });

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
//  overview("income");

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
  let cardOperations = document.querySelector(".card-operations");
  let type = document.querySelector(".category-name-detail");
  if (
    card.classList.contains("incomeBg") ||
    card.classList.contains("expenseBg")
  ) {
    card.classList.remove("incomeBg");
    card.classList.remove("expenseBg");
  }

  notes.textContent = clickedView.lastElementChild.textContent;
  amount.textContent = clickedView.children[1].children[0].textContent;
  incomeName.textContent = "";
  accountImg.setAttribute(
    "src",
    clickedView.children[0].children[1].lastElementChild.children[0].getAttribute(
      "src"
    )
  );
  categoryImg.setAttribute(
    "src",
    clickedView.children[0].children[0].getAttribute("src")
  );
  aInfo.textContent =
    clickedView.children[0].children[1].lastElementChild.children[1].textContent;
  cInfo.textContent =
    clickedView.children[0].children[1].children[0].textContent;
  cardOperations.dataset.transactionId = clickedView.dataset.transactionId;
  card.classList.add(
    `${clickedView.children[1].children[0]
      .getAttribute("class")
      .split(" ")
      .slice(1)}` + "Bg"
  );
  type.textContent = `${clickedView.children[1].children[0]
    .getAttribute("class")
    .split(" ")
    .slice(1)}`;
}

document.addEventListener("click", (e) => {
  let viewLi = document.querySelectorAll(".sub-content li");
  let isList = true;
  viewLi.forEach((li) => {
    if (li.contains(e.target)) {
      isList = false;
    }
  });
  try {
    if (
      !document.querySelector(".detail-view-container").contains(e.target) &&
      isList
    ) {
      detailView.classList.remove("active");
    }
  } catch (err) {
    console.log(err);
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

function accountEventListener() {
  let bunchAccounts = document.querySelectorAll(".bunch-account");
  bunchAccounts.forEach((acc) => {
    acc.addEventListener("click", () => {
      selectAccountBody.classList.remove("active");
      let selectedAccountId = acc.dataset.accountId;

      document.querySelector(".account-body .child-body").dataset.id =
        selectedAccountId;

      let accountName = acc.firstElementChild.children[1].textContent;
      addtransactonAccImg.setAttribute(
        "src",
        acc.firstElementChild.children[0].getAttribute("src")
      );
      addtransactonAccImg.style.filter = "invert(0)";
      addtransactonAccName.textContent =
        accountName.length > 6 ? accountName.slice(0, 6) + ".." : accountName;
    });
  });
}

selectCatBtn.addEventListener("click", () => {
  selectAccountBody.classList.remove("active");
  selectedCatBody.classList.toggle("active");
});
changeAndUpdate();
function changeAndUpdate() {
  let bunchCategory = document.querySelectorAll(".bunch-category");

  bunchCategory.forEach((cat) => {
    cat.addEventListener("click", () => {
      selectedCatBody.classList.remove("active");
      let selectedCatId = cat.dataset.categoryId;

      document.querySelector(".category-body .child-body").dataset.id =
        selectedCatId;
      console.log();
      console.log();

      selectedCatImg.setAttribute(
        "src",
        cat.firstElementChild.getAttribute("src")
      );
      selectedCatImg.classList.add("imgSvg");
      let categoryName = cat.lastElementChild.textContent;
      selectedCatName.textContent =
        categoryName.length > 8
          ? categoryName.slice(0, 8) + ".."
          : categoryName;
    });
  });
}

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

  let accountName = document.querySelector(
    ".account-body .child-body p"
  ).textContent;
  let accountIcon = document
    .querySelector(".child-body img")
    .getAttribute("src");
  let accountId = accId;

  let categoryName = document.querySelector(
    ".category-body .child-body p"
  ).textContent;
  let categoryIcon = document
    .querySelector(".category-body .child-body img")
    .getAttribute("src");
  let categoryId;

  let whatType = "";
  categoryTick.forEach((cat) => {
    if (cat.children[0].getAttribute("src")) {
      if (cat.value == 0) {
        whatType = "income";
      } else if (cat.value == 1) {
        whatType = "expense";
      } else {
        whatType = "transfer";
      }
    }
  });

  if (whatType == "transfer" && others.id == id) {
    let errorData = {
      title: "Same Account",
      message: "Choose different account",
    };
    showMessage(errorData);
    return false;
  }
  const date = new Date();
  const options = { month: "long", year: "numeric" };
  const month = date.toLocaleDateString("en-US", options);

  const dateOptions = { month: "short", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    date
  );

  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    date
  );

  const finalFormattedDate = `${formattedDate}, ${weekday}`;
  let userId = "66efd1552e03ec45ce74d5fd";
  let sturcturedData = {
    month,
    category: catId,
    account: accId,
    amount,
    date: finalFormattedDate,
    description,
    userId
  };
  return sturcturedData;
}

saveTransactionBtn.addEventListener("click", () => {
  let isVerified = verification();
  let userId = "66efd1552e03ec45ce74d5fd";
  if (isVerified) {
    saveRecordToDb(userId, isVerified);
    // mainContent.innerHTML = " ";

    // let { date, transactions } = isVerified;
    // parentTemplate(date, transactions);

    loadHistory(`${months[month]} ${year}`);

    // document.querySelectorAll(".sub-content li").forEach((li) => {
    //   li.addEventListener("click", () => {
    //     let id = li.dataset.transactionId;
    //     clickedView = li;
    //     openDetailView(id);
    //   });
    // });
    deleteView();
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

function deleteView() {
  for (let i = 0; i < deleteHis.length; i++) {
    deleteHis[i].addEventListener("click", () => {
      let deleteId = deleteHis[i].parentElement.dataset.id;
      detailView.classList.remove("active");

      if (clickedView.parentElement.children.length == 1) {
        clickedView.parentElement.parentElement.remove();
      } else {
        clickedView.remove();
      }
      deleteRecordToDb(clickedView.dataset.transactionId);
    });
  }
}
deleteView();
let catLabel = document.querySelector(".category-body p");
categoryTick.forEach((item, index) => {
  item.addEventListener("click", () => {
    document.querySelector(
      ".category-body .child-body"
    ).dataset.id = 2876543210;

    selectedCatImg.setAttribute("src", "icons/category.svg");
    selectedCatImg.style.filter = "invert(0)";
    selectedCatImg.classList.add("imgSvg");
    selectedCatName.textContent = "Category";
    categoryTick.forEach((cat) => cat.children[0].removeAttribute("src"));
    categoryTick[index].children[0].setAttribute("src", "icons/tick.svg");
    if (categoryTick[index].value == 0) {
      catLabel.textContent = "Category";
      categoryTicked.value = 0;
      changeCategory(0);
    } else if (categoryTick[index].value == 1) {
      catLabel.textContent = "Category";
      categoryTicked.value = 1;
      changeCategory(1);
    } else {
      catLabel.textContent = "Account";
      selectedCatImg.setAttribute("src", "icons/account.svg");
      selectedCatImg.style.filter = "invert(0)";
      selectedCatName.textContent = "Account";
      changeCategory(2);
    }
    changeAndUpdate();
  });
});

//Functionality for review page
showReviews.addEventListener("click", () => {
  document.querySelector(".sidebar").classList.remove("active");
  rrContainer.classList.toggle("active");
});

// Back butn functionality

let backBtn = document.querySelector(".review-back-btn");
let reviewBox = document.querySelector(".review-input-container");

backBtn.addEventListener("click", goHomePage);

function goHomePage() {
  if (
    reviewBox.classList.contains("active") &&
    rrContainer.classList.contains("active")
  ) {
    reviewBox.classList.remove("active");
  } else {
    rrContainer.classList.remove("active");
  }
}

myAccountBtn.addEventListener("click", () => {
  myAccount.classList.add("active");
});

document.querySelector(".account-back-btn").addEventListener("click", () => {
  myAccount.classList.remove("active");
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentDate = new Date();
let x = currentDate.getMonth(); // 0-indexed
let month = x;
let year = currentDate.getFullYear();
document
  .querySelectorAll(".month")
  .forEach((head) => (head.innerHTML = `${months[month]} ${year}`));

// Function to update the date
function changeDate(increament) {
  month = month + increament;

  if (month > 11) {
    month = 0;
    year++;
  }
  if (month < 0) {
    year--;
    month = 11;
  }

  // Display the updated date
  document
    .querySelectorAll(".month")
    .forEach((head) => (head.innerHTML = `${months[month]} ${year}`));
  loadHistory(`${months[month]} ${year}`);
}

// Initial date display

let leftArrows = document.querySelectorAll(".left-arrow");
let rightArrows = document.querySelectorAll(".right-arrow");
leftArrows.forEach((larrow) => {
  larrow.addEventListener("click", () => {
    changeDate(-1);
  });
});
rightArrows.forEach((rarrow) => {
  rarrow.addEventListener("click", () => {
    changeDate(1);
  });
});

function reloadDetailveiw() {
  let viewLi = document.querySelectorAll(".transaction-history li");

  viewLi.forEach((li) => {
    li.addEventListener("click", () => {
      clickedView = li;
      let id = li.dataset.transactionId;
      openDetailView(id);
    });
  });
}

function loadHistory(value) {
  let requestedData = transactionHistory.filter(
    (record) => record.month == value
  );

  if (requestedData.length > 0) {
    mainContent.innerHTML = "";
    requestedData.forEach((item) => {
      let { id, month, data } = item;
      data.forEach((his) => {
        let { date, transactions } = his;

        // parentTemplate(date, transactions);
        // reloadDetailveiw();
      });
    });
  } else {
    mainContent.innerHTML = `<div class="no-content-container">
                <img src="images/404.png" alt="" />
                <p>
                  No record in this month. Tap + to add new expense or income.
                </p>
              </div>`;
  }
}

loadHistory(`${months[month]} ${year}`);

let navIcons = document.querySelectorAll(".side-footer .menu li");
let pages = document.querySelectorAll("main section");
navIcons.forEach((icon, index) => {
  icon.addEventListener("click", () => changePage(icon, index));
});

function changePage(page, index) {
  pages.forEach((page) => page.classList.remove("active"));
  pages[index].classList.add("active");
}

//--------------READ RECORDS--------------------------
async function loadData(userId, month) {
  try {
    let req = await fetch(
      `https://penny-partner-api.onrender.com/api/v1/users/transactions/${userId}`
    );
    let res = await req.json();
    if (res.status === "success") {
      let { data } = res;
      console.log(data);
      data.forEach((record) => {
        parentTemplate(record._id, record.transactions);
        reloadDetailveiw();
      });
    }
  } catch (err) {
    console.log(err.message);
  }
}
loadData("66efd1552e03ec45ce74d5fd");

//--------------DELETE RECORDS--------------------------
async function deleteRecordToDb(transactionId) {
  try {
    let response = await fetch(
      `https://penny-partner-api.onrender.com/api/v1/users/transactions/${transactionId}`,
      {
        method: "DELETE",
      }
    );

    // Check if deletion was successful
    if (response.status === 204) {
      console.log("Successfully deleted 💥");
    } else {
      const errorData = await response.json();
      console.error("Failed to delete:", errorData);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

//--------------SAVE RECORDS--------------------------
async function saveRecordToDb(userId, data) {
  try {
    let response = await fetch(
      `https://penny-partner-api.onrender.com/api/v1/users/transactions/${userId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (response.status === 201) {
      console.log("Successfully created 🎉");
    } else {
      const errorData = await response.json();
      console.error("Failed to delete:", errorData);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function changeCategory(num) {
  categoryOptions.innerHTML = " ";
  if (num == 1) {
    expenseCategories.forEach((cat) => {
      let template = `<li data-category-id=${cat._id} class="bunch-category">
                        <img src="${cat.image}" alt="" />
                        <small>${
                          cat.name.length > 8
                            ? cat.name.slice(0, 6) + ".."
                            : cat.name
                        }</small>
                      </li>`;
      categoryOptions.innerHTML += template;
    });
  } else if (num == 0) {
    incomeCategories.forEach((cat) => {
      let template = `<li data-category-id=${cat._id} class="bunch-category">
                        <img src="${cat.image}" alt="" />
                        <small>${cat.name}</small>
                      </li>`;
      categoryOptions.innerHTML += template;
    });
  } else {
    accounts.forEach((cat) => {
      let template = `<li data-category-id="${cat._id}" class="bunch-category transfer">
                                          <div class="left-part">
                      <img src="${cat.icon}" alt="">
                      <p class="semi-bold">${cat.accountName}</p>
                    </div>
                    <p class="semi-bold green">₹${cat.balance}</p>
                  </li>`;

      categoryOptions.innerHTML += template;
    });
  }
}
