export function initLogin() {
// Referencias al formulario y al contenedor de alertas
const form = document.getElementById("register-page");
const alertContainer = document.getElementById("alertContainer");

// Lista donde se van guardando los usuarios registrados (objetos JSON)
const usuarios = [];

// Muestra una alerta de Bootstrap (tipo: "danger" o "success")
function mostrarAlerta(contenido, tipo) {
  alertContainer.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      ${contenido}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>`;
}

// Validaciones de datos personales: nombre, apellido, username, correo y teléfono
function validarDatosPersonales() {
  const errores = [];

  // 1. Obtener y limpiar los valores
  const usuario = document.getElementById("username").value.trim();
  const correo = document.getElementById("correo").value.trim();

  // 2. Expresiones regulares
  // Letras (con acentos y ñ); varias palabras separadas por un solo espacio, apóstrofo o guion
  const regexUsuario = /^[a-zA-Z0-9_]+$/;
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;




  // Username
  if (!usuario) {
    errores.push('<strong>Username:</strong> es obligatorio. Usa de 4 a 20 caracteres (ejemplo: carlos_dev).');
  } else if (usuario.length < 4) {
    errores.push('<strong>Username:</strong> debe tener al menos 4 caracteres (ejemplo: carlos_dev).');
  } else if (usuario.length > 20) {
    errores.push('<strong>Username:</strong> no puede superar los 20 caracteres.');
  } else if (!regexUsuario.test(usuario)) {
    errores.push('<strong>Username:</strong> solo puede contener letras, números y guion bajo (_), sin espacios (ejemplo: carlos_dev).');
  }

  // Correo
  if (!correo) {
    errores.push('<strong>Correo:</strong> es obligatorio. Debe tener el formato usuario@dominio.com (ejemplo: carlos@correo.com).');
  } else if (correo.length > 254) {
    errores.push('<strong>Correo:</strong> es demasiado largo (máximo 254 caracteres).');
  } else if (!regexEmail.test(correo)) {
    errores.push('<strong>Correo:</strong> no es válido. Debe tener el formato usuario@dominio.com (ejemplo: carlos@correo.com).');
  }

  return errores;
}

// Validaciones de contraseña y confirmación
function validarContrasenas() {
  const errores = [];

  // Obtener los valores (las contraseñas no se recortan con trim)
  const contrasena = document.getElementById("contrasena").value;
  const confirmar = document.getElementById("confirmar-contrasena").value;

  // Caracteres permitidos
  const regexContrasena = /^[A-Za-z0-9!@#$%^&*._-]+$/;

  // Contraseña
  if (!contrasena) {
    errores.push('<strong>Contraseña:</strong> es obligatoria. Usa de 8 a 20 caracteres (ejemplo: Loop@2026).');
  } else if (contrasena.length < 8) {
    errores.push('<strong>Contraseña:</strong> debe tener al menos 8 caracteres (ejemplo: Loop@2026).');
  } else if (contrasena.length > 20) {
    errores.push('<strong>Contraseña:</strong> no puede superar los 20 caracteres.');
  } else if (/\s/.test(contrasena)) {
    errores.push('<strong>Contraseña:</strong> no puede contener espacios.');
  } else if (!regexContrasena.test(contrasena)) {
    errores.push('<strong>Contraseña:</strong> solo puede contener letras, números y los símbolos ! @ # $ % ^ &amp; * . _ -');
  } else {
    if (!/[A-Z]/.test(contrasena)) {
      errores.push('<strong>Contraseña:</strong> debe incluir al menos una mayúscula (ejemplo: Loop@2026).');
    }
    if (!/[a-z]/.test(contrasena)) {
      errores.push('<strong>Contraseña:</strong> debe incluir al menos una minúscula (ejemplo: Loop@2026).');
    }
    if (!/\d/.test(contrasena)) {
      errores.push('<strong>Contraseña:</strong> debe incluir al menos un número (ejemplo: Loop@2026).');
    }
    if (!/[!@#$%^&*._-]/.test(contrasena)) {
      errores.push('<strong>Contraseña:</strong> debe incluir al menos un símbolo: ! @ # $ % ^ &amp; * . _ -');
    }
  }

  // Confirmar contraseña
  if (!confirmar) {
    errores.push('<strong>Confirmar contraseña:</strong> vuelve a escribir tu contraseña.');
  } else if (contrasena !== confirmar) {
    errores.push('<strong>Confirmar contraseña:</strong> no coincide. Escribe exactamente la misma contraseña en los dos campos.');
  }

  return errores;
}

// Un único listener para el evento submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  alertContainer.innerHTML = ""; // Limpiar alertas previas

  // 1. Juntar los errores de cada validación
  const errores = [...validarDatosPersonales(), ...validarContrasenas()];

  // 2. Si hay errores, se muestran en una alerta y no se registra nada
  if (errores.length > 0) {
    const lista = errores.map(error => `<li>${error}</li>`).join("");
    mostrarAlerta(`<strong>Revisa los siguientes campos:</strong><ul class="mb-0">${lista}</ul>`, "danger");
    return; // Detiene la ejecución aquí
  }

  // 3. Si la validación pasó, se crea el objeto del usuario
  const usuarioNuevo = {
    username: document.getElementById("username").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    password: document.getElementById("contrasena").value
  };

  // 4. Se agrega a la lista y se muestra en formato JSON en la consola (F12)
  usuarios.push(usuarioNuevo);
  console.log(JSON.stringify(usuarioNuevo, null, 2));
  console.log("Usuarios registrados:", usuarios.length);

  // 5. Alerta de éxito y limpiar el formulario
  mostrarAlerta("✓ Inicio exitoso", "success");
  form.reset();
});
 }