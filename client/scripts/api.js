// Data-access helpers: every request to the backend goes through here.

async function fetchBosses({ search = "", difficulty = "" } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (difficulty) params.set("difficulty", difficulty);

  const response = await fetch(`/api/bosses?${params}`);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

async function fetchBoss(slug) {
  const response = await fetch(`/api/bosses/${encodeURIComponent(slug)}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

// Build an element with text content (never innerHTML, so DB text can't inject markup).
function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.assign(node, props);
  for (const child of [].concat(children)) {
    node.append(child);
  }
  return node;
}

function difficultyBadge(difficulty) {
  return el("span", {
    className: `badge difficulty-${difficulty.toLowerCase()}`,
    textContent: difficulty,
  });
}
