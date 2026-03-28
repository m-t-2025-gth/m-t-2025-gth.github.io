const body = document.getElementById("body");
const aside = document.createElement("aside");
aside.className = "aside";
aside.innerHTML = `
  <div class="logo">Logo</div>
  <nav class="menu">
    <a href="/" class="menu-item">Home</a>
    <a href="/profile" class="menu-item">Profile</a>
    <a href="/portfolio" class="menu-item">Portfolio</a>
    <a href="/contact" class="menu-item">Contact</a>
  </nav>
  <div class="aside-footer">
    <a href="/" class="menu-item">ICON</a>
    <h2>©</h2>
  </div>
`;

body.insertBefore(aside, body.firstChild);
