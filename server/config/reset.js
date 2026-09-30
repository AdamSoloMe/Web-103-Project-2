const { pool } = require("./database");
const bosses = require("../data/bosses");

const createBossesTable = async () => {
  const query = `
    DROP TABLE IF EXISTS bosses;
    DROP TYPE IF EXISTS difficulty_level;

    CREATE TYPE difficulty_level AS ENUM ('Easy', 'Medium', 'Hard', 'Legendary');

    CREATE TABLE bosses (
      id          SERIAL PRIMARY KEY,
      slug        VARCHAR(50)  NOT NULL UNIQUE,
      name        VARCHAR(100) NOT NULL,
      game        VARCHAR(100) NOT NULL,
      description TEXT         NOT NULL,
      image       VARCHAR(255) NOT NULL,
      difficulty  difficulty_level NOT NULL,
      health      INTEGER      NOT NULL CHECK (health > 0),
      location    VARCHAR(150) NOT NULL,
      weakness    TEXT         NOT NULL
    );
  `;

  await pool.query(query);
  console.log("🎉 bosses table created");
};

const seedBossesTable = async () => {
  const query = `
    INSERT INTO bosses (slug, name, game, description, image, difficulty, health, location, weakness)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;

  for (const boss of bosses) {
    await pool.query(query, [
      boss.slug,
      boss.name,
      boss.game,
      boss.description,
      boss.image,
      boss.difficulty,
      boss.health,
      boss.location,
      boss.weakness,
    ]);
    console.log(`✅ ${boss.name} added`);
  }
};

const reset = async () => {
  try {
    await createBossesTable();
    await seedBossesTable();
  } catch (err) {
    console.error("⚠️ error resetting bosses table", err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

reset();
