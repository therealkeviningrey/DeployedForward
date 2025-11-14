# Onboarding Flow - Testing Checklist

## Pre-Testing Setup

### 1. Database Migration
- [ ] Run migration: `npx prisma migrate dev --name add_onboarding_completed_at`
- [ ] Verify `onboardingCompletedAt` field exists in User table
- [ ] Check migration applied: `npx prisma studio` → open Users table

### 2. Environment Check
- [ ] Development server is running: `npm run dev`
- [ ] Database is connected (check `.env.local` has correct `POSTGRES_PRISMA_URL`)
- [ ] Better Auth authentication is working

---

## Core Functionality Testing

### Test 1: New User Sees Onboarding
**Steps:**
1. Create new test account (or use incognito/private browsing)
2. Sign up through Better Auth
3. Navigate to `/dashboard`

**Expected Results:**
- ✅ Onboarding modal appears after ~500ms
- ✅ Step 1 (Welcome) is displayed
- ✅ Your name appears in greeting (or "Operator" if no name)
- ✅ Progress bar shows 1/4 filled
- ✅ "Let's go →" and "Skip tour" buttons visible

**Analytics Check:**
- Open browser console
- Should see: `[Analytics] onboarding_started`
- Should see: `[Analytics] onboarding_step_viewed` (step: 1)

---

### Test 2: Step 2 - Choose Mission
**Steps:**
1. From Step 1, click "Let's go →"

**Expected Results:**
- ✅ Step 2 appears (Choose your first mission)
- ✅ Progress bar shows 2/4 filled
- ✅ Course list displays (if you have published courses)
- ✅ OR "Courses will appear here" message (if no published courses)
- ✅ Can select a course with radio button
- ✅ "← Back" and "Continue →" buttons work

**Analytics Check:**
- Should see: `[Analytics] onboarding_step_viewed` (step: 2)
- Select a course, should see: `[Analytics] onboarding_course_selected` (course_slug: '...')

**Navigation Test:**
- Click "← Back" → Should return to Step 1
- Click "Continue →" again → Should return to Step 2

---

### Test 3: Step 3 - Learning Pace
**Steps:**
1. From Step 2, click "Continue →"

**Expected Results:**
- ✅ Step 3 appears (Set your learning pace)
- ✅ Progress bar shows 3/4 filled
- ✅ Three options visible: Daily learner, Weekly sprints, Flexible
- ✅ "Daily learner" is pre-selected
- ✅ Can select different option
- ✅ "← Back" and "Continue →" buttons work

**Analytics Check:**
- Should see: `[Analytics] onboarding_step_viewed` (step: 3)
- Change selection, should see: `[Analytics] onboarding_goal_selected` (goal: '...')

---

### Test 4: Step 4 - Get Started
**Steps:**
1. From Step 3, click "Continue →"

