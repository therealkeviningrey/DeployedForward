# Vercel Deployment & Testing Guide

## 🚀 Complete Deployment Checklist

This guide covers deploying Deployed Forward to Vercel with proper preview and production testing.

---

## Phase 1: Pre-Deployment Setup

### 1.1 Sign Up for Required Services

**Required (Free Tiers Available):**

1. **Neon Database** (https://neon.tech)
   - Sign up with GitHub
   - Create new project: "deployed-forward"
   - Copy connection string
   - Note: You'll need separate databases for preview/production

2. **Clerk Authentication** (https://clerk.com)
   - Sign up with GitHub
   - Create application: "Deployed Forward"
   - Copy publishable & secret keys
   - Configure redirect URLs later

3. **Stripe** (https://stripe.com)
   - Sign up
   - Get test mode keys first
   - Copy publishable & secret keys
   - Create webhook endpoint later

4. **Resend Email** (https://resend.com)
   - Sign up
   - Verify your domain OR use their test domain
   - Copy API key

5. **Sentry** (https://sentry.io) - Optional
   - Sign up
   - Create project
   - Copy DSN

---

## Phase 2: Local Testing

### 2.1 Configure Local Environment

```bash
cd /Users/keviningrey/CursorProjects/DeployedForward/web

# Create .env.local
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Neon Database (Development)
DATABASE_URL="postgresql://user:pass@dev-db.neon.tech/deployedforward?sslmode=require"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxx
CLERK_SECRET_KEY=sk_test_yyyyyyyyyyyy
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Stripe (Test Mode)
STRIPE_SECRET_KEY=sk_test_zzzzzzzzz
STRIPE_PUBLISHABLE_KEY=pk_test_aaaaaaaaaa
STRIPE_WEBHOOK_SECRET=whsec_local_bbbbbbbb
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_aaaaaaaaaa

# Stripe Price IDs (Create in Stripe Dashboard)
STRIPE_OPERATOR_MONTHLY_PRICE_ID=price_xxxxxxxxx
STRIPE_OPERATOR_ANNUAL_PRICE_ID=price_yyyyyyyyy
STRIPE_UNIT_MONTHLY_PRICE_ID=price_zzzzzzzzz
STRIPE_UNIT_ANNUAL_PRICE_ID=price_aaaaaaaaa
STRIPE_BATTALION_MONTHLY_PRICE_ID=price_bbbbbbbbb
STRIPE_BATTALION_ANNUAL_PRICE_ID=price_ccccccccc

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@deployedforward.com

# Cron Secret (generate random string)
CRON_SECRET=$(openssl rand -hex 32)

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Sentry (optional)
SENTRY_DSN=https://xxxxx@sentry.io/yyyyy
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/yyyyy
```

### 2.2 Create Stripe Products

**In Stripe Dashboard (Test Mode):**

1. Go to Products → Add Product
2. Create 3 products:

**Operator Tier:**
- Name: "Operator"
- Price: $29/month (recurring)
- Price: $290/year (recurring)

**Unit Tier:**
- Name: "Unit"
- Price: $99/month (recurring)
- Price: $990/year (recurring)

**Battalion Tier:**
- Name: "Battalion"
- Price: $299/month (recurring)
- Price: $2990/year (recurring)

Copy all price IDs to `.env.local`

### 2.3 Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with demo data
npm run db:seed
```

Verify with Prisma Studio:
```bash
npm run db:studio
```

### 2.4 Configure Clerk Redirects

In Clerk Dashboard:
1. Go to Paths
2. Set Sign-in URL: `/login`
3. Set Sign-up URL: `/login`
4. Set After sign-in: `/dashboard`
5. Set After sign-up: `/dashboard`

### 2.5 Test Stripe Webhook Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks (keep this running)
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy webhook signing secret to .env.local
```

### 2.6 Run Local Tests

```bash
npm run dev
```

**Test Checklist:**
- [ ] Homepage loads (http://localhost:3000)
- [ ] Marketing pages work (Product, Pricing, etc.)
- [ ] Sign up with Clerk
- [ ] Browse courses at `/courses`
- [ ] Enroll in a course
- [ ] View lesson
- [ ] Mark lesson complete
- [ ] Check progress in dashboard
- [ ] Test Stripe checkout (use 4242 4242 4242 4242)
- [ ] Verify webhook received in Stripe CLI
- [ ] Check email sent (Resend logs)

---

## Phase 3: Git Setup

### 3.1 Initialize Repository

```bash
cd /Users/keviningrey/CursorProjects/DeployedForward

# Initialize git
git init

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output

# Next.js
.next/
out/
build/
dist/

# Environment
.env
.env*.local
.env.production

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Vercel
.vercel

# Misc
.DS_Store
*.pem

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Prisma
prisma/*.db
prisma/*.db-journal

# Sentry
.sentryclirc
EOF

# Initial commit
git add .
git commit -m "Initial commit: Deployed Forward platform"
```

### 3.2 Push to GitHub

```bash
# Create repo on GitHub first, then:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/deployed-forward.git
git push -u origin main
```

---

## Phase 4: Vercel Preview Deployment

### 4.1 Connect to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your repository
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `.` (project root)
   - **Build Command**: `npm run build`
   - **Output Directory**: (leave default)

### 4.2 Set Environment Variables (Preview)

In Vercel Project Settings → Environment Variables:

Add ALL variables from your `.env.local`, but with preview-specific values:

```env
# Preview Database (separate from production!)
DATABASE_URL=postgresql://user:pass@preview-db.neon.tech/deployedforward

# Same Clerk app, different environment
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Stripe Test Mode
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=(will set after webhook created)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# All 6 Stripe Price IDs
STRIPE_OPERATOR_MONTHLY_PRICE_ID=price_...
STRIPE_OPERATOR_ANNUAL_PRICE_ID=price_...
STRIPE_UNIT_MONTHLY_PRICE_ID=price_...
STRIPE_UNIT_ANNUAL_PRICE_ID=price_...
STRIPE_BATTALION_MONTHLY_PRICE_ID=price_...
STRIPE_BATTALION_ANNUAL_PRICE_ID=price_...

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=hello@deployedforward.com

# Cron Secret
CRON_SECRET=your_random_secret_here

# App URL (will be preview URL)
NEXT_PUBLIC_APP_URL=https://your-preview.vercel.app

# Sentry
SENTRY_DSN=https://...
NEXT_PUBLIC_SENTRY_DSN=https://...
```

**Important:** Set environment scope to "Preview" for now.

### 4.3 Deploy Preview

Click "Deploy" - Vercel will build and deploy.

### 4.4 Post-Deploy: Configure Services

**A. Set Up Database:**

```bash
# From your local machine, pointing to preview DB
DATABASE_URL="your-preview-db-url" npm run db:push
DATABASE_URL="your-preview-db-url" npm run db:seed
```

**B. Configure Clerk for Preview:**

In Clerk Dashboard → Domains:
- Add your Vercel preview domain
- Enable redirects for that domain

**C. Set Up Stripe Webhook (Preview):**

1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-preview.vercel.app/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy signing secret
5. Add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`
6. Redeploy to pick up new env var

**D. Update NEXT_PUBLIC_APP_URL:**

1. Copy your actual preview URL from Vercel
2. Update `NEXT_PUBLIC_APP_URL` in env vars
3. Redeploy

---

## Phase 5: Preview Testing

### 5.1 Smoke Tests

Visit your preview URL and test:

- [ ] Homepage loads without errors
- [ ] All marketing pages accessible
- [ ] Images load (logos)
- [ ] Navigation works
- [ ] Footer links work

### 5.2 Authentication Flow

- [ ] Click "Sign Up"
- [ ] Complete Clerk sign-up flow
- [ ] Redirected to dashboard
- [ ] User created in database (check Prisma Studio)
- [ ] Sign out works
- [ ] Sign in works

### 5.3 Course Flow

- [ ] Browse courses at `/courses`
- [ ] View course detail
- [ ] Click "Enroll Now"
- [ ] Verify enrollment email received
- [ ] Access enrolled course
- [ ] View lesson (MDX renders correctly)
- [ ] Mark lesson as complete
- [ ] Progress updates in dashboard
- [ ] Complete all lessons
- [ ] Certificate auto-generated
- [ ] Certificate email received
- [ ] Download certificate (OG image)

### 5.4 Payment Flow

- [ ] Go to `/pricing`
- [ ] Click "Subscribe" on Operator plan
- [ ] Redirected to Stripe Checkout
- [ ] Use test card: 4242 4242 4242 4242
- [ ] Any expiry date in future
- [ ] Any 3-digit CVC
- [ ] Complete payment
- [ ] Redirected to success page
- [ ] Subscription appears in dashboard
- [ ] Webhook received (check Vercel logs)
- [ ] Subscription in database
- [ ] Go to `/dashboard/billing`
- [ ] Click "Manage Subscription"
- [ ] Billing portal opens
- [ ] Can view invoices

### 5.5 Email Testing

- [ ] Welcome email (on sign-up)
- [ ] Enrollment email (on course enroll)
- [ ] Certificate email (on completion)
- [ ] Check Resend dashboard for delivery

### 5.6 SEO & Performance

- [ ] View page source - meta tags present
- [ ] Open Graph preview (paste URL in Slack/Discord)
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Run Lighthouse audit (aim for 90+)

### 5.7 Error Handling

- [ ] Visit `/nonexistent` - 404 page shows
- [ ] Try accessing `/dashboard` logged out - redirects to login
- [ ] Try accessing lesson without enrollment - shows message
- [ ] Check Sentry dashboard for errors

---

## Phase 6: Production Deployment

### 6.1 Create Production Environment

**A. Production Database:**

1. Create new Neon database for production
2. Copy connection string
3. Run migrations:
   ```bash
   DATABASE_URL="prod-url" npm run db:push
   DATABASE_URL="prod-url" npm run db:seed
   ```

**B. Production Environment Variables:**

In Vercel → Environment Variables:

1. Duplicate all Preview variables
2. Change scope to "Production"
3. Update:
   - `DATABASE_URL` → production database
   - `NEXT_PUBLIC_APP_URL` → your production domain
   - `STRIPE_*` → use live mode keys (when ready)
   - `STRIPE_WEBHOOK_SECRET` → (will update after webhook)

**C. Custom Domain (Optional):**

1. Vercel → Settings → Domains
2. Add `deployedforward.com`
3. Configure DNS records as instructed
4. SSL auto-configured by Vercel

### 6.2 Configure Production Services

**Clerk:**
- Add production domain to allowed origins
- Create production environment (optional)

**Stripe (when ready to go live):**
- Switch to Live Mode
- Recreate products with live prices
- Update price IDs in env vars
- Create new webhook endpoint for production URL
- Update `STRIPE_WEBHOOK_SECRET`

**Resend:**
- Verify production domain for email sending
- Update `RESEND_FROM_EMAIL` if using custom domain

### 6.3 Deploy to Production

```bash
# Merge to main branch triggers production deploy
git checkout main
git pull origin main
git merge your-branch
git push origin main
```

Or manually deploy from Vercel Dashboard.

### 6.4 Post-Deploy Verification

Run all Phase 5 tests again on production URL.

---

## Phase 7: Monitoring & Maintenance

### 7.1 Set Up Monitoring

**Vercel Dashboard:**
- Monitor deployment status
- Check function logs
- Review analytics

**Sentry:**
- Monitor error rates
- Set up alerts for critical errors
- Review error traces

**Stripe:**
- Monitor successful payments
- Check webhook delivery
- Review failed payments

**Resend:**
- Check email delivery rates
- Monitor bounces
- Review spam complaints

### 7.2 Cron Job Verification

The progress reminder cron runs daily at 9 AM UTC.

**Test it:**
```bash
# Call cron endpoint manually with auth
curl -X GET https://your-domain.com/api/cron/progress-reminders \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Check response and Resend dashboard for sent emails.

**Monitor:**
- Vercel → Cron → View execution logs
- Check for errors
- Verify emails sent

### 7.3 Database Maintenance

**Backups:**
- Neon automatically backs up
- Can enable point-in-time restore
- Set up periodic exports for safety

**Monitoring:**
- Check connection pool usage
- Monitor query performance
- Review slow query logs

---

## Testing Checklist Summary

### Pre-Deploy (Local)
- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Database schema applied
- [ ] Demo data seeded
- [ ] Local development server runs
- [ ] Can sign up and log in
- [ ] Can enroll and complete course
- [ ] Stripe checkout works locally
- [ ] Emails sending

### Preview Deploy
- [ ] Build succeeds on Vercel
- [ ] Environment variables set
- [ ] Database migrated
- [ ] Clerk configured
- [ ] Stripe webhook configured
- [ ] All smoke tests pass
- [ ] Full course flow works
- [ ] Payment flow works
- [ ] Emails delivering
- [ ] SEO tags present
- [ ] Lighthouse score 90+
- [ ] No critical errors in Sentry

### Production Deploy
- [ ] Production database ready
- [ ] Production env vars set
- [ ] Custom domain configured (if any)
- [ ] SSL certificate active
- [ ] Stripe live mode ready (or staying in test)
- [ ] All preview tests pass on production
- [ ] Cron job executing
- [ ] Monitoring dashboards set up
- [ ] Backup strategy in place

---

## Rollback Plan

If issues arise in production:

**Instant Rollback:**
1. Vercel → Deployments
2. Find last working deployment
3. Click "..." → Promote to Production

**Database Rollback:**
- Neon: Restore from point-in-time
- Manual: Run migration down scripts

**Mitigation:**
- Set deployment to preview-only until fixed
- Roll forward with hotfix

---

## Troubleshooting

### Build Fails

**Error: Prisma Client not generated**
```bash
# Add to package.json scripts
"postinstall": "prisma generate"
```

**Error: Module not found**
- Check import paths are correct
- Verify all dependencies in package.json
- Clear `.next` and rebuild

### Runtime Errors

**Clerk: Missing keys**
- Verify env vars in Vercel dashboard
- Check variable names match exactly
- Redeploy after adding vars

**Database: Connection failed**
- Check DATABASE_URL format
- Verify Neon allows connections from Vercel IPs
- Test connection string locally

**Stripe: Webhook not receiving**
- Verify webhook URL is correct
- Check endpoint is live (test in Stripe dashboard)
- Verify signing secret matches
- Check Vercel function logs

**Email: Not sending**
- Verify Resend API key
- Check domain verification
- Review Resend logs for errors
- Verify `from` email is allowed

---

## Performance Optimization

### Image Optimization
- Use Next.js Image component
- Set up proper image domains in next.config.mjs
- Use WebP format where possible

### Bundle Size
- Check bundle size: `npm run build`
- Use dynamic imports for heavy components
- Code split by route

### Database
- Add indexes for frequently queried fields
- Use connection pooling (Neon provides this)
- Cache frequently accessed data

### Edge Functions
- OG image generation is already on edge
- Consider moving other API routes to edge if needed

---

## Security Checklist

- [ ] Environment variables not committed
- [ ] API routes validate auth
- [ ] CSRF protection (Clerk handles)
- [ ] Rate limiting on sensitive endpoints
- [ ] SQL injection prevented (Prisma handles)
- [ ] XSS prevented (React handles)
- [ ] Security headers in vercel.json
- [ ] Stripe webhook signatures verified
- [ ] Admin routes protected by role check

---

## Launch Checklist

Before going live:

- [ ] All tests passing
- [ ] Documentation complete
- [ ] Privacy policy live
- [ ] Terms of service live
- [ ] Support email set up
- [ ] Analytics tracking verified
- [ ] Error monitoring active
- [ ] Backup strategy confirmed
- [ ] Stripe live mode enabled (when ready)
- [ ] Marketing site reviewed
- [ ] Course content ready
- [ ] Pricing confirmed
- [ ] Beta testers invited
- [ ] Launch announcement prepared

---

## Support & Resources

**Official Docs:**
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- Prisma: https://www.prisma.io/docs
- Clerk: https://clerk.com/docs
- Stripe: https://stripe.com/docs

**Community:**
- Next.js Discord
- Vercel Discord
- Stack Overflow

**Emergency Contacts:**
- Vercel Support: support@vercel.com
- Stripe Support: In dashboard
- Your development team

---

**Last Updated:** $(date)
**Version:** 1.0
**Status:** Ready for Deployment ✅

