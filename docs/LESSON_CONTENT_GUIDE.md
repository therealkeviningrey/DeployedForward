# Lesson Content Writing Guide

## Overview

This guide helps you fill in the 26 lesson MDX templates created for the 3 flagship missions. Each template follows a proven structure designed to maximize learning outcomes and operational capability.

**Target Audience:** Operators (builders with ambition, minimal coding background)

**Writing Philosophy:** Field-tested. No fluff. Operational from day one.

---

## File Locations

All lesson files are located in:
```
content/lessons/
├── ai-landing-page-builder/
│   ├── setup-planning/
│   ├── building-with-ai/
│   └── deploy-launch/
├── ai-saas-dashboard/
│   ├── foundation-setup/
│   ├── dashboard-components/
│   ├── data-api-integration/
│   └── deploy-polish/
└── ai-email-automation/
    ├── email-system-setup/
    ├── template-design/
    ├── automation-workflows/
    └── analytics-optimization/
```

**Total:** 26 lesson files (7 + 10 + 9)

---

## Template Structure

Each lesson follows this structure:

```markdown
---
title: "Lesson Title"
duration: 20
---

# Lesson Title

## Learning Objectives
## Introduction
## Prerequisites
## Step 1-N: [Action Steps]
## Testing Your Work
## Common Issues & Solutions
## What You Built
## Next Steps
## Resources
## Challenge (Optional)
```

---

## Section-by-Section Writing Guide

### 1. Frontmatter

```yaml
---
title: "Deploy Your Landing Page to Vercel"
duration: 15
---
```

**Rules:**
- Title: Capitalize properly (not all caps)
- Duration: Realistic estimate in minutes
- Keep consistent with database records

---

### 2. Learning Objectives

**Purpose:** Set clear expectations for what the learner will accomplish.

**Format:**
```markdown
## Learning Objectives

By the end of this lesson, you will be able to:

- [ ] Deploy a Next.js application to Vercel in under 5 minutes
- [ ] Connect a custom domain to your deployed site
- [ ] Configure environment variables for production
```

**Writing Guidelines:**
- Use action verbs: deploy, build, configure, implement, analyze
- Be specific with outcomes (not vague like "understand" or "learn about")
- 3-5 objectives per lesson
- Make them measurable/testable
- Use checkboxes so learners can track progress

**Bad Examples:**
- ❌ "Learn about deployment"
- ❌ "Understand how Vercel works"

**Good Examples:**
- ✅ "Deploy a production app to Vercel using GitHub integration"
- ✅ "Configure custom domain DNS records for your deployed site"

---

### 3. Introduction

**Purpose:** Hook the learner and explain why this matters in the real world.

**Structure:**
1. **Hook** (1 paragraph): Why this matters / Real-world context
2. **Overview** (1-2 paragraphs): What you'll build and the approach
3. **Deliverables** (bullet list): Concrete outcomes

**Example:**

```markdown
## Introduction

Every successful product needs to be live. Not on your local machine—live on the internet where users can access it. In this lesson, you'll deploy your landing page to Vercel, one of the fastest and most developer-friendly hosting platforms built by the creators of Next.js.

You'll learn the exact workflow professional developers use to ship projects: connect your GitHub repo, configure build settings, and deploy with a single `git push`. No DevOps degree required.

**What you'll accomplish:**
- Build: A production deployment pipeline with automatic previews
- Learn: CI/CD basics and how modern hosting actually works
- Deploy: Your landing page live at yourproject.vercel.app (and your custom domain)
```

**Tone:**
- Direct and practical (not academic)
- Confidence-building (not intimidating)
- Focus on capability, not theory
- Use "you" language (not "we" or "one")

---

### 4. Prerequisites

**Purpose:** Ensure learners have what they need before starting.

**Format:**
```markdown
## Prerequisites

Before starting this lesson, make sure you have:

- ✅ Completed the "Building with AI" module
- ✅ A GitHub account (free)
- ✅ Your landing page code in a GitHub repository
- ✅ A Vercel account (free - sign up at vercel.com)
```

