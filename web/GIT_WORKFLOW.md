# Git Workflow - Deployed Forward

## Branch Strategy

We use a two-branch strategy for clean preview and production deployments:

```
main (production)     ← Production deployments only
  ↑
preview (staging)     ← Active development & testing
  ↑
feature branches      ← Individual features
```

---

## Branch Purposes

### `main` - Production
- **Purpose**: Live production code only
- **Deploys to**: Vercel Production
- **Protection**: Merge via PR only, all tests must pass
- **Updates**: Only merge from `preview` after thorough testing

### `preview` - Staging/Development
- **Purpose**: Integration and testing
- **Deploys to**: Vercel Preview environments
- **Protection**: Review recommended
- **Updates**: Merge feature branches here first

### `feature/*` - Feature Development
- **Purpose**: Individual features or fixes
- **Deploys to**: Vercel Preview (automatic)
- **Naming**: `feature/add-video-support`, `fix/enrollment-bug`
- **Lifespan**: Delete after merging to `preview`

---

## Vercel Configuration

### Automatic Deployments

Vercel will automatically:
- Deploy `main` → **Production**
- Deploy `preview` → **Preview environment** (primary)
- Deploy all other branches → **Preview environments** (temporary)

### Environment Variables by Branch

**Production** (`main` branch):
- Production database
- Live Stripe keys (when ready)
- Production domain
- Production secrets

**Preview** (`preview` branch):
- Development database
- Test Stripe keys
- Preview domain
- Test secrets

**Feature branches**:
- Inherit from `preview`
- Auto-generated URLs

---

## Development Workflow

### Starting New Feature

```bash
# Make sure you're on preview
git checkout preview
git pull origin preview

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes, commit
git add .
git commit -m "Add: your feature description"

# Push to GitHub (triggers Vercel preview deploy)
git push -u origin feature/your-feature-name
```

### Merging to Preview

```bash
# After feature is tested on its preview URL
git checkout preview
git pull origin preview
git merge feature/your-feature-name
git push origin preview

# Delete feature branch (optional)
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

### Promoting to Production

```bash
# After thorough testing on preview
git checkout main
git pull origin main
git merge preview
git push origin main

# This triggers production deployment
```

---

## Vercel Setup Guide

### Initial Configuration

1. **Go to Vercel Dashboard**
2. **Import your GitHub repo**
3. **Configure**:
   - Root Directory: `web`
   - Framework: Next.js (auto-detected)

4. **Production Branch**: `main`
5. **Preview Branch**: `preview` (and all others)

### Environment Variables Setup

**In Vercel → Settings → Environment Variables:**

For each variable, configure the environment scope:

#### **Preview Variables** (for `preview` branch)
Add all development/test variables:
- Development database URL
- Clerk test keys
- Stripe test mode keys
- Test Resend key
- Preview APP_URL: `https://deployed-forward-git-preview-[...].vercel.app`

Select: ☑️ Preview

#### **Production Variables** (for `main` branch)
Add all production variables:
- Production database URL
- Clerk production keys
- Stripe live mode keys (when ready)
- Production Resend key
- Production APP_URL: `https://deployedforward.com`

Select: ☑️ Production

---

## Testing Workflow

### Feature Branch Testing

```bash
# Create feature branch
git checkout -b feature/new-course-ui

# Make changes
# ...

# Push
git push -u origin feature/new-course-ui
```

**Vercel will**:
- Build automatically
- Create preview URL: `https://deployed-forward-git-feature-new-course-ui-[...].vercel.app`
- Comment on PR with preview link

**You can**:
- Test on preview URL
- Share with team
- Run E2E tests against preview
- Iterate rapidly

### Preview Branch Testing

After merging to `preview`:

```bash
git checkout preview
git merge feature/new-course-ui
git push origin preview
```

**Vercel will**:
- Deploy to consistent preview URL
- This becomes your "staging" environment
- Test thoroughly before production

### Production Deployment

