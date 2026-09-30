const express = require("express");
const path = require("path");
const { pool } = require("./config/database");
const bossesRouter = require("./routes/bosses");

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_DIR = path.join(__dirname, "..", "client");

app.use(express.static(CLIENT_DIR));

// JSON API backed by PostgreSQL
app.use("/api/bosses", bossesRouter);

// Detail pages are a single static page; client-side JS reads the slug from the URL.
// Check the slug exists first so unknown bosses get a real 404.
app.get("/bosses/:slug", async (req, res, next) => {
  try {
    const { rowCount } = await pool.query("SELECT 1 FROM bosses WHERE slug = $1", [req.params.slug]);
    if (rowCount === 0) return next();
    res.sendFile(path.join(CLIENT_DIR, "boss.html"));
  } catch (err) {
    next(err);
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(CLIENT_DIR, "404.html"));
});

app.listen(PORT, () => {
  console.log(`Boss Compendium listening on http://localhost:${PORT}`);
});
