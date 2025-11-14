# Documentation Index

This directory contains the living documentation for Deployed Forward. Files are grouped by purpose to make it easy to jump to the right reference.

## 📚 Available Guides

### Guidelines & Standards
- **[AGENTS.md](AGENTS.md)** – Repository conventions and operating guidelines for collaborators and AI agents
- **[GIT_WORKFLOW.md](GIT_WORKFLOW.md)** – Branching strategy and deployment workflow

### Deployment & Environments
- **[QUICK_START.md](QUICK_START.md)** – Fast 15-minute deployment guide for getting the site live on Vercel
- **[LAUNCH_GUIDE.md](LAUNCH_GUIDE.md)** – Comprehensive deployment guide covering all services
- **[DUAL_ENVIRONMENT_SETUP.md](DUAL_ENVIRONMENT_SETUP.md)** – Preview/production environment isolation checklist
- **[HOW_TO_IMPORT_ENV_VARS.md](HOW_TO_IMPORT_ENV_VARS.md)** – Importing environment variables into Vercel

### Product & Feature Guides
- **[AIHERO_CONVERSION_IMPLEMENTATION.md](AIHERO_CONVERSION_IMPLEMENTATION.md)** – Implementation plan for the AI hero conversion flow
- **[LESSON_CONTENT_GUIDE.md](LESSON_CONTENT_GUIDE.md)** – 400+ line playbook for writing MDX lesson content
- **[ONBOARDING_FLOW.md](ONBOARDING_FLOW.md)** – Breakdown of the student onboarding experience
- **[POSTHOG_OS_IMPLEMENTATION_PLAN.md](POSTHOG_OS_IMPLEMENTATION_PLAN.md)** – Analytics instrumentation plan
- **[TESTING_SETUP.md](TESTING_SETUP.md)** – Local, CI, and Playwright testing setup instructions
- **[COLOR_CONTRAST_AUDIT.md](COLOR_CONTRAST_AUDIT.md)** – WCAG accessibility audit results for the color system
- **[UI_UX_REVIEW_CHECKLIST.md](UI_UX_REVIEW_CHECKLIST.md)** – QA checklist for design and interaction reviews

### Checklists
- **[checklists/READY_TO_TEST.md](checklists/READY_TO_TEST.md)** – Verification steps before handing features to QA
- **[checklists/TESTING_CHECKLIST.md](checklists/TESTING_CHECKLIST.md)** – Comprehensive test coverage tracker (18 scenarios)
- **[checklists/OPERATOR_OS_TEST_CHECKLIST.md](checklists/OPERATOR_OS_TEST_CHECKLIST.md)** – Targeted checklist for Operator OS windows

### Reports & Milestones
- **[reports/CLEANUP_SUMMARY.md](reports/CLEANUP_SUMMARY.md)** – October 2025 codebase cleanup summary and impact
- **[reports/MISSION_STRUCTURE_COMPLETE.md](reports/MISSION_STRUCTURE_COMPLETE.md)** – Mission content scaffolding completion report
- **[reports/PHASE_1_COMPLETE.md](reports/PHASE_1_COMPLETE.md)** – Phase 1 delivery summary
- **[reports/PHASE_2A_COMPLETE.md](reports/PHASE_2A_COMPLETE.md)** – Phase 2A completion notes and follow-ups

### Roadmaps
- **[plans/BETTER_AUTH_MIGRATION.md](plans/BETTER_AUTH_MIGRATION.md)** – Plan to migrate authentication from Clerk to Better Auth while maintaining feature parity

### Migration Playbooks
- **[BETTER_AUTH_USER_MIGRATION.md](BETTER_AUTH_USER_MIGRATION.md)** – Step-by-step guide to migrate Clerk users and queue Better Auth reset emails
- **[BETTER_AUTH_STAGING_ROLLOUT.md](BETTER_AUTH_STAGING_ROLLOUT.md)** – Checklist for flipping staging/pre-production environments to Better Auth

## 🗂️ Recommended Reading Order

### New Deployments
1. Start with **QUICK_START.md** for rapid deployment.
2. Reference **LAUNCH_GUIDE.md** for detailed service configuration.
3. Use **DUAL_ENVIRONMENT_SETUP.md** plus **HOW_TO_IMPORT_ENV_VARS.md** to configure environments safely.

### Feature Delivery & QA
1. Review **AGENTS.md** and **GIT_WORKFLOW.md** for expectations.
2. Use the relevant guide from *Product & Feature Guides*.
3. Follow the appropriate checklist under *Checklists* before handing off to QA.
4. Consult *Reports & Milestones* when you need historical context or status summaries.

## 🧹 Maintenance

All documentation now lives inside `docs/`. Operational guides stay at the top level, reusable checklists sit under `docs/checklists/`, and historical status reports are archived under `docs/reports/`. Keep new documents organized using the same structure.

Last updated: November 14, 2025

