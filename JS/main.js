// main.js
import { publicaciones } from './publicaciones.js';
import { initPosts } from './posts.js';

// CARGAR COMPONENTES (menú y footer)

function cargarComponente(rutaArchivo, idContainer) {
  fetch(rutaArchivo)
    .then(respuesta => {
      if (!respuesta.ok) throw new Error(`No se pudo cargar: ${rutaArchivo}`);
      return respuesta.text();
    })
    .then(htmlContenido => {
      const contenedor = document.getElementById(idContainer);
      if (contenedor) contenedor.outerHTML = htmlContenido;
    })
    .catch(error => console.error("Error al cargar componente:", error));
}

// CARRUSEL DE EQUIPO
function inicializarCarruselEquipo() {
  const track = document.querySelector(".team-track");
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

// RENDERIZAR PUBLICACIONES ESTÁTICAS (las del array)
function mostrarPublicaciones() {
  const contenedor = document.getElementById("feed-container");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  publicaciones.forEach(pub => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("post-card");

    tarjeta.innerHTML = `
      <article class="post panel">
        <header class="post-header">
          <div class="avatar"><span class="image-placeholder">Foto</span></div>
          <div class="post-author">
            <h2>${pub.displayName}</h2>
            <p class="muted">${pub.remuDescription}</p>
          </div>
          <button class="more" aria-label="Más opciones">•••</button>
        </header>
        <p class="post-copy">${pub.text}</p>
        <footer class="post-actions">
          <button class="like"><span aria-hidden="true">♡</span> ${pub.likes}</button>
          <button class="comments"><span aria-hidden="true">▢</span> 12 comentarios</button>
        </footer>
      </article>
    `;
    contenedor.appendChild(tarjeta);
  });
}

/*********** INICIALIZAR TODO CUANDO EL DOM ESTÉ LISTO******************/

document.addEventListener("DOMContentLoaded", () => {
  // 1. Cargar menú y footer
  cargarComponente("../html/menu.html", "menuContainer");
  cargarComponente("../html/footer.html", "footerContainer");

  // 2. Carrusel (solo si la página lo tiene)
  inicializarCarruselEquipo();

  // 3. Mostrar publicaciones estáticas
  mostrarPublicaciones();

  // 4. Inicializar el formulario de publicar
  initPosts();
});