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

  // 1. Juntar los errores de cada validación
  const errores = [];
  errores.push(...validarDatosPersonales());
  // errores.push(...validarContrasenas());   // <- KAREN aquí se agrega tu parte compañera 

  // 2. Si hay errores, se muestran en una alerta y no se envía nada
  if (errores.length > 0) {
    const lista = errores.map(error => `<li>${error}</li>`).join("");
    mostrarAlerta(`<strong>Revisa los siguientes campos:</strong><ul class="mb-0">${lista}</ul>`, "danger");
    return; // Detiene la ejecución aquí
  }

  // 3. Karen: Aqui deberias agregar el objeto JSON una ves que pasen las validaciones
  mostrarAlerta("✓ Registro exitoso", "success");
  form.reset();
});