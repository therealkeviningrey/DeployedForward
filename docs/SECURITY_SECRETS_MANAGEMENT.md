# Security & Secrets Management

## Overview
This document outlines how we prevent accidental exposure of secrets and sensitive credentials in our codebase.

---

## 🔒 What Was Implemented

### 1. Enhanced .gitignore
Updated to exclude all sensitive files:
```
# Environment files
.env
.env*.local
.env.production
!.env.example
env-preview.txt          # ← Added
env-production.txt       # ← Added
*.env.backup            # ← Added
secrets/                # ← Added
credentials/            # ← Added
```

### 2. .env.example Template
Created `.env.example` with placeholder values for all required environment variables.

**Usage:**
```bash
# 1. Copy the example file
cp .env.example .env.local

# 2. Fill in your actual values
# Edit .env.local with real credentials
```

### 3. Pre-commit Hook (Secret Detection)
Located at `.husky/pre-commit`, this hook automatically scans staged files for:
- ✅ Stripe API keys (sk_test_, pk_test_, sk_live_, pk_live_)
- ✅ Database connection strings with credentials
- ✅ Resend API keys (re_*)
- ✅ Generic API keys
- ✅ Forbidden environment files (env-preview.txt, env-production.txt, .env.local, .env.production)

**How it works:**
```bash
# When you commit, the hook runs automatically
git commit -m "feat: new feature"

# If secrets are detected:
❌ ERROR: Stripe API key detected in staged files!
🚨 COMMIT BLOCKED: Secrets detected!

# If clean:
✅ No secrets detected. Proceeding with commit.
```

---

## 🚨 Current Secret Files (DO NOT COMMIT)

These files contain real secrets and **should never be committed**:

| File | Status | Contains |
|------|--------|----------|
| `.env` | ✅ Gitignored | Local development secrets |
| `.env.local` | ✅ Gitignored | Local overrides |
| `env-preview.txt` | ✅ Now gitignored | Staging environment secrets |
| `env-production.txt` | ✅ Now gitignored | Production secrets |

**Action Required:**
These files still exist locally but are now ignored by git. Keep them for reference but never commit them.

---

## 📋 Best Practices

### DO ✅

1. **Use .env.example for documentation**
   ```bash
   # Good: Document what's needed
   STRIPE_SECRET_KEY=sk_test_your_key_here
   ```

2. **Store real secrets in .env.local**
   ```bash
   # .env.local (gitignored)
   STRIPE_SECRET_KEY=sk_test_51Qhab...actual_key
   ```

3. **Use environment variables in code**
   ```typescript
   const stripeKey = process.env.STRIPE_SECRET_KEY;
   ```

4. **Use test keys for development**
   - Stripe: `sk_test_*` and `pk_test_*`
   - Use actual keys only in production

5. **Rotate exposed secrets immediately**
   - If a secret is pushed to GitHub, rotate it ASAP
   - GitHub Secret Scanning will alert you

### DON'T ❌

1. **Don't hardcode secrets in code**
   ```typescript
   // BAD ❌
   const apiKey = 'sk_test_51Qhab...';

   // GOOD ✅
   const apiKey = process.env.STRIPE_SECRET_KEY;
   ```

2. **Don't commit environment files with real values**
   ```bash
   # BAD ❌
   git add .env.local
   git add env-production.txt

   # GOOD ✅
   git add .env.example
   ```

3. **Don't store secrets in documentation**
   ```markdown
   <!-- BAD ❌ -->
   To test, use API key: sk_test_51Qhab...

   <!-- GOOD ✅ -->
   To test, use your Stripe test API key from .env.local
   ```

4. **Don't bypass the pre-commit hook** (unless absolutely necessary)
   ```bash
   # Avoid this
   git commit --no-verify
   ```

---

## 🔧 Setup Instructions

### Initial Setup (Already Done)
The pre-commit hook is already configured. No action needed.

### For New Team Members

1. **Clone the repository**
   ```bash
   git clone https://github.com/therealkeviningrey/DeployedForward.git
   cd DeployedForward
   ```

2. **Copy .env.example to .env.local**
   ```bash
   cp .env.example .env.local
   ```

3. **Get credentials** from:
   - Team lead or project manager
   - Password manager (1Password, LastPass, etc.)
   - Vercel environment variables (for staging/production)

