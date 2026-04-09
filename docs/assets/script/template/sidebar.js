const body = document.getElementById("body");

// ===== ハンバーガーチェックボックス作成 =====
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.id = "menu-toggle";
checkbox.className = "menu-toggle";

// ===== ハンバーガーラベル作成 =====
const label = document.createElement("label");
label.setAttribute("for", "menu-toggle");
label.className = "hamburger";
label.innerHTML = `<span></span><span></span><span></span>`;

// ===== サイドバー作成 =====
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

// ===== bodyに挿入 =====
body.insertBefore(aside, body.firstChild);
body.insertBefore(label, body.firstChild);
body.insertBefore(checkbox, body.firstChild);
