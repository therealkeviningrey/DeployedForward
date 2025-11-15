# How to Import Environment Variables to Vercel

## Quick Method: Using Vercel CLI (Fastest)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Link Project

```bash
cd /Users/kevingingrey/CursorProjects/DeployedForward
vercel link
```

Select your project when prompted.

### Step 4: Import Preview Variables

```bash
# Copy template and fill in your values
cp .env.preview.template .env.preview

# Edit .env.preview with your actual keys
# (Use your text editor)

# Import to Vercel Preview environment
vercel env pull .env.preview preview
```

### Step 5: Import Production Variables

```bash
# Copy template and fill in your values
cp .env.production.template .env.production

# Edit .env.production with your actual keys

# Import to Vercel Production environment
vercel env pull .env.production production
```

---

## Alternative: Manual Import via Dashboard

### Method A: Paste Entire File

1. **Fill in your template file** (`.env.preview` or `.env.production`)
2. **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
3. Click **"Add New"** → **"Bulk Import"**
4. **Paste entire file contents**
5. Select **Environment**: Preview or Production
6. Click **"Import"**

### Method B: Add One-by-One

1. **Vercel Dashboard** → Settings → Environment Variables
2. For each variable:
   - Click **"Add New"**
   - **Name**: `DATABASE_URL`
   - **Value**: (paste your value)
   - **Environment**: ☑️ Preview (or Production)
   - Click **"Save"**
3. Repeat for all 20+ variables

---

## ⚡ Recommended Approach

**For Preview Environment:**
1. Copy `.env.preview.template` → `.env.preview`
2. Fill in ALL values from your services
3. Use Vercel Dashboard → Bulk Import
4. Paste entire file
5. Select "Preview" environment
6. Done in 2 minutes!

**For Production Environment:**
1. Copy `.env.production.template` → `.env.production`
2. Fill in ALL values (use LIVE keys for Stripe!)
   - Ensure `AUTH_PROVIDER=better-auth` once migration is complete; keep Clerk secrets only if you still need to run the migration scripts
   - Populate `ADMIN_EMAILS` with a comma-separated allowlist for admin console access (e.g., founder emails)
   - Add OAuth client credentials if you want Google/GitHub sign-in:
     - `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET`
     - `GITHUB_OAUTH_CLIENT_ID` / `GITHUB_OAUTH_CLIENT_SECRET`
   - Flip `REQUIRE_ADMIN_2FA=true` once the team has enrolled in two-factor authentication (kept `false` by default during rollout)
3. Use Vercel Dashboard → Bulk Import
4. Paste entire file
5. Select "Production" environment
6. Done!

---

## 🔐 Security Notes

**Important:**
- ✅ `.env.preview` and `.env.production` are in `.gitignore`
- ✅ Never commit these files to Git
- ✅ Keep production keys separate and secure
- ✅ Use different CRON_SECRET for each environment

---

## ✅ Verification

After importing:

1. **Vercel Dashboard** → Settings → Environment Variables
2. You should see ~20 variables per environment
3. Preview variables show: Environment = "Preview"
4. Production variables show: Environment = "Production"

---

## 🔄 After Importing

**Redeploy** your application:
1. **Deployments** tab
2. Find latest deployment
3. Click "..." → **"Redeploy"**
4. Variables will be active

---

## 📋 Quick Checklist

### Before Importing:
- [ ] Created both Neon databases
- [ ] Signed up for Stripe
- [ ] Signed up for Resend
- [ ] Copied all keys

### Import Process:
- [ ] Copy `.env.preview.template` → `.env.preview`
- [ ] Fill in all preview values
- [ ] Import to Vercel (Preview scope)
- [ ] Copy `.env.production.template` → `.env.production`
- [ ] Fill in all production values (LIVE Stripe keys!)
- [ ] Import to Vercel (Production scope)
- [ ] Redeploy both environments

### After Import:
- [ ] Verify variables in Vercel dashboard
- [ ] Redeploy preview branch
- [ ] Redeploy main branch  
- [ ] Test preview site
- [ ] Test production site (when ready)

---

**This makes importing environment variables quick and error-free!** 🚀

