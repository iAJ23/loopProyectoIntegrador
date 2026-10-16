

/***** VALIDACIONES CON ALERTAS PERSONALIZADAS *****/

export function validarPublicacion({
  postForm,
  displayNameInput,
  textInput,
  labelPostInput
}) {
  // Limpiar errores anteriores
  postForm.querySelectorAll('.validation-error').forEach(error => {
    error.remove();
  });

  [displayNameInput, textInput, labelPostInput].forEach(input => {
    input.removeAttribute('aria-invalid');
    input.classList.remove('is-invalid');
  });

  const displayName = displayNameInput.value.trim().replace(/\s+/g, ' ');
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

  // Validar nombre
  if (!displayName) {
    setError(displayNameInput, 'El nombre es obligatorio.');
  } else if (displayName.length < 3) {
    setError(displayNameInput, 'El nombre debe tener al menos 3 caracteres.');
  } else if (displayName.length > 40) {
    setError(displayNameInput, 'El nombre no puede superar los 40 caracteres.');
  } else if (!/[\p{L}]/u.test(displayName)) {
    setError(displayNameInput, 'El nombre debe contener al menos una letra.');
  } else if (!/^[\p{L}\p{M}\p{N} .'-]+$/u.test(displayName)) {
    setError(displayNameInput, 'El nombre contiene caracteres no permitidos.');
  }

  // Validar publicación
  if (!errorMessage) {
    if (!text) {
      setError(textInput, 'Escribe el contenido de tu publicación.');
    } else if (text.length < 5) {
      setError(textInput, 'La publicación debe tener al menos 5 caracteres.');
    } else if (text.length > 300) {
      setError(textInput, 'La publicación no puede superar los 300 caracteres.');
    } else if (!/[\p{L}\p{N}]/u.test(text)) {
      setError(textInput, 'La publicación debe contener letras o números.');
    }
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
  return {
    displayName,
    text,
    labelPost
  };
}