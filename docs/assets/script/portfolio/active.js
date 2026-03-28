function updateSection() {
  let hash = window.location.hash;

  if (!hash) {
    hash = "#at11c";
    history.replaceState(null, null, hash);
  }

  document.querySelectorAll(".portfolio section").forEach((sec) => {
    sec.classList.remove("active");
  });

  const target = document.querySelector(hash);
  if (target) {
    target.classList.add("active");
  }

  document.querySelectorAll(".header-item").forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === hash) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", updateSection);
window.addEventListener("hashchange", updateSection);

window.onload = () => {
  window.scrollTo(0, 0);
};
