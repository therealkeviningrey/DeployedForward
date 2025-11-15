# Better Auth User Migration

This guide explains how to migrate existing Clerk users into the new Better Auth tables and queue password reset emails so they can activate their Better Auth accounts.

## Prerequisites

- Completed database migrations (`npm run db:generate`).
- `CLERK_SECRET_KEY` available (used by the migration script to call the Clerk REST API).
- Optional: set `CLERK_API_BASE_URL` if you run Clerk on a custom domain.
- Optional: set `BETTER_AUTH_RESET_REDIRECT` to override the reset CTA target (defaults to `${NEXT_PUBLIC_APP_URL}/login`).

## 1. Seed Better Auth Tables from Clerk

Run the migration script to mirror Clerk users into the new Better Auth tables. This script is idempotent—feel free to re-run it.

```bash
npm run auth:migrate-users
```

What the script does:

1. Fetches all Clerk users via the REST API (batched at 100 per request).
2. Upserts `AuthUser` rows with matching Clerk IDs, names, avatars, and verification status.
3. Ensures a corresponding `User` record exists and links it via `appUserId`.

> ℹ️ The script paginates automatically. Progress is printed as users are processed.

## 2. Issue Password Reset Emails

After the new tables are populated, queue reset emails so users can set a Better Auth password. Run in **dry-run** mode first to preview recipients.

```bash
# Preview recipients (no email sent)
npm run auth:send-reset-emails -- --dry-run

# Send reset emails
npm run auth:send-reset-emails
```

The script leverages the Better Auth API, which creates reset tokens and sends messages via `sendPasswordResetEmail`. Emails default to the login page as the callback.

## 3. Validate Migration

1. Spot-check `AuthUser` rows and ensure `appUserId` is populated.
2. Log in as a migrated user after completing the password reset to verify the session.
3. Confirm reset emails land in inboxes and the CTA link resolves correctly.

## 4. Post-Migration

Once all users are migrated and have reset their passwords:

- Switch `AUTH_PROVIDER` to `better-auth` in the target environment.
- Populate the `ADMIN_EMAILS` allowlist with the accounts that need `/admin` access.
- Redeploy the app (Preview first, then Production).
- Monitor logs/analytics for sign-in failures and be ready to re-queue resets if needed.
- Communicate the change to your users (consider an announcement email or changelog entry).

Keep this checklist handy; it complements the broader rollout plan in `docs/plans/BETTER_AUTH_MIGRATION.md`.

