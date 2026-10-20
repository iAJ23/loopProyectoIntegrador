export function initSingUp() {
// Referencias al formulario y al contenedor de alertas
const form = document.getElementById("register-form");
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
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const usuario = document.getElementById("username").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  // 2. Expresiones regulares
  // Letras (con acentos y ñ); varias palabras separadas por un solo espacio, apóstrofo o guion
  const regexNombre = /^\p{L}+(?:[ '-]\p{L}+)*$/u;
  // La misma letra 3 veces seguidas (ejemplo: "Caaarlos")
  const regexLetraRepetida = /(.)\1{2,}/iu;
  const regexUsuario = /^[a-zA-Z0-9_]+$/;
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  const regexTelefono = /^\d{10}$/;

  // Nombre
  if (!nombre) {
    errores.push('<strong>Nombre:</strong> es obligatorio. Escribe tu nombre usando solo letras (ejemplo: Carlos).');
  } else if (nombre.length < 3) {
    errores.push('<strong>Nombre:</strong> debe tener al menos 3 caracteres (ejemplo: Carlos).');
  } else if (nombre.length > 30) {
    errores.push('<strong>Nombre:</strong> no puede superar los 30 caracteres.');
  } else if (!regexNombre.test(nombre)) {
    errores.push('<strong>Nombre:</strong> solo puede contener letras, sin números ni símbolos. Si tienes dos nombres, sepáralos con un solo espacio (ejemplo: Ana María).');
  } else if (regexLetraRepetida.test(nombre)) {
    errores.push('<strong>Nombre:</strong> no puede tener la misma letra 3 veces seguidas (ejemplo: Carlos).');
  }

  // Apellido
  if (!apellido) {
    errores.push('<strong>Apellido:</strong> es obligatorio. Escribe tu apellido usando solo letras (ejemplo: Hernández).');
  } else if (apellido.length < 3) {
    errores.push('<strong>Apellido:</strong> debe tener al menos 3 caracteres (ejemplo: Hernández).');
  } else if (apellido.length > 30) {
    errores.push('<strong>Apellido:</strong> no puede superar los 30 caracteres.');
  } else if (!regexNombre.test(apellido)) {
    errores.push('<strong>Apellido:</strong> solo puede contener letras, sin números ni símbolos. Si tienes dos apellidos, sepáralos con un solo espacio (ejemplo: Pérez López).');
  } else if (regexLetraRepetida.test(apellido)) {
    errores.push('<strong>Apellido:</strong> no puede tener la misma letra 3 veces seguidas (ejemplo: Hernández).');
  }

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

  // Teléfono
  if (!telefono) {
    errores.push('<strong>Teléfono:</strong> es obligatorio. Escribe 10 dígitos (ejemplo: 5512345678).');
  } else if (!regexTelefono.test(telefono)) {
    errores.push('<strong>Teléfono:</strong> debe tener exactamente 10 dígitos, solo números y sin espacios ni guiones (ejemplo: 5512345678).');
  } else if (telefono.startsWith("0")) {
    errores.push('<strong>Teléfono:</strong> no puede empezar con 0 (ejemplo: 5512345678).');
  } else if (/(\d)\1{3,}/.test(telefono)) {
    errores.push('<strong>Teléfono:</strong> no puede repetir el mismo dígito más de 3 veces seguidas (ejemplo: 5512345678).');
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
    nombre: document.getElementById("nombre").value.trim(),
    apellido: document.getElementById("apellido").value.trim(),
    username: document.getElementById("username").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    password: document.getElementById("contrasena").value
  };

  // 4. Se agrega a la lista y se muestra en formato JSON en la consola (F12)
  usuarios.push(usuarioNuevo);
  console.log(JSON.stringify(usuarioNuevo, null, 2));
  console.log("Usuarios registrados:", usuarios.length);

  // 5. Alerta de éxito y limpiar el formulario
  mostrarAlerta("✓ Registro exitoso", "success");
  form.reset();
});
}
