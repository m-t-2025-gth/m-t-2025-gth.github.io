const scrollText = document.querySelector(".scroll");

window.addEventListener("scroll", function () {
  scrollText.style.opacity = window.scrollY > 10 ? "0" : "1";
});
