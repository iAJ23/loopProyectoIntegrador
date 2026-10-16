/***** GESTIÓN DE PUBLICACIONES *****/

import { validarPublicacion } from './validarPublicacion.js';
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

// Objeto temporal para guardar los comentarios
const comentariosDB = {};

// Variable para guardar temporalmente el post que se quiere eliminar
let postAEliminar = null;

// Inicializar el formulario y los eventos globales de comentarios
export function initPosts() {
  const postForm = document.getElementById('postForm');

  if (postForm) {
    postForm.addEventListener('submit', function (event) {
      event.preventDefault();

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

      if (!container) {
        alertaError(
          '¡Ups! Algo salió mal',
          'No se encontró el contenedor de publicaciones.'
        );
        return;
      }

      const { displayName, text, labelPost } = datos;

      const safeName = escapeHTML(displayName);
      const safeText = escapeHTML(text);
      const safeLabel = escapeHTML(labelPost);
      const initial = escapeHTML(
        displayName.charAt(0).toUpperCase()
      );

      const uniqueId = 'post-' + Date.now();

      const fecha = new Date();
      const fechaFormateada = fecha.toLocaleString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const postArticle = document.createElement('article');
      postArticle.className = 'post panel';
      postArticle.id = uniqueId;

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
            <li><button type="button" class="dropdown-item btn-editar">Editar</button></li>
            <li><button type="button" class="dropdown-item btn-eliminar">Eliminar</button></li>
            <li><button type="button" class="dropdown-item btn-compartir" data-id="${uniqueId}">Compartir</button></li>
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

          <button
            type="button"
            class="comments"
            data-bs-toggle="collapse"
            data-bs-target="#comments-${uniqueId}"
            aria-expanded="false">
            <span aria-hidden="true">▢</span>
            <span class="comments-count">0</span> comentarios
          </button>

          <span
            class="post-date fs-14 text-secondary"
            title="${fecha.toISOString()}">
            ${fechaFormateada}
          </span>
        </footer>

        <!-- Sección de comentarios colapsable -->
        <div class="collapse mt-3" id="comments-${uniqueId}">
          <div class="comments-container p-2 border-top">
            <form class="comment-form mb-2" data-id="${uniqueId}">
              <div class="input-group input-group-sm">
                <input type="text" class="form-control comment-input" placeholder="Escribe un comentario..." required>
                <button class="btn btn-outline-light" type="submit">Comentar</button>
              </div>
            </form>
            <div id="list-${uniqueId}" class="comments-list">
              <p class="text-muted small m-0">No hay comentarios aún.</p>
            </div>
          </div>
        </div>
      `;

      // ==========================================
      // ASOCIAR EVENTOS DIRECTAMENTE AL ARTÍCULO CREADO
      // ==========================================

      // 1. Funcionalidad de Me gusta
      const likeBtn = postArticle.querySelector('.like');
      likeBtn.addEventListener('click', function() {
        const countSpan = this.querySelector('.likes-count');
        let currentLikes = parseInt(countSpan.textContent, 10) || 0;
        currentLikes++;
        countSpan.textContent = currentLikes;
        this.querySelector('span[aria-hidden="true"]').textContent = '♥';
        this.style.color = '#c2ff42';
      });

      // 2. Botón Editar
      const btnEditar = postArticle.querySelector('.btn-editar');
      btnEditar.addEventListener('click', (e) => {
        e.preventDefault();
        if (postArticle.classList.contains('editando')) return;

        postArticle.classList.add('editando');
        const parrafoTexto = postArticle.querySelector('.post-copy:not(.post-label)');
        if (!parrafoTexto) return;

        const textoActual = parrafoTexto.textContent;
        const editorHTML = `
          <div class="edit-mode mt-2">
            <textarea class="edit-textarea form-control mb-2">${textoActual}</textarea>
            <div class="edit-buttons d-flex gap-2">
              <button type="button" class="btn btn-sm btn-secondary btn-cancelar-edit">Cancelar</button>
              <button type="button" class="btn btn-sm btn-success btn-guardar-edit">Guardar</button>
            </div>
          </div>
        `;

        parrafoTexto.style.display = 'none';
        parrafoTexto.insertAdjacentHTML('afterend', editorHTML);

        const textarea = postArticle.querySelector('.edit-textarea');
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);

        // Eventos internos del editor
        postArticle.querySelector('.btn-guardar-edit').addEventListener('click', () => {
          const nuevoTexto = textarea.value.trim();
          if (nuevoTexto !== '') parrafoTexto.textContent = nuevoTexto;
          cerrarEditor(postArticle);
        });

        postArticle.querySelector('.btn-cancelar-edit').addEventListener('click', () => {
          cerrarEditor(postArticle);
        });
      });

      // 3. Botón Eliminar
      const btnEliminar = postArticle.querySelector('.btn-eliminar');
      btnEliminar.addEventListener('click', (e) => {
        e.preventDefault();
        postAEliminar = postArticle;
        const modalElement = document.getElementById('modalEliminar');
        if (modalElement && typeof bootstrap !== 'undefined') {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      });

      // 4. Botón Compartir
      const btnCompartir = postArticle.querySelector('.btn-compartir');
      btnCompartir.addEventListener('click', async (e) => {
        e.preventDefault();
        const enlaceCompartir = `${window.location.origin}${window.location.pathname}#${uniqueId}`;

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
      });

      // Insertar al principio del contenedor
      container.prepend(postArticle);

      postForm.reset();
      displayNameInput.focus();
      alertaPublicacionExitosa();
    });
  }

  // Inicializar el listener global únicamente para el modal de eliminación y comentarios
  initGlobalEvents();
}

