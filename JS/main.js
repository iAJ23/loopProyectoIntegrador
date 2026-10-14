
// main.js

// Función que carga Navbar y Footer 
function cargarComponente(rutaArchivo, idContainer) {
  fetch(rutaArchivo)
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error(`No se pudo cargar el archivo: ${rutaArchivo}`);
      }
      return respuesta.text();
    })
    .then(htmlContenido => {
      const contenedor = document.getElementById(idContainer);
      if (contenedor) {
        // Reemplaza el <div> contenedor por el HTML real del componente (<nav> o <footer>)
        contenedor.outerHTML = htmlContenido;
      }
    })
    .catch(error => console.error("Error al cargar componente:", error));
}

// Ejecutar cuando el HTML base esté listo
document.addEventListener("DOMContentLoaded", () => {
  cargarComponente("../html/menu.html", "menuContainer"); 
 cargarComponente("../html/footer.html", "footerContainer");
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



import { publicaciones } from './publicaciones.js';

/**
 * Método para renderizar las publicaciones en el DOM
 */

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
          <button class="like"><span aria-hidden="true">♡</span> ${pub.likes} </button>
          <button class="comments"><span aria-hidden="true">▢</span> 12 comentarios</button>
        </footer>
      </article>
        `;

        contenedor.appendChild(tarjeta);
    });
}

document.addEventListener("DOMContentLoaded", mostrarPublicaciones);


/*****Agregar Publicaciones ******/
document.getElementById('postForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // 1. Obtener los valores del formulario
  const displayName = document.getElementById('displayName').value.trim();
  const text = document.getElementById('text').value.trim();
  const labelPost = document.getElementById('label-post').value.trim();

  // Validación mínima
  if (!displayName || !text) {
    alert('Por favor completa tu nombre y tu publicación.');
    return;
  }

  // 2. Crear el <article> con el diseño
  const postArticle = document.createElement('article');
  postArticle.className = 'post panel';

  const initial = displayName.charAt(0).toUpperCase();

  // Escapar HTML para evitar inyección y errores de render
  const escapeHTML = (str) =>
    str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m]));

  const safeName = escapeHTML(displayName);
  const safeText = escapeHTML(text);
  const safeLabel = escapeHTML(labelPost);

  // 3. Generar la fecha de publicación formateada
  const fecha = new Date();
  const opcionesFecha = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const fechaFormateada = fecha.toLocaleString('es-MX', opcionesFecha);

  postArticle.innerHTML = `
    <header class="post-header">
      <div class="avatar avatar-mini">
        <span class="image-placeholder">${initial}</span>
      </div>
      <div class="post-author">
        <h2>${safeName}</h2>
      </div>
      <button class="more" aria-label="Más opciones">•••</button>
    </header>
    <p class="post-copy">${safeText}</p>
    ${safeLabel ? `<p class="post-copy post-label">#${safeLabel}</p>` : ''}
    <footer class="post-actions">
      <button class="like"><span aria-hidden="true">♡</span> <span class="likes-count">0</span></button>
      <button class="comments"><span aria-hidden="true">▢</span> 0 comentarios</button>
      <span class="post-date fs-14 text-secondary" title="${fecha.toISOString()}">${fechaFormateada}</span>
    </footer>
  `;

  // 4. Funcionalidad del botón like
  const likeBtn = postArticle.querySelector('.like');
  likeBtn.addEventListener('click', function() {
    const countSpan = this.querySelector('.likes-count');
    let currentLikes = parseInt(countSpan.textContent) || 0;
    currentLikes++;
    countSpan.textContent = currentLikes;
    this.querySelector('span[aria-hidden="true"]').textContent = '♥';
    this.style.color = '#e0245e';
  });

  // 5. Insertar al principio del contenedor
  const container = document.getElementById('postsContainer');
  container.prepend(postArticle);

  // 6. Limpiar el formulario
  this.reset();
});