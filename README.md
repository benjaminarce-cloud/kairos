# Kairos

Personal Canvas assistant. Reads my Canvas, helps me draft, I submit manually.

## Stack

- Next.js 15, App Router, TypeScript strict mode
- Tailwind CSS v4
- Anthropic SDK
- shadcn/ui primitives: Button, Input, Card, Dialog
- Lucide, date-fns, zod, framer-motion

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create local environment variables:

```bash
cp .env.example .env.local
```

3. Add the required values:

```bash
ANTHROPIC_API_KEY=
CANVAS_API_TOKEN=
CANVAS_BASE_URL=https://your-school.instructure.com/api/v1
```

4. Start development:

```bash
pnpm dev
```

## Favicon

No default favicon is bundled. Add final brand assets when the identity is ready.
