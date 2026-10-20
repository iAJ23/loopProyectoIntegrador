export function Login() {
document.addEventListener("DOMContentLoaded", () => {
    const btnLogIn = document.querySelector(".btn-LogIn");
    const btnLogOut = document.querySelector(".btn-LogOut");

    // Función para actualizar la interfaz según el estado de sesión
    function actualizarEstadoSesion() {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (isLoggedIn) {
            if (btnLogIn) btnLogIn.style.display = "none";
            if (btnLogOut) btnLogOut.style.display = "block";
        } else {
            if (btnLogIn) btnLogIn.style.display = "block";
            if (btnLogOut) btnLogOut.style.display = "none";
        }
    }

    // Evento para Iniciar Sesión (aquí puedes redirigir a tu login.html o abrir un modal)
    if (btnLogIn) {
        btnLogIn.addEventListener("click", (e) => {
            e.preventDefault();
            // Simulación de inicio de sesión exitoso:
            localStorage.setItem("isLoggedIn", "true");
            alert("¡Has iniciado sesión con éxito!");
            actualizarEstadoSesion();
            // location.reload(); // Opcional: recargar la página si es necesario
        });
    }

    // Evento para Cerrar Sesión
    if (btnLogOut) {
        btnLogOut.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("isLoggedIn");
            alert("Has cerrado sesión.");
            actualizarEstadoSesion();
            // location.reload(); // Opcional: recargar la página
        });
    }

    // Ejecutar al cargar la página
    actualizarEstadoSesion();
});
}