// Función que dibuja los comentarios en pantalla
function mostrarComentarios(postId) {
  const lista = document.getElementById(`list-${postId}`);
  const contador = document.querySelector(`[data-bs-target="#comments-${postId}"] .comments-count`);
  const comentarios = comentariosDB[postId] || [];

  if (contador) contador.textContent = comentarios.length;

  if (comentarios.length === 0) {
    lista.innerHTML = '<p class="text-muted small m-0">No hay comentarios aún.</p>';
    return;
  }

  lista.innerHTML = comentarios.map(c => `
    <div class="comment-item mb-1">
      <div class="comment-author fw-bold small">${c.autor}</div>
      <p class="comment-text small m-0">${c.texto}</p>
    </div>
  `).join('');
}

// Configuración exclusiva para comentarios y confirmación del modal
function initGlobalEvents() {
  
  // Escuchar envío de comentarios
  document.addEventListener('submit', (e) => {
    if (e.target.classList.contains('comment-form')) {
      e.preventDefault();

      const form = e.target;
      const postId = form.getAttribute('data-id');
      const input = form.querySelector('.comment-input');
      const texto = input.value.trim();

      if (!texto) return;

      if (!comentariosDB[postId]) {
        comentariosDB[postId] = [];
      }

      comentariosDB[postId].push({
        autor: "Tú",
        texto: texto
      });

      input.value = '';
      mostrarComentarios(postId);
    }
  });

  // Confirmar eliminación dentro del modal de Bootstrap
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
      if (modalElement && typeof bootstrap !== 'undefined') {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();
      }
    }
  });

  const modalEliminar = document.getElementById('modalEliminar');
  if (modalEliminar) {
    modalEliminar.addEventListener('hidden.bs.modal', () => {
      postAEliminar = null;
    });
  }
}

// Función auxiliar para cerrar el editor
function cerrarEditor(postElement) {
  const editor = postElement.querySelector('.edit-mode');
  const parrafoTexto = postElement.querySelector('.post-copy:not(.post-label)');
  
  if (editor) editor.remove();
  if (parrafoTexto) parrafoTexto.style.display = '';
  
  postElement.classList.remove('editando');
}

// FUNCIÓN: Mostrar notificación "toast"
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