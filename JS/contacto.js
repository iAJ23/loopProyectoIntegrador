// Inicialización de EmailJS
emailjs.init({
  publicKey: "1npEs0v9qrtpCfH59"
});

// Referencias al formulario y al contenedor de mensajes
const form = document.getElementById("contact-form");
const status = document.getElementById("status");

// Un único listener para el evento submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // 1. Obtener y limpiar los valores
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // 2. Validaciones
        const errores = [];
        const nombre = name.trim();
        const correo = email.trim();
        const telefono = phone.trim();
        const mensaje = message.trim();


        const regexNombre = /^[\p{L}\s'-]+$/u;
        const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        const regexTelefono = /^\d{10}$/;

        // Nombre
        if (!nombre) {
                    errores.push('El nombre es obligatorio');
            } else if (nombre.length <= 3) {
                 errores.push('El nombre debe tener más de 3 caracteres');
             } else if (!regexNombre.test(nombre)) {
                  errores.push('El nombre solo puede contener letras');
        }

        // Email
        if (!correo) {
            errores.push('El email es obligatorio');
             } else if (correo.length > 254) {
                 errores.push('El email es demasiado largo');
             } else if (!regexEmail.test(correo)) {
             errores.push('Ingresa un email válido');
        }

        // Teléfono
         if (telefono) {
            if (!regexTelefono.test(telefono)) {
            errores.push('El teléfono debe tener exactamente 10 dígitos');
            } else if (/^(\d)\1{9}$/.test(telefono)) {
             errores.push('El teléfono no es válido');
            }
        }

        // Mensaje
        if (!mensaje) {
                 errores.push('El mensaje es obligatorio');
             } else if (mensaje.length < 4) {
                  errores.push('El mensaje debe tener al menos 4 caracteres');
             } else if (mensaje.length > 1000) {
             errores.push('El mensaje no puede superar los 1000 caracteres');
        }

  // 3. Si hay errores, no se envía nada
  if (errores.length > 0) {
    status.textContent = errores.join(" | ");
    status.style.color = "red";
    return; // Detiene la ejecución aquí
  }

  // 4. Si la validación pasó, se prepara el envío
  status.textContent = "Enviando...";
  status.style.color = "";

  const data = {
    name,
    email,
    phone,
    message,
    time: new Date().toLocaleString("es-MX")
  };

  // 5. Envío con EmailJS
  emailjs.send(
    "service_d19uam5",
    "template_7gy9im8",
    data
  )
  .then(function (response) {
    console.log("Éxito:", response);
    status.textContent = "✓ Mensaje enviado";
    form.reset();
  })
  .catch(function (error) {
    console.error("ERROR COMPLETO:", error);
    status.textContent = "Ocurrió un error al enviar el mensaje. Intenta de nuevo.";
  });
});