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

All guides are in the [`/docs`](docs/) folder:

- **[QUICK_START.md](docs/QUICK_START.md)** - Deploy in 15 minutes
- **[LAUNCH_GUIDE.md](docs/LAUNCH_GUIDE.md)** - Complete deployment guide
- **[DUAL_ENVIRONMENT_SETUP.md](docs/DUAL_ENVIRONMENT_SETUP.md)** - Preview + Production isolation
- **[GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md)** - Git branching strategy

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + CSS Variables
- **Auth**: Clerk
- **Database**: Neon (Postgres) + Prisma ORM
- **Payments**: Stripe
- **Email**: Resend
- **Hosting**: Vercel
- **Analytics**: Vercel Analytics + Sentry

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Neon database (sign up at neon.tech)
- Clerk account (clerk.com)
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

   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
   CLERK_SECRET_KEY=sk_test_xxxxx
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

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
