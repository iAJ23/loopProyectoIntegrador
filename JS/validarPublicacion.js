
/***** VALIDACIONES DE PUBLICACIONES *****/

export function validarPublicacion({
  postForm,
  textInput,
  labelPostInput
}) {
  // Limpiar errores anteriores
  postForm.querySelectorAll('.validation-error').forEach(error => {
    error.remove();
  });

  [textInput, labelPostInput].forEach(input => {
    input.removeAttribute('aria-invalid');
    input.classList.remove('is-invalid');
  });

  const text = textInput.value.trim();
  const labelPost = labelPostInput.value.trim().replace(/^#+/, '');

  let errorInput = null;
  let errorMessage = '';

  // Función para registrar el primer error
  function setError(input, message) {
    if (!errorMessage) {
      errorInput = input;
      errorMessage = message;
    }
  }

  // Validar publicación
  if (!text) {
      setError(textInput, 'Escribe el contenido de tu publicación.');
  } else if (text.length < 5) {
      setError(textInput, 'La publicación debe tener al menos 5 caracteres.');
  } else if (text.length > 300) {
      setError(textInput, 'La publicación no puede superar los 300 caracteres.');
  } else if (!/[\p{L}\p{N}]/u.test(text)) {
      setError(textInput, 'La publicación debe contener letras o números.');
  }

  // Validar etiqueta
  if (!errorMessage) {
    if (!labelPost) {
      setError(labelPostInput, 'La etiqueta es obligatoria.');
    } else if (labelPost.length < 3) {
      setError(labelPostInput, 'La etiqueta debe tener al menos 3 caracteres.');
    } else if (labelPost.length > 30) {
      setError(labelPostInput, 'La etiqueta no puede superar los 30 caracteres.');
    } else if (!/^[\p{L}\p{M}\p{N}_]+$/u.test(labelPost)) {
      setError(
        labelPostInput,
        'La etiqueta solo admite letras, números y guiones bajos.'
      );
    }
  }

  // Mostrar alerta si existe un error
  if (errorMessage) {
    errorInput.classList.add('is-invalid');
    errorInput.setAttribute('aria-invalid', 'true');

    errorInput.focus();

    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'warning',
      title: 'Revisa este campo',
      text: errorMessage,
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true,
      background: '#171a21',
      color: '#ffffff',
      customClass: {
        popup: 'swal-validation'
      }
    });

    return null;
  }

  // Devolver datos válidos
  return { text, labelPost };
}
