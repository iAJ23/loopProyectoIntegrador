// Referencias al formulario y al contenedor de alertas
const form = document.getElementById("register-form");
const alertContainer = document.getElementById("alertContainer");

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
  const regexNombre = /^[\p{L}\s'-]+$/u;
  const regexUsuario = /^[a-zA-Z0-9_]+$/;
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  const regexTelefono = /^\d{10}$/;

  // Nombre
  if (!nombre) {
    errores.push('El nombre es obligatorio');
  } else if (nombre.length < 2) {
    errores.push('El nombre debe tener al menos 2 caracteres');
  } else if (!regexNombre.test(nombre)) {
    errores.push('El nombre solo puede contener letras');
  }

  // Apellido
  if (!apellido) {
    errores.push('El apellido es obligatorio');
  } else if (apellido.length < 2) {
    errores.push('El apellido debe tener al menos 2 caracteres');
  } else if (!regexNombre.test(apellido)) {
    errores.push('El apellido solo puede contener letras');
  }

  // Username
  if (!usuario) {
    errores.push('El username es obligatorio');
  } else if (usuario.length < 4) {
    errores.push('El username debe tener al menos 4 caracteres');
  } else if (usuario.length > 20) {
    errores.push('El username no puede superar los 20 caracteres');
  } else if (!regexUsuario.test(usuario)) {
    errores.push('El username solo puede contener letras, números y guion bajo (_)');
  }

  // Correo
  if (!correo) {
    errores.push('El correo es obligatorio');
  } else if (correo.length > 254) {
    errores.push('El correo es demasiado largo');
  } else if (!regexEmail.test(correo)) {
    errores.push('Ingresa un correo válido');
  }

  // Teléfono
  if (!telefono) {
    errores.push('El teléfono es obligatorio');
  } else if (!regexTelefono.test(telefono)) {
    errores.push('El teléfono debe tener exactamente 10 dígitos');
  } else if (/(\d)\1{3,}/.test(telefono)) {
    errores.push('El teléfono no puede repetir el mismo dígito más de 3 veces seguidas');
  }

  return errores;
}

// Un único listener para el evento submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  alertContainer.innerHTML = ""; // Limpiar alertas previas

  // Juntar los errores de cada validación
  const errores = [];
  errores.push(...validarDatosPersonales());

  // Capturar los valores usando los IDs exactos de tu HTML
  const contrasena = document.getElementById("contrasena").value;
  const confirmar = document.getElementById("confirmar-contrasena").value;

  // Contraseña
  if (!contrasena) {
    errores.push('La contraseña es obligatoria');
  } else if (contrasena.length < 8) {
    errores.push('La contraseña debe tener al menos 8 caracteres');
  } else if (contrasena.length > 20) {
    errores.push('La contraseña no puede superar los 20 caracteres');
  } else if (/\s/.test(contrasena)) {
    errores.push('La contraseña no puede contener espacios');
  } else if (!regexContrasena.test(contrasena)) {
    errores.push('La contraseña solo puede contener letras, números y los símbolos ! @ # \$ % ^ & * . _ -');
  } else {
    if (!/[A-Z]/.test(contrasena)) {
      errores.push('La contraseña debe incluir al menos una mayúscula');
    }
    if (!/[a-z]/.test(contrasena)) {
      errores.push('La contraseña debe incluir al menos una minúscula');
    }
    if (!/\d/.test(contrasena)) {
      errores.push('La contraseña debe incluir al menos un número');
    }
    if (!/[!@#\$%^&*._-]/.test(contrasena)) {
      errores.push('La contraseña debe incluir al menos un símbolo (! @ # \$ % ^ & * . _ -)');
    }
  }

  // Confirmar contraseña
  if (!confirmar) {
    errores.push('Debes confirmar tu contraseña');
  } else if (contrasena !== confirmar) {
    errores.push('Las contraseñas no coinciden');
  }

  // Si hay errores, se muestran en una alerta y no se envía nada
  if (errores.length > 0) {
    const lista = errores.map(error => `<li>${error}</li>`).join("");
    mostrarAlerta(`<strong>Revisa los siguientes campos:</strong><ul class="mb-0">${lista}</ul>`, "danger");
    return; // Detiene la ejecución aquí
  }

  // Si la validación pasó, se crea el objeto del usuario con los IDs del HTML
  const usuarioNuevo = {
    nombre: document.getElementById("nombre").value.trim(),
    apellido: document.getElementById("apellido").value.trim(),
    username: document.getElementById("username").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    password: contrasena
  };

  console.log(JSON.stringify(usuarioNuevo, null, 2));
  
  // Mostrar éxito
  mostrarAlerta("✓ Registro exitoso", "success");
  
  if (mensajeEstado) {
    mensajeEstado.textContent = "✓ Registro exitoso";
    mensajeEstado.style.color = "green";
  }
  
  form.reset();
});