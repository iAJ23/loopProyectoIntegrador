// main.js

function cargarComponente(rutaArchivo, idContenedor) {
  fetch(rutaArchivo)
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error(`No se pudo cargar el archivo: ${rutaArchivo}`);
      }
      return respuesta.text();
    })
    .then(htmlContenido => {
      const contenedor = document.getElementById(idContenedor);
      if (contenedor) {
        // Reemplaza el <div> por el contenido real del componente
        contenedor.outerHTML = htmlContenido;
      }
    })
    .catch(error => console.error("Error al cargar componente:", error));
}

// Ejecutar de forma segura cuando el HTML base esté listo
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("contenedor-menu")) {
    cargarComponente("./html/menu.html", "contenedor-menu");
  }

  if (document.getElementById("contenedor-footer")) {
    cargarComponente("./html/footer.html", "contenedor-footer");
  }
});



//Funcion del carrusel
function inicializarCarruselEquipo() {
  const track = document.querySelector(".team-track");

  // Si esta página no tiene el carrusel, no hay nada que inicializar.
  if (!track) return;

  const cards = [...document.querySelectorAll(".team-card")];
  if (cards.length === 0) return;

  const dots = [...document.querySelectorAll(".team-pagination span")];
  const buttons = document.querySelectorAll(".team-arrow");
  let index = 0;

  const visibleCount = () =>
    window.matchMedia("(min-width: 1000px)").matches ? 3 :
    window.matchMedia("(min-width: 576px)").matches ? 2 : 1;

  const update = () => {
    const max = Math.max(0, cards.length - visibleCount());
    index = Math.min(index, max);

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const step = cards[0].offsetWidth + gap;

    track.style.transform = `translateX(-${index * step}px)`;
    dots.forEach((dot, i) => dot.classList.toggle("current", i === index));
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const max = Math.max(0, cards.length - visibleCount());

      index = button.dataset.teamDirection === "next"
        ? (index >= max ? 0 : index + 1)
        : (index <= 0 ? max : index - 1);

      update();
    });
  });

  window.addEventListener("resize", update);
  window.addEventListener("load", update, { once: true });
  track.querySelectorAll("img").forEach((image) => {
    if (!image.complete) {
      image.addEventListener("load", update, { once: true });
      image.addEventListener("error", update, { once: true });
    }
  });
  update();
}

document.addEventListener("DOMContentLoaded", inicializarCarruselEquipo);