**Guidelines:**
- Use checkboxes for easy scanning
- Include previous lesson dependencies
- List required accounts/tools
- Link to sign-up pages if needed
- Keep prerequisites minimal (don't gatekeep)

---

### 5. Step-by-Step Instructions

**Purpose:** The core teaching content. Each step should be actionable.

**Structure per Step:**

```markdown
## Step 1: Connect GitHub to Vercel

[Brief explanation of what you're doing and why]

### Prompt for AI

\`\`\`
[Exact prompt to use with Claude/ChatGPT/Cursor]
\`\`\`

### Expected Output

[Show what the AI should generate]

\`\`\`typescript
// Example code here
\`\`\`

### What This Does

[Explain the code/output in plain English]
```

**Writing Guidelines:**

**Step Title:**
- Start with action verb
- Be specific about the outcome
- ✅ "Connect GitHub Repository to Vercel"
- ❌ "Setup Deployment"

**Explanation:**
- 1-2 paragraphs max
- Explain the "why" not just the "what"
- Relate to real-world developer workflows

**AI Prompt:**
- Write the EXACT prompt learners should use
- Include all necessary context
- Test the prompt yourself first
- Format as code block for easy copy-paste

**Expected Output:**
- Show the actual code/result they'll get
- Use syntax highlighting
- Keep code snippets focused (not entire files unless necessary)

**What This Does:**
- Explain in plain English what happened
- Connect to bigger concepts
- Answer "why does this matter?"
- Keep it brief (3-5 sentences)

**Example Step:**

```markdown
## Step 1: Create Vercel Account and Connect GitHub

Before deploying, you need a Vercel account linked to your GitHub. This gives Vercel permission to access your repositories and automatically deploy when you push code.

### Action Required

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

### What This Does

By connecting GitHub to Vercel, you're setting up a CI/CD pipeline. Every time you push code to your main branch, Vercel will automatically:
- Pull your latest code
- Build your project
- Deploy to production
- Generate a preview URL

This is the same workflow used at companies like Airbnb, Netflix, and thousands of startups.
```

**Number of Steps:**
- 3-6 major steps per lesson
- Break down complex tasks into smaller steps
- Use sub-steps (1a, 1b) if needed for clarity

---

### 6. Testing Your Work

**Purpose:** Give learners confidence that their implementation works.

**Format:**

```markdown
## Testing Your Work

Now let's verify everything works correctly:

1. **Test Deployment URL:**
   - Open your Vercel deployment URL
   - Expected: Site loads without errors
   - Check: All images and links work

2. **Test Responsive Design:**
   - Open DevTools (F12)
   - Toggle device toolbar
   - Expected: Layout adapts to mobile/tablet/desktop

3. **Test Custom Domain:**
   - Visit your custom domain
   - Expected: Site loads with SSL (https://)
   - Check: No redirect loops or errors
```

**Guidelines:**
- 3-5 concrete tests
- Use "Test X" format for clarity
- Include expected results
- Make tests specific and measurable
- Order from basic to advanced

---

### 7. Common Issues & Solutions

**Purpose:** Preempt frustration by addressing known problems.

**Format:**

```markdown
## Common Issues & Solutions

### Issue 1: "Build Failed" Error

**Symptom:** Vercel build fails with "Module not found" error

**Solution:** Missing dependency in package.json

\`\`\`bash
# Add the missing package
npm install [package-name]

# Commit and push
git add package.json package-lock.json
git commit -m "fix: add missing dependency"
git push
\`\`\`

### Issue 2: Environment Variables Not Working

**Symptom:** API calls fail in production but work locally

**Solution:** Environment variables must be added in Vercel dashboard

1. Go to Project Settings → Environment Variables
2. Add your variables (e.g., API_KEY)
3. Redeploy from Deployments tab
```

**Guidelines:**
- 3-5 common issues per lesson
- Use "Symptom" + "Solution" structure
- Include exact error messages learners will see
- Provide copy-paste commands when possible
- Test these yourself during development

**Where to Find Issues:**
- Your own experience writing the lesson
- Community forums (Stack Overflow, Reddit)
- GitHub issues for tools you're teaching
- Ask AI: "What are common errors when [doing task]?"

---

### 8. What You Built

**Purpose:** Celebrate progress and reinforce learning.

**Format:**

```markdown
## What You Built

🎉 Congratulations! You just built:

- ✅ A production deployment pipeline with automatic previews
- ✅ A live landing page accessible worldwide
- ✅ Custom domain with SSL certificate (https)
- ✅ The foundation for continuous deployment

### Live Demo

**Your deployed site:** [Your Vercel URL]

**Example:** [deployedforward.com](https://deployedforward.com)

---

Try sharing your link in the community Discord! 🚀
```

**Guidelines:**
- Use checkboxes to show accomplishments
- Include a live example if possible
- Encourage community sharing
- Keep tone celebratory but professional

---

### 9. Next Steps

**Purpose:** Create momentum and link to the next lesson.

**Format:**

```markdown
## Next Steps

In the next lesson, you'll learn:

- How to add a custom contact form with email notifications
- Connecting to a backend API for form submissions
- Setting up analytics to track visitor behavior

**Next Lesson:** [Building a Contact Form](/lessons/contact-form)
```

**Guidelines:**
- Preview 2-3 topics from next lesson
- Create curiosity/excitement
- Link to next lesson
- Keep it brief (2-4 bullets)

---

### 10. Resources

**Purpose:** Provide additional learning materials and documentation.

**Format:**

```markdown
## Resources

**Documentation:**
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

**Community:**
- [Deployed Forward Discord](https://discord.gg/deployedforward)
- [Vercel Community Forum](https://github.com/vercel/vercel/discussions)

**Tools:**
- [Vercel CLI](https://vercel.com/docs/cli)
- [GitHub Actions for CI/CD](https://docs.github.com/en/actions)

**Further Reading:**
- [The Twelve-Factor App](https://12factor.net/)
- [How CDNs Work](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)
```

**Guidelines:**
- Categorize links (Documentation, Community, Tools)
- Link to official docs first
- Include Deployed Forward community links
- Add "Further Reading" for curious learners
- Keep list curated (5-8 links max)

---

### 11. Challenge (Optional)

**Purpose:** Provide stretch goals for advanced learners.

**Format:**

```markdown
## Challenge (Optional)

Want to level up? Try these enhancements:

1. **Easy:** Add a custom 404 error page
   - Hint: Create `pages/404.js` in your Next.js project
   - Test by visiting a non-existent route

2. **Medium:** Set up preview deployments for pull requests
   - Hint: Enable "Deployment Protection" in Vercel settings
   - Create a PR to test

3. **Hard:** Implement A/B testing with Vercel Edge Functions
   - Hint: Use Edge Middleware to split traffic
   - Track conversions with analytics

Share your results in the community! 🚀
```

**Guidelines:**
- 3 challenges: Easy, Medium, Hard
- Provide hints (not full solutions)
- Make challenges practical (not theoretical)
- Encourage community sharing
- Keep challenges relevant to the lesson

---

## Writing Style Guide

### Voice & Tone

**DO:**
- ✅ Write like you're mentoring a friend
- ✅ Use "you" language (second person)
- ✅ Be direct and practical
- ✅ Celebrate progress
- ✅ Acknowledge when things are complex

**DON'T:**
- ❌ Use academic/textbook language
- ❌ Say "we" unless referring to the Deployed Forward team
- ❌ Oversimplify or patronize
- ❌ Use jargon without explanation
- ❌ Be overly formal

**Examples:**

❌ Bad: "One might encounter difficulties when attempting to configure the deployment environment."

✅ Good: "You'll configure your deployment settings. This can be tricky the first time, but we'll walk through each setting."

---

### Technical Accuracy

**Guidelines:**
- Test every command yourself
- Verify all links work
- Use current versions of tools (not outdated tutorials)
- Update date-sensitive content (e.g., "as of 2024")
- Include screenshots if UI changes frequently

**Version Management:**
```markdown
<!-- Include version info when relevant -->
This lesson uses Next.js 14 and Node.js 18+.
```

---

### Code Examples

**Best Practices:**
- Use syntax highlighting: \`\`\`typescript, \`\`\`bash, \`\`\`json
- Keep code snippets focused (not entire files)
- Add comments for complex sections
- Show before/after when editing code
- Include file paths: `// app/layout.tsx`

**Example:**

```markdown
Update your configuration:

\`\`\`typescript
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
\`\`\`
```

---

### AI Prompts

Writing effective AI prompts is critical. Follow this structure:

**Anatomy of a Good Prompt:**

```markdown
### Prompt for AI

\`\`\`
Context: I'm building a landing page for a SaaS product in Next.js 14.

Task: Create a hero section component with the following requirements:
- Full-width background gradient (dark blue to purple)
- Centered headline and subheadline
- CTA button linking to /signup
- Responsive design (mobile-first)

Style: Use Tailwind CSS
Tech Stack: React, TypeScript, Next.js 14

Please provide the complete component code with TypeScript types.
\`\`\`
```

**Prompt Structure:**
1. **Context:** What you're building
2. **Task:** Specific request
3. **Requirements:** Detailed specs (bullets)
4. **Style/Tech:** Tools to use
5. **Output format:** What you want back

**Test Your Prompts:**
- Copy-paste into Claude/ChatGPT yourself
- Verify the output is what you expect
- Iterate if needed
- Include the actual working prompt in the lesson

---

## Content Development Workflow

### 1. Preparation Phase

Before writing a lesson:

- [ ] Complete the lesson yourself manually
- [ ] Document exact commands you ran
- [ ] Screenshot important UI steps
- [ ] Note errors you encountered
- [ ] Test AI prompts multiple times
- [ ] Identify 3-5 common issues

### 2. Writing Phase

- [ ] Fill in the template section by section
- [ ] Don't skip sections (even Resources)
- [ ] Keep tone consistent with brand voice
- [ ] Test all links and code examples
- [ ] Add appropriate code syntax highlighting

### 3. Review Phase

- [ ] Read lesson aloud (catches awkward phrasing)
- [ ] Have someone test the lesson cold (no prior knowledge)
- [ ] Check technical accuracy
- [ ] Verify all commands work
- [ ] Test on both Mac and Windows if applicable
- [ ] Proofread for typos/grammar

### 4. Polish Phase

- [ ] Add screenshots/diagrams if helpful
- [ ] Optimize for skimmability (headings, bullets, bold)
- [ ] Check lesson duration is accurate
- [ ] Add challenge exercises
- [ ] Include 2-3 relevant resources

---

## Mission-Specific Guidelines

### Mission 1: AI Landing Page Builder

**Target Learner:** Complete beginner, may have never coded before

**Emphasis:**
- Visual results (lots of browser screenshots)
- Copy-paste ready prompts
- Celebrate quick wins
- Explain web development basics
- Show before/after comparisons

**Tone:** Encouraging, step-by-step, visual

**Example Topics:**
- HTML/CSS basics (explain tags, classes)
- Browser DevTools intro
- Git basics (explain commits, branches)
- Deployment fundamentals

---

### Mission 2: AI-Powered SaaS Dashboard

**Target Learner:** Completed Mission 1 or has basic web dev experience

**Emphasis:**
- Full-stack concepts
- Database relationships
- API design patterns
- Authentication flows
- Real-world architecture

**Tone:** Professional, build-focused, practical

**Example Topics:**
- Next.js App Router conventions
- Prisma schema design
- API route patterns
- Environment variables
- State management

---

### Mission 3: AI Email Marketing Automation

**Target Learner:** Has coding experience, wants to automate marketing

**Emphasis:**
- Business logic
- Email deliverability
- Cron jobs and scheduling
- A/B testing methodology
- Analytics and metrics

**Tone:** Growth-focused, data-driven, automation

**Example Topics:**
- Email HTML best practices
- Transactional vs marketing emails
- Webhook integrations
- Rate limiting and queues
- Tracking pixels and analytics

---

## Quality Checklist

Before submitting a lesson, verify:

### Content Quality
- [ ] All objectives are achievable
- [ ] Steps are clear and actionable
- [ ] AI prompts have been tested
- [ ] Code examples work as shown
- [ ] Common issues are accurate

### Technical Accuracy
- [ ] All commands run successfully
- [ ] Links are not broken
- [ ] Code has correct syntax
- [ ] Tool versions are current
- [ ] Prerequisites are complete

### Readability
- [ ] Lesson flows logically
- [ ] Tone is consistent
- [ ] Language is clear (not jargon-heavy)
- [ ] Duration estimate is realistic
- [ ] Formatting is clean

### Completeness
- [ ] All template sections filled
- [ ] Resources are relevant
- [ ] Next steps preview next lesson
- [ ] Challenge exercises included
- [ ] Celebration section complete

---

## Example: Complete Lesson Walkthrough

See `content/lessons/ai-landing-page-builder/deploy-launch/deploying-to-vercel.mdx` for a fully written example demonstrating all best practices.

---

## Getting Help

**Questions?**
- Post in the #content-team channel
- Review previously written lessons for examples
- Ask AI: "How should I explain [concept] to a beginner?"

**Tools:**
- Grammarly (for grammar/spelling)
- Hemingway Editor (for readability)
- Claude/ChatGPT (for content generation)

**Content Lead:** [Your Name]

---

## Lesson Writing Priorities

### Phase 1: High-Priority Lessons (Complete First)

**Mission 1: AI Landing Page Builder**
1. Welcome to AI Landing Pages (Module 1, Lesson 1)
2. Prompting for HTML and CSS (Module 2, Lesson 1)
3. Deploying to Vercel (Module 3, Lesson 1)

**Mission 2: AI-Powered SaaS Dashboard**
1. Project Architecture Planning (Module 1, Lesson 1)
2. Setting Up Next.js with AI (Module 1, Lesson 2)
3. Deploying Your Full-Stack App (Module 4, Lesson 2)

**Mission 3: AI Email Marketing Automation**
1. Choosing Your Email Service Provider (Module 1, Lesson 1)
2. Setting Up Resend API (Module 1, Lesson 2)
3. Building a Welcome Email Sequence (Module 3, Lesson 1)

**Rationale:** First lessons in each module + final deployment lessons create a complete "skeleton" for each mission.

### Phase 2: Core Content (Complete Second)

Fill in remaining lessons in mission order:
1. Mission 1 (AI Landing Page Builder) - All remaining
2. Mission 2 (AI SaaS Dashboard) - All remaining
3. Mission 3 (AI Email Automation) - All remaining

---

## Success Metrics

A great lesson should achieve:

- **Completion Rate:** >80% of students finish
- **Time on Page:** Matches duration estimate ±20%
- **Support Tickets:** <5% of students need help
- **Student Rating:** 4.5+ stars (future metric)
- **Reusable Code:** Students can apply to their own projects

**Track:**
- Which sections students skip
- Where students get stuck (check support tickets)
- Time to complete vs estimated duration
- Student feedback and ratings

---

## Appendix: Markdown Reference

Quick reference for MDX formatting:

```markdown
# H1 Heading
## H2 Heading
### H3 Heading

**Bold text**
*Italic text*
~~Strikethrough~~

- Bullet list
- Item 2

1. Numbered list
2. Item 2

[Link text](https://url.com)

![Image alt text](/path/to/image.png)

\`inline code\`

\`\`\`typescript
// Code block
const example = "syntax highlighting";
\`\`\`

> Blockquote

---
Horizontal rule
---

| Table | Header |
|-------|--------|
| Cell  | Cell   |

- [ ] Checklist item
- [x] Completed item
```

---

**Document Version:** 1.0
**Last Updated:** November 2024
**Status:** ✅ Ready to use

Happy writing! 🚀
