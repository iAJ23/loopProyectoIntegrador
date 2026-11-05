// Actualiza el avatar del menú con la foto guardada para el usuario activo.
export function syncMenuAvatar(photoOverride) {
  const avatar = document.querySelector(".site-header .avatar-small");
  if (!avatar) return;

  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem("loop.currentUser") || "null");
  } catch (error) {
    console.warn("No se pudo leer el usuario activo para el avatar.", error);
  }

  const username = typeof currentUser?.username === "string" ? currentUser.username.trim() : "";
  let photo = typeof photoOverride === "string" ? photoOverride : "";

  if (photoOverride === undefined && username) {
    try {
      const profileKey = `loop.profile.${encodeURIComponent(username.toLowerCase())}`;
      const profile = JSON.parse(localStorage.getItem(profileKey) || "null");
      photo = typeof profile?.photo === "string" ? profile.photo : "";
    } catch (error) {
      console.warn("No se pudo leer la foto de perfil para el avatar.", error);
    }
  }

  avatar.setAttribute("aria-label", username ? `Abrir perfil de ${username}` : "Abrir perfil");
  const existingImage = avatar.querySelector("img");

  if (!photo) {
    existingImage?.remove();
    if (!avatar.querySelector(".image-placeholder")) {
      const placeholder = document.createElement("span");
      placeholder.className = "image-placeholder";
      placeholder.textContent = "Foto";
      avatar.appendChild(placeholder);
    }
    return;
  }

  const image = existingImage || document.createElement("img");
  image.src = photo;
  image.alt = "";
  image.setAttribute("aria-hidden", "true");
  avatar.querySelector(".image-placeholder")?.remove();
  if (!existingImage) avatar.appendChild(image);
}
