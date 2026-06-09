# Project-local skills

Installed for this project:

- `impeccable`
- `design-taste-frontend`
- `redesign-existing-projects`
- `brandkit`
- `imagegen-frontend-web`

These live under `.agents/skills/` so Codex can load them as project-local skills after a new session/reload.

## Usage

Mention a skill by name in a prompt, for example:

- `Use impeccable to audit the home page.`
- `Use redesign-existing-projects to improve the navigation and section spacing.`
- `Use design-taste-frontend to redesign the games page.`
- `Use brandkit to propose identity directions for FireKS.`
- `Use imagegen-frontend-web to create web comp prompts for the Art index.`

`impeccable` also supports command-style prompts:

- `$impeccable init`
- `$impeccable audit`
- `$impeccable polish`
- `$impeccable layout`
- `$impeccable typeset`
- `$impeccable adapt`
- `$impeccable craft <feature>`

The local `impeccable` helper scripts are intentionally network-free:

- `node .agents/skills/impeccable/scripts/context.mjs`
- `node .agents/skills/impeccable/scripts/palette.mjs`

## Upstream install commands

When shell network access is available, the upstream equivalents are:

```sh
npx skills add https://github.com/pbakaus/impeccable --skill impeccable
npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend
npx skills add https://github.com/Leonxlnx/taste-skill --skill redesign-existing-projects
npx skills add https://github.com/Leonxlnx/taste-skill --skill brandkit
npx skills add https://github.com/Leonxlnx/taste-skill --skill imagegen-frontend-web
```

During this install, `npx skills` could not run because the shell could not resolve `registry.npmjs.org`/`github.com`, so the skills were installed manually as project-local skill folders.

