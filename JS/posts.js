
/***** GESTIÓN DE PUBLICACIONES *****/

import { validarPublicacion } from './validarPublicaion.js';

import {
  alertaPublicacionExitosa,
  alertaError
} from './alerts.js';

// Evitar interpretar como HTML los datos del usuario
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

// Inicializar el formulario
export function initPosts() {
  const postForm = document.getElementById('postForm');

  if (!postForm) return;

  postForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener elementos del formulario
    const displayNameInput = document.getElementById('displayName');
    const textInput = document.getElementById('text');
    const labelPostInput = document.getElementById('label-post');
    const container = document.getElementById('postsContainer');

    if (!displayNameInput || !textInput || !labelPostInput) {
      alertaError(
        'Formulario incompleto',
        'No se encontraron todos los campos necesarios.'
      );
      return;
    }

    // Validar campos
    const datos = validarPublicacion({
      postForm,
      displayNameInput,
      textInput,
      labelPostInput
    });

    if (!datos) return;

    // Comprobar contenedor
    if (!container) {
      alertaError(
        '¡Ups! Algo salió mal',
        'No se encontró el contenedor de publicaciones.'
      );
      return;
    }

    const { displayName, text, labelPost } = datos;

    // Escapar los valores
    const safeName = escapeHTML(displayName);
    const safeText = escapeHTML(text);
    const safeLabel = escapeHTML(labelPost);
    const initial = escapeHTML(
      displayName.charAt(0).toUpperCase()
    );

    // Crear fecha
    const fecha = new Date();

    const fechaFormateada = fecha.toLocaleString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Crear artículo
    const postArticle = document.createElement('article');
    postArticle.className = 'post panel';

    postArticle.innerHTML = `
      <header class="post-header">
        <div class="avatar avatar-mini">
          <span class="image-placeholder">${initial}</span>
        </div>

        <div class="post-author">
          <h2>${safeName}</h2>
        </div>

        <button
          type="button"
          class="more dropdown-menu-dark"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-label="Más opciones">
          •••
        </button>

        <ul class="dropdown-menu dropdown-menu-dark">
          <li><a class="dropdown-item" href="#">Editar</a></li>
          <li><a class="dropdown-item" href="#">Eliminar</a></li>
          <li><a class="dropdown-item" href="#">Compartir</a></li>
        </ul>
      </header>

      <p class="post-copy">${safeText}</p>

      <p class="post-copy post-label">#${safeLabel}</p>

      <footer class="post-actions">
        <button
          type="button"
          class="like"
          aria-label="Me gusta"
          aria-pressed="false">
          <span aria-hidden="true">♡</span>
          <span class="likes-count">0</span>
        </button>

        <button type="button" class="comments">
          <span aria-hidden="true">▢</span>
          0 comentarios
        </button>

        <span
          class="post-date fs-14 text-secondary"
          title="${fecha.toISOString()}">
          ${fechaFormateada}
        </span>
      </footer>
    `;

    // Funcionalidad de Me gusta
    const likeBtn = postArticle.querySelector('.like');

    likeBtn.addEventListener('click', function () {
      const countSpan = this.querySelector('.likes-count');
      const heart = this.querySelector('[aria-hidden="true"]');
      const liked = this.dataset.liked === 'true';

      const currentLikes =
        parseInt(countSpan.textContent, 10) || 0;

      if (liked) {
        countSpan.textContent = Math.max(0, currentLikes - 1);
        heart.textContent = '♡';
        this.style.color = '';
        this.dataset.liked = 'false';
        this.setAttribute('aria-pressed', 'false');
      } else {
        countSpan.textContent = currentLikes + 1;
        heart.textContent = '♥';
        this.style.color = '#c2ff42';
        this.dataset.liked = 'true';
        this.setAttribute('aria-pressed', 'true');
      }
    });

    // Insertar publicación al principio
    container.prepend(postArticle);

    // Limpiar formulario
    postForm.reset();
    displayNameInput.focus();

    // Mostrar notificación de éxito
    alertaPublicacionExitosa();
  });
}
