export function toggleHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navbarList = document.querySelector(".navbar__list-ul");
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("is-active");
    navbarList.classList.toggle("is-active");
  });
}
