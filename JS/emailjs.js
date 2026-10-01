// 1. INICIALIZACIÓN DE EMAILJS
// Conecta el script con tu cuenta de EmailJS usando tu llave pública (Public Key).
// Debe ejecutarse antes de intentar enviar cualquier correo.
emailjs.init({
  publicKey: "1npEs0v9qrtpCfH59"
});
// 2. CAPTURA DE ELEMENTOS DEL DOM
// Guardamos en variables las referencias a los elementos HTML para interactuar con ellos.
const form = document.getElementById("contact-form"); // El formulario HTML (<form>)
const status = document.getElementById("status");     // El contenedor donde se mostrarán los mensajes de estado (éxito/error)

// 3. ESCUCHADOR DE EVENTOS (EVENT LISTENER)
// Escuchamos el evento 'submit' que se dispara cuando el usuario da clic en el botón de enviar o presiona Enter.
form.addEventListener("submit", function (e) {

  // Evita que el navegador recargue la página automáticamente (comportamiento por defecto al enviar un formulario).
  e.preventDefault();

  // 4. RECOLECCIÓN Y PREPARACIÓN DE DATOS
  // Creamos un objeto JavaScript ('data') con las variables que la plantilla de EmailJS espera recibir.
  // Ejemplo: {{name}}, {{email}}, {{phone}}, {{message}}, {{time}}.
  const data = {
    name: document.getElementById("name").value,    // Obtiene el valor escrito en el campo nombre
    email: document.getElementById("email").value,  // Obtiene el valor del correo electrónico
    phone: document.getElementById("phone").value,  // Obtiene el número telefónico
    message: document.getElementById("message").value, // Obtiene el texto del mensaje
    time: new Date().toLocaleString("es-MX")        // Genera la fecha y hora actual en formato de México (ej. "01/10/2026, 12:48:00")
  };

  // 5. FEEDBACK VISUAL INICIAL
  // Notifica inmediatamente al usuario que el proceso de envío ha comenzado.
  status.textContent = "Enviando...";

    // 6. ENVÍO DEL CORREO MEDIANTE EMAILJS
  // La función emailjs.send es asíncrona y devuelve una Promesa (Promise).
  // Parámetros: Service ID, Template ID, y el objeto con los datos del formulario.
  emailjs.send(
    "service_d19uam5",// ID del servicio de correo configurado en EmailJS (Gmail, Outlook, etc.)
    "template_7gy9im8",// ID de la plantilla de correo creada en EmailJS
    data    // Objeto con la información recolectada
  )

  // 7. MANEJO DE ÉXITO (.then)
  // Se ejecuta si EmailJS procesó y envió el correo correctamente.
  .then(function (response) {
    // Imprime en la consola del navegador la respuesta técnica del servidor (útil para depurar)
    console.log("Éxito:", response);

    // Muestra un mensaje amigable confirmando al usuario que el correo fue enviado
    status.textContent = "✓ Mensaje enviado";

    // Limpia/vacía todos los campos del formulario para que quede listo para otro uso
    form.reset();
  })
  
  // 8. MANEJO DE ERRORES (.catch)
  // Se ejecuta si ocurrió algún fallo (llaves incorrectas, sin conexión, error de servidor, etc.).
  .catch(function (error) {
    // Registra el error detallado en la consola del navegador
    console.error("ERROR COMPLETO:", error);

    // Muestra en la interfaz el mensaje de error retornado por EmailJS
    status.textContent = "Error: " + error.text;
  });
});