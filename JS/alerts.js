
/***** ALERTAS PERSONALIZADAS *****/

// Publicación creada correctamente
export function alertaPublicacionExitosa() {
  Swal.fire({
    toast: true,
    position: 'top',
    icon: 'success',
    title: '¡Publicación creada!',
    text: 'Tu publicación se ha agregado correctamente.',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#171a21',
    color: '#ffffff',
    customClass: {
      popup: 'swal-toast'
    }
  });
}

// Mostrar un error
export function alertaError(titulo, mensaje) {
  Swal.fire({
    icon: 'error',
    title: titulo,
    text: mensaje,
    confirmButtonText: 'Entendido',
    confirmButtonColor: '#c2ff42',
    background: '#171a21',
    color: '#ffffff'
  });
}

// Solicitar confirmación
export function alertaConfirmacion(titulo, mensaje) {
  return Swal.fire({
    icon: 'question',
    title: titulo,
    text: mensaje,
    showCancelButton: true,
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#c2ff42',
    cancelButtonColor: '#4b5563',
    background: '#171a21',
    color: '#ffffff'
  });
}
