import { alertaFormulario } from './alerts.js';
import { guardarDatosFormulario } from './storage.js';

const USERS_STORAGE_KEY = "loop.users";
const CURRENT_USER_STORAGE_KEY = "loop.currentUser";

export function initLogin() {
  const form = document.getElementById("login-form");
  const alertContainer = document.getElementById("alertContainer");
  if (!form || !alertContainer) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alertContainer.replaceChildren();

    const identificador = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("contrasena").value;
    const usuarios = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]");
    const usuario = usuarios.find((cuenta) =>
      (cuenta.username.toLowerCase() === identificador || cuenta.correo.toLowerCase() === identificador) &&
      cuenta.password === password
    );

    if (!usuario) {
      alertaFormulario("No se pudo iniciar sesión", "Usuario/correo o contraseña incorrectos. Verifica tus datos e inténtalo de nuevo.", "error");
      return;
    }

    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify({
      username: usuario.username,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo
    }));
    guardarDatosFormulario("login-form", {
      identificador,
      username: usuario.username,
      correo: usuario.correo
    });
    window.location.href = "./perfil.html";
  });
}


