const skills = ["Inteligencia artificial", "Arquitectura", "Cloud", "Python"];

function renderSkills() {
  const container = document.getElementById("skillsStack");
  if (!container) return;
  container.replaceChildren(...skills.map((skill) => {
    const tag = document.createElement("span");
    tag.className = "skill-chip";
    tag.textContent = skill;
    return tag;
  }));
}

function markProfileNavigation() {
  const profileLink = [...document.querySelectorAll(".nav-link")]
    .find((link) => link.getAttribute("href")?.endsWith("/perfil.html"));
  if (!profileLink) return false;
  profileLink.classList.add("active");
  profileLink.setAttribute("aria-current", "page");
  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  if (markProfileNavigation()) return;
  const observer = new MutationObserver(() => {
    if (markProfileNavigation()) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
});

