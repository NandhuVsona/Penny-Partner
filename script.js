import { saveAccount, updateAccount } from "./functions.js";

//function for localstorage
let data = JSON.parse(localStorage.getItem("data")) || [];
data.forEach((item) => {
  let existingAccounts = document.querySelector(".accounts");
  let template = `<li class="card">
                <div class="card-body">
                  <img class="active" src="${item.imageSrc}" alt="" />
                  <div class="card-info">
                    <p class="bold">${item.accountName}</p>
                    <p>Balance: <span class="green bold">₹${item.formatedAmount}</span></p>
                  </div>
                </div>
                <div class="operations">
                  <img class="dot" src="icons/dot.svg" alt="" />
                  <div class="options">
                    <p class="edit-btn">Edit</p>
                    <p class="delete-account">Delete</p>
                  </div>
                </div>
              </li>`;
  existingAccounts.innerHTML += template;
});
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
    accountPage.classList.remove("blurbg");
  }

  let isoptionBox;
  let dots = document.querySelectorAll(".operations .dot");
  let options = document.querySelectorAll(".operations .options");

  options.forEach((opt) => {
    if (opt.contains(e.target)) {
      isoptionBox = true;
    }
  });

  if (!editBox.contains(e.target) && !isoptionBox) {
    editBox.classList.remove("active");
    accountPage.classList.remove("blur");
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
  accountPage.classList.add("blurbg");
});

export function closeAccountBox() {
  accountBox.classList.remove("active");
  accountPage.classList.remove("blurbg");
}
export function closeEditBox() {
  accountPage.classList.remove("blur");
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
  if (accountBox.contains(e.target)) a = true;
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
});
