# Dual Environment Setup

> ⚠️ Better Auth has replaced Clerk. The sections below retain legacy Clerk instructions for historical reference. For the current Better Auth rollout, follow [`docs/BETTER_AUTH_USER_MIGRATION.md`](BETTER_AUTH_USER_MIGRATION.md) and [`docs/BETTER_AUTH_STAGING_ROLLOUT.md`](BETTER_AUTH_STAGING_ROLLOUT.md).
# Dual Environment Setup - Preview & Production

## Overview

This guide sets up **two completely isolated environments**:

1. **Preview** - Testing environment (linked to `preview` branch)
2. **Production** - Live environment (linked to `main` branch)

Each environment has its own database, Stripe products, and configuration. Changes flow: `preview` → test → `main` → production.

---

## 🏗️ Architecture

```
PREVIEW ENVIRONMENT               PRODUCTION ENVIRONMENT
└── preview branch                └── main branch
    ├── Neon DB (dev)                 ├── Neon DB (prod)
    ├── Clerk (test instance)         ├── Clerk (prod instance)
    ├── Stripe (test mode)            ├── Stripe (live mode)
    ├── Resend (test domain)          ├── Resend (verified domain)
    └── URL: preview-xyz.vercel.app   └── URL: deployedforward.com
```

---

## Phase 1: Create Preview Environment (1 hour)

### 1.1 Neon Database - Preview ✅ COMPLETE

1. ✅ Go to https://neon.tech
2. ✅ Create project: **"deployed-forward-preview"**
3. ✅ Copy connection string
4. ✅ Save as: `PREVIEW_DATABASE_URL`

**Your connection string looks like:**
```
postgresql://user:password@ep-preview-xxxxx.region.aws.neon.tech/deployedforward_dev?sslmode=require
```

**Save this** - you'll add it to Vercel later!

### 1.2 Clerk - Preview Instance

1. Go to https://clerk.com
2. Create application: **"Deployed Forward - Preview"**
3. Copy keys:
   - `PREVIEW_CLERK_PUBLISHABLE_KEY`
   - `PREVIEW_CLERK_SECRET_KEY`
4. Configure Paths:
   - Sign-in: `/login`
   - Sign-up: `/login`
   - After sign-in: `/dashboard`
   - After sign-up: `/dashboard`

### 1.3 Stripe - Test Mode (Preview)

1. Go to https://stripe.com
2. **Stay in Test Mode**
3. Copy API keys:
   - `PREVIEW_STRIPE_SECRET_KEY` (sk_test_...)
   - `PREVIEW_STRIPE_PUBLISHABLE_KEY` (pk_test_...)

4. Create Products (Test Mode):
   - **Operator**: $29/mo, $290/yr
   - **Unit**: $99/mo, $990/yr
   - **Battalion**: $299/mo, $2990/yr

5. Copy all 6 price IDs:
   - `PREVIEW_STRIPE_OPERATOR_MONTHLY_PRICE_ID`
   - `PREVIEW_STRIPE_OPERATOR_ANNUAL_PRICE_ID`
   - `PREVIEW_STRIPE_UNIT_MONTHLY_PRICE_ID`
   - `PREVIEW_STRIPE_UNIT_ANNUAL_PRICE_ID`
   - `PREVIEW_STRIPE_BATTALION_MONTHLY_PRICE_ID`
   - `PREVIEW_STRIPE_BATTALION_ANNUAL_PRICE_ID`

### 1.4 Resend - Preview

1. Go to https://resend.com
2. Use the **same account** (can reuse)
3. Use their test domain OR verify a subdomain (test.deployedforward.com)
4. Copy API key: `PREVIEW_RESEND_API_KEY`

---

## Phase 2: Create Production Environment (1 hour)

### 2.1 Neon Database - Production

1. Neon Dashboard
2. Create NEW project: **"deployed-forward-production"**
3. Copy connection string
4. Save as: `PROD_DATABASE_URL`

### 2.2 Clerk - Production Instance

**Option A: Same Clerk App (Simpler)**
- Use same keys as Preview
- Clerk handles multi-domain automatically

