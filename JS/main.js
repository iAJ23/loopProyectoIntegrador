
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
  const postId = 'post-' + Date.now();

  postArticle.className = 'post panel';

  postArticle.innerHTML = `
    <header class="post-header g-8">
      <div class="avatar avatar-mini ">
        <span class="image-placeholder">${initial}</span>
      </div>
      <div class="post-author">
        <h2>${safeName}</h2>
      </div>
      <button class="more dropdown-menu-dark" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Más opciones">•••</button>
      <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
        <li><a class="dropdown-item btn-editar" href="#" data-id="${postId}">Editar</a></li>
        <li><a class="dropdown-item btn-eliminar" href="#" data-id="${postId}">Eliminar</a></li>
        <li><a class="dropdown-item btn-compartir" href="#" data-id="${postId}">Compartir</a></li>
      </ul>
    </header>

    <p class="post-copy">${safeText}</p>
    ${safeLabel ? `<p class="post-copy post-label">#${safeLabel}</p>` : ''}

    <footer class="post-actions">
      <button class="like"><span aria-hidden="true">♡</span> <span class="likes-count">0</span></button>
      
      <button class="comments" type="button" data-bs-toggle="collapse" data-bs-target="#comments-${postId}" aria-expanded="false" aria-controls="comments-${postId}">
        <span aria-hidden="true">▢</span> <span class="comments-count">0</span> comentarios
      </button>
      
      <span class="post-date fs-14 text-secondary" title="${fecha.toISOString()}">${fechaFormateada}</span>
    </footer>

    <!-- Espacio para comentarios -->
    <div class="collapse mt-2" id="comments-${postId}">
      <div class="comments-box">
        <div class="comments-list" id="list-${postId}">
          <p class="text-muted small m-0">No hay comentarios aún.</p>
        </div>
        <form class="comment-form" data-id="${postId}">
          <input type="text" class="comment-input" placeholder="Escribe un comentario..." required>
          <button type="submit" class="comment-send">Enviar</button>
        </form>
      </div>
    </div>