When `preview` is stable:

```bash
git checkout main
git merge preview
git push origin main
```

**Vercel will**:
- Deploy to production
- Zero-downtime deployment
- Automatic rollback if build fails

---

## GitHub Actions (Optional)

Add `.github/workflows/preview-test.yml`:

```yaml
name: Preview Tests
on:
  pull_request:
    branches: [preview, main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: cd web && npm ci
      - run: cd web && npm run lint
      - run: cd web && npm run build
      - run: cd web && npx playwright install --with-deps
      - run: cd web && npm run test:e2e
        env:
          PLAYWRIGHT_BASE_URL: ${{ secrets.PREVIEW_URL }}
```

This runs tests on every PR.

---

## Best Practices

### Commit Messages

Use conventional commits:
```
feat: add video support to lessons
fix: enrollment email not sending
docs: update deployment guide
chore: update dependencies
```

### PR Process

1. Create feature branch
2. Make changes
3. Test on preview URL
4. Create PR to `preview`
5. Get review (optional)
6. Merge to `preview`
7. Test on preview environment
8. When stable, PR from `preview` to `main`

### Database Migrations

**On Preview:**
```bash
# Preview database
DATABASE_URL="preview-url" npm run db:migrate
```

**On Production:**
```bash
# Production database
DATABASE_URL="production-url" npm run db:migrate
```

Always test migrations on preview first!

---

## Vercel Deployment Environments

### You'll Have

1. **Production** (`main` branch)
   - URL: `https://deployedforward.com` (or Vercel subdomain)
   - Database: Production Neon DB
   - Stripe: Test mode initially, then live mode
   - Stable, thoroughly tested

2. **Preview/Staging** (`preview` branch)
   - URL: `https://deployed-forward-git-preview-[...].vercel.app`
   - Database: Development Neon DB
   - Stripe: Test mode always
   - Integration testing environment

3. **Feature Previews** (any other branch)
   - URL: `https://deployed-forward-git-[branch-name]-[...].vercel.app`
   - Database: Development Neon DB (shared with preview)
   - Stripe: Test mode
   - Temporary, for testing features

---

## Quick Reference

### Check Current Branch
```bash
git branch
```

### Switch Branches
```bash
git checkout preview     # Switch to preview
git checkout main        # Switch to main
```

### Create Feature Branch
```bash
git checkout preview
git checkout -b feature/my-feature
```

### Push Changes
```bash
git add .
git commit -m "feat: description"
git push
```

### Merge to Preview
```bash
git checkout preview
git merge feature/my-feature
git push origin preview
```

### Deploy to Production
```bash
git checkout main
git merge preview
git push origin main
```

---

## Emergency Rollback

### Via Vercel Dashboard
1. Go to Deployments
2. Find last working deployment
3. Click "..." → Promote to Production

### Via Git
```bash
git checkout main
git revert HEAD
git push origin main
```

---

## Branch Protection Rules (Recommended)

Set up in GitHub → Settings → Branches:

### For `main`:
- ☑️ Require pull request before merging
- ☑️ Require status checks to pass (if using CI)
- ☑️ Require conversation resolution
- ☑️ Include administrators

### For `preview`:
- ☑️ Require pull request (optional)
- ☑️ Require status checks to pass (optional)

---

## Summary

**Current State:**
- ✅ `main` branch - production-ready code
- ✅ `preview` branch - identical copy for testing
- ✅ Both pushed to GitHub
- ✅ Ready for Vercel import

**Workflow:**
1. Develop on `preview` or feature branches
2. Test on preview deployments
3. Merge to `main` when stable
4. Auto-deploys to production

**Benefits:**
- Safe testing environment
- No risk to production
- Easy rollbacks
- Automatic deployments
- Preview URLs for every change

---

**Next**: Import repository in Vercel and configure branch deployments!

---

Last Updated: Now
Status: ✅ Git workflow configured
Branches: main (production), preview (staging)

