# Hero Image Integration Options

The military training image shows tactical field training - perfect for Deployed Forward's brand.

---

## 🎯 **Recommended Approaches**

### **Option A: Full-Width Section Background** ⭐⭐⭐
Place image as background for "Learn by doing" section with dark overlay.

```tsx
<section className={styles.trainingSection}>
  <div className={styles.imageOverlay} />
  <Container>
    <h2>Tactical training for AI skills</h2>
    <p>Field-tested learning approach. No theory-only courses.</p>
  </Container>
</section>

// CSS
.trainingSection {
  background-image: url('/images/tactical-training.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}

.imageOverlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.85); /* Dark overlay */
}
```

**Pros:**
- Dramatic impact
- Maintains dark theme
- Tactical brand reinforcement

---

### **Option B: Split Hero Layout** ⭐⭐
Replace MOTHER terminal with this image on hero right side.

```
┌────────────────────────────────────────┐
│ Hero Text      │  Training Image       │
│                │  (shows screen        │
│ Start Learning │   + students)         │
└────────────────────────────────────────┘
```

**Pros:**
- Humanizes the learning experience
- Shows real training environment
- Connects tactical brand to education

**Cons:**
- Loses cool MOTHER terminal animation

---

### **Option C: "Our Approach" Section** ⭐⭐⭐ (Recommended)
Add new section after hero with image + text side-by-side.

```
┌─────────────────────────────────────────────┐
│  Image (50%)         │  Text (50%)          │
│  [Tactical Training] │  Field-Tested        │
│  [Field environment] │  Learning            │
│                      │                      │
│                      │  Our courses are     │
│                      │  designed like       │
│                      │  military training:  │
│                      │  - Clear objectives  │
│                      │  - Hands-on practice │
│                      │  - Measured outcomes │
└─────────────────────────────────────────────┘
```

**Pros:**
- Best of both worlds (keeps terminal)
- Image tells brand story
- Professional layout

---

### **Option D: Hero Background with Parallax** ⭐⭐
Use as faded background behind hero text.

```css
.hero {
  background-image: url('/images/tactical-training.jpg');
  background-attachment: fixed; /* Parallax */
  background-size: cover;
}

.hero::before {
  content: '';
  background: rgba(10, 10, 10, 0.92); /* Heavy dark overlay */
  inset: 0;
}
```

**Pros:**
- Subtle brand reinforcement
- Doesn't compete with content
- Parallax effect is engaging

**Cons:**
- Image not very visible

---

## 🎨 **My Recommendation: Option C**

Add a new **"Tactical Learning Approach"** section between hero and logo marquee:

```tsx
{/* Hero Section */}
<Hero ... />

{/* NEW: Tactical Approach */}
<section className={styles.approachSection}>
  <Container>
    <div className={styles.approachGrid}>
      <div className={styles.imageContainer}>
        <img src="/images/tactical-training.jpg" alt="..." />
      </div>
      <div className={styles.approachContent}>
        <h2>Field-tested learning approach</h2>
        <p>
          Our courses are designed like military training: 
          clear objectives, hands-on practice, and measured 
          outcomes. No fluff. No endless theory.
        </p>
        <ul>
          <li>✓ Mission-based curriculum</li>
          <li>✓ Real-world projects</li>
          <li>✓ Deployment-focused</li>
          <li>✓ Progress tracking</li>
        </ul>
      </div>
    </div>
  </Container>
</section>

{/* Logo Marquee */}
<LogoMarquee ... />
```

**Why this works:**
- ✅ Image gets prominent placement
- ✅ Tells brand story (tactical + education)
- ✅ Keeps MOTHER terminal
- ✅ Professional layout
- ✅ Humanizes the platform

---

## 🎬 **Optional Enhancements**

### **On Hover:**
- Slight zoom on image
- Border glow effect
- Caption overlay appears

### **Animation:**
- Fade in on scroll
- Parallax effect (image moves slower)
- Stats overlay on image

---

**Which option do you prefer? I recommend Option C (new section) to maximize impact while keeping the terminal!**

