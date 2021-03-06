/*****GLOBAL VARIABLES*****/

let todoArray = [];
let todoId = 0;
let currentFilter = "all";
const LOCAL_TODOS = "local_todos";

const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const itemsLeft = document.querySelector("#items-left");
const todoFilters = document.querySelectorAll("input[name='filter']");
const btnClear = document.querySelector("#clear-completed");

const themeToggle = document.querySelector("#theme-toggle");
const themeLogo = document.querySelectorAll(".btn--theme img");

/************EVENT LISTENERS*************/

btnClear.addEventListener("click", () => {
  const toRemove = todoArray.filter(obj => obj.active === false);

  if (
    toRemove.length > 0 &&
    confirm(
      `You are about to remove ${toRemove.length} completed task. Are  you sure?`
    )
  ) {
    toRemove.forEach(elem => {
      removeElem(elem.DOMelem);
    });
  }
});

themeToggle.addEventListener("click", themeSwitcher);

todoInput.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    if (e.target.value !== "") {
      // event listener adds a todo elem on key press
      addTodoElem(e.target.value);
      todoInput.value = "";

      //if filter is on, refresh the display of todo elems regarding the active filter
      refreshFilters();
    }
  }
});

todoFilters.forEach(filter => {
  //event listener on radio button change that controls the filters
  filter.addEventListener("change", filterCallback);
});

/*****FUNCTIONS******/

function themeSwitcher(e) {
  console.log(e.target);
  themeLogo.forEach(logo => logo.classList.toggle("todo__elem--hide"));

  if (!document.body.dataset.theme) {
    document.body.dataset.theme = "dark-theme";
  } else {
    document.body.dataset.theme = "";
  }
}

function filterCallback(e) {
  //update the current Filter and calls function that takes care of filters
  currentFilter = e.target.value;
  refreshFilters();
}

function refreshFilters() {
  if (currentFilter === "completed") {
    completedCB();
  } else if (currentFilter === "all") {
    allCB();
  } else {
    //if active
    activeCB();
  }
}

//check all items in array and chose to display add or remove class that displays the elems if it is active or not
function completedCB() {
  todoArray.forEach(function (arrayObj) {
    if (
      !arrayObj.active &&
      arrayObj.DOMelem.classList.contains("todo__elem--hide")
    ) {
      arrayObj.DOMelem.classList.remove("todo__elem--hide");
    } else if (
      arrayObj.active &&
      !arrayObj.DOMelem.classList.contains("todo__elem--hide")
    ) {
      arrayObj.DOMelem.classList.add("todo__elem--hide");
    }
  });
}
// check all items in array and chose to display add or remove class that displays the elems if it is active or not
function allCB() {
  todoArray.forEach(function (arrayObj) {
    if (arrayObj.DOMelem.classList.contains("todo__elem--hide")) {
      arrayObj.DOMelem.classList.remove("todo__elem--hide");
    }
  });
}

// check all items in array and chose to display add or remove class that displays the elems if it is active or not
function activeCB() {
  todoArray.forEach(function (arrayObj) {
    if (
      arrayObj.active &&
      arrayObj.DOMelem.classList.contains("todo__elem--hide")
    ) {
      arrayObj.DOMelem.classList.remove("todo__elem--hide");
    } else if (
      arrayObj.active === false &&
      !arrayObj.DOMelem.classList.contains("todo__elem--hide")
    ) {
      arrayObj.DOMelem.classList.add("todo__elem--hide");
    }
  });
}

/******************************/
/***  FUNCTIONS             ***/
/******************************/

/**  MISCELLANEOUS  FUNCTIONS**/
/******************************/

function updateActiveCount() {
  // counts the number of active elements in global array and sets the counts
  let count = todoArray.reduce((count, todoObj) => {
    if (todoObj.active) count++;
    return count;
  }, 0);
  itemsLeft.innerText = count;
}

function updateCurrentId() {
  // need to make sure the current ID is up to date after deletion
  if (!todoArray.length) {
    todoId = 0;
  } else {
    todoId = todoArray[todoArray.length - 1].id + 1;
  }
}

/**  localSTorage functions **/
/******************************/

function getLocalStorage() {
  //update active count in case local is empty

  //if localstorage variable doesn't exist, create it
  if (localStorage.getItem(LOCAL_TODOS) === null) {
    localStorage.setItem(LOCAL_TODOS, JSON.stringify([]));
  } else if (JSON.parse(localStorage.getItem(LOCAL_TODOS)).length) {
    //else if storage exists and is not empty, load the todos from localstorage and add them to the DOM
    todoArray = JSON.parse(localStorage.getItem(LOCAL_TODOS));
    todoArray.forEach(todoElem => {
      if (todoID < +todoElem.id) todoId = +todoElem.id;
      addTodoElem(todoElem.content, false);
    });
    todoId++;
  }
}

function changeActiveStatus(elem) {
  //  toggle the check class on elements and the set active variable in the element array to correct value
  elem.classList.toggle("todo__elem--checked");
  let isActive = true;

  if (elem.classList.contains("todo__elem--checked")) {
    isActive = false;
  }

  todoArray.forEach(arrayObj => {
    if (arrayObj.id === +elem.id) arrayObj.active = isActive;
  });

  // reflect changes on the global variable in the localStorage and update active element count
}

function addTodoElem(todoText, isNew = true) {
  const todoEl = document.createElement("li");
  todoEl.classList.add("todo__elem");
  document.body.appendChild(todoEl);
  todoEl.id = "" + todoId;
  todoEl.innerHTML = `<button class="btn todo__check"><img src="/images/icon-check.svg" /></button>
  <p>${todoText}</p><button class="btn todo__delete"><img src="/images/icon-cross.svg" /></button>`;
  todoList.appendChild(todoEl);

  // push to array of elements to keep track of them if it is new and refresh the localstorage with the new element
  // if the element is new, we store the todoEL DOM element in the element object before pushing, else, we update it

  if (isNew) {
    todoArray.push({
      active: true,
      content: todoText,
      DOMelem: todoEl,
      id: todoId++
    });
  }

  //Delete the todoEl from the list
  const todoDelete = todoEl.querySelector(".todo__delete");
  todoDelete.addEventListener("click", () => {
    todoList.remove(todoEl);
  });

  //Add checkmark to the item from the list
  const todoCheck = document.querySelector(".todo__check");
  todoCheck.addEventListener("click", changeActiveStatus);
}

function init() {
  const starterList = [
    "Complete online JavaScript course",
    "Jog around the park 3x",
    "10 minutes meditation",
    "Read for 1 hour",
    "Pick up groceries",
    "Complete Todo App on Frontnd Mentor"
  ];

  if (
    localStorage.getItem("isFirstVisit") === null ||
    localStorage.getItem("isFirstVisit") === false
  ) {
    localStorage.setItem("isFirstVisit", true);
    starterList.forEach(item => {
      addTodoElem(item);
    });
    changeActiveStatus(todoArray[0].DOMelem);
  } else {
    getLocalStorage();
  }
}
