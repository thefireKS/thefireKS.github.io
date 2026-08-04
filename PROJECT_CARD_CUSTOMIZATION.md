# Project Card Customization

The `/games` page renders generic projects, not only itch.io games. Project data
is normalized in `src/api/projects.ts`. Each card is rendered by
`src/components/project-card.astro`, which is only a dispatcher: it looks the
project up in the renderer registry and falls back to the shared default card.

There are two levels of customization. Pick the cheaper one that does the job.

|          | Skin                                             | Bespoke renderer                               |
| -------- | ------------------------------------------------ | ---------------------------------------------- |
| Where    | `projectCardProfiles` in `src/api/projects.ts`   | `src/components/project-cards/<name>.astro`    |
| Controls | colors, badge, image crop, one extra class       | the entire DOM, layout, and behaviour          |
| Use when | the card is the usual shape, in different colors | the card should be a different object entirely |

## Level 1: Skin

Use `projectCardProfiles` in `src/api/projects.ts`. Project keys are stable ids:

- itch.io projects use `itch:<game-id>`, for example `itch:3891484`.
- local projects use `local:<slug>`, for example `local:my-game`.

```ts
const projectCardProfiles: Record<string, ProjectCardProfile> = {
  "itch:1964799": {
    variant: "quiet",
    className: "project-card-floating-fuzzies",
    accent: "#79d2ff",
    accentSecondary: "#b8f7d4",
    imagePosition: "center",
  },
};
```

### Profile fields

`variant`
: One of the built-in card variants: `default`, `feature`, or `quiet`.

`className`
: Adds a custom CSS class to only this card. Write the matching CSS inside
`src/components/project-cards/default.astro`.

`accent`
: Main card color. Used for title, border, focus ring, and the timeline marker.

`accentSecondary`
: Secondary card color. Used by date/pill text and gradients.

`badge`
: Small label above the project title. Defaults to the source label.

`imagePosition`
: CSS `object-position` for the cover image, such as `center` or `50% 30%`.

Each default card also receives `data-project-key`, so a card can be targeted
without adding a class. Prefer `className` for styles meant to stay around, and
`data-project-key` for quick experiments.

### Backdrop patterns

Every default card carries a `--project-card-pattern` custom property, painted
behind its copy. Set it from the card's `className` block in
`default.astro`:

```css
.project-card-sailorknot {
  --project-card-pattern: repeating-linear-gradient(
    45deg,
    #f2c14e1c 0 5px,
    transparent 5px 13px
  );
}
```

Keep these near 10% alpha. They exist to give each project its own texture, not
to compete with the bespoke renderers, and the copy still has to be readable on
top.

## Level 2: Bespoke Renderer

When a card should stop being a card — a shipping box, an arcade cabinet, a
carpet — give the project its own component.

1. Create `src/components/project-cards/<name>.astro`. It takes a single
   `project: Project` prop and renders its own `<a>`:

   ```astro
   <a
     href={project.url}
     class="project-card xyz-card"
     data-project-key={project.key}
   >
     ...
   </a>
   ```

2. Register it in `src/components/project-cards/registry.ts`:

   ```ts
   export const projectCardRenderers = {
     "itch:3891484": MaidMovingBoxes,
   } as const;
   ```

3. Keep an `accent` entry in `projectCardProfiles` for the same key. The
   renderer ignores it, but `/games` still uses it for the timeline marker, so
   the dot matches the card.

Existing renderers:

- `maid-moving-boxes.astro` — kraft box, stencilled title, shipping manifest,
  download count as a quota stamp.
- `stalopxasine.astro` — arcade cabinet, CRT screen, download count as hi-score,
  the game's four heroes as character slots.
- `tanks.astro` — woven carpet with fringe and a diamond border band, plus the
  game's own tank sprites patrolling the border on hover.

### A second link on a card

A card that needs more than one destination cannot be one big `<a>` — nested
links are invalid. Render a plain element instead, put `.project-card-primary`
on the title link so it stretches over the whole card, and give the extra link
`position: relative; z-index: 2` so it sits above that overlay.

