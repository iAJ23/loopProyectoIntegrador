import { guardarDatosFormulario } from './storage.js';
import { syncMenuAvatar } from './profileAvatar.js';

const PROFILE_STORAGE_PREFIX = "loop.profile.";
let profileStorageKey = PROFILE_STORAGE_PREFIX + "guest";

// Objeto del perfil; la imagen se conserva como una imagen JPEG optimizada.
let profileData = {
  name: "",
  username: "",
  occupation: "",
  biography: "",
  skills: [],
  photo: ""
};

// Recupera y valida los datos guardados localmente.
function loadProfile() {
  let savedProfile = null;
  let currentUser = null;

  try {
    currentUser = JSON.parse(localStorage.getItem("loop.currentUser") || "null");
  } catch (error) {
    console.warn("No se pudieron leer los datos de la sesión.", error);
  }

  // Cada cuenta conserva su propio perfil, evitando reutilizar el perfil de otra sesión.
  const username = typeof currentUser?.username === "string" ? currentUser.username.trim().toLowerCase() : "";
  profileStorageKey = username
    ? `${PROFILE_STORAGE_PREFIX}${encodeURIComponent(username)}`
    : `${PROFILE_STORAGE_PREFIX}guest`;
  profileData.username = username ? currentUser.username : "";
  try {
    savedProfile = JSON.parse(localStorage.getItem(profileStorageKey) || "null");
  } catch (error) {
    console.warn("No se pudieron leer los datos del perfil de esta cuenta.", error);
    savedProfile = null;
  }

  if (savedProfile && typeof savedProfile === "object" && !Array.isArray(savedProfile)) {
    profileData = {
      name: typeof savedProfile.name === "string" ? savedProfile.name : "",
      username: username ? currentUser.username : "",
      occupation: typeof savedProfile.occupation === "string" ? savedProfile.occupation : "",
      biography: typeof savedProfile.biography === "string" ? savedProfile.biography : "",
      skills: Array.isArray(savedProfile.skills)
        ? savedProfile.skills.filter((skill) => typeof skill === "string")
        : [],
      photo: typeof savedProfile.photo === "string" ? savedProfile.photo : ""
    };
  }

  if (currentUser && typeof currentUser === "object" && !profileData.name) {
    profileData.name = [currentUser.nombre, currentUser.apellido].filter(Boolean).join(" ");
  }

  guardarDatosFormulario("profileEditor", {
    name: profileData.name,
    occupation: profileData.occupation,
    biography: profileData.biography,
    skills: profileData.skills
  });

  // Al abrir el perfil por primera vez después del login, conservar sus datos base.
  if (currentUser && !savedProfile) {
    try {
      localStorage.setItem(profileStorageKey, JSON.stringify(profileData));
    guardarDatosFormulario("profileEditor", {
      name: profileData.name,
      occupation: profileData.occupation,
      biography: profileData.biography,
      skills: profileData.skills
    });
    } catch (error) {
      console.warn("No se pudo inicializar el perfil en el almacenamiento local.", error);
    }
  }
}
// Crea una etiqueta por cada habilidad del perfil.
function renderSkills() {
  const container = document.getElementById("skillsStack");
  if (!container) return;

  container.replaceChildren(...profileData.skills.map((skill) => {
    const tag = document.createElement("span");
    tag.className = "skill-chip";
    tag.textContent = skill;
    return tag;
  }));
}

function renderProfilePhoto() {
  const photo = document.getElementById("profilePhoto");
  if (!photo) return;

  if (profileData.photo) {
    photo.src = profileData.photo;
    photo.hidden = false;
  } else {
    photo.removeAttribute("src");
    photo.hidden = true;
  }
  syncMenuAvatar(profileData.photo);
}

// Actualiza los datos visibles del perfil y sus habilidades/foto.
function renderProfile() {
  document.getElementById("profileName").textContent = profileData.name;
  document.getElementById("profileUsername").textContent = profileData.username ? `@${profileData.username}` : "";
  document.getElementById("occupation").textContent = profileData.occupation;
  document.getElementById("biography").textContent = profileData.biography;
  renderSkills();
  renderProfilePhoto();
}

