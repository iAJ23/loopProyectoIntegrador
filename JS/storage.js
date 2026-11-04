// Guarda envíos como JSON con el contexto de página para facilitar la futura migración a API.
export function guardarDatosFormulario(formId, data, { append = false } = {}) {
  const fileName = window.location.pathname.split("/").pop() || "index.html";
  const page = fileName.replace(/\.html?$/i, "").toLowerCase() || "inicio";
  const key = `loop.form.${page}.${formId}`;
  const entry = {
    page,
    formId,
    savedAt: new Date().toISOString(),
    data
  };

  try {
    if (append) {
      const saved = JSON.parse(localStorage.getItem(key) || "[]");
      const records = Array.isArray(saved) ? saved : [saved];
      localStorage.setItem(key, JSON.stringify([...records, entry].slice(-100)));
    } else {
      localStorage.setItem(key, JSON.stringify(entry));
    }
    return true;
  } catch (error) {
    console.warn(`No se pudieron guardar los datos del formulario ${formId}.`, error);
    return false;
  }
}
