
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

  if (zoom < 1) zoom = 1;
  if (zoom > 4) zoom = 4;

  image.dataset.zoom = zoom;

  if (zoom === 1) {
    image.dataset.x = 0;
    image.dataset.y = 0;
  }

  updateImageTransform(image);
}


function updateImageTransform(image) {

  const zoom = parseFloat(image.dataset.zoom || "1");

  const x = parseFloat(image.dataset.x || "0");
  const y = parseFloat(image.dataset.y || "0");

  image.style.transform =
    `translate(${x}px, ${y}px) scale(${zoom})`;
}