4. **Fill in .env.local** with real values
   ```bash
   # Edit with your preferred editor
   nano .env.local
   # or
   code .env.local
   ```

5. **Verify the hook works**
   ```bash
   # Try to commit a test file with a fake secret
   echo "STRIPE_SECRET_KEY=sk_test_123" > test-secret.txt
   git add test-secret.txt
   git commit -m "test"

   # Should see:
   # ❌ ERROR: Stripe API key detected in staged files!

   # Clean up
   git reset HEAD test-secret.txt
   rm test-secret.txt
   ```

---

## 🛡️ GitHub Secret Scanning

GitHub has built-in secret scanning that blocks pushes containing secrets.

### What It Detects
- Stripe API keys (test and live)
- AWS credentials
- GitHub tokens
- Many other providers

### What To Do If Blocked

1. **Remove the secret from git history**
   ```bash
   # If in latest commit
   git reset HEAD~1
   # Remove the secret from files
   # Recommit
   ```

2. **Rotate the exposed secret**
   - Stripe: Generate new API keys in dashboard
   - Database: Change password
   - Other services: Follow their rotation procedures

3. **Allow the secret (ONLY for test keys)**
   - Click the link in the error message
   - Only do this for `sk_test_*` keys, never `sk_live_*`

---

## 📦 Environment-Specific Secrets

### Development (.env.local)
```bash
DATABASE_URL=postgresql://localhost:5432/dev_db
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Staging (Vercel Environment Variables)
```bash
DATABASE_URL=postgresql://...staging.neon.tech/...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=https://staging.deployedforward.com
```

### Production (Vercel Environment Variables)
```bash
DATABASE_URL=postgresql://...production.neon.tech/...
STRIPE_SECRET_KEY=sk_live_...  # ← Live keys only in production
NEXT_PUBLIC_APP_URL=https://deployedforward.com
```

---

## 🔍 Audit Checklist

Use this checklist before every deployment:

- [ ] All secrets in .env.local (not committed)
- [ ] .env.example is up to date with all required variables
- [ ] No hardcoded secrets in code
- [ ] Test keys used in development/staging
- [ ] Live keys only in production
- [ ] Pre-commit hook is active
- [ ] Team members have access to credentials
- [ ] Vercel environment variables are set correctly
- [ ] Database credentials are rotated quarterly
- [ ] API keys have appropriate scopes/permissions

---

## 🚀 Quick Commands

### Check for secrets in codebase
```bash
# Search for Stripe keys
grep -r "sk_test_" --exclude-dir=node_modules --exclude-dir=.git .

# Search for hardcoded passwords
grep -r "password.*=.*['\"]" --exclude-dir=node_modules --exclude-dir=.git .

# Check what's gitignored
git status --ignored
```

### Test the pre-commit hook
```bash
# Add a fake secret to a file
echo "API_KEY=sk_test_123456789" >> test.txt
git add test.txt
git commit -m "test"
# Should block the commit

# Clean up
git reset HEAD test.txt
rm test.txt
```

### Verify environment variables are loaded
```bash
# In Node.js console
node
> require('dotenv').config()
> console.log(process.env.STRIPE_SECRET_KEY ? 'Loaded' : 'Missing')
```

---

## 📚 Resources

### Tools
- **Husky**: Git hooks made easy
- **git-secrets**: AWS tool to prevent committing secrets
- **truffleHog**: Find secrets in git history
- **GitGuardian**: Real-time secret detection

### Documentation
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

### Emergency Contacts
- **GitHub Secret Leak**: Rotate immediately, check GitHub audit log
- **Stripe Key Leak**: Rotate in Stripe Dashboard → Developers → API keys
- **Database Leak**: Contact Neon support, rotate credentials

---

## 🎯 Success Metrics

### Before Implementation
- ❌ env-preview.txt and env-production.txt in git history
- ❌ No pre-commit hook
- ❌ No .env.example
- ❌ Secrets pushed to GitHub

### After Implementation
- ✅ Sensitive files gitignored
- ✅ Pre-commit hook blocking secrets
- ✅ .env.example with placeholders
- ✅ Documentation for team
- ✅ No secrets in codebase

---

**Last Updated:** 2025-11-15
**Owner:** Security Team
**Review Frequency:** Quarterly
