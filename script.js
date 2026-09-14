
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



document.querySelectorAll(".image-container img").forEach(image => {

  let dragging = false;
  let startX = 0;
  let startY = 0;

  image.dataset.zoom = "1";
  image.dataset.x = "0";
  image.dataset.y = "0";


  image.addEventListener("mousedown", function(event) {

    const zoom = parseFloat(image.dataset.zoom);

    if (zoom <= 1) return;

    dragging = true;

    startX = event.clientX - parseFloat(image.dataset.x || "0");
    startY = event.clientY - parseFloat(image.dataset.y || "0");

    image.style.cursor = "grabbing";

    event.preventDefault();
  });


  document.addEventListener("mousemove", function(event) {

    if (!dragging) return;

    image.dataset.x = event.clientX - startX;
    image.dataset.y = event.clientY - startY;

    updateImageTransform(image);
  });


  document.addEventListener("mouseup", function() {

    dragging = false;

    image.style.cursor = "grab";
  });

});