**Option B: Separate Instance (More Isolated)**
1. Create new application: **"Deployed Forward - Production"**
2. Copy keys:
   - `PROD_CLERK_PUBLISHABLE_KEY`
   - `PROD_CLERK_SECRET_KEY`
3. Configure same paths

### 2.3 Stripe - Live Mode (Production)

1. **Switch to Live Mode** (toggle in Stripe Dashboard)
2. Copy Live API keys:
   - `PROD_STRIPE_SECRET_KEY` (sk_live_...)
   - `PROD_STRIPE_PUBLISHABLE_KEY` (pk_live_...)

3. **Recreate Products in Live Mode**:
   - Operator: $29/mo, $290/yr
   - Unit: $99/mo, $990/yr
   - Battalion: $299/mo, $2990/yr

4. Copy all 6 **Live** price IDs:
   - `PROD_STRIPE_OPERATOR_MONTHLY_PRICE_ID`
   - etc.

### 2.4 Resend - Production

1. **Verify your production domain** in Resend
2. Add DNS records as instructed
3. Use same API key or create production key
4. Save as: `PROD_RESEND_API_KEY`
5. From email: `PROD_FROM_EMAIL=hello@deployedforward.com`

---

## Phase 3: Configure Vercel

### 3.1 Import Project to Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Select `therealkeviningrey/DeployedForward`
4. Configure:
   - **Root Directory**: `.` (project root)
   - **Framework**: Next.js (auto-detected)
5. **Don't add env vars yet** - Click "Deploy"

### 3.2 Configure Branch Deployments

After initial deploy:

1. **Settings → Git**
2. **Production Branch**: `main`
3. All other branches (including `preview`) deploy to Preview

### 3.3 Add Preview Environment Variables

**Settings → Environment Variables**

For each variable, set **Environment**: `Preview`

```env
# Database
DATABASE_URL=postgresql://preview-db-url-here

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_preview_xxxxx
CLERK_SECRET_KEY=sk_test_preview_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Stripe (Test Mode)
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# Stripe Price IDs (Test Mode)
STRIPE_OPERATOR_MONTHLY_PRICE_ID=price_test_xxxxx
STRIPE_OPERATOR_ANNUAL_PRICE_ID=price_test_xxxxx
STRIPE_UNIT_MONTHLY_PRICE_ID=price_test_xxxxx
STRIPE_UNIT_ANNUAL_PRICE_ID=price_test_xxxxx
STRIPE_BATTALION_MONTHLY_PRICE_ID=price_test_xxxxx
STRIPE_BATTALION_ANNUAL_PRICE_ID=price_test_xxxxx

# Resend
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=hello@deployedforward.com

# App Config
NEXT_PUBLIC_APP_URL=https://deployed-forward-git-preview-xyz.vercel.app
CRON_SECRET=preview_secret_here_random_32_chars

# Sentry (optional)
SENTRY_DSN=https://xxxxx@sentry.io/preview
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/preview
```

**Important**: After adding variables, click **"Redeploy"** on preview branch deployment.

### 3.4 Add Production Environment Variables

**Same location**, but set **Environment**: `Production`

```env
# Database (Production DB!)
DATABASE_URL=postgresql://production-db-url-here

# Clerk (Production or same as preview)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx_OR_same_as_preview
CLERK_SECRET_KEY=sk_live_xxxxx_OR_same_as_preview
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Stripe (LIVE MODE!)
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx

# Stripe Price IDs (LIVE MODE!)
STRIPE_OPERATOR_MONTHLY_PRICE_ID=price_live_xxxxx
STRIPE_OPERATOR_ANNUAL_PRICE_ID=price_live_xxxxx
STRIPE_UNIT_MONTHLY_PRICE_ID=price_live_xxxxx
STRIPE_UNIT_ANNUAL_PRICE_ID=price_live_xxxxx
STRIPE_BATTALION_MONTHLY_PRICE_ID=price_live_xxxxx
STRIPE_BATTALION_ANNUAL_PRICE_ID=price_live_xxxxx

# Resend (Verified Domain)
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=hello@deployedforward.com

# App Config (Production Domain!)
NEXT_PUBLIC_APP_URL=https://deployedforward.com
CRON_SECRET=production_secret_different_from_preview_32_chars

# Sentry (optional)
SENTRY_DSN=https://xxxxx@sentry.io/production
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/production
```

