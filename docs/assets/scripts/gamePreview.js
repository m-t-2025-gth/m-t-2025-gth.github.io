fetch("/assets/data/gamePreview.json")
  .then((response) => response.json())
  .then((data) => {
    const portfolioList = document.getElementById("portfolio-list");

    // class, class2, class3... を順番に処理
    Object.entries(data).forEach(([className, games]) => {
      // =========================
      // クラスごとのグループ
      // =========================

      const group = document.createElement("div");

      group.classList.add("portfolio-group");

      // =========================
      // クラス名
      // =========================

      const title = document.createElement("h3");

      title.textContent = className.toUpperCase();

      group.appendChild(title);

      // =========================
      // スライダー
      // =========================

      const slider = document.createElement("div");

      slider.classList.add("portfolio-slider");

      // =========================
      // 左ボタン
      // =========================

      const prevButton = document.createElement("button");

      prevButton.classList.add("portfolio-arrow", "prev");

      prevButton.textContent = "←";

      // =========================
      // 作品一覧
      // =========================

      const gameList = document.createElement("div");

      gameList.classList.add("portfolio-game-list");

      // =========================
      // 右ボタン
      // =========================

      const nextButton = document.createElement("button");

      nextButton.classList.add("portfolio-arrow", "next");

      nextButton.textContent = "→";

      // =========================
      // 作品生成
      // =========================

      games.forEach((game) => {
        const item = document.createElement("a");

        item.classList.add("portfolio-item");

        item.href = game.url;

        // 新しいタブで開く
        // item.target = "_blank";
        item.rel = "noopener noreferrer";

        // =========================
        // 画像
        // =========================

        const image = document.createElement("img");

        image.src = game.image;
        image.alt = game.title;

        // =========================
        // タイトル
        // =========================

        const gameTitle = document.createElement("h4");

        gameTitle.textContent = game.title;

        // =========================
        // タグ
        // =========================

        const tags = document.createElement("div");

        tags.classList.add("portfolio-tags");

        // tagsが存在する場合だけ処理
        (game.tags || []).forEach((tag) => {
          const tagElement = document.createElement("span");

          tagElement.classList.add("portfolio-tag");

          tagElement.textContent = `#${tag}`;

          tags.appendChild(tagElement);
        });

        // =========================
        // 説明
        // =========================

        const description = document.createElement("p");

        description.textContent = game.description;

        // =========================
        // 追加
        // =========================

        item.appendChild(image);
        item.appendChild(gameTitle);
        item.appendChild(tags);
        item.appendChild(description);

        gameList.appendChild(item);
      });

      // =========================
      // HTML構築
      // =========================

      slider.appendChild(prevButton);
      slider.appendChild(gameList);
      slider.appendChild(nextButton);

      group.appendChild(slider);

      portfolioList.appendChild(group);

      // =========================
      // スライド処理
      // =========================

      let currentIndex = 0;

      const updateSlider = () => {
        const items = gameList.querySelectorAll(".portfolio-item");

        if (items.length === 0) {
          return;
        }

        const itemWidth = items[0].offsetWidth;

        const gap = 20;

        gameList.scrollTo({
          left: currentIndex * (itemWidth + gap),

          behavior: "smooth",
        });
      };

      // =========================
      // 左
      // =========================

      prevButton.addEventListener("click", () => {
        currentIndex--;

        if (currentIndex < 0) {
          currentIndex = 0;
        }

        updateSlider();
      });

      // =========================
      // 右
      // =========================

      nextButton.addEventListener("click", () => {
        const items = gameList.querySelectorAll(".portfolio-item");

        currentIndex++;

        if (currentIndex > items.length - 1) {
          currentIndex = items.length - 1;
        }

        updateSlider();
      });
    });
  })
  .catch((error) => {
    console.error("gamePreview.jsonの読み込みに失敗しました。", error);
  });
