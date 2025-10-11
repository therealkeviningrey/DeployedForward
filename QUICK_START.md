# Quick Start - Deployed Forward

## 🚀 Deploy to Vercel (15 minutes)

Your complete course platform is ready to deploy!

---

## Step 1: Import to Vercel (5 min)

1. **Go to** https://vercel.com
2. **Sign in** with GitHub
3. **Click** "Add New Project"
4. **Select** `therealkeviningrey/DeployedForward`
5. **Configure**:
   - Root Directory: `.` (leave as is)
   - Framework: Next.js (auto-detected)
6. **Skip environment variables for now**
7. **Click** "Deploy"

**Result**: Marketing site will be live in 3-4 minutes!

---

## Step 2: Get Your Preview URL (immediate)

After deployment completes, you'll get:
```
https://deployed-forward-xyz123.vercel.app
```

**What works immediately (no config needed):**
- ✅ Homepage with factory.ai aesthetic
- ✅ All marketing pages (Product, Pricing, Programs, Company, News)
- ✅ Mission pages with MDX content
- ✅ Fully responsive, accessible
- ✅ SEO optimized

**Share this URL** with your team to review the design!

---

## Step 3: Add Environment Variables (40 min)

To enable full platform functionality (auth, courses, payments):

### **In Vercel Dashboard → Settings → Environment Variables**

Add these for **Preview** environment:

#### **Required for Authentication:**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

Get keys from: https://clerk.com (free tier, 15 min setup)

#### **Required for Database:**
```
DATABASE_URL=postgresql://user:pass@host.neon.tech/dbname
```

Get from: https://neon.tech (free tier, 10 min setup)

#### **Required for Payments:**
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_OPERATOR_MONTHLY_PRICE_ID=price_...
STRIPE_OPERATOR_ANNUAL_PRICE_ID=price_...
STRIPE_UNIT_MONTHLY_PRICE_ID=price_...
STRIPE_UNIT_ANNUAL_PRICE_ID=price_...
STRIPE_BATTALION_MONTHLY_PRICE_ID=price_...
STRIPE_BATTALION_ANNUAL_PRICE_ID=price_...
```

Get from: https://stripe.com (test mode, 20 min setup)

#### **Required for Email:**
```
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=hello@deployedforward.com
```

Get from: https://resend.com (free tier, 5 min setup)

#### **Always Required:**
```
NEXT_PUBLIC_APP_URL=https://your-vercel-url.vercel.app
CRON_SECRET=$(openssl rand -hex 32)
```

### **After Adding Variables:**

Click "Redeploy" to activate them.

---

## Step 4: Set Up Database (10 min)

After adding `DATABASE_URL` to Vercel:

```bash
# From your local machine
cd /Users/keviningrey/CursorProjects/DeployedForward

# Set your Neon database URL temporarily
export DATABASE_URL="postgresql://..."

# Push schema
npm run db:push

# Seed demo data
npm run db:seed
```

Now your courses will appear on the site!

---

## Step 5: Configure Webhooks (5 min)

**Stripe Webhook:**
1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-vercel-url.vercel.app/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy signing secret
5. Update `STRIPE_WEBHOOK_SECRET` in Vercel
6. Redeploy

---

## ✅ **You're Live!**

After all steps:
- ✅ Beautiful marketing site
- ✅ User authentication
- ✅ Course enrollment
- ✅ Payment processing
- ✅ Progress tracking
- ✅ Certificate generation
- ✅ Email notifications

---

## 📖 **Full Documentation**

- **README.md** - Developer reference, tech stack
- **LAUNCH_GUIDE.md** - Detailed deployment guide
- **GIT_WORKFLOW.md** - Git branching strategy
- **.env.example** - Environment variable template

---

## 🆘 **Need Help?**

- **Check**: LAUNCH_GUIDE.md for detailed setup
- **Vercel Logs**: Dashboard → Logs
- **Database**: Prisma Studio (`npm run db:studio`)

---

**Time to live**: 15 min (marketing site) to 1 hour (full platform)

🚀 **Let's deploy!**

