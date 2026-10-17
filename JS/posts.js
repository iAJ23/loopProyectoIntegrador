
// posts.js
// Módulo que maneja el formulario de publicaciones, comentarios,
// edición, eliminación y compartir publicaciones.


import { validarPublicacion } from './validarPublicacion.js';
import {
  alertaPublicacionExitosa,
  alertaError
} from './alerts.js';

// Objeto temporal para guardar los comentarios en memoria
const comentariosDB = {};

// 1. INICIALIZAR EL FORMULARIO DE PUBLICAR*********************************************
export function initPosts() {
  const postForm = document.getElementById('postForm');
  if (!postForm) return;

  postForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener elementos del DOM
    const displayNameInput = document.getElementById('displayName');
    const textInput = document.getElementById('text');
    const labelPostInput = document.getElementById('label-post');
    const container = document.getElementById('postsContainer');

    // Validar que existan los campos
    if (!displayNameInput || !textInput || !labelPostInput) {
      alertaError(
        'Formulario incompleto',
        'No se encontraron todos los campos necesarios.'
      );
      return;
    }

    //  Llamada formulario y los inputs
    const datos = validarPublicacion({
      postForm: event.target,
      displayNameInput,
      textInput,
      labelPostInput
    });

    // Si la validación falló, salimos
    if (!datos) return;

    // Extraer los valores ya validados y limpios
    const { displayName, text, labelPost } = datos;

    // Validar contenedor
    if (!container) {
      alertaError(
        '¡Ups! Algo salió mal',
        'No se encontró el contenedor de publicaciones.'
      );
      return;
    }

    // Crear el article
    const postArticle = document.createElement('article');
    postArticle.className = 'post panel';

    const initial = displayName.charAt(0).toUpperCase();

    // Escapar HTML
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

    // Fecha formateada
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

    // HTML de la publicación
    postArticle.innerHTML = `
      <header class="post-header g-8">
        <div class="avatar avatar-mini">
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

    // Evento del botón "like"
    const likeBtn = postArticle.querySelector('.like');
    likeBtn.addEventListener('click', function () {
      const countSpan = this.querySelector('.likes-count');
      let currentLikes = parseInt(countSpan.textContent) || 0;
      currentLikes++;
      countSpan.textContent = currentLikes;
      this.querySelector('span[aria-hidden="true"]').textContent = '♥';
      this.style.color = '#c2ff42';
    });

    // Insertar al principio y resetear
    container.prepend(postArticle);
    this.reset();

    // Alerta de éxito
    if (typeof alertaPublicacionExitosa === 'function') {
      alertaPublicacionExitosa();
    }
  });
}

// 2. COMENTARIOS****************************************************************
document.addEventListener('submit', (e) => {
  if (e.target.classList.contains('comment-form')) {
    e.preventDefault();
    const form = e.target;
    const postId = form.getAttribute('data-id');
    const input = form.querySelector('.comment-input');
    const texto = input.value.trim();
    if (!texto) return;

    if (!comentariosDB[postId]) comentariosDB[postId] = [];
    comentariosDB[postId].push({ autor: 'Tú', texto });
    input.value = '';
    mostrarComentarios(postId);
  }
});

function mostrarComentarios(postId) {
  const lista = document.getElementById(`list-${postId}`);
  const contador = document.querySelector(
    `[data-bs-target="#comments-${postId}"] .comments-count`
  );
  const comentarios = comentariosDB[postId] || [];

  if (contador) contador.textContent = comentarios.length;

  if (comentarios.length === 0) {
    lista.innerHTML =
      '<p class="text-muted small m-0">No hay comentarios aún.</p>';
    return;
  }

  lista.innerHTML = comentarios
    .map(
      (c) => `
      <div class="comment-item">
        <div class="comment-author">${c.autor}</div>
        <p class="comment-text">${c.texto}</p>
      </div>
    `
    )
    .join('');
}

// 3. EDITAR PUBLICACIÓN********************************************************************
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-editar')) {
    e.preventDefault();

    const postElement = e.target.closest('.post');
    if (!postElement) return;

    if (postElement.classList.contains('editando')) return;
    postElement.classList.add('editando');

    const parrafoTexto = postElement.querySelector('.post-copy:not(.post-label)');
    if (!parrafoTexto) return;

    const textoActual = parrafoTexto.textContent;

    const editorHTML = `
      <div class="edit-mode">
        <textarea class="edit-textarea">${textoActual}</textarea>
        <div class="edit-buttons">
          <button type="button" class="btn-cancelar-edit">Cancelar</button>
          <button type="button" class="btn-guardar-edit">Guardar</button>
        </div>
      </div>
    `;

    parrafoTexto.style.display = 'none';
    parrafoTexto.insertAdjacentHTML('afterend', editorHTML);

    const textarea = postElement.querySelector('.edit-textarea');
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  }

  if (e.target.classList.contains('btn-guardar-edit')) {
    const postElement = e.target.closest('.post');
    const textarea = postElement.querySelector('.edit-textarea');
    const parrafoTexto = postElement.querySelector('.post-copy:not(.post-label)');

    const nuevoTexto = textarea.value.trim();
    if (nuevoTexto !== '') {
      parrafoTexto.textContent = nuevoTexto;
    }

    cerrarEditor(postElement);
  }

  if (e.target.classList.contains('btn-cancelar-edit')) {
    const postElement = e.target.closest('.post');
    cerrarEditor(postElement);
  }
});

function cerrarEditor(postElement) {
  const editor = postElement.querySelector('.edit-mode');
  const parrafoTexto = postElement.querySelector('.post-copy:not(.post-label)');

  if (editor) editor.remove();
  if (parrafoTexto) parrafoTexto.style.display = '';

  postElement.classList.remove('editando');
}

// 4. ELIMINAR PUBLICACIÓN**************************************************************************
let postAEliminar = null;

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-eliminar')) {
    e.preventDefault();

    postAEliminar = e.target.closest('.post');

    const modalElement = document.getElementById('modalEliminar');
    if (!modalElement) return;

    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
});

document.addEventListener('click', (e) => {
  if (e.target.id === 'btnConfirmarEliminar') {
    if (postAEliminar) {
      postAEliminar.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      postAEliminar.style.opacity = '0';
      postAEliminar.style.transform = 'scale(0.95)';

      setTimeout(() => {
        postAEliminar.remove();
        postAEliminar = null;
      }, 300);
    }

    const modalElement = document.getElementById('modalEliminar');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();
  }
});

const modalEliminarEl = document.getElementById('modalEliminar');
if (modalEliminarEl) {
  modalEliminarEl.addEventListener('hidden.bs.modal', () => {
    postAEliminar = null;
  });
}

// 5. COMPARTIR PUBLICACIÓN***************************************************************
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('btn-compartir')) {
    e.preventDefault();

    const postId = e.target.getAttribute('data-id');
    const enlaceCompartir = `${window.location.origin}${window.location.pathname}#${postId}`;

    try {
      await navigator.clipboard.writeText(enlaceCompartir);
      mostrarToast('¡Enlace copiado al portapapeles!');
    } catch (err) {
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

function mostrarToast(mensaje, esError = false) {
  let toast = document.getElementById('appToast');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'app-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = mensaje;
  toast.classList.toggle('error', esError);
  toast.classList.add('visible');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2500);
}

