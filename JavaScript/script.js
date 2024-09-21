import { saveAccount, updateAccount } from "./functions.js";

//function for localstorage
// let data = JSON.parse(localStorage.getItem("data")) || [];
function renderAccounts(data){
 
  data.forEach((item) => {
    let existingAccounts = document.querySelector(".accounts");
    let template = `<li class="card">
                  <div class="card-body">
                    <img class="icon" src="${item.icon}" alt="" />
                    <div class="card-info">
                      <p class="bold">${item.accountName}</p>
                      <p>Balance: <span class="green bold">₹${item.balance.toLocaleString()}</span></p>
                    </div>
                  </div>
                  <div class="operations">
                    <img class="dot svg" src="icons/dot.svg" alt="" />
                    <div class="options" data-id="${item._id}">
                      <p class="edit-btn">Edit</p>
                      <p class="delete-account">Delete</p>
                    </div>
                  </div>
                </li>`;
    existingAccounts.innerHTML += template;
  });
  
}
let isDark = JSON.parse(localStorage.getItem("Theme"));

if (isDark) {
  document.querySelector(".app").classList.add("dark");
}
let navIcons = document.querySelectorAll("footer nav ul li");
let pages = document.querySelectorAll("main section");
let closeSideBar = document.querySelector(".close");
let sideBar = document.querySelector(".sidebar");
let accountPage = document.querySelector(".account");
let hamburger = document.querySelector(".hamburger");
let addAccountBtn = document.querySelector(".add-box");
let accountBox = document.querySelector(".box-body");
let cancelAddAccount = document.querySelector(".cancel-add-account");
let saveAccountBtn = document.querySelector(".save-accont-btn");
let cancelEdit = document.querySelector(".cancelEdit");
let updateEdit = document.querySelector(".updateBtn");
let accountsList = document.querySelectorAll(".account-list li");
let accountDelBtn = document.querySelectorAll(".delete-account");
let dots = document.querySelectorAll(".operations .dot");
let options = document.querySelectorAll(".operations .options");
let editBox = document.querySelector(".edit-box-body");
let preference = document.querySelector(".theme");
let categoryBox = document.querySelector(".category-box-body");
let addCategoryBtn = document.querySelector(".add-category .add-box");
let categoryContainer = document.querySelector(
  ".categories .category-container"
);
let accountContainer = document.querySelector(".account-container");

preference.addEventListener("click", () => {
  let app = document.querySelector(".app");
  app.classList.toggle("dark");
  if (app.classList.contains("dark")) {
    localStorage.setItem("Theme", "true");
  } else {
    localStorage.setItem("Theme", "false");
  }
});

cancelAddAccount.addEventListener("click", closeAccountBox);
saveAccountBtn.addEventListener("click", saveAccount);
cancelEdit.addEventListener("click", closeEditBox);
updateEdit.addEventListener("click", updateAccount);
navIcons.forEach((icon, index) => {
  icon.addEventListener("click", () => changePage(icon, index));
});

function changePage(page, index) {
  pages.forEach((page) => page.classList.remove("active"));
  pages[index].classList.add("active");
}

closeSideBar.addEventListener("click", () => {
  sideBar.classList.remove("active");
});
hamburger.addEventListener("click", () => sideBar.classList.add("active"));

document.addEventListener("click", (e) => {
  if (!sideBar.contains(e.target) && !hamburger.contains(e.target)) {
    sideBar.classList.remove("active");
  }
  if (!addAccountBtn.contains(e.target) && !accountBox.contains(e.target)) {
    accountBox.classList.remove("active");
    accountContainer.classList.remove("blurbg");
  }

  if (!categoryBox.contains(e.target) && !addCategoryBtn.contains(e.target)) {
    categoryBox.classList.remove("active");
    categoryContainer.classList.remove("blurbg");
  }

  let isoptionBox;
  let dots = document.querySelectorAll(".operations .dot");
  let options = document.querySelectorAll(".operations .options");

  let catedots = document.querySelectorAll(".right-portion .dot");
  let cateoptions = document.querySelectorAll(".right-portion .options");

  options.forEach((opt) => {
    if (opt.contains(e.target)) {
      isoptionBox = true;
    }
  });

  if (!editBox.contains(e.target) && !isoptionBox) {
    editBox.classList.remove("active");
    accountContainer.classList.remove("blur");
  }
  let isOptionsClicked = "";
  let isDotsClicked = true;

  options.forEach((opt) => {
    if (opt.contains(e.target)) {
      isOptionsClicked = true;
    }
  });
  dots.forEach((dot) => {
    if (dot.contains(e.target)) {
      isDotsClicked = false;
    }
  });

  if (isDotsClicked) {
    options.forEach((opt) => opt.classList.remove("active"));
  }
});

addAccountBtn.addEventListener("click", () => {
  closeEditBox();
  accountBox.classList.add("active");
  accountContainer.classList.add("blurbg");
});

export function closeAccountBox() {
  accountBox.classList.remove("active");
  accountContainer.classList.remove("blurbg");
}
export function closeEditBox() {
  accountContainer.classList.remove("blur");
  document.querySelector(".edit-box-body").classList.remove("active");
}

function removeActiveAccount() {
  accountsList.forEach((account) => {
    account.classList.remove("active");
  });
}

accountsList.forEach((account) => {
  account.addEventListener("click", () => {
    removeActiveAccount();
    account.classList.add("active");
  });
});

//delete account
accountDelBtn.forEach((account) => {
  account.addEventListener("click", () => {
    account.parentElement.parentElement.parentElement.remove();

    //local Storage functionality
    let data = JSON.parse(localStorage.getItem("data")) || [];

    let updatedArray = [];
    let accountName =
      account.parentElement.parentElement.parentElement.children[0].children[1]
        .children[0].textContent;
    let amount =
      account.parentElement.parentElement.parentElement.children[0].children[1].children[1].children[0].textContent.slice(
        1
      );
    data.forEach((item) => {
      if (item.accountName != accountName && item.amount != amount) {
        updatedArray.push(item);
      }

      localStorage.setItem("data", JSON.stringify(updatedArray));
    });
  });
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

let startX;
let moveX;
let a = false;
document.addEventListener("touchstart", (e) => {
  if (accountBox.contains(e.target)) a = true;
  startX = e.touches[0].clientX;
});

document.addEventListener("touchmove", (e) => {
  if (
    accountBox.classList.contains("active") ||
    editBox.classList.contains("active") ||
    categoryBox.classList.contains("active")
  )
    a = true;
  moveX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  if (moveX !== undefined) {
    if (startX + 100 < moveX) {
      if (!a) sideBar.classList.add("active");

      // Implement your logic for right swipe here
    } else if (startX - 100 > moveX) {
      sideBar.classList.remove("active");
      // Implement your logic for left swipe here
    }
  }
  // Reset moveX after handling the event
  moveX = undefined;
  a = false;
});

async function loadAccountsData() {
  const req = await fetch(
    "https://penny-partner-api.onrender.com/api/v1/users/accounts/66eda54993eb73490edfa62d"
  );
  const res = await req.json();
  if (res.status === "success") {
    let { data } = res;
    renderAccounts(data)
    
  }
}
loadAccountsData();
