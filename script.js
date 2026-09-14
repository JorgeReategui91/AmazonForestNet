
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if(navToggle){
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}





/* =========================================
   ZOOM NAS IMAGENS DOS CARDS
   ========================================= */

function zoomCardImage(button, amount) {

  const container = button.closest(".image-container");
  const image = container.querySelector("img");

  let zoom = parseFloat(image.dataset.zoom || "1");

  zoom = zoom + amount;

  /* Limite mínimo */

  if (zoom < 1) {
    zoom = 1;
  }

  /* Limite máximo */

  if (zoom > 4) {
    zoom = 4;
  }

  image.dataset.zoom = zoom;

  /* Quando voltar ao tamanho original,
     retorna para o centro */

  if (zoom === 1) {
    image.dataset.x = "0";
    image.dataset.y = "0";
  }

  updateImageTransform(image);
}


/* =========================================
   ATUALIZA POSIÇÃO DA IMAGEM
   ========================================= */

function updateImageTransform(image) {

  const zoom = parseFloat(image.dataset.zoom || "1");

  const x = parseFloat(image.dataset.x || "0");
  const y = parseFloat(image.dataset.y || "0");

  image.style.transform =
    `translate(${x}px, ${y}px) scale(${zoom})`;
}


/* =========================================
   PREPARA AS IMAGENS
   ========================================= */

document.querySelectorAll(".image-container img").forEach(image => {

  image.dataset.zoom = "1";
  image.dataset.x = "0";
  image.dataset.y = "0";

  let dragging = false;

  let startX = 0;
  let startY = 0;


  /* =======================================
     COMEÇA A ARRASTAR
     ======================================= */

  image.addEventListener("mousedown", function(event) {

    const zoom = parseFloat(image.dataset.zoom || "1");

    /* Só permite arrastar quando ampliado */

    if (zoom <= 1) {
      return;
    }

    dragging = true;

    image.classList.add("dragging");

    const currentX =
      parseFloat(image.dataset.x || "0");

    const currentY =
      parseFloat(image.dataset.y || "0");

    startX = event.clientX - currentX;
    startY = event.clientY - currentY;

    event.preventDefault();
  });


  /* =======================================
     MOVIMENTA COM O MOUSE
     ======================================= */

  document.addEventListener("mousemove", function(event) {

    if (!dragging) {
      return;
    }

    image.dataset.x =
      event.clientX - startX;

    image.dataset.y =
      event.clientY - startY;

    updateImageTransform(image);
  });


  /* =======================================
     TERMINA O ARRASTE
     ======================================= */

  document.addEventListener("mouseup", function() {

    if (!dragging) {
      return;
    }

    dragging = false;

    image.classList.remove("dragging");
  });

});


/* =========================================
   ABRIR IMAGEM GRANDE
   ========================================= */

function openImage(image) {

  const viewer = document.createElement("div");

  viewer.className = "image-fullscreen";


  viewer.innerHTML = `

    <button class="close-image">×</button>

    <button class="fullscreen-minus">−</button>

    <button class="fullscreen-plus">+</button>

    <img src="${image.src}" alt="${image.alt}">

  `;


  document.body.appendChild(viewer);


  const fullImage =
    viewer.querySelector("img");


  let zoom = 1;

  let x = 0;
  let y = 0;

  let dragging = false;

  let startX = 0;
  let startY = 0;


  /* =======================================
     ZOOM +
     ======================================= */

  viewer.querySelector(".fullscreen-plus")
    .addEventListener("click", function(event) {

      event.stopPropagation();

      zoom += 0.2;

      if (zoom > 5) {
        zoom = 5;
      }

      updateFullscreenImage();

    });


  /* =======================================
     ZOOM −
     ======================================= */

  viewer.querySelector(".fullscreen-minus")
    .addEventListener("click", function(event) {

      event.stopPropagation();

      zoom -= 0.2;

      if (zoom < 1) {
        zoom = 1;
      }

      if (zoom === 1) {
        x = 0;
        y = 0;
      }

      updateFullscreenImage();

    });


  /* =======================================
     ATUALIZA IMAGEM
     ======================================= */

  function updateFullscreenImage() {

    fullImage.style.transform =
      `translate(${x}px, ${y}px) scale(${zoom})`;

  }


  /* =======================================
     ARRASTAR IMAGEM
     ======================================= */

  fullImage.addEventListener("mousedown", function(event) {

    if (zoom <= 1) {
      return;
    }

    dragging = true;

    fullImage.classList.add("dragging");

    startX = event.clientX - x;
    startY = event.clientY - y;

    event.preventDefault();

  });


  viewer.addEventListener("mousemove", function(event) {

    if (!dragging) {
      return;
    }

    x = event.clientX - startX;
    y = event.clientY - startY;

    updateFullscreenImage();

  });


  viewer.addEventListener("mouseup", function() {

    dragging = false;

    fullImage.classList.remove("dragging");

  });


  /* =======================================
     FECHAR
     ======================================= */

  viewer.querySelector(".close-image")
    .addEventListener("click", function() {

      viewer.remove();

    });


  /* =======================================
     CLICAR FORA DA IMAGEM FECHA
     ======================================= */

  viewer.addEventListener("click", function(event) {

    if (event.target === viewer) {
      viewer.remove();
    }

  });


  /* =======================================
     ESC FECHA
     ======================================= */

  document.addEventListener("keydown", function escHandler(event) {

    if (event.key === "Escape") {

      viewer.remove();

      document.removeEventListener(
        "keydown",
        escHandler
      );

    }

  });

}
