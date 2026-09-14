
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if(navToggle){
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}





function zoomCardImage(button, amount) {

  const container = button.closest(".image-container");
  const image = container.querySelector("img");

  let zoom = parseFloat(image.dataset.zoom || "1");

  zoom = zoom + amount;

  // Limite mínimo
  if (zoom < 1) {
    zoom = 1;
  }

  // Limite máximo
  if (zoom > 4) {
    zoom = 4;
  }

  image.dataset.zoom = zoom;

  image.style.transform = "scale(" + zoom + ")";
}