Two maps in `src/api/projects.ts` feed this:

`projectPrimaryOverrides` moves a project's front door off itch.io. `url` and
`primaryLabel` then point at the override, and the itch.io page is pushed to the
head of `links`:

```ts
const projectPrimaryOverrides: Record<string, ProjectLink> = {
  "itch:3891484": {
    label: "Steam",
    url: "https://store.steampowered.com/app/3917620/MAID_MOVING_BOXES/",
    icon: "icomoon-free:steam",
  },
};
```

`projectExtraLinks` adds further destinations beyond that. Both arrive on the
project as `links`, and a renderer just maps over them.

Use `primaryLabel`, not `sourceLabel`, anywhere a card names where its main link
goes — `sourceLabel` is always "itch.io".

### Motion along the card edge

`tanks.astro` moves its sprites with `offset-path: border-box` rather than
hand-written corner keyframes. Keyframes that give each side an equal slice of
the animation make a sprite crawl along a long edge and sprint down a short
one; a motion path keeps one speed whatever the card's proportions, and
`offset-rotate: auto` turns the sprite into each corner. Gate it behind
`@supports (offset-path: border-box)` and let browsers without it fall back to
no sprite at all.

### Rules a renderer must follow

**The card is a link with real text.** Title, description, and date belong in
the DOM as text, not as background images or `aria-label`. Decorative layers get
`aria-hidden="true"`.

**Keep the shared class.** `class="project-card ..."` picks up the focus ring
and the reduced-motion kill switch from `src/styles/project-cards.css`.

**Honor `prefers-reduced-motion`.** The global rule freezes animations, which is
enough for most effects. Anything that would be left stranded mid-travel — a
patrolling sprite, a scrolling CRT artifact — must hide itself explicitly:

```css
@media (prefers-reduced-motion: reduce) {
  .xyz-runner {
    display: none;
  }
}
```

**Have a narrow mode.** Exotic layouts break at 375px. Collapse to one column
and make sure nothing overlaps.

**Watch perpetual animation.** These cards share one page. Gate expensive motion
behind `:hover`/`:focus-visible`, with a `@media (hover: none)` fallback so touch
users still see it.

## Ordering

`/games` is reverse-chronological by default. `pinnedProjectKeys` in
`src/api/projects.ts` holds projects at the top in the order it lists them:

```ts
const pinnedProjectKeys: string[] = ["itch:3891484", "itch:923128"];
```

Note the tension: the page reads as a dated timeline, and a pinned 2021 project
sitting above a 2025 one contradicts that. Keep the list short, or the spine
stops meaning anything.

Everything else sorts on `publishedAt`, which itch.io reports as the date the
page went up — not always the date the build shipped. `projectDateOverrides`
corrects that where the two disagree:

```ts
const projectDateOverrides: Record<string, string> = {
  "itch:2947153": "2022-10-03 21:40:42",
  "itch:1731718": "2024-09-03 08:57:28",
};
```

## Adding A Non-itch Project

Add local projects to `localProjects` in `src/api/projects.ts`.

```ts
const localProjects: LocalProject[] = [
  {
    key: "local:my-project",
    sourceLabel: "Prototype",
    title: "My Project",
    description: "A short project description.",
    url: "/games/my-project",
    coverUrl: "/images/my-project-cover.png",
    publishedAt: "2026-06-09",
    platforms: ["browser"],
    card: { accent: "#9ad7ff", accentSecondary: "#ffe7a8" },
  },
];
```

A local project can carry its own `card` inline instead of going through
`projectCardProfiles`.

## Checklist

After adding or changing a card:

1. Run `pnpm run build`.
2. Check `/games` at desktop and mobile widths.
3. Check it with reduced motion enabled.
4. Make sure long titles, dates, and platform pills do not overlap.
5. Keep CSS scoped to the renderer, the card class, or `data-project-key`.

## Known Limits

itch.io cover art is only served at 315x250 — the larger resize variants 404.
Any design that blows the cover up full-bleed will look soft. For those, add a
local hero image under `public/` and keep the itch cover as the fallback.
