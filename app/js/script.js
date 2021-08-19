const themeSwitch = document.querySelector("#theme-toggle");
const themeLogos = document.querySelectorAll(".btn--theme img");

const themeSwitcher = (e) => {
  console.log(e.target);
  //change the logo to sun or moon
  themeLogos.forEach((logo) => logo.classList.toggle("todo__elem--hide"));

  if (!document.body.dataset.theme) {
    document.body.dataset.theme = "dark-theme";
  } else {
    document.body.dataset.theme = "";
  }
};

themeSwitch.addEventListener("click", themeSwitcher);
