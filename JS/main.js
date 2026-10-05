// main.js

function cargarComponente(rutaArchivo, idContenedor) {
  fetch(rutaArchivo)
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error(`No se pudo cargar el archivo: ${rutaArchivo}`);
      }
      return respuesta.text();
    })
    .then(htmlContenido => {
      const contenedor = document.getElementById(idContenedor);
      if (contenedor) {
        // Reemplaza el <div> por el contenido real del componente
        contenedor.outerHTML = htmlContenido;
      }
    })
    .catch(error => console.error("Error al cargar componente:", error));
}

// Ejecutar de forma segura cuando el HTML base esté listo
document.addEventListener("DOMContentLoaded", () => {
  cargarComponente("./html/menu.html", "contenedor-menu");
  cargarComponente("./html/footer.html", "contenedor-footer");
});