const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const itemsLeft = document.querySelector("#items-left");
const todoFilters = document.querySelectorAll("input[name='filter']");
const btnClear = document.querySelector("#clear-completed");

const themeSwitch = document.querySelector("#theme-toggle");
const themeLogos = document.querySelectorAll(".btn--theme img");

/******************************/
/***  FUNCTIONS       ***/
/******************************/

function themeSwitcher(e) {
  console.log(e.target);
  //change the logo to sun or moon
  themeLogos.forEach((logo) => logo.classList.toggle("todo__elem--hide"));

  if (!document.body.dataset.theme) {
    document.body.dataset.theme = "dark-theme";
  } else {
    document.body.dataset.theme = "";
  }
}

themeSwitch.addEventListener("click", themeSwitcher);

todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
  }
  if (e.target.value !== "") {
    addTodoElem(e.target.value);
    todoInput.value = "";
  }
});

function addTodoElem() {
  const todoEl = document.createElement("li");
  todoEl.classList.add("todo__elem");
}
