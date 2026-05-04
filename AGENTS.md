# Kairos Codex Instructions

## Design System

- Aesthetic: editorial, premium, calm. Never SaaS-cheerful.
- Background: warm dark `#0E0C0A` base, `#1A1614` surfaces.
- Text: warm off-white `#F5F1EA` primary, `#A39B8E` muted.
- Accent: muted forest green `#3F5D4A`, used sparingly.
- Typography: Cormorant Garamond for headings and Inter for body, loaded through `next/font/google`.
- Layout: generous whitespace, asymmetric layouts, no center-aligned dashboards.
- Avoid: gradient buttons, glassmorphism, rounded-3xl card piles, generic SaaS sections.
- Cards: subtle 1px border in `#2A2520`, no shadows.
- Motion: use framer-motion only with slow easing and 400-600ms transitions.
- Never use emoji icons.
- Never auto-submit to Canvas. Drafts must always wait for explicit user review and action.

## Build Defaults

- Treat Kairos as a single-user personal tool; do not add account management.
- Keep edits scoped and lightweight.
- Preserve typed contracts and strict TypeScript.
- Use shadcn/ui primitives only for Button, Input, Card, and Dialog unless explicitly expanded.
- Do not use Lucide icons inside buttons by default. Icon-only buttons require careful design.
- Do not use generic loading spinners or "AI is thinking..." copy. Loading states should feel editorial and specific.
- Do not bundle a default favicon. Leave the placeholder note in place until brand assets exist.
