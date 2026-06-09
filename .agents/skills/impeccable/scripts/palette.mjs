#!/usr/bin/env node
const seeds = [
  {
    id: "fire-arcade-red",
    oklch: [0.58, 0.21, 25],
    mood: "pixel cabinet red, bright but not corporate",
    strategy:
      "Use the red as an identity accent against deep tinted surfaces; keep supporting colors lower-chroma so the site does not become a carnival."
  },
  {
    id: "comic-gold",
    oklch: [0.78, 0.16, 78],
    mood: "comic cover yellow, energetic and readable",
    strategy:
      "Use gold for attention and active states, with dark ink surfaces and restrained secondary accents."
  },
  {
    id: "game-cyan",
    oklch: [0.72, 0.17, 200],
    mood: "CRT cyan, playful and digital",
    strategy:
      "Use cyan as a luminous detail color, not as a full-page wash. Pair with warm counterpoints from the existing theme."
  }
];

const arg = process.argv.find((value) => value.startsWith("--id="));
const id = arg?.slice("--id=".length);
const seed = seeds.find((item) => item.id === id) ?? seeds[Math.floor(Math.random() * seeds.length)];

console.log(JSON.stringify(seed, null, 2));

