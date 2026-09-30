const { pool } = require("../config/database");

const DIFFICULTIES = ["Easy", "Medium", "Hard", "Legendary"];

// GET /api/bosses?search=text&difficulty=Hard
const getBosses = async (req, res) => {
  const { search, difficulty } = req.query;
  const conditions = [];
  const values = [];

  if (search) {
    values.push(`%${search}%`);
    conditions.push(
      `(name ILIKE $${values.length} OR game ILIKE $${values.length} OR location ILIKE $${values.length})`
    );
  }

  if (difficulty) {
    if (!DIFFICULTIES.includes(difficulty)) {
      return res.status(400).json({ error: `difficulty must be one of ${DIFFICULTIES.join(", ")}` });
    }
    values.push(difficulty);
    conditions.push(`difficulty = $${values.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  try {
    const results = await pool.query(`SELECT * FROM bosses ${where} ORDER BY id ASC`, values);
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/bosses/:slug
const getBossBySlug = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM bosses WHERE slug = $1", [req.params.slug]);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Boss not found" });
    }

    res.status(200).json(results.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getBosses, getBossBySlug };
