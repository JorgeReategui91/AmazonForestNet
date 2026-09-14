
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if(navToggle){
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}







<script>

function zoomImage(button, factor) {

  const container = button.closest(".image-container");
  const image = container.querySelector("img");

  let zoom = parseFloat(image.dataset.zoom || "1");

  zoom = zoom * factor;

  if (zoom < 1) zoom = 1;
  if (zoom > 4) zoom = 4;

  image.dataset.zoom = zoom;

  image.style.transform = `scale(${zoom})`;
}


function openImage(image) {

  const viewer = document.createElement("div");

  viewer.className = "image-fullscreen";

  viewer.innerHTML = `
    <button class="close-image">×</button>

    <button class="fullscreen-plus">+</button>
    <button class="fullscreen-minus">−</button>

    <img src="${image.src}" alt="${image.alt}">
  `;

  document.body.appendChild(viewer);

  const fullImage = viewer.querySelector("img");

  let zoom = 1;

  viewer.querySelector(".fullscreen-plus").onclick = function() {
    zoom = Math.min(zoom * 1.2, 5);
    fullImage.style.transform = `scale(${zoom})`;
  };

  viewer.querySelector(".fullscreen-minus").onclick = function() {
    zoom = Math.max(zoom * 0.8, 0.5);
    fullImage.style.transform = `scale(${zoom})`;
  };

  viewer.querySelector(".close-image").onclick = function() {
    viewer.remove();
  };

  viewer.onclick = function(event) {
    if (event.target === viewer) {
      viewer.remove();
    }
  };
}

</script>
