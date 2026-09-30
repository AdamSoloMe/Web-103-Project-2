const express = require("express");
const { getBosses, getBossBySlug } = require("../controllers/bosses");

const router = express.Router();

router.get("/", getBosses);
router.get("/:slug", getBossBySlug);

module.exports = router;
