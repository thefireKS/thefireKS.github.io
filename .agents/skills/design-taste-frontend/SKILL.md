---
name: design-taste-frontend
description: Anti-slop frontend skill for landing pages, portfolios, creative sites, and redesigns. Reads the brief, infers the design direction, sets layout/motion/density dials, and ships distinctive UI that does not look templated.
source: https://github.com/Leonxlnx/taste-skill/tree/main/skills/taste-skill
install-name: design-taste-frontend
---

# Design Taste Frontend

Use this skill when creating or substantially redesigning public-facing website pages, creative portfolio surfaces, art/comics/games pages, landing-style sections, identity pages, and other frontend surfaces where visual taste is part of the deliverable.

## Design read first

Before changing code, state one line:

`Reading this as: <surface> for <audience>, with a <design language>, leaning toward <implementation approach>.`

Read these signals first:

- Page kind: landing, portfolio, creative hub, editorial, redesign, gallery, content index.
- Vibe words from the user.
- Existing brand assets: logo, Pixeloid fonts, color themes, icons, video, art, game/comic assets.
- Audience: reader, player, fan, recruiter, collaborator, returning site visitor.
- Quiet constraints: accessibility, mobile readability, performance, content maintenance.

Ask one clarifying question only when the design read genuinely forks.

## Core dials

Set these per task and let them drive all choices:

- `DESIGN_VARIANCE`: 1 symmetrical/traditional, 10 experimental/asymmetric.
- `MOTION_INTENSITY`: 1 static, 10 cinematic/physics-heavy.
- `VISUAL_DENSITY`: 1 airy gallery, 10 packed cockpit.

Baseline for this site unless overridden:

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 4`
- `VISUAL_DENSITY: 5`

For FireKS pages, preserve the pixel/creative identity rather than replacing it with generic SaaS polish.

## Anti-default discipline

Avoid common AI frontend tells:

- Purple-blue gradient hero by default.
- Centered hero plus three equal cards.
- Glassmorphism everywhere.
- Inter/system font as the only visual idea.
- Overused beige/cream/brass premium palettes.
- Placeholder copy, fake metrics, lorem ipsum, "elevate", "seamless", "next-gen", "unleash".
- Repeated tiny uppercase eyebrows above every section.
- Cards inside cards, decorative cards where spacing or dividers would work better.

## Stack rules

- Work with the existing stack: Astro, Tailwind v4, CSS variables, `astro-icon`, existing pixel icon libraries, Pixeloid fonts.
- Do not migrate framework or styling system unless the user explicitly asks.
- Before adding dependencies, inspect `package.json` and explain why the dependency is worth it.
- Prefer CSS transitions and simple Astro-friendly scripts unless a motion library is justified.
- Respect existing routes and content collections.

## Page craft checklist

Before shipping frontend work:

- Typography has clear hierarchy and readable line lengths.
- Long headings wrap cleanly on mobile and desktop.
- Color contrast is checked, especially theme backgrounds and gradient text replacements.
- Layout has intentional asymmetry or rhythm, not accidental unevenness.
- Interactive elements have hover, focus, active, and disabled/loading states where relevant.
- Motion has a reduced-motion fallback.
- Images/video/assets have real purpose, sizing, and alt text where meaningful.
- No horizontal overflow at mobile widths.
- The page still feels like this project, not a generic design demo.

