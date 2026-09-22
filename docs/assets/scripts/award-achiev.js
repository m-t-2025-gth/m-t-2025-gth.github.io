const emoji = {
  優賞: "🏆",
  金賞: "🥇",
  銀賞: "🥈",
  銅賞: "🥉",
  優秀賞: "🏅",
  技術力賞: "⚙️",
  意欲賞: "🔥",
};

fetch("/assets/data/award-achiev.json")
  .then((response) => response.json())
  .then((data) => {
    // Award
    const awardList = document.getElementById("award-list");

    data.awards.forEach((award) => {
      const icon = emoji[award.prize] || "🏵️";
      const a = document.createElement("a");

      a.href = award.url;
      // a.target = "_blank";

      a.textContent = `${icon} ${award.date} ${award.contest} ${award.prize}`;

      awardList.appendChild(a);
    });

    // Achievement
    const achievList = document.getElementById("achiev-list");

    data.achiev.forEach((achiev) => {
      const p = document.createElement("p");

      p.textContent = `📜 ${achiev.date} ${achiev.company} ${achiev.cert} ${achiev.grade}`;

      achievList.appendChild(p);
    });
  })
  .catch((error) => {
    console.error("JSONの読み込みに失敗しました。", error);
  });
