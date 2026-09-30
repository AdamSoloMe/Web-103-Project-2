const detail = document.getElementById("boss-detail");
const statusEl = document.getElementById("status");

function row(label, value) {
  return el("tr", {}, [
    el("th", { scope: "row", textContent: label }),
    el("td", {}, [value]),
  ]);
}

function renderBoss(boss) {
  document.title = `${boss.name} · Boss Compendium`;

  detail.replaceChildren(
    el("img", { src: boss.image, alt: boss.name }),
    el("div", {}, [
      el("hgroup", {}, [
        el("h1", { textContent: boss.name }),
        el("p", { textContent: boss.game }),
      ]),
      el("p", { textContent: boss.description }),
      el("table", {}, [
        el("tbody", {}, [
          row("Difficulty", difficultyBadge(boss.difficulty)),
          row("Health", `${boss.health.toLocaleString()} HP`),
          row("Location", boss.location),
          row("Weakness", boss.weakness),
        ]),
      ]),
    ])
  );
  detail.hidden = false;
}

async function loadBoss() {
  const slug = window.location.pathname.split("/").filter(Boolean).pop();

  try {
    const boss = await fetchBoss(slug);
    if (!boss) {
      window.location.replace("/404.html");
      return;
    }
    renderBoss(boss);
    statusEl.hidden = true;
  } catch (err) {
    statusEl.textContent = "Couldn't load this boss. Is the server connected to the database?";
    console.error(err);
  } finally {
    statusEl.setAttribute("aria-busy", "false");
  }
}

loadBoss();