`; 

//****************************Función boton like*******************************/
  const likeBtn = postArticle.querySelector('.like');
  likeBtn.addEventListener('click', function() {
    const countSpan = this.querySelector('.likes-count');
    let currentLikes = parseInt(countSpan.textContent) || 0;
    currentLikes++;
    countSpan.textContent = currentLikes;
    this.querySelector('span[aria-hidden="true"]').textContent = '♥';
    this.style.color = '#c2ff42';
  });

  // Insertar al principio del contenedor
  const container = document.getElementById('postsContainer');
  container.prepend(postArticle);

  //  Limpiar el formulario
  this.reset();
});

//****************************Función para comentar*******************************/

// Objeto temporal para guardar los comentarios (se borran al recargar)
const comentariosDB = {};

// Escuchar cuando se envía un comentario
document.addEventListener('submit', (e) => {
  if (e.target.classList.contains('comment-form')) {
    e.preventDefault();

    const form = e.target;
    const postId = form.getAttribute('data-id');
    const input = form.querySelector('.comment-input');
    const texto = input.value.trim();

    if (!texto) return;

    // Inicializar el array si no existe
    if (!comentariosDB[postId]) {
      comentariosDB[postId] = [];
    }

    // Guardar el comentario (aquí puedes cambiar "Tú" por el nombre del usuario)
    comentariosDB[postId].push({
      autor: "Tú",
      texto: texto
    });

    // Limpiar el input
    input.value = '';

    // Actualizar la lista visual
    mostrarComentarios(postId);
  }
});

// Función que dibuja los comentarios en pantalla
function mostrarComentarios(postId) {
  const lista = document.getElementById(`list-${postId}`);
  const contador = document.querySelector(`[data-bs-target="#comments-${postId}"] .comments-count`);
  const comentarios = comentariosDB[postId] || [];

  // Actualizar contador del botón
  if (contador) contador.textContent = comentarios.length;

  // Si no hay comentarios
  if (comentarios.length === 0) {
    lista.innerHTML = '<p class="text-muted small m-0">No hay comentarios aún.</p>';
    return;
  }

  // Dibujar cada comentario
  lista.innerHTML = comentarios.map(c => `
    <div class="comment-item">
      <div class="comment-author">${c.autor}</div>
      <p class="comment-text">${c.texto}</p>
    </div>
  `).join('');
}

//****************************Función para editar la publicación*******************************/

document.addEventListener('click', (e) => {
  // Detectamos el clic en el botón de editar
  if (e.target.classList.contains('btn-editar')) {
    e.preventDefault();

    const postElement = e.target.closest('.post');
    if (!postElement) return;

    // Si ya está en modo edición, no hacer nada
    if (postElement.classList.contains('editando')) return;
    postElement.classList.add('editando');

    // Buscamos el párrafo del texto (ignorando la etiqueta #hashtag)
    const parrafoTexto = postElement.querySelector('.post-copy:not(.post-label)');
    if (!parrafoTexto) return;

    const textoActual = parrafoTexto.textContent;

    // Creamos el contenedor de edición
    const editorHTML = `
      <div class="edit-mode">
        <textarea class="edit-textarea">${textoActual}</textarea>
        <div class="edit-buttons">
          <button type="button" class="btn-cancelar-edit">Cancelar</button>
          <button type="button" class="btn-guardar-edit">Guardar</button>
        </div>
      </div>
    `;

    // Ocultamos el párrafo original y metemos el editor en su lugar
    parrafoTexto.style.display = 'none';
    parrafoTexto.insertAdjacentHTML('afterend', editorHTML);

    // Enfocamos el textarea automáticamente
    const textarea = postElement.querySelector('.edit-textarea');
    textarea.focus();
    // Colocamos el cursor al final del texto
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  }

  // ---------- CASO 2: CLIC EN "GUARDAR" ----------
  if (e.target.classList.contains('btn-guardar-edit')) {
    const postElement = e.target.closest('.post');
    const textarea = postElement.querySelector('.edit-textarea');
    const parrafoTexto = postElement.querySelector('.post-copy:not(.post-label)');
    
    const nuevoTexto = textarea.value.trim();

    if (nuevoTexto !== '') {
      parrafoTexto.textContent = nuevoTexto;
    }
    
    // Limpiamos el modo edición
    cerrarEditor(postElement);
  }

  // ---------- CASO 3: CLIC EN "CANCELAR" ----------
  if (e.target.classList.contains('btn-cancelar-edit')) {
    const postElement = e.target.closest('.post');
    cerrarEditor(postElement);
  }
});

// Función auxiliar para cerrar el editor
function cerrarEditor(postElement) {
  const editor = postElement.querySelector('.edit-mode');
  const parrafoTexto = postElement.querySelector('.post-copy:not(.post-label)');
  
  if (editor) editor.remove();
  if (parrafoTexto) parrafoTexto.style.display = '';
  
  postElement.classList.remove('editando');
}

//****************************Función para eliminar post*******************************/
// Variable para guardar temporalmente el post que se quiere eliminar
let postAEliminar = null;

//Detectar clic en "Eliminar" del dropdown
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-eliminar')) {
    e.preventDefault();

    // Guardamos el post que se quiere eliminar
    postAEliminar = e.target.closest('.post');

    // Mostramos el modal de Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('modalEliminar'));
    modal.show();
  }
});

// Detectar clic en "Eliminar" DENTRO del modal
document.addEventListener('click', (e) => {
  if (e.target.id === 'btnConfirmarEliminar') {
    
    if (postAEliminar) {
      // Animación de salida (fade out)
      postAEliminar.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      postAEliminar.style.opacity = '0';
      postAEliminar.style.transform = 'scale(0.95)';

      // Esperamos a que termine la animación y luego eliminamos del DOM
      setTimeout(() => {
        postAEliminar.remove();
        postAEliminar = null;
        console.log('✅ Publicación eliminada');
      }, 300);
    }

    // Cerramos el modal
    const modalElement = document.getElementById('modalEliminar');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();
  }
});

// Limpiar la variable si el usuario cancela o cierra el modal
document.getElementById('modalEliminar').addEventListener('hidden.bs.modal', () => {
  postAEliminar = null;
});

//****************************Función para compartir la publicación*******************************/
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('btn-compartir')) {
    e.preventDefault();

    const postId = e.target.getAttribute('data-id');
    const postElement = e.target.closest('.post');
    
    if (!postElement) return;
        const enlaceCompartir = `${window.location.origin}${window.location.pathname}#${postId}`;
         try {
      await navigator.clipboard.writeText(enlaceCompartir);
      mostrarToast('¡Enlace copiado al portapapeles!');
    } catch (err) {
      // Fallback para navegadores antiguos o sin HTTPS
      const textareaTemp = document.createElement('textarea');
      textareaTemp.value = enlaceCompartir;
      textareaTemp.style.position = 'fixed';
      textareaTemp.style.opacity = '0';
      document.body.appendChild(textareaTemp);
      textareaTemp.select();
      try {
        document.execCommand('copy');
        mostrarToast('¡Enlace copiado al portapapeles!');
      } catch (err2) {
        mostrarToast('No se pudo copiar el enlace', true);
      }
      document.body.removeChild(textareaTemp);
    }
  }
});

// FUNCIÓN: Mostrar notificación "compartir"
function mostrarToast(mensaje, esError = false) {
  // Creamos el toast si no existe
  let toast = document.getElementById('appToast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'app-toast';
    document.body.appendChild(toast);
  }

  // Aplicamos el mensaje y el color
  toast.textContent = mensaje;
  toast.classList.toggle('error', esError);
  toast.classList.add('visible');

  // Ocultamos después de 2.5 segundos
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2500);
}
