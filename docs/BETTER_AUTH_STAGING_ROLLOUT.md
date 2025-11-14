# Better Auth Staging Rollout Checklist

Follow this checklist when you are ready to flip staging (or any preview environment) from Clerk to Better Auth.

## 1. Prepare Environment Variables

1. Ensure the migration scripts have been executed (see `docs/BETTER_AUTH_USER_MIGRATION.md`).
2. In the staging environment, update the auth flags:

```
AUTH_PROVIDER=better-auth
NEXT_PUBLIC_AUTH_PROVIDER=better-auth
```

3. Keep legacy Clerk secrets only if you still need to run the migration script or plan for rollback.
4. Redeploy staging with the new variables.

## 2. Smoke Tests

After the deployment finishes:

- Run the automated suite locally or via CI:

```bash
npm run test:e2e
```

- Manual checks (staging URL):
  - Sign in with a migrated account (use the password reset email).
  - Navigate to `/dashboard`, enrol in a course, and verify progress tracking.
  - Hit `/admin` pages (ensure access pattern you expect still works).
  - Trigger a password reset from the login screen and confirm the email arrives.

## 3. Monitoring & Observability

- Watch application logs for `Better Auth` errors (middleware, API routes).
- Track analytics funnels for sign-in and checkout to spot drop-offs.
- If issues appear, revert `AUTH_PROVIDER` env vars to `clerk` and redeploy.

## 4. Promote to Production

When staging looks healthy:

1. Repeat the same environment variable changes in production.
2. Redeploy production.
3. Send a confirmation notice to users (optional) announcing the auth update.

Keep this doc handy when you’re ready to execute `staging-switch` and promote the change forward.