**Expected Results:**
- ✅ Step 4 appears (You're all set!)
- ✅ Progress bar shows 4/4 filled
- ✅ 🎯 emoji and success message visible
- ✅ Pro tip box displayed
- ✅ Button says "Start mission →" (if course selected) OR "Explore courses →"

**Analytics Check:**
- Should see: `[Analytics] onboarding_step_viewed` (step: 4)

---

### Test 5: Complete Onboarding
**Steps:**
1. From Step 4, click "Start mission →" (or "Explore courses →")

**Expected Results:**
- ✅ Loading state shown briefly ("Loading...")
- ✅ Modal closes smoothly
- ✅ Dashboard page remains (no hard reload)
- ✅ If course selected: Redirect to `/courses/{course-slug}`
- ✅ If no course: Redirect to `/courses`

**Analytics Check:**
- Should see: `[Analytics] onboarding_completed`
  - `steps_completed: 4`
  - `selected_course: 'course-slug'` (if selected)
  - `learning_goal: 'daily'` (or whatever was selected)

**Database Check:**
1. Open Prisma Studio: `npx prisma studio`
2. Go to User table
3. Find your test user
4. ✅ `onboardingCompletedAt` field should have a timestamp

---

### Test 6: Onboarding Doesn't Reappear
**Steps:**
1. After completing onboarding, refresh the dashboard page
2. Navigate away and come back to `/dashboard`

**Expected Results:**
- ✅ Onboarding modal does NOT appear
- ✅ Normal dashboard is shown

---

## Edge Case Testing

### Test 7: Skip Onboarding (ESC Key)
**Steps:**
1. Create another new test account
2. When onboarding appears at Step 1, press ESC key

**Expected Results:**
- ✅ Modal closes immediately
- ✅ `onboardingCompletedAt` is set in database
- ✅ Modal doesn't reappear on refresh

**Analytics Check:**
- Should see: `[Analytics] onboarding_skipped` (at_step: 1)

---

### Test 8: Skip Onboarding (Button)
**Steps:**
1. Create another new test account
2. Click "Skip tour" button at Step 1

**Expected Results:**
- ✅ Modal closes
- ✅ Same as Test 7

---

### Test 9: ESC at Other Steps (Should Not Skip)
**Steps:**
1. Create another new test account
2. Navigate to Step 2, 3, or 4
3. Press ESC key

**Expected Results:**
- ✅ Modal stays open (ESC only works at Step 1)
- ✅ User must use navigation buttons

---

### Test 10: No Published Courses
**Steps:**
1. Ensure no courses are published (set `published: false` in database)
2. Create new test account
3. View onboarding Step 2

**Expected Results:**
- ✅ Friendly message: "Courses will appear here once they're published"
- ✅ Can still click "Continue →"
- ✅ Flow continues normally

---

### Test 11: User Has Enrollments (No Onboarding)
**Steps:**
1. Use existing user who has enrollments
2. Reset their `onboardingCompletedAt` to null in database
3. Visit `/dashboard`

**Expected Results:**
- ✅ Onboarding does NOT appear (because user has enrollments)
- ✅ Normal dashboard shown

---

### Test 12: API Failure Handling
**Steps:**
1. Turn off development server (or block `/api/onboarding/complete`)
2. Complete onboarding flow through Step 4
3. Click "Start mission →"

**Expected Results:**
- ✅ Modal still closes (graceful failure)
- ✅ Error logged to console
- ✅ User can continue using the app

---

## Mobile Testing

### Test 13: Mobile Responsive
**Steps:**
1. Open Chrome DevTools
2. Toggle device toolbar (Cmd+Shift+M)
3. Test on iPhone 12, iPad Pro
4. Complete onboarding flow

**Expected Results:**
- ✅ Modal fits screen (no horizontal scroll)
- ✅ Text is readable (not too small)
- ✅ Buttons are easily tappable
- ✅ Progress bar visible and clear
- ✅ All steps work on mobile

---

## Analytics Verification

### Test 14: Check All Events Fire
**Steps:**
1. Complete full onboarding flow
2. Open browser console
3. Type: `deployedForwardAnalytics.getEvents()`

**Expected Events (in order):**
1. `onboarding_started`
2. `onboarding_step_viewed` (step: 1, step_name: 'Welcome')
3. `onboarding_step_viewed` (step: 2, step_name: 'Choose Mission')
4. `onboarding_course_selected` (course_slug: '...')
5. `onboarding_step_viewed` (step: 3, step_name: 'Learning Pace')
6. `onboarding_goal_selected` (goal: '...')
7. `onboarding_step_viewed` (step: 4, step_name: 'Get Started')
8. `onboarding_completed` (steps_completed: 4, selected_course: '...', learning_goal: '...')

---

## Performance Testing

### Test 15: Load Time
**Steps:**
1. Open Network tab in DevTools
2. Navigate to `/dashboard` as new user
3. Measure time until modal appears

**Expected Results:**
- ✅ Modal appears in 500-700ms (includes 500ms delay)
- ✅ No layout shift when modal appears
- ✅ Courses load quickly (if any published)

---

## Accessibility Testing

### Test 16: Keyboard Navigation
**Steps:**
1. Start onboarding
2. Use only keyboard (Tab, Enter, Arrow keys, ESC)

**Expected Results:**
- ✅ Can tab through all interactive elements
- ✅ Radio buttons work with arrow keys
- ✅ Enter key activates buttons
- ✅ ESC key works at Step 1
- ✅ Focus is visible on all elements

### Test 17: Screen Reader
**Steps:**
1. Enable VoiceOver (Mac: Cmd+F5)
2. Navigate through onboarding

**Expected Results:**
- ✅ Modal announced as "dialog"
- ✅ Progress bar announced
- ✅ All text is read correctly
- ✅ Buttons are identified as buttons
- ✅ Form inputs are labeled

---

## Database State Testing

### Test 18: Check Database Updates
**Steps:**
1. Open Prisma Studio: `npx prisma studio`
2. View User table
3. Complete onboarding for test user
4. Refresh User table

**Expected Results:**
- ✅ `onboardingCompletedAt` changes from null to timestamp
- ✅ Timestamp is current (within last minute)
- ✅ No other fields are modified

---

## Bug Hunting

### Common Issues to Check

**Issue: Modal doesn't appear**
- [ ] Check user has 0 enrollments
- [ ] Check `onboardingCompletedAt` is null
- [ ] Check browser console for errors
- [ ] Check published courses exist (optional, but helpful)

**Issue: Modal reappears after completion**
- [ ] Check API returned 200 status
- [ ] Check `onboardingCompletedAt` was set in database
- [ ] Clear cache and try again

**Issue: Analytics not tracking**
- [ ] Check console shows `[Analytics]` logs
- [ ] Check `deployedForwardAnalytics.getEvents()` returns events
- [ ] Verify analytics providers loaded (if using PostHog/Segment)

**Issue: Redirect doesn't work**
- [ ] Check course slug is correct
- [ ] Check course is published
- [ ] Check browser console for navigation errors

---

## Sign-Off Checklist

Before marking as complete:

- [ ] ✅ All 18 tests passed
- [ ] ✅ No console errors
- [ ] ✅ All analytics events fire correctly
- [ ] ✅ Database updates correctly
- [ ] ✅ Mobile responsive works
- [ ] ✅ Keyboard navigation works
- [ ] ✅ Performance is acceptable (<1s to appear)
- [ ] ✅ Ready for production deployment

---

## Post-Testing

### If All Tests Pass:
1. Document any issues found (and fixed)
2. Run migration in production: `npx prisma migrate deploy`
3. Deploy to production
4. Monitor analytics for first week

### If Tests Fail:
1. Document failing tests
2. Debug and fix issues
3. Re-run tests
4. Repeat until all pass

---

**Testing Started:** ___________
**Testing Completed:** ___________
**Tested By:** ___________
**Status:** ⬜ Pass | ⬜ Fail | ⬜ Needs Fixes