---

## Phase 4: Initialize Databases

### 4.1 Preview Database

```bash
cd /Users/keviningrey/CursorProjects/DeployedForward

# Set preview database URL
export DATABASE_URL="your-preview-db-url"

# Push schema
npm run db:push

# Seed with demo data
npm run db:seed

# Verify
npm run db:studio
```

### 4.2 Production Database

```bash
# Set production database URL
export DATABASE_URL="your-production-db-url"

# Push schema
npm run db:push

# Seed with demo data (or import real data)
npm run db:seed

# Verify
npm run db:studio
```

**Important**: Keep databases separate! Never point production app at preview DB.

---

## Phase 5: Configure Webhooks

### 5.1 Preview Stripe Webhook

1. Stripe Dashboard → **Test Mode**
2. Developers → Webhooks
3. Add endpoint: `https://your-preview-url.vercel.app/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy signing secret
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel (Preview environment)
7. Redeploy preview

### 5.2 Production Stripe Webhook

1. Stripe Dashboard → **Live Mode**
2. Developers → Webhooks
3. Add endpoint: `https://deployedforward.com/api/webhooks/stripe`
4. Select same events
5. Copy signing secret
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel (Production environment)

### 5.3 Clerk Domains

**Preview:**
1. Clerk Dashboard → Domains
2. Add: `your-preview-url.vercel.app`

**Production:**
1. Add: `deployedforward.com`
2. Add: `www.deployedforward.com` (if using)

---

## Phase 6: Deployment Workflow

### Development Workflow

```bash
# Work on preview branch
git checkout preview
git pull origin preview

# Make changes
# ... edit files ...

# Commit and push
git add .
git commit -m "feat: add new feature"
git push origin preview
```

**Vercel automatically:**
- Deploys to Preview environment
- Uses Preview database
- Uses Stripe test mode
- Gives you URL: `https://deployed-forward-git-preview-xyz.vercel.app`

**Test there!**

### Promoting to Production

When preview is stable and tested:

```bash
# Merge preview to main
git checkout main
git pull origin main
git merge preview
git push origin main
```

**Vercel automatically:**
- Deploys to Production environment
- Uses Production database
- Uses Stripe live mode
- Deploys to: `https://deployedforward.com`

---

## 🔒 Environment Isolation

### What's Separate:

| Resource | Preview | Production |
|----------|---------|------------|
| Database | Neon preview project | Neon production project |
| Users | Test users only | Real customers |
| Payments | Stripe test mode | Stripe live mode |
| Emails | Test domain | Verified domain |
| Domain | Vercel preview URL | deployedforward.com |
| Data | Can be wiped/reset | Must be protected |

### What's Shared (Optional):

- Clerk instance (can use same for both)
- Resend account (different sending domains)
- Sentry project (or separate for clearer tracking)

---

## 🧪 Testing Workflow

### On Preview:

1. Push code to `preview` branch
2. Vercel deploys automatically
3. Test thoroughly:
   - Sign up (test users)
   - Enroll in courses
   - Complete lessons
   - Test payments (4242 4242 4242 4242)
   - Check emails (Resend logs)
   - Verify webhooks (Stripe logs)

### After Testing Passes:

1. Merge `preview` → `main`
2. Production deploys automatically
3. Real users interact with production environment

---

## 📋 Environment Variables Summary

### Preview Environment (20 variables):

```
DATABASE_URL=postgresql://preview...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test...
CLERK_SECRET_KEY=sk_test...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
STRIPE_SECRET_KEY=sk_test...
STRIPE_PUBLISHABLE_KEY=pk_test...
STRIPE_WEBHOOK_SECRET=whsec_test...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test...
STRIPE_OPERATOR_MONTHLY_PRICE_ID=price_test_1...
STRIPE_OPERATOR_ANNUAL_PRICE_ID=price_test_2...
STRIPE_UNIT_MONTHLY_PRICE_ID=price_test_3...
STRIPE_UNIT_ANNUAL_PRICE_ID=price_test_4...
STRIPE_BATTALION_MONTHLY_PRICE_ID=price_test_5...
STRIPE_BATTALION_ANNUAL_PRICE_ID=price_test_6...
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=hello@deployedforward.com
NEXT_PUBLIC_APP_URL=https://deployed-forward-git-preview-xyz.vercel.app
CRON_SECRET=preview_random_secret
```

