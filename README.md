# Deployed Forward

> Train where the future is operational. Master AI workflows. Deploy capability, not experiments.

A production-ready Next.js 15 course platform with authentication, payments, progress tracking, and email automation. Dark, minimal UI inspired by factory.ai.

## 🚀 Quick Deploy

**Deploy in 15 minutes** → See [`docs/QUICK_START.md`](docs/QUICK_START.md)

**Full setup guide** → See [`docs/LAUNCH_GUIDE.md`](docs/LAUNCH_GUIDE.md)

**Dual environment setup** → See [`docs/DUAL_ENVIRONMENT_SETUP.md`](docs/DUAL_ENVIRONMENT_SETUP.md)

**Live Preview**: http://localhost:3000 (run `npm run dev`)

---

## 📖 Documentation

All guides are in the [`/docs`](docs/) folder. Start with [`docs/README.md`](docs/README.md) for an index that groups every reference by purpose.

- **[QUICK_START.md](docs/QUICK_START.md)** – Deploy in 15 minutes
- **[LAUNCH_GUIDE.md](docs/LAUNCH_GUIDE.md)** – Complete deployment guide
- **[DUAL_ENVIRONMENT_SETUP.md](docs/DUAL_ENVIRONMENT_SETUP.md)** – Preview + Production isolation
- **[HOW_TO_IMPORT_ENV_VARS.md](docs/HOW_TO_IMPORT_ENV_VARS.md)** – Importing environment variables to Vercel
- **[AGENTS.md](docs/AGENTS.md)** – Repository conventions for collaborators and AI agents
- **[checklists/READY_TO_TEST.md](docs/checklists/READY_TO_TEST.md)** – QA handoff checklist
- **[reports/MISSION_STRUCTURE_COMPLETE.md](docs/reports/MISSION_STRUCTURE_COMPLETE.md)** – Status report for mission scaffolding
- **[plans/BETTER_AUTH_MIGRATION.md](docs/plans/BETTER_AUTH_MIGRATION.md)** – Auth migration roadmap (Clerk → Better Auth)
- **[BETTER_AUTH_USER_MIGRATION.md](docs/BETTER_AUTH_USER_MIGRATION.md)** – Scripted user migration + reset email playbook

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + CSS Variables
- **Auth**: Better Auth
- **Database**: Neon (Postgres) + Prisma ORM
- **Payments**: Stripe
- **Email**: Resend
- **Hosting**: Vercel
- **Analytics**: Vercel Analytics + Sentry

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Neon database (sign up at neon.tech)
- Stripe account (stripe.com)
- Resend API key (resend.com)

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file with:
   ```bash
   # Database
   DATABASE_URL="postgresql://..."

   # Auth provider
   AUTH_PROVIDER=better-auth
   NEXT_PUBLIC_AUTH_PROVIDER=better-auth
   BETTER_AUTH_RESET_REDIRECT=http://localhost:3000/login

   # Stripe
   STRIPE_SECRET_KEY=sk_test_xxxxx
   STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

   # Resend
   RESEND_API_KEY=re_xxxxx
   RESEND_FROM_EMAIL=hello@deployedforward.com

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Initialize the database**:
   ```bash
   npm run db:push
   npm run db:seed
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Auth Migration Scripts

- `npm run auth:migrate-users` – Copy existing Clerk users into Better Auth tables via the Clerk REST API (`CLERK_SECRET_KEY` required temporarily).
- `npm run auth:send-reset-emails` – Queue Better Auth password reset emails (append `-- --dry-run` to preview recipients).

## Project Structure

```
/app
  /(site)          - Marketing pages (home, product, pricing, etc.)
  /api             - API routes (contact, webhooks, etc.)
  sitemap.ts       - Dynamic sitemap generation
  robots.ts        - Robots.txt configuration
/components        - Reusable UI components
/content           - MDX content (missions, news, lessons)
/lib               - Utilities (Prisma, MDX, Stripe, email)
/prisma            - Database schema and seed data
/styles            - Global CSS and design tokens
/public            - Static assets (logos, etc.)
/tests             - E2E tests (Playwright)
```

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with demo data

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Vercel automatically handles:
- SSL certificates
- CDN distribution
- Edge functions
- Analytics

### Environment Variables in Production

Make sure to set all required environment variables in your hosting platform's dashboard.

## Stripe Webhook Setup

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Forward webhooks to local:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
3. Copy webhook signing secret to `.env.local`

In production, configure webhook endpoint in Stripe Dashboard:
- URL: `https://yourdomain.com/api/webhooks/stripe`
- Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

## Performance

Target metrics:
- LCP: < 2s
- FID: < 100ms
- CLS: < 0.1
- Lighthouse: ≥ 90 (all categories)

Run audits:
```bash
npx lighthouse http://localhost:3000 --view
```

## Accessibility

- WCAG 2.2 AA compliant
- Keyboard navigation throughout
- Focus indicators on interactive elements
- ARIA labels where needed
- Screen reader tested

## License

Proprietary. All rights reserved.

## Contact

- Website: https://deployedforward.com
- Email: hello@deployedforward.com
- Security: security@deployedforward.com

---

**A Kingsbury Labs venture**

# Trigger rebuild
# Database initialized Sat Oct 11 22:01:18 BST 2025
