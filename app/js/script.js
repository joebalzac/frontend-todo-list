/*****GLOBAL VARIABLES*****/

let todoId = 0;

const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const itemsLeft = document.querySelector("#items-left");
const todoFilters = document.querySelectorAll("input[name='filter']");
const clearCompleted = document.querySelector("#clearCompleted");

const themeToggle = document.querySelector("#theme-toggle");
const themeLogo = document.querySelectorAll(".btn--theme img");

/************EVENT LISTENERS*************/

themeToggle.addEventListener("click", themeSwitcher);

todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (e.target.value !== "") {
      // event listener adds a todo elem on key press
      addTodoElem(e.target.value);
      todoInput.value = "";

      //if filter is on, refresh the display of todo elems regarding the active filter
    }
  }
});

/*****FUNCTIONS******/

function themeSwitcher(e) {
  console.log(e.target);
  themeLogo.forEach((logo) => logo.classList.toggle("todo__elem--hide"));

  if (!document.body.dataset.theme) {
    document.body.dataset.theme = "dark-theme";
  } else {
    document.body.dataset.theme = "";
  }
}

function addTodoElem(todoText) {
  const todoEl = document.createElement("li");
  todoEl.classList.add("todo__elem");
  document.body.appendChild(todoEl);
  todoEl.id = "" + todoId;
  todoEl.innerHTML = `<button class="btn todo__check"><img src="/images/icon-check.svg" /></button>
  <p>${todoText}</p><button class="btn todo__delete"><img src="/images/icon-cross.svg" /></button>`;
  todoList.appendChild(todoEl);

  if (){
  const todoDelete = todoEl.querySelector(".todo__delete");
  todoDelete.addEventListener("click", () => {
    todoList.remove(todoEl);
  });
}
}
