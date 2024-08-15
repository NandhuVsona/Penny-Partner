let switchBtn = document.querySelector(".category");
let addCategoryBtn = document.querySelector(".add-category .add-box");
let categoryBox = document.querySelector(".category-box-body");
let editcategoryBox = document.querySelector(".edit-category-box-body");
let cancelCategoryBox = document.querySelector(".cancel-add-category");
let cancelEditCategoryBox = document.querySelector(".cancel-edit-category");
let categoryPage = document.querySelector(".categories");
let categories = document.querySelectorAll(
  ".category-container .category-list li"
);
let saveCategoryBtn = document.querySelector(".save-category-btn");
let clickedItem = "";

reload();

categories.forEach((categorie) => {
  categorie.addEventListener("click", () => {
    categories.forEach((categorie) => categorie.classList.remove("active"));
    categorie.classList.add("active");
  });
});

switchBtn.addEventListener("click", () => {
  document.querySelector(".switch").classList.toggle("active");
});

addCategoryBtn.addEventListener("click", () => {
  categoryBox.classList.add("active");
  categoryPage.classList.add("blurbg");
});

cancelCategoryBox.addEventListener("click", () => {
  categoryBox.classList.remove("active");
  categoryPage.classList.remove("blurbg");
});
cancelEditCategoryBox.addEventListener("click", () => {
  editcategoryBox.classList.remove("active");
  categoryPage.classList.remove("blurbg");
});

function reload() {
  let editBtn = document.querySelectorAll(".edit-category-btn");

  let dots = document.querySelectorAll(".right-portion .dot");
  let options = document.querySelectorAll(".right-portion .options");
  let categoryDelBtn = document.querySelectorAll(".delete-account");
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

  //delete category
  categoryDelBtn.forEach((account) => {
    account.addEventListener("click", () => {
      account.parentElement.parentElement.parentElement.remove();
    });
  });
  //edit btn
  editBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let categoryName =
        btn.parentElement.parentElement.previousElementSibling.children[1]
          .textContent;
      let imageSrc =
        btn.parentElement.parentElement.previousElementSibling.children[0].getAttribute(
          "src"
        );
      let category =
        btn.parentElement.parentElement.parentElement.parentElement.classList.contains(
          "income-list"
        )
          ? "income"
          : "expense";
      clickedItem = btn.parentElement.parentElement.parentElement;
      openEditPanel(categoryName, imageSrc);
      options.forEach((option) => option.classList.remove("active"));
    });
  });
}

function openEditPanel(name, src) {
  let editName = document.getElementById("edit-category-name");
  editName.value = name;

  editcategoryBox.classList.add("active");

  categories.forEach((categorie) => {
    if (categorie.children[0].getAttribute("src") == src) {
      categorie.classList.add("active");
    } else {
      categorie.classList.remove("active");
    }
  });
}

document
  .querySelector(".save-edit-category-btn")
  .addEventListener("click", updateCategory);
function updateCategory() {
  editcategoryBox.classList.remove("active");
  let updatedName = document.getElementById("edit-category-name");
  if (updatedName.value.trim().lenght < 0) return;

  let updatedIcon;
  categories.forEach((item) => {
    if (item.classList.contains("active")) {
      updatedIcon = item.children[0].getAttribute("src");
    }
  });

  clickedItem.children[0].children[0].setAttribute("src", updatedIcon);
  clickedItem.children[0].children[1].textContent = updatedName.value;
}

saveCategoryBtn.addEventListener("click", () => {
  categoryBox.classList.remove("active");
  categoryPage.classList.remove("blurbg");
  let categoryName = document.getElementById("category-name");
  let selectedIcon = "";
  categories.forEach((categorie) => {
    if (categorie.classList.contains("active")) {
      selectedIcon = categorie.children[0].getAttribute("src");
    }
  });
  let category = document.querySelector(".switch").classList.contains("active")
    ? "income"
    : "expense";

  createCategory(categoryName.value.trim(), selectedIcon, category);
});

function createCategory(name, icons, category) {
  if (name == "" || name.lenght < 0) {
    return;
  }
  let parent = document.querySelector(`.${category}-category ul`);
  let template = `<li>
                  <div class="left-portion">
                    <img src="${icons}" alt="" />
                    <p class="change-font-style">${name}</p>
                  </div>
                  <div class="right-portion">
                    <img class="dot svg" src="icons/dot.svg" alt="" />
                    <div class="options">
                      <p class="edit-category-btn">Edit</p>
                      <p class="delete-account">Delete</p>
                    </div>
                  </div>
                </li>`;
  parent.innerHTML += template;
  document.getElementById("category-name").value = "";
  reload();
}
