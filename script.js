import { saveAccount, updateAccount } from "./functions.js";

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
