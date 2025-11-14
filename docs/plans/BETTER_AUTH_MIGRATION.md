# Better Auth Migration Plan

## Objectives
- Eliminate Clerk subscription costs while keeping social login, MFA, and organization features.
- Own all auth data in our Postgres database using Better Auth's TypeScript framework.
- Minimize downtime and avoid breaking protected routes, enrollment flows, or billing during the transition.

## Scope Overview
1. Introduce Better Auth alongside Clerk (dual stack) to validate parity.
2. Migrate user data, sessions, and organization roles from Clerk to our database.
3. Swap UI, middleware, and API handlers to use Better Auth exclusively.
4. Remove Clerk packages, environment variables, and schema dependencies.

## Feature Mapping
| Current (Clerk) | Replacement (Better Auth) | Notes |
| --- | --- | --- |
| `ClerkProvider`, `SignedIn`, `UserButton`, hosted UI | Better Auth Next.js adapter + custom React components | We render our own login/signup and header controls using session hooks. |
| `auth()` (server), `clerkMiddleware`, role checks | `auth()` exported from Better Auth config + Next.js middleware | Also leverage `organization()` plugin for admin role parity. |
| Social OAuth (Google, GitHub, etc.) | Built-in OAuth providers | Configure identical provider list in `auth.ts`. |
| Email/password login, invites | `emailAndPassword` + `organization()` modules | Continue sending onboarding emails via Resend. |
| MFA | `twoFactor()` plugin | Enforce for admin users and optionally all users. |
| User profile sync via Clerk API | Prisma-backed Better Auth user store | Replace `clerkId` references with Better Auth user IDs. |

## Phased Execution
### Phase 1 – Foundation (Dual Stack)
- Add `better-auth` dependency and create `auth.ts` configuration with `emailAndPassword`, `organization()`, `twoFactor()`, and OAuth providers.
- Generate Prisma migrations for Better Auth models (`Account`, `Session`, `VerificationToken`, `Organization`, etc.) and add `legacyClerkId` + `role` to our `User` model.
- Implement Better Auth middleware wrappers while keeping Clerk live.
- Replace `ClerkProvider` with a feature-flag-driven provider that can swap between Clerk and Better Auth during testing.

### Phase 2 – UI & API Migration
- Rebuild login page, header auth controls, and any conditional rendering components to consume Better Auth session hooks.
- Update server components and API routes (`auth()` calls) to use Better Auth helpers.
- Refactor `lib/users.ts` to load from Prisma directly (no external Clerk API call).
- Add automated tests covering protected routes (`/dashboard`, `/admin/**`, enrollment APIs).

### Phase 3 – Data Migration & Cut-over
- Export Clerk users, map to new schema, and send password setup / magic-link emails.
- Migrate organization memberships and admin role designations.
- Switch feature flag to make Better Auth the primary provider in staging, run regression tests, then deploy to production.
- Remove Clerk env variables once production confirms stable sign-in.

### Phase 4 – Cleanup & Hardening
- Drop `clerkId` column after verifying no lingering references.
- Delete Clerk packages and code paths.
- Document operational procedures for Better Auth (rotating secrets, adding providers, running migrations).
- Enable optional security enhancements (passwordless, enforced MFA) as follow-up work.

## Testing Strategy
- Automated Playwright flows: login, dashboard access, course enrollment, admin navigation, checkout success.
- Manual QA scripts for MFA enrollment/recovery, social OAuth sign-in, organization invitations.
- Monitoring: instrument auth failures and compare error baseline before/after cut-over.

## Rollback Plan
- Maintain Clerk configuration and database fields until post-cut-over verification passes.
- Feature flag allows swapping back to Clerk if blocking issues appear.
- Keep `legacyClerkId` data to reconcile users in case of partial migration.

## Open Questions
- Confirm exact social providers required on day one (current vs aspirational).
- Decide whether to force MFA for all users or only admins.
- Determine communication cadence for user password resets and expected support volume.


