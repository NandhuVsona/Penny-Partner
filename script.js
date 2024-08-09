let navIcons = document.querySelectorAll("footer nav ul li");
let pages = document.querySelectorAll("main section");
let closeSideBar = document.querySelector(".close");
let sideBar = document.querySelector(".sidebar");
let accountPage = document.querySelector(".account");
let hamburger = document.querySelector(".hamburger");
let addAccountBtn = document.querySelector(".add-account");
let accountBox = document.querySelector(".box-body");
let accountsList = document.querySelectorAll(".account-list li");
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
});

addAccountBtn.addEventListener("click", () => {
  accountBox.classList.add("active");
  accountPage.classList.add("blurbg");
});

function closeAccountBox() {
  accountBox.classList.remove("active");
  accountPage.classList.remove("blurbg");
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
  if(isNaN(initialAmount)){
    initialAmount = 0
  };
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
