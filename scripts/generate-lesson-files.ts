/**
 * Generate MDX Files for All Lessons
 *
 * Creates content/lessons directory structure with MDX templates
 * for all 26 lessons across 3 missions
 */

import fs from 'fs';
import path from 'path';

// Lesson structure for all missions
const lessons = {
  'ai-landing-page-builder': {
    'setup-planning': [
      { slug: 'welcome-to-ai-landing-pages', title: 'Welcome to AI Landing Pages', duration: 10 },
      { slug: 'planning-your-landing-page', title: 'Planning Your Landing Page', duration: 15 },
    ],
    'building-with-ai': [
      { slug: 'prompting-for-html-and-css', title: 'Prompting for HTML and CSS', duration: 20 },
      { slug: 'adding-interactivity-with-javascript', title: 'Adding Interactivity with JavaScript', duration: 25 },
      { slug: 'styling-and-responsive-design', title: 'Styling and Responsive Design', duration: 20 },
    ],
    'deploy-launch': [
      { slug: 'deploying-to-vercel', title: 'Deploying to Vercel', duration: 15 },
      { slug: 'custom-domain-and-launch', title: 'Custom Domain and Launch', duration: 15 },
    ],
  },
  'ai-saas-dashboard': {
    'foundation-setup': [
      { slug: 'project-architecture-planning', title: 'Project Architecture Planning', duration: 15 },
      { slug: 'setting-up-nextjs-with-ai', title: 'Setting Up Next.js with AI', duration: 20 },
    ],
    'dashboard-components': [
      { slug: 'building-the-sidebar-navigation', title: 'Building the Sidebar Navigation', duration: 20 },
      { slug: 'creating-data-visualization-cards', title: 'Creating Data Visualization Cards', duration: 25 },
      { slug: 'interactive-charts-and-graphs', title: 'Interactive Charts and Graphs', duration: 30 },
    ],
    'data-api-integration': [
      { slug: 'setting-up-database-with-prisma', title: 'Setting Up Database with Prisma', duration: 25 },
      { slug: 'building-api-routes', title: 'Building API Routes', duration: 20 },
      { slug: 'connecting-frontend-to-backend', title: 'Connecting Frontend to Backend', duration: 25 },
    ],
    'deploy-polish': [
      { slug: 'authentication-with-clerk', title: 'Authentication with Clerk', duration: 20 },
      { slug: 'deploying-full-stack-app', title: 'Deploying Your Full-Stack App', duration: 25 },
    ],
  },
  'ai-email-automation': {
    'email-system-setup': [
      { slug: 'choosing-email-service-provider', title: 'Choosing Your Email Service Provider', duration: 15 },
      { slug: 'setting-up-resend-api', title: 'Setting Up Resend API', duration: 20 },
    ],
    'template-design': [
      { slug: 'designing-email-templates-with-ai', title: 'Designing Email Templates with AI', duration: 25 },
      { slug: 'responsive-email-best-practices', title: 'Responsive Email Best Practices', duration: 20 },
    ],
    'automation-workflows': [
      { slug: 'welcome-email-sequence', title: 'Building a Welcome Email Sequence', duration: 25 },
      { slug: 'trigger-based-automation', title: 'Trigger-Based Automation', duration: 30 },
      { slug: 'scheduling-and-cron-jobs', title: 'Scheduling and Cron Jobs', duration: 25 },
    ],
    'analytics-optimization': [
      { slug: 'tracking-email-performance', title: 'Tracking Email Performance', duration: 20 },
      { slug: 'ab-testing-and-optimization', title: 'A/B Testing and Optimization', duration: 25 },
    ],
  },
};

