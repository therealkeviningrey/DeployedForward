# Onboarding Flow Documentation

## Overview

The onboarding flow is a 4-step wizard that guides new users through their first experience with Deployed Forward, helping them:
1. Understand what the platform offers
2. Choose their first mission/course
3. Set their learning schedule preference
4. Get started with clear next steps

## When It Appears

The onboarding modal automatically appears for users who:
- ✅ Have completed sign-up (authenticated)
- ✅ Have NOT completed onboarding (`onboardingCompletedAt` is `null`)
- ✅ Have NOT enrolled in any courses yet

## Flow Structure

### Step 1: Welcome
**Purpose:** Orient the user to the platform's value proposition

**Content:**
- Personalized greeting with user's name
- Three key value propositions:
  - 🚀 Build real projects (72 hours, not 6 months)
  - 🤖 AI-assisted development
  - 🎯 24+ hands-on missions

**User Actions:**
- "Let's go →" (Continue to step 2)
- "Skip tour" (Complete onboarding, close modal)
- ESC key (Skip onboarding)

**Analytics tracked:**
- `onboarding_started`
- `onboarding_step_viewed` (step: 1, step_name: 'Welcome')

---

### Step 2: Choose Your First Mission
**Purpose:** Help user pick a relevant starting point

**Content:**
- Radio button list of up to 3 published courses
- Each course shows:
  - Title
  - Description
  - Level badge (Operator/Unit/Battalion)
- If no courses published: Friendly message to check back soon

**User Actions:**
- Select a course (optional - can proceed without selecting)
- "← Back" (Return to step 1)
- "Continue →" (Proceed to step 3)

**Analytics tracked:**
- `onboarding_step_viewed` (step: 2, step_name: 'Choose Mission')
- `onboarding_course_selected` (course_slug: selected course)

---

### Step 3: Set Your Learning Pace
**Purpose:** Establish expectations and commitment level

**Content:**
- Three learning pace options:
  - 🔥 Daily learner (15-30 min/day)
  - 📅 Weekly sprints (1-2 hours on weekends)
  - ⚡ Flexible schedule (own pace)
- Pre-selected: "Daily learner"

**User Actions:**
- Select learning goal (required, but pre-selected)
- "← Back" (Return to step 2)
- "Continue →" (Proceed to step 4)

**Analytics tracked:**
- `onboarding_step_viewed` (step: 3, step_name: 'Learning Pace')
- `onboarding_goal_selected` (goal: 'daily'|'weekly'|'flexible')

---

### Step 4: Get Started
**Purpose:** Motivate and direct user to take action

**Content:**
- Success celebration (🎯 emoji)
- Encouraging message about building to learn
- Pro tip: "Complete first 3 lessons to build momentum"

**User Actions:**
- "← Back" (Return to step 3)
- "Start mission →" (if course selected - redirects to course page)
- "Explore courses →" (if no course selected - goes to courses catalog)

**Analytics tracked:**
- `onboarding_step_viewed` (step: 4, step_name: 'Get Started')
- `onboarding_completed` (steps_completed, selected_course, learning_goal)

---

## Technical Implementation

### Database Schema

**User Model** (`prisma/schema.prisma`)
```prisma
model User {
  id                    String    @id @default(cuid())
  clerkId               String    @unique
  email                 String    @unique
  name                  String?
  onboardingCompletedAt DateTime? // Added field
  // ... other fields
}
```

### API Endpoint

**POST `/api/onboarding/complete`**

Marks the user's onboarding as complete by setting `onboardingCompletedAt` to current timestamp.

**Request:**
- No body required
- Requires authentication (Better Auth)

**Response:**
```json
{
  "success": true,
  "onboardingCompletedAt": "2025-10-28T12:34:56.789Z"
}
```

**Error Responses:**
- 401: Unauthorized (no Better Auth user ID)
- 500: Server error

### Components

**`OnboardingModal.tsx`**
- Client component (uses useState, useRouter)
- Props:
  - `open`: boolean - Controls modal visibility
  - `onComplete`: () => void - Callback when onboarding is completed/closed
  - `courses`: Course[] - Available courses to display
  - `userName`: string - User's name for personalization
- Features:
  - 4-step wizard with progress indicator
  - State management for step, selectedCourse, learningGoal
  - ESC key handler (skip on step 1)
  - Loading state during API call

**`DashboardOnboarding.tsx`**
- Client wrapper component
- Manages modal open/close state
- Delays modal appearance by 500ms (smooth page load)
- Tracks modal close event

**Dashboard Page** (`app/(site)/dashboard/page.tsx`)
- Server component
- Detects if onboarding should show:
  ```typescript
  const shouldShowOnboarding =
    !user.onboardingCompletedAt &&
    user.enrollments.length === 0;
  ```
- Fetches up to 5 published courses if onboarding needed
- Renders `DashboardOnboarding` component

---

## Analytics Events

All events are tracked using the centralized `analytics` utility (`lib/analytics.ts`).

### Events Tracked

| Event Name | When Fired | Properties |
|------------|-----------|-----------|
| `onboarding_started` | Modal opens | timestamp |
| `onboarding_step_viewed` | User views/navigates to a step | step (number), step_name (string) |
| `onboarding_course_selected` | User selects a course in step 2 | course_slug |
| `onboarding_goal_selected` | User selects learning pace in step 3 | goal ('daily', 'weekly', 'flexible') |
| `onboarding_completed` | User finishes onboarding | steps_completed, selected_course, learning_goal, timestamp |
| `onboarding_skipped` | User skips/dismisses onboarding | at_step (which step they were on) |

### Analytics Methods Added

