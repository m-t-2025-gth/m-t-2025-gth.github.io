let isVertical = window.innerWidth <= 1200; // 初期状態

function updateSection() {
  const path = window.location.pathname;
  const hash = window.location.hash;

  const category = path.split("/")[2];
  const id = hash.replace("#", "");

  fetch("../../assets/script/portfolio/works.json")
    .then((res) => res.json())
    .then((data) => {
      const game = data[category]?.[id];
      const main = document.getElementById("main");

      if (!game) {
        main.innerHTML = `<p>${category} ${id}</p>`;
        return;
      }

      const isVerticalNow = window.innerWidth <= 1200;

      if (isVerticalNow) {
        // スマホ版
        main.innerHTML = `
          <div class="works-group">
            <h1>${game.title}</h1>
            <h2>${game.tags}</h2>
            <p>${game.award}</p>
            <iframe width="384" height="216" src="${game.youtube}" frameborder="0" allowfullscreen></iframe>
            <h3>Description</h3>
            <p>${game.description}</p>
            <img src="${game.image[0]}" alt="thumb" />
            <h3>Comment</h3>
            <p>${game.comment}</p>
            <img src="${game.image[1]}" alt="thumb" />
            <h3>Ingenunity Point</h3>
            <p>${game.good}</p>
            <img src="${game.image[2]}" alt="thumb" />
            <h3>Reflect Point</h3>
            <p>${game.bad}</p>
          </div>
        `;
      } else {
        // PC版
        main.innerHTML = `
          <div class="works-group">
            <div class="left">
              <iframe width="384" height="216" src="${game.youtube}" frameborder="0" allowfullscreen></iframe>
              <img src="${game.image[0]}" alt="thumb" />
              <img src="${game.image[1]}" alt="thumb" />
              <img src="${game.image[2]}" alt="thumb" />
            </div>
            <div class="right">
              <h1>${game.title}</h1>
              <h2>${game.tags}</h2>
              <h3>Awards</h3>
              <p>${game.award}</p>
              <h3>Description</h3>
              <p>${game.description}</p>
              <h3>Comment</h3>
              <p>${game.comment}</p>
              <h3>Ingenunity Point</h3>
              <p>${game.good}</p>
              <h3>Reflect Point</h3>
              <p>${game.bad}</p>
            </div>
          </div>
        `;
      }
    });
}

// リサイズで1200pxの境界をまたぐときだけリロード
function checkWidthAndReload() {
  const nowVertical = window.innerWidth <= 1200;

  if (nowVertical !== isVertical) {
    isVertical = nowVertical;
    location.reload(); // 境界をまたいだ場合のみリロード
  }

  console.log(nowVertical, isVertical);
}

document.addEventListener("DOMContentLoaded", updateSection);
window.addEventListener("hashchange", updateSection);

// 200ms ディレイで安定化
window.addEventListener("resize", () => {
  clearTimeout(window._resizeTimeout);
  window._resizeTimeout = setTimeout(checkWidthAndReload, 200);
});

window.onload = () => {
  window.scrollTo(0, 0);
};
