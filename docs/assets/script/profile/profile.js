const emoji = {
  優賞: "🏆",
  金賞: "🥇",
  銀賞: "🥈",
  銅賞: "🥉",
  優秀賞: "🏅",
  技術力賞: "⚙️",
  意欲賞: "🔥",
};

function updateSection() {
  fetch("../../assets/script/profile/info.json")
    .then((res) => res.json())
    .then((data) => {
      const award = document.getElementById("award");
      const achiev = document.getElementById("achiev");

      let input_award = "";
      let input_achiev = "";

      data.awards.forEach((item) => {
        const icon = emoji[item.prize] || "🏵️";
        input_award += `
        <br />${icon}${item.date} ${item.contest} ${item.prize}
        `;
      });

      data.achiev.forEach((item) => {
        input_achiev += `
        <br />📜${item.date} ${item.company} ${item.cert} ${item.grade}
        `;
      });

      award.innerHTML = `
        ${input_award}
        <br />`;

      achiev.innerHTML = `
        ${input_achiev}
        <br />`;
    });
}

document.addEventListener("DOMContentLoaded", updateSection);
window.addEventListener("hashchange", updateSection);

window.onload = () => {
  window.scrollTo(0, 0);
};
