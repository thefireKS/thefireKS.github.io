# Project Card Customization

The `/games` page renders generic projects, not only itch.io games. Project data
is normalized in `src/api/projects.ts`, and each card is rendered by
`src/components/project-card.astro`.

## Where To Customize

Use `projectCardProfiles` in `src/api/projects.ts` for per-project card settings.

Project keys are stable ids:

- itch.io projects use `itch:<game-id>`, for example `itch:3891484`.
- local projects should use `local:<slug>`, for example `local:my-game`.

Example:

```ts
const projectCardProfiles: Record<string, ProjectCardProfile> = {
  "itch:3891484": {
    variant: "feature",
    className: "project-card-maid-moving-boxes",
    accent: "#ff6f91",
    accentSecondary: "#ffd166",
    badge: "Featured",
    imagePosition: "center",
  },
};
```

## Profile Fields

`variant`
: Uses one of the built-in card variants: `default`, `feature`, or `quiet`.

`className`
: Adds a custom CSS class to only this card. Use this for hard customization.

`accent`
: Main card color. Used for title, border, focus ring, and timeline marker.

`accentSecondary`
: Secondary card color. Used by date/pill text and gradients.

`badge`
: Small label above the project title. Defaults to the source label, such as
`itch.io`.

`imagePosition`
: CSS `object-position` for the cover image, such as `center`, `top`, or
`50% 30%`.

## Hard CSS For One Card

Add `className` in `src/api/projects.ts`, then write CSS in
`src/components/project-card.astro`.

```ts
"itch:3891484": {
  className: "project-card-maid-moving-boxes",
}
```

```css
.project-card-maid-moving-boxes {
  border-color: #ffd166;
  background: linear-gradient(135deg, #2a1524, #151018);
}

.project-card-maid-moving-boxes .project-card-media {
  min-height: 16rem;
}

.project-card-maid-moving-boxes .project-card-title {
  color: #ffe7a8;
}
```

Each card also receives `data-project-key`, so you can target a card without
adding a class:

```css
[data-project-key="itch:3891484"] {
  box-shadow: inset 0 0 0 1px #ffffff24;
}
```

Prefer `className` for styles that are meant to stay around. Use
`data-project-key` for small experiments or debugging.

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
    card: {
      className: "project-card-my-project",
      badge: "Prototype",
      accent: "#9ad7ff",
      accentSecondary: "#ffe7a8",
    },
  },
];
```

If the project is local and has its own `card`, you do not need to add it to
`projectCardProfiles`. Use `projectCardProfiles` when you want all card profiles
collected in one map, especially for itch.io projects.

## Checklist

After adding or changing a custom card:

1. Run `npm run build`.
2. Check `/games` at desktop and mobile widths.
3. Make sure long titles, dates, and platform pills do not overlap.
4. Keep CSS scoped to the card class or `data-project-key`.
