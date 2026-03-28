function updateSection() {
  const category = window.location.hash.replace("#", "");

  fetch("../../assets/script/portfolio/works.json")
    .then((res) => res.json())
    .then((data) => {
      const game = data[category];

      const main = document.getElementById("main");

      if (!game) {
        main.innerHTML = `<p>${category}</p>`;
        return;
      }

      let works = "";

      Object.entries(game).forEach(([key, value]) => {
        works += `
        <a href="/portfolio/${category}/#${key}" >
            <div class="group">
                <img src="${value.image[0]}" alt="thumb">
                <h2>${value.title}</h2>
                <p class="descrip">${value.shortdesc}</p>
                <p class="hashtag">${value.hashtags}</p>
            </div>
        </a>
                `;
      });

      main.innerHTML = `
    <div class="portfolio">
      <section id="${category}" class="active">
        ${works}
      </section>
    </div>

    `;
    });
}

document.addEventListener("DOMContentLoaded", updateSection);
window.addEventListener("hashchange", updateSection);

window.onload = () => {
  window.scrollTo(0, 0);
};