function createLessonMDX(courseSlug: string, moduleSlug: string, lesson: any): string {
  return `---
title: "${lesson.title}"
duration: ${lesson.duration}
---

# ${lesson.title}

## Learning Objectives

By the end of this lesson, you will be able to:

- [ ] Objective 1: [Add specific learning outcome]
- [ ] Objective 2: [Add specific learning outcome]
- [ ] Objective 3: [Add specific learning outcome]

---

## Introduction

[Add 2-3 paragraphs introducing the topic. Explain why this matters and what you'll build.]

**What you'll accomplish:**
- Build: [Specific deliverable]
- Learn: [Key concept or skill]
- Deploy: [Where/how it goes live]

---

## Prerequisites

Before starting this lesson, make sure you have:

- ✅ [Prerequisite 1]
- ✅ [Prerequisite 2]
- ✅ [Tool/account needed]

---

## Step 1: [First Major Step]

[Explain what you're doing in this step and why]

### Prompt for AI

\`\`\`
[Paste the exact prompt to use with Claude/ChatGPT/Cursor]

Example:
"Create a [specific thing] that [does what] with [these features]"
\`\`\`

### Expected Output

[Show what the AI should generate]

\`\`\`typescript
// Example code output
\`\`\`

### What This Does

[Explain the code/output in plain English]

---

## Step 2: [Second Major Step]

[Continue with next step...]

### Prompt for AI

\`\`\`
[Next prompt]
\`\`\`

### Implementation

[Code or instructions]

---

## Step 3: [Third Major Step]

[Continue pattern...]

---

## Testing Your Work

Now let's verify everything works:

1. **Test 1:** [What to test and expected result]
2. **Test 2:** [What to test and expected result]
3. **Test 3:** [What to test and expected result]

---

## Common Issues & Solutions

### Issue 1: [Common problem]

**Symptom:** [What goes wrong]

**Solution:** [How to fix it]

\`\`\`bash
# Commands to fix
\`\`\`

### Issue 2: [Another problem]

**Symptom:** [What goes wrong]

**Solution:** [How to fix it]

---

## What You Built

🎉 Congratulations! You just built:

- ✅ [Accomplishment 1]
- ✅ [Accomplishment 2]
- ✅ [Accomplishment 3]

### Live Demo

[Link to working example or deployed version]

---

## Next Steps

In the next lesson, you'll learn:

- [Preview of next lesson topic]
- [Another thing coming up]

---

## Resources

- [Link to documentation]
- [Link to example code]
- [Link to community forum]

---

## Challenge (Optional)

Want to level up? Try these enhancements:

1. **Easy:** [Simple enhancement]
2. **Medium:** [Moderate challenge]
3. **Hard:** [Advanced challenge]

Share your results in the community! 🚀
`;
}

function main() {
  console.log('📝 Generating MDX lesson files...\n');

  const baseDir = path.join(process.cwd(), 'content', 'lessons');

  // Create base directory if it doesn't exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  let totalFiles = 0;

  // Generate files for each course
  Object.entries(lessons).forEach(([courseSlug, modules]) => {
    console.log(`\n📦 Course: ${courseSlug}`);

    // Create course directory
    const courseDir = path.join(baseDir, courseSlug);
    if (!fs.existsSync(courseDir)) {
      fs.mkdirSync(courseDir, { recursive: true });
    }

    // Generate files for each module
    Object.entries(modules).forEach(([moduleSlug, lessonList]) => {
      console.log(`  📁 Module: ${moduleSlug}`);

      // Create module directory
      const moduleDir = path.join(courseDir, moduleSlug);
      if (!fs.existsSync(moduleDir)) {
        fs.mkdirSync(moduleDir, { recursive: true });
      }

      // Generate MDX file for each lesson
      lessonList.forEach((lesson) => {
        const filePath = path.join(moduleDir, `${lesson.slug}.mdx`);

        // Only create if file doesn't exist
        if (!fs.existsSync(filePath)) {
          const content = createLessonMDX(courseSlug, moduleSlug, lesson);
          fs.writeFileSync(filePath, content);
          console.log(`    ✅ ${lesson.slug}.mdx`);
          totalFiles++;
        } else {
          console.log(`    ⏭️  ${lesson.slug}.mdx (already exists)`);
        }
      });
    });
  });

  console.log(`\n✅ Generation complete!`);
  console.log(`📊 Total MDX files created: ${totalFiles}\n`);
}

main();