function populateProfileForm() {
  document.getElementById("profileNameInput").value = profileData.name;
  document.getElementById("occupationInput").value = profileData.occupation;
  document.getElementById("skillsInput").value = profileData.skills.join(", ");
  document.getElementById("biographyInput").value = profileData.biography;
}

// guarda en localStorage los datos que se escribieron en el formulario de edición
function saveProfile(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  profileData = {
    ...profileData,
    name: formData.get("name").trim(),
    occupation: formData.get("occupation").trim(),
    biography: formData.get("biography").trim(),
    skills: formData.get("skills")
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
  };

  try {
    localStorage.setItem(profileStorageKey, JSON.stringify(profileData));
    guardarDatosFormulario("profileEditor", {
      name: profileData.name,
      occupation: profileData.occupation,
      biography: profileData.biography,
      skills: profileData.skills
    });
    renderProfile();
    document.getElementById("profileEditor").hidden = true;
    document.getElementById("editProfile").setAttribute("aria-expanded", "false");
  } catch (error) {
    console.error("No se pudieron guardar los datos del perfil.", error);
  }
}

// Reduce la imagen antes de guardarla para limitar el espacio usado en LocalStorage.
function optimizeProfilePhoto(file) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const maxDimension = 600;
      const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.naturalWidth * scale);
      canvas.height = Math.round(image.naturalHeight * scale);
      const context = canvas.getContext("2d");

      URL.revokeObjectURL(objectUrl);
      if (!context) {
        reject(new Error("No fue posible procesar la imagen."));
        return;
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("No fue posible abrir el archivo de imagen."));
    };
    image.src = objectUrl;
  });
}


// procesa el archivo que el usuario selecciona para su foto de perfil
async function handleProfilePhotoChange(event) { // si no se elige una foto termina
  const file = event.currentTarget.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) { // comprueba que sea un formato válido
    console.error("Selecciona un archivo de imagen.");
    event.currentTarget.value = "";
    return;
  } 

  try { // guarda eprfil autorizado en localStorage
    profileData.photo = await optimizeProfilePhoto(file);  
    localStorage.setItem(profileStorageKey, JSON.stringify(profileData));
    guardarDatosFormulario("profileEditor", {
      name: profileData.name,
      occupation: profileData.occupation,
      biography: profileData.biography,
      skills: profileData.skills
    });
    renderProfilePhoto();
  } catch (error) {
    console.error("No se pudo guardar la foto del perfil.", error);
  } finally {
    event.currentTarget.value = "";
  }
}


// Busca los elementos necesarios del formulario y del botón. Si falta alguno, termina para evitar errores.
// Carga los datos guardados desde localStorage con loadProfile() y los muestra en la página con renderProfile().
function initProfile() {
  const editor = document.getElementById("profileEditor");
  const editButton = document.getElementById("editProfile");
  const cancelButton = document.getElementById("cancelProfileEdit");
  const photoInput = document.getElementById("profilePhotoInput");
  const photoButton = document.getElementById("changeProfilePhoto");
  if (!editor || !editButton || !cancelButton || !photoInput || !photoButton) return;

  loadProfile();
  renderProfile();

  editButton.addEventListener("click", () => {
    populateProfileForm();
    editor.hidden = false;
    editButton.setAttribute("aria-expanded", "true");
    document.getElementById("profileNameInput").focus();
  });

  cancelButton.addEventListener("click", () => {
    editor.hidden = true;
    editButton.setAttribute("aria-expanded", "false");
  });

  editor.addEventListener("submit", saveProfile);
  photoButton.addEventListener("click", () => photoInput.click());
  photoInput.addEventListener("change", handleProfilePhotoChange);
}

//espera a que el HTML termine de cargarse para ejecutar initProfile()
document.addEventListener("DOMContentLoaded", initProfile); 




