# Kairos

Kairos is a Next.js 15 App Router project for Canvas-connected assignment drafting.

## Stack

- Next.js 15, App Router, TypeScript strict mode
- Tailwind CSS v4
- Supabase auth with `@supabase/ssr`
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

3. Generate a token encryption key:

```bash
openssl rand -hex 32
```

4. Add the required values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
TOKEN_ENCRYPTION_KEY=
```

5. Start development:

```bash
pnpm dev
```

## Favicon

No default favicon is bundled. Add final brand assets when the identity is ready.
