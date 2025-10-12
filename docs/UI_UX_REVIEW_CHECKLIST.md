# UI/UX Review Checklist

**Local Site**: http://localhost:3001  
**Date**: October 12, 2025

---

## 📋 Pages to Review

### ✅ Marketing Pages

#### 1. **Homepage** (`/`)
- [ ] Hero section displays clearly with Pill component
- [ ] CTA buttons are prominent and styled correctly
- [ ] Trust row logos render
- [ ] KPI metrics display properly
- [ ] Dark theme is consistent throughout
- [ ] Typography hierarchy is clear
- [ ] Spacing feels balanced

#### 2. **Product Page** (`/product`)
- [ ] Features list is readable
- [ ] Code snippets render correctly
- [ ] Cards have proper hover states
- [ ] Icons/badges display

#### 3. **Pricing Page** (`/pricing`)
- [ ] Operator tier displays clearly
- [ ] Monthly/Annual toggle works (if implemented)
- [ ] CTA buttons are prominent
- [ ] FAQ accordion functions properly
- [ ] Pricing is clear and easy to understand

#### 4. **Programs/Missions** (`/programs/missions`)
- [ ] Mission cards display in grid
- [ ] Level badges are visible
- [ ] Duration info is clear
- [ ] Hover states work

#### 5. **Company Page** (`/company`)
- [ ] Team info displays
- [ ] Content is readable
- [ ] Layout is balanced

#### 6. **News** (`/news`)
- [ ] Article cards display
- [ ] Dates format correctly
- [ ] Grid layout works

### ✅ Platform Pages (Require Auth)

#### 7. **Courses Catalog** (`/courses`)
- [ ] Course cards display from database
- [ ] "AI Workflow Fundamentals" shows
- [ ] Duration and lesson count display
- [ ] Filter pills are styled correctly
- [ ] "Start Course" button is clear

#### 8. **Course Detail** (`/courses/ai-workflow-fundamentals`)
- [ ] Course title and description display
- [ ] Modules are listed
- [ ] Lessons show under each module
- [ ] Enroll button is prominent
- [ ] Progress indicators (if logged in)

#### 9. **Lesson Viewer** (`/courses/[slug]/lessons/[lessonSlug]`)
- [ ] MDX content renders properly
- [ ] Code blocks have syntax highlighting
- [ ] Navigation between lessons works
- [ ] Progress tracking updates
- [ ] Complete button is visible

#### 10. **Dashboard** (`/dashboard`)
- [ ] Requires login (redirects to `/login`)
- [ ] After login: shows enrolled courses
- [ ] Progress bars display
- [ ] Recent activity shows
- [ ] Quick actions are clear

#### 11. **Billing Page** (`/dashboard/billing`)
- [ ] Current plan displays
- [ ] Subscription status is clear
- [ ] Manage subscription button works
- [ ] Payment history (if Stripe configured)

---

## 🎨 Design System Check

### Typography
- [ ] Headings (h1, h2, h3, h4) have clear hierarchy
- [ ] Body text is readable (size, line-height)
- [ ] Font loading works (no flash of unstyled text)

### Colors
- [ ] Dark theme is consistent
- [ ] Accent colors (orange/blue) are used appropriately
- [ ] Text contrast is sufficient (WCAG AA minimum)
- [ ] Hover states are visible

### Components
- [ ] **Pill**: Rounded badges display correctly
- [ ] **Badge**: Level indicators are clear
- [ ] **Card**: Shadows, borders, hover states work
- [ ] **Button**: Primary, secondary, small variants work
- [ ] **Hero**: Centered, aligned properly
- [ ] **Container**: Content is centered and max-width applied
- [ ] **Header**: Logo, navigation, CTA button aligned
- [ ] **Footer**: Links organized, readable

### Layout
- [ ] Mobile responsive (test at 375px, 768px, 1440px)
- [ ] Grid layouts don't break
- [ ] Spacing is consistent (padding, margins)
- [ ] Content doesn't overflow containers

---

## 🔧 Functionality Check

### Navigation
- [ ] Header links work
- [ ] Footer links work
- [ ] Mobile menu (if implemented)
- [ ] Active states on current page

### Authentication
- [ ] Login button redirects to Clerk
- [ ] Sign up flow works
- [ ] Protected routes redirect to login
- [ ] Logout works
- [ ] User avatar/menu displays after login

### Database Integration
- [ ] Courses load from database (not hardcoded)
- [ ] Lesson content from MDX files
- [ ] Progress tracking saves

### Forms
- [ ] Contact form (`/company`) submits
- [ ] Validation messages display
- [ ] Success/error states clear

---

## 🐛 Common Issues to Look For

- [ ] **Smart quotes** causing encoding issues
- [ ] **Missing images** or broken logos
- [ ] **Console errors** (open DevTools)
- [ ] **Layout shifts** during page load
- [ ] **Flash of unstyled content** (FOUC)
- [ ] **Broken links** (404 pages)
- [ ] **Clerk errors** in console
- [ ] **Prisma/database errors**
- [ ] **Slow page loads** (check Network tab)

---

## 📸 Screenshots to Capture

Take screenshots of:
1. Homepage (full page)
2. Pricing page
3. Courses catalog
4. Course detail page
5. Lesson viewer (with MDX content)
6. Dashboard (logged in)
7. Mobile view (homepage, courses)

---

## 🎯 Priority Issues

After your review, list priority UI/UX issues here:

### Critical (Breaks functionality)
- 

### High (Poor UX)
- 

### Medium (Visual polish)
- 

### Low (Nice to have)
- 

---

**Next Steps**: Share screenshots or describe issues you find, and I'll help fix them!