**Scope in Vercel**: ☑️ Preview

### Production Environment (20 variables):

```
DATABASE_URL=postgresql://production...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live...
CLERK_SECRET_KEY=sk_live...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
STRIPE_SECRET_KEY=sk_live...
STRIPE_PUBLISHABLE_KEY=pk_live...
STRIPE_WEBHOOK_SECRET=whsec_live...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live...
STRIPE_OPERATOR_MONTHLY_PRICE_ID=price_live_1...
STRIPE_OPERATOR_ANNUAL_PRICE_ID=price_live_2...
STRIPE_UNIT_MONTHLY_PRICE_ID=price_live_3...
STRIPE_UNIT_ANNUAL_PRICE_ID=price_live_4...
STRIPE_BATTALION_MONTHLY_PRICE_ID=price_live_5...
STRIPE_BATTALION_ANNUAL_PRICE_ID=price_live_6...
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=hello@deployedforward.com
NEXT_PUBLIC_APP_URL=https://deployedforward.com
CRON_SECRET=production_different_random_secret
```

**Scope in Vercel**: ☑️ Production

---

## 🔄 Vercel Configuration Steps

### Step 1: Import Repository

1. Vercel → "Add New Project"
2. Import `therealkeviningrey/DeployedForward`
3. Root: `.` (project root)
4. Click "Deploy" (will fail without env vars - that's OK)

### Step 2: Set Production Branch

1. **Settings → Git**
2. **Production Branch**: `main`
3. Save

Now:
- `main` branch → Production environment
- `preview` branch → Preview environment
- Other branches → Temporary previews (inherit from Preview)

### Step 3: Add ALL Preview Variables

1. **Settings → Environment Variables**
2. Click "Add New"
3. For EACH of the 20 variables above:
   - Name: `DATABASE_URL` (etc.)
   - Value: (your preview value)
   - Environment: ☑️ **Preview** only
   - Click "Save"

### Step 4: Add ALL Production Variables

1. Same location
2. For EACH of the 20 variables:
   - Name: `DATABASE_URL` (etc.)
   - Value: (your PRODUCTION value)
   - Environment: ☑️ **Production** only
   - Click "Save"

### Step 5: Redeploy Both Environments

1. **Deployments** tab
2. Find latest `preview` branch deployment → Redeploy
3. Find latest `main` branch deployment → Redeploy

---

## ✅ Verification Checklist

### Preview Environment:

- [ ] Visit preview URL
- [ ] Marketing pages load
- [ ] Can sign up (test account)
- [ ] Can enroll in course
- [ ] Can view lessons
- [ ] Can complete lesson
- [ ] Progress updates
- [ ] Test payment works (4242 4242 4242 4242)
- [ ] Webhook received (check Stripe)
- [ ] Email received (check Resend)
- [ ] Dashboard shows subscription
- [ ] No real money charged ✓

### Production Environment:

- [ ] Visit production URL
- [ ] All pages load
- [ ] SSL certificate valid
- [ ] Can sign up (real user)
- [ ] Can enroll
- [ ] Can complete course
- [ ] Real payment works
- [ ] Webhook received
- [ ] Email delivered
- [ ] **Real money charged** ⚠️
- [ ] Monitor for errors

---

## 🔐 Security Best Practices

### API Keys:

1. **Never commit** `.env.local` files
2. **Never share** production keys in Slack/email
3. **Use different** Cron secrets for each environment
4. **Rotate keys** if leaked

### Databases:

1. **Never** point production app at preview DB
2. **Back up** production DB regularly (Neon auto-backups)
3. **Test migrations** on preview first
4. **Export** preview data before schema changes

### Stripe:

1. **Always test** on Preview with test mode first
2. **Don't** enable live mode until thoroughly tested
3. **Monitor** Stripe dashboard for fraudulent charges
4. **Set up** Radar rules for fraud detection

---

## 🧪 Development Cycle

### Typical Flow:

```
1. Code on local machine
   ↓
2. Push to `preview` branch
   ↓
3. Vercel deploys to Preview environment
   ↓
4. Test with preview database & Stripe test mode
   ↓
5. If good, merge `preview` → `main`
   ↓
6. Vercel deploys to Production environment
   ↓
7. Real users interact with production
```

### Emergency Hotfix:

```
1. Create branch from `main`
   ↓
2. Fix bug
   ↓
3. Push to `main` directly (skip preview)
   ↓
4. Vercel deploys to production
   ↓
5. Merge back to `preview` to keep in sync
```

---

## 📊 Monitoring Both Environments

### Vercel Dashboard:

- **Deployments** - See preview vs production deploys
- **Logs** - Filter by environment
- **Analytics** - Separate stats per environment

### Stripe:

- **Test Mode** - Preview transactions
- **Live Mode** - Production transactions
- Toggle between them easily

### Neon:

- Separate projects = separate dashboards
- Monitor connections and usage independently

### Resend:

- Same dashboard, but emails tagged by domain
- Can filter by sending domain

---

## 💰 Cost Considerations

### Free Tiers (Both Environments):

- **Neon**: 0.5 GB storage per project (plenty for testing)
- **Clerk**: 10k MAU free
- **Stripe**: No cost for test mode
- **Resend**: 100 emails/day free
- **Vercel**: Hobby plan supports unlimited previews

### When You Grow:

- Neon: Scale plan ~$19/mo per database
- Clerk: Pro plan ~$25/mo
- Stripe: % of transactions only
- Resend: $20/mo for 50k emails

**Total**: ~$100/mo to support both environments at scale.

---

## 🎯 Quick Reference

### URLs:

- **Preview**: `https://deployed-forward-git-preview-[hash].vercel.app`
- **Production**: `https://deployedforward.com` (after domain setup)

### Databases:

- **Preview**: Neon "deployed-forward-preview"
- **Production**: Neon "deployed-forward-production"

### Stripe:

- **Preview**: Test Mode (sk_test...)
- **Production**: Live Mode (sk_live...)

### Git Branches:

- **preview** → Preview environment
- **main** → Production environment

---

## 🚨 Important Warnings

1. **Never use production keys in preview**
2. **Never point production at preview database**
3. **Test payments in preview first** (always use test cards)
4. **Keep Stripe in test mode** until you're 100% confident
5. **Back up production DB** before any schema changes
6. **Monitor production closely** after every deployment

---

## ✅ Setup Checklist

### Preview Environment:
- [ ] Neon preview database created
- [ ] Clerk preview app configured  
- [ ] Stripe test mode products created
- [ ] Resend API key obtained
- [ ] All 20 Preview variables added to Vercel
- [ ] Preview branch deployed
- [ ] Database schema pushed
- [ ] Demo data seeded
- [ ] Stripe webhook configured
- [ ] Clerk domain added
- [ ] Full flow tested

### Production Environment:
- [ ] Neon production database created
- [ ] Clerk production app configured (or reusing preview)
- [ ] Stripe LIVE mode products created
- [ ] Resend domain verified
- [ ] All 20 Production variables added to Vercel
- [ ] Custom domain configured
- [ ] Database schema pushed
- [ ] Initial data seeded
- [ ] Stripe webhook configured
- [ ] Clerk domain added
- [ ] Monitoring set up

---

## 🎓 You're All Set!

With this setup you have:
- ✅ Isolated testing environment
- ✅ Safe production environment  
- ✅ No risk of test data in production
- ✅ No risk of real charges in testing
- ✅ Professional deployment workflow

**Time to set up both**: 2-3 hours  
**Time to deploy**: Automatic after setup  
**Confidence level**: Production-grade ✨  

---

Last Updated: Now
Status: Ready for dual environment deployment
Next: Follow this guide step-by-step

