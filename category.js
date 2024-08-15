let switchBtn = document.querySelector(".category");
let addCategoryBtn = document.querySelector(".add-category .add-box");
let categoryBox = document.querySelector(".category-box-body");
let cancelCategoryBox = document.querySelector(".cancel-add-category");
let categoryPage = document.querySelector(".categories");
let categories = document.querySelectorAll(
  ".category-container .category-list li"
);
let saveCategoryBtn = document.querySelector(".save-category-btn");

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

reload();
function reload() {
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

      let accountName =
        account.parentElement.parentElement.parentElement.children[0]
          .children[1].children[0].textContent;
      let amount =
        account.parentElement.parentElement.parentElement.children[0].children[1].children[1].children[0].textContent.slice(
          1
        );
    });
  });
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
  console.log(category);
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
                      <p class="edit-btn">Edit</p>
                      <p class="delete-account">Delete</p>
                    </div>
                  </div>
                </li>`;
  parent.innerHTML += template;
  reload();
}
