---
name: redesign-existing-projects
description: Upgrades existing websites and apps by auditing the current design first, then applying targeted visual, interaction, accessibility, and responsive improvements without rewriting the project from scratch.
source: https://github.com/Leonxlnx/taste-skill/tree/main/skills/redesign-skill
install-name: redesign-existing-projects
---

# Redesign Existing Projects

Use this skill when improving an existing codebase. For this project, that means preserving the Astro/Tailwind structure, Pixeloid typography, theme variables, routes, and content model while making the site feel more intentional.

## Flow

1. Scan: read representative pages, components, CSS, config, assets, and content.
2. Diagnose: list concrete weaknesses in typography, color, layout, interaction states, responsive behavior, accessibility, and copy.
3. Fix: make targeted upgrades in the current stack. Keep changes reviewable.
4. Verify: run build/type checks where available and inspect the UI when possible.

## Audit areas

- Typography: hierarchy, line length, orphan words, font usage, heading scale.
- Color and surfaces: contrast, theme consistency, oversaturated accents, flat/unfinished surfaces.
- Layout: container widths, grid/flex correctness, mobile collapse, spacing rhythm, overuse of cards.
- Interaction: hover, focus, active, current-page state, loading/empty/error states where relevant.
- Content: specific labels, useful links, meaningful alt text, no placeholder language.
- Code quality: semantic HTML, no arbitrary z-index escalation, no hardcoded sizes where responsive units are better.

## Redesign constraints

- Do not rewrite from scratch.
- Do not replace the site's identity with a generic template aesthetic.
- Preserve working behavior and content routes.
- Prefer small high-impact changes: navigation, spacing, typography, theme tokens, cards/lists, responsive fixes.
- Test after changes.

