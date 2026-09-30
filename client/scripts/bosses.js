const grid = document.getElementById("boss-grid");
const statusEl = document.getElementById("status");
const form = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const difficultySelect = document.getElementById("difficulty");

function renderCard(boss) {
  return el("a", { className: "boss-card", href: `/bosses/${boss.slug}` }, [
    el("article", {}, [
      el("img", { src: boss.image, alt: boss.name }),
      el("header", {}, [el("h3", { textContent: boss.name })]),
      el("p", {}, [el("strong", { textContent: "Game: " }), boss.game]),
      el("p", { textContent: boss.description }),
      el("p", {}, [difficultyBadge(boss.difficulty)]),
    ]),
  ]);
}

async function loadBosses() {
  statusEl.setAttribute("aria-busy", "true");
  statusEl.textContent = "Loading bosses…";
  statusEl.hidden = false;

  try {
    const bosses = await fetchBosses({
      search: searchInput.value.trim(),
      difficulty: difficultySelect.value,
    });

    grid.replaceChildren(...bosses.map(renderCard));
    statusEl.hidden = bosses.length > 0;
    statusEl.textContent = bosses.length ? "" : "No bosses match your search.";
  } catch (err) {
    grid.replaceChildren();
    statusEl.textContent = "Couldn't load bosses. Is the server connected to the database?";
    console.error(err);
  } finally {
    statusEl.setAttribute("aria-busy", "false");
  }
}

let debounce;
searchInput.addEventListener("input", () => {
  clearTimeout(debounce);
  debounce = setTimeout(loadBosses, 250);
});
difficultySelect.addEventListener("change", loadBosses);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  loadBosses();
});

loadBosses();
