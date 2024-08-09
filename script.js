let navIcons = document.querySelectorAll("footer nav ul li");
let pages = document.querySelectorAll("main section");
let closeSideBar = document.querySelector(".close");
let sideBar = document.querySelector(".sidebar");
let accountPage = document.querySelector(".account");
let hamburger = document.querySelector(".hamburger");
let addAccountBtn = document.querySelector(".add-account");
let accountBox = document.querySelector(".box-body");
let accountsList = document.querySelectorAll(".account-list li");
let accountDelBtn = document.querySelectorAll(".delete-account");
let dots = document.querySelectorAll(".operations .dot");
let options = document.querySelectorAll(".operations .options");
let editBtns = document.querySelectorAll(".edit-btn");

//Global variables
let selectedCard = "";
let accountImg = "";

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

function closeAccountBox() {
  accountBox.classList.remove("active");
  accountPage.classList.remove("blurbg");
}
function closeEditBox() {
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

function saveAccount() {
  closeAccountBox();
  let initialAmount =
    document.getElementById("initial-amount").value.trim() || 0;
  let accountName = document.getElementById("account-name").value.trim();
  if (isNaN(initialAmount)) {
    initialAmount = 0;
  }
  if (accountName === "" || accountName.lenght < 0) {
    return;
  }
  let imageSrc = "";
  accountsList.forEach((account) => {
    if (account.classList.contains("active")) {
      imageSrc = account.children[0].getAttribute("src");
    }
  });
  let existingAccounts = document.querySelector(".accounts");
  let template = `<li class="card">
                    <div class="card-body">
                      <img src="${imageSrc}" alt="" />
                      <div class="card-info">
                        <p class="bold">${accountName}</p>
                        <p>Balance: <span class="green bold">₹${initialAmount}</span></p>
                      </div>
                    </div>
                    <div class="options">
                    <img src="icons/dot.svg" alt="" />
                    </div>
                  </li>`;
  existingAccounts.innerHTML += template;
  document.getElementById("initial-amount").value = "";
  document.getElementById("account-name").value = "";
}

//delete account
accountDelBtn.forEach((account) => {
  account.addEventListener("click", () => {
    account.parentElement.parentElement.parentElement.remove();
  });
});
//edit account
editBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const accountName =
      btn.parentElement.parentElement.parentElement.children[0].children[1]
        .children[0].textContent;

    const amount =
      btn.parentElement.parentElement.parentElement.children[0].children[1].children[1].children[0].textContent.slice(
        1
      );
    options[index].classList.remove("active");
    selectedCard = btn.parentElement.parentElement.parentElement;

    accountsList.forEach((account) => {
      if (
        account.children[0].getAttribute("src") ==
        selectedCard.children[0].children[0].getAttribute("src")
      ) {
        accountImg = account.children[0].getAttribute("src");
        account.classList.add("active");
      } else {
        account.classList.remove("active");
      }
    });
    openEditPanael(accountName, amount);
  });
});

function openEditPanael(account, amount) {
  let acutalAmount = amount.split(",").join("");
  let editAmount = document.getElementById("edit-amount");
  let editAccountName = document.getElementById("edit-account-name");
  editAmount.value = acutalAmount;
  editAccountName.value = account;
  document.querySelector(".edit-box-body").classList.add("active");
  editAmount.focus();
}

function updateAccount() {
  closeEditBox();
  let updatedAmount = document.getElementById("edit-amount").value.trim();
  let updatedAccountName = document
    .getElementById("edit-account-name")
    .value.trim();

  let imageSrc = "";
  accountsList.forEach((account) => {
    if (account.classList.contains("active")) {
      imageSrc = account.children[0].getAttribute("src");
    }
  });

  selectedCard.children[0].children[0].setAttribute("src", imageSrc);
  if (isNaN(updatedAmount) || updatedAccountName.length === 0) return;

  let formatedAmount = Number(updatedAmount);
  selectedCard.children[0].children[1].children[0].innerHTML =
    updatedAccountName;

  selectedCard.children[0].children[1].children[1].children[0].innerHTML =
    formatedAmount == 0 ? "₹0" : "₹" + formatedAmount.toLocaleString("en-IN");
}

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
