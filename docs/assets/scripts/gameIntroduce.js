fetch("/assets/data/gamePreview.json")
  .then((response) => response.json())
  .then((data) => {
    // =========================
    // URLから情報を取得
    // =========================

    const params = new URLSearchParams(window.location.search);

    const type = params.get("type");
    const id = params.get("id");

    // =========================
    // URLチェック
    // =========================

    if (!type || id === null) {
      console.error("作品情報が指定されていません。");

      return;
    }

    // =========================
    // クラス名
    // =========================

    const typeKey = type.toUpperCase();

    const typeData = data[typeKey];

    if (!typeData) {
      console.error("指定されたクラスが存在しません。", typeKey);

      return;
    }

    // =========================
    // 作品ID
    // =========================

    const gameId = Number(id);

    if (!Number.isInteger(gameId) || gameId < 0 || gameId >= typeData.length) {
      console.error("指定された作品IDが存在しません。", gameId);

      return;
    }

    // =========================
    // ゲーム取得
    // =========================

    const game = typeData[gameId];

    // =========================
    // ゲーム名
    // =========================

    document.getElementById("game-title").textContent = game.title || "";

    // =========================
    // YouTube動画
    // =========================

    const video = document.getElementById("game-video");

    if (game.video) {
      video.src = game.video;
    } else {
      video.parentElement.style.display = "none";
    }

    // =========================
    // Tag
    // =========================

    const tagContainer = document.getElementById("game-tags");

    tagContainer.innerHTML = "";

    if (Array.isArray(game.tags)) {
      game.tags.forEach((tag) => {
        if (!tag) {
          return;
        }

        const tagElement = document.createElement("span");

        tagElement.textContent = `#${tag}`;

        tagContainer.appendChild(tagElement);
      });
    }

    // =========================
    // Award
    // =========================

    const awardContainer = document.getElementById("game-award");

    const awardSection = document.getElementById("award-section");

    awardContainer.innerHTML = "";

    if (Array.isArray(game.award) && game.award.length > 0) {
      game.award.forEach((award) => {
        if (!award) {
          return;
        }

        const awardElement = document.createElement("span");

        awardElement.textContent = award;

        awardContainer.appendChild(awardElement);
      });

      awardSection.style.display = "";
    } else {
      awardSection.style.display = "none";
    }

    // =========================
    // Description
    // =========================

    const description = document.getElementById("game-description");

    const descriptionSection = document.getElementById("description-section");

    if (game.description) {
      description.textContent = game.description;

      descriptionSection.style.display = "";
    } else {
      descriptionSection.style.display = "none";
    }

    // =========================
    // Comment
    // =========================

    const comment = document.getElementById("game-comment");

    const commentSection = document.getElementById("comment-section");

    if (game.comment) {
      comment.textContent = game.comment;

      commentSection.style.display = "";
    } else {
      commentSection.style.display = "none";
    }

    // =========================
    // Good
    // =========================

    const good = document.getElementById("game-good");

    const goodSection = document.getElementById("good-section");

    if (game.good) {
      good.textContent = game.good;

      goodSection.style.display = "";
    } else {
      goodSection.style.display = "none";
    }

    // =========================
    // Bad
    // =========================

    const bad = document.getElementById("game-bad");

    const badSection = document.getElementById("bad-section");

    if (game.bad) {
      bad.textContent = game.bad;

      badSection.style.display = "";
    } else {
      badSection.style.display = "none";
    }

    // =========================
    // ページタイトル
    // =========================

    document.title = `${game.title || "Portfolio"} | Portfolio`;
  })
  .catch((error) => {
    console.error("gamePreview.jsonの読み込みに失敗しました。", error);
  });
