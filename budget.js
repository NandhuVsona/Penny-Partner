import { expenseCategories } from "./data/categories.js";
let parent = document.querySelector(".budget-list");

function baseTemplate(name, image) {
  let template = `<li>
                  <div class="left-portion">
                    <img
                      class="icon"
                      src="${image}"
                      alt=""
                    />
                    <p class="change-font-style">${name}</p>
                  </div>
                  <div class="right-portion">
                    <button>SET BUDGET</button>
                  </div>
                </li>`;

  return template;
}
expenseCategories.forEach((category) => {
  parent.innerHTML += baseTemplate(category.name, category.image);
});