```typescript
// lib/analytics.ts
analytics.trackOnboardingStarted()
analytics.trackOnboardingStepViewed(step, stepName)
analytics.trackOnboardingCourseSelected(courseSlug)
analytics.trackOnboardingGoalSelected(goal)
analytics.trackOnboardingCompleted(stepsCompleted, selectedCourse?, learningGoal?)
analytics.trackOnboardingSkipped(atStep)
```

---

## Key Metrics to Monitor

### Completion Metrics
- **Onboarding start rate:** % of new users who see the modal
- **Onboarding completion rate:** % who finish all 4 steps
- **Skip rate:** % who dismiss without completing
- **Skip by step:** Which step users bail at most

### Engagement Metrics
- **Course selection rate:** % who select a course in step 2
- **Learning goal distribution:** Daily vs. Weekly vs. Flexible
- **Time to first enrollment:** Days from signup to first course enrollment

### Conversion Metrics
- **Post-onboarding enrollment:** % who enroll within 24h of completing onboarding
- **Post-onboarding lesson completion:** % who complete at least 1 lesson within 7 days
- **Retained users:** % still active after 30 days (onboarding completed vs. skipped)

---

## A/B Testing Opportunities

Future experiments to consider:

1. **Step count:** 4 steps vs. 3 steps vs. 5 steps
2. **Pre-selection:** Pre-select recommended course vs. no pre-selection
3. **Skip availability:** Allow skip on all steps vs. only step 1
4. **Modal timing:** Show immediately vs. 500ms delay vs. after 5s idle
5. **Course presentation:** Grid vs. list vs. carousel
6. **Incentive:** Add "Complete onboarding, get bonus content" CTA

---

## User Experience Notes

### Design Decisions

**Progress Indicator at Top**
- Visual feedback of how far along user is
- Reduces abandonment by setting expectations

**Step 1 Skippable, Others Not**
- Users who understand platform can skip immediately
- Once engaged, encourage completion

**Pre-selected Learning Goal**
- Reduces friction (one less decision)
- Can proceed without changing selection

**Course Selection Optional**
- User can explore all courses instead
- Reduces pressure to commit immediately

**Pro Tip on Final Step**
- Reinforces actionable advice
- "First 3 lessons" is specific and achievable

---

## Edge Cases Handled

1. **No published courses:** Shows friendly message, allows proceeding
2. **API failure:** Still closes modal and marks complete locally
3. **User closes tab:** Onboarding will reappear on next visit (not marked complete)
4. **User has enrollments:** Never shows (even if onboardingCompletedAt is null)
5. **ESC key:** Only works on step 1 (prevents accidental dismissal mid-flow)

---

## Testing Checklist

### Manual Testing
- [ ] Sign up as new user
- [ ] Verify onboarding appears on dashboard
- [ ] Complete all 4 steps with course selected
- [ ] Verify redirected to course page
- [ ] Verify onboarding doesn't reappear
- [ ] Test skipping at step 1 with ESC key
- [ ] Test "Skip tour" button
- [ ] Test back/next navigation
- [ ] Test with no published courses
- [ ] Test course selection tracking
- [ ] Test learning goal selection tracking

### Analytics Testing
- [ ] Verify `onboarding_started` fires when modal opens
- [ ] Verify `onboarding_step_viewed` fires for each step
- [ ] Verify `onboarding_course_selected` fires on course selection
- [ ] Verify `onboarding_goal_selected` fires on goal selection
- [ ] Verify `onboarding_completed` fires with correct properties
- [ ] Verify `onboarding_skipped` fires on skip with correct step number

### Database Testing
- [ ] Verify `onboardingCompletedAt` is set after completion
- [ ] Verify timestamp is accurate
- [ ] Verify onboarding doesn't show for users with `onboardingCompletedAt` set

---

## Files Modified/Created

### Created
- `/app/api/onboarding/complete/route.ts` - API endpoint
- `/components/OnboardingModal.tsx` - Main onboarding wizard
- `/components/DashboardOnboarding.tsx` - Client wrapper component
- `/docs/ONBOARDING_FLOW.md` - This documentation

### Modified
- `/prisma/schema.prisma` - Added `onboardingCompletedAt` to User model
- `/app/(site)/dashboard/page.tsx` - Integrated onboarding detection and component
- `/lib/analytics.ts` - Added onboarding tracking methods

---

## Future Enhancements

**Short-term (Phase 2):**
- Add email follow-up if onboarding skipped
- Show onboarding completion rate in admin dashboard
- A/B test different step content

**Medium-term (Phase 3):**
- Personalized course recommendations based on user profile
- Integration with user preferences/settings
- Onboarding quiz to assess skill level

**Long-term (Phase 4):**
- Multi-path onboarding (beginner vs. advanced)
- Video walkthrough option
- Interactive product tour (tooltips throughout platform)

---

## Support & Troubleshooting

### Common Issues

**Onboarding doesn't appear:**
1. Check user has no enrollments: `SELECT * FROM Enrollment WHERE userId = ?`
2. Check `onboardingCompletedAt` is null: `SELECT onboardingCompletedAt FROM User WHERE id = ?`
3. Check browser console for JavaScript errors
4. Verify courses are published: `SELECT * FROM Course WHERE published = true`

**Onboarding reappears after completion:**
1. Check API endpoint returned 200: Network tab in DevTools
2. Verify `onboardingCompletedAt` was set in database
3. Check for caching issues (hard refresh: Cmd+Shift+R)

**Analytics not tracking:**
1. Check browser console for `[Analytics]` logs (in development)
2. Verify analytics providers are loaded (PostHog, Segment, etc.)
3. Check `deployedForwardAnalytics.getEvents()` in browser console

---

**Status:** ✅ Implemented and ready for production

**Last Updated:** October 28, 2025
