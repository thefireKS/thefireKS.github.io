# Audit

Run systematic technical quality checks and generate a report. Do not fix issues unless the user asks.

## Dimensions

Score each 0-4:

- Accessibility: contrast, landmarks, labels, focus, headings, alt text.
- Performance: asset sizes, animation cost, layout thrash, unnecessary dependencies.
- Responsive design: fixed widths, touch targets, horizontal overflow, mobile nav, text scaling.
- Theming: token usage, hardcoded colors, theme switching, contrast across themes.
- Anti-patterns: generic AI tells, nested cards, repeated eyebrows, gradient text, decorative glass, over-rounded surfaces.

## Report

Include:

- Health score out of 20.
- Top findings with severity P0-P3.
- File/location references.
- Impact.
- Recommendation.
- Suggested follow-up command.

