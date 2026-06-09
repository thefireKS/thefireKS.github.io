---
name: impeccable
description: Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve a frontend interface.
source: https://github.com/pbakaus/impeccable/tree/main/.agents/skills/impeccable
install-name: impeccable
---

# Impeccable

Designs and iterates production-grade frontend interfaces. Real working code, committed design choices, exceptional craft.

## Setup

Before design work or frontend file edits:

1. Run `node .agents/skills/impeccable/scripts/context.mjs` once per session.
2. If it reports `NO_PRODUCT_MD`, follow `reference/init.md` before doing design work.
3. If the user invoked a sub-command, read `reference/<command>.md`.
4. Read at least one project CSS/token/component/page file.
5. Read `reference/brand.md` for marketing, landing, portfolio, content, and creative-site surfaces. Read `reference/product.md` for app UI, dashboards, settings, tools, and task surfaces.
6. If no committed brand colors exist, run `node .agents/skills/impeccable/scripts/palette.mjs`.

For this project, the default register is `brand`: the site is a creative/personal web presence with art, comics, games, and identity pages.

## General rules

- Produce ready-to-ship code, not prototypes.
- Verify contrast: body text at least 4.5:1, large text at least 3:1.
- Cap prose line length around 65-75ch.
- Use clear scale and weight contrast. Avoid flat type scales.
- Use cards only when they are the best affordance. Nested cards are wrong.
- Use Flexbox for 1D layout and Grid for 2D layout.
- Do not animate layout properties unless truly needed.
- Every animation needs a `prefers-reduced-motion` alternative.
- Every word earns its place. Avoid marketing buzzwords and vague copy.
- Button labels should name the action.

## Absolute bans

Rewrite rather than ship these:

- Colored side-stripe card borders as decoration.
- Gradient text as a default treatment.
- Glassmorphism as a default treatment.
- Hero metrics template.
- Identical icon-heading-text card grids everywhere.
- Tiny uppercase tracked eyebrow above every section.
- Numbered section markers as default scaffolding.
- Text that overflows its container.
- Border plus large soft shadow on the same card/button as decoration.
- Over-rounded cards, sections, or inputs.
- Hand-drawn sketchy SVG illustrations as a substitute for real visual assets.

## Commands

Use `$impeccable <command> [target]` in prompts. Supported commands are documented in `reference/`:

`craft`, `shape`, `init`, `document`, `extract`, `critique`, `audit`, `polish`, `bolder`, `quieter`, `distill`, `harden`, `onboard`, `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive`, `clarify`, `adapt`, `optimize`, `live`.

