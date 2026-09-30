const bosses = [
  {
    slug: "crystalguardian",
    name: "Crystal Guardian",
    game: "Zelda: Realm of Echoes",
    description:
      "An ancient sentinel carved from living crystal, awakened to protect the Temple of Time. Its shattered shards regrow unless struck in rapid succession.",
    image: "/assets/crystalguardian.svg",
    difficulty: "Medium",
    health: 850,
    location: "Temple of Time, Sanctum Vault",
    weakness: "Light arrows aimed at the core",
  },
  {
    slug: "mantislords",
    name: "Mantis Lords",
    game: "Hollowed Depths",
    description:
      "A trio of elite warriors who rule the Mantis Village. They fight with honor, bowing before each duel, and attack in perfect unison with twin blades.",
    image: "/assets/mantislords.svg",
    difficulty: "Hard",
    health: 1200,
    location: "Mantis Village, Greenpath",
    weakness: "Dashing through gaps between their combo strings",
  },
  {
    slug: "ashenknights",
    name: "The Ashen Knights",
    game: "Duskfall",
    description:
      "Twin knights bound by a shared curse, one wielding a greathammer and the other twin blades. When one falls, the other grows stronger and faster.",
    image: "/assets/ashenknights.svg",
    difficulty: "Legendary",
    health: 2400,
    location: "Cathedral of the Ashen King",
    weakness: "Separating them before engaging either one",
  },
  {
    slug: "goldenbeast",
    name: "Ganorok, the Golden Beast",
    game: "Zelda: Realm of Echoes",
    description:
      "A demonic warlord fused with stolen relics, towering over the throne room. Its final phase floods the arena with molten gold.",
    image: "/assets/goldenbeast.svg",
    difficulty: "Legendary",
    health: 3000,
    location: "Ruined Throne Room",
    weakness: "Reflecting its own energy blasts back at it",
  },
  {
    slug: "labskeleton",
    name: "Lab Skeleton",
    game: "Underhollow",
    description:
      "A wisecracking skeleton scientist who turns every attack into a puzzle. Refuses to deal real damage, preferring elaborate bullet-hell jokes.",
    image: "/assets/labskeleton.svg",
    difficulty: "Easy",
    health: 1,
    location: "The Basement Lab",
    weakness: "Patience — most attacks are harmless if you stay calm",
  },
  {
    slug: "shellking",
    name: "Shellking Kappo",
    game: "Mushroom Kingdom Chronicles",
    description:
      "A massive spiked tortoise-king who commands an army of minions from a spinning airship arena. Breathes fire in wide sweeping arcs.",
    image: "/assets/shellking.svg",
    difficulty: "Medium",
    health: 1600,
    location: "Sky Fortress Deck",
    weakness: "Ground-pounding the mechanism after it slams down",
  },
  {
    slug: "starknight",
    name: "Starknight Redahn",
    game: "Elden Embers",
    description:
      "A disgraced general who chained a fallen star to his blade. Summons meteors and gravity wells across an open battlefield on horseback.",
    image: "/assets/starknight.svg",
    difficulty: "Hard",
    health: 5000,
    location: "The Scorched Plains",
    weakness: "Staying close to avoid ranged meteor barrages",
  },
];

module.exports = bosses;
