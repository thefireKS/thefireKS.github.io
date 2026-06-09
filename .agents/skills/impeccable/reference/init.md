# Init Flow

Use when `context.mjs` reports `NO_PRODUCT_MD` or when the user asks to set up Impeccable context.

## Output files

- `PRODUCT.md`: strategic context, audience, purpose, register, brand personality, anti-references, design principles.
- `DESIGN.md`: visual system, colors, typography, components, layout, motion.

## Steps

1. Scan README, package/config, pages, components, styles, assets, content, and theme variables.
2. Infer a register hypothesis: `brand` for this site unless the task is a tool/dashboard.
3. Ask only for details you cannot infer.
4. Never overwrite existing `PRODUCT.md` or `DESIGN.md` without confirmation.
5. Write concise context files that future design tasks can reuse.

