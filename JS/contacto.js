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
  let errores = [];
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 2) errores.push("Nombre mínimo 2 letras");
  if (!regexEmail.test(email)) errores.push("Email no válido");
  if (phone && !/^\d{10}$/.test(phone)) errores.push("Teléfono debe tener 10 dígitos");
  if (message.length < 4) errores.push("Mensaje mínimo 4 caracteres");

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