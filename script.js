
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if(navToggle){
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}
