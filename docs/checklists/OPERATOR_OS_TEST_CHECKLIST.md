# Operator OS - Testing Checklist

## Window Controls Testing

### ✅ Close Button (X)
**Expected Behavior:**
- Click the `[X]` button in window title bar
- Window should fade out and disappear
- Window state changes to `isOpen: false`
- Dock icon returns to inactive state (no orange dot)
- Click dock icon again to reopen window

**Test:**
1. Open "Mission Brief" window
2. Click `[X]` button
3. Verify window closes with fade animation
4. Click dock icon to reopen
5. Window should reopen at same position

---

### ✅ Minimize Button (-)
**Expected Behavior:**
- Click the `[-]` button in window title bar
- Window disappears instantly (hidden, not closed)
- Window state: `isOpen: true`, `isMinimized: true`
- Dock icon shows yellow/amber pulsing indicator
- Dock icon has reduced opacity (0.6)
- Click dock icon to restore window

**Test:**
1. Open "Feature Arsenal" window
2. Click `[-]` button
3. Verify window hides immediately
4. Check dock icon shows yellow pulsing dot
5. Click dock icon
6. Window should restore to same position

---

### ✅ Window Dragging
**Expected Behavior:**
- Click and hold title bar (anywhere between controls and status badge)
- Drag window to new position
- Cursor changes to "move"
- Window follows mouse smoothly
- Release to drop window
- Position persists if window is minimized/restored

**Test:**
1. Open any window
2. Click and drag title bar
3. Move window around desktop
4. Release mouse
5. Minimize window (-)
6. Restore from dock
7. Window should be in new dragged position

---

### ✅ Window Focus/Z-Index
**Expected Behavior:**
- Open multiple windows (they cascade with offset)
- Click any window body or title bar
- That window comes to front (highest z-index)
- All other windows stay behind

**Test:**
1. Open "Mission Brief", "Pricing", "Tech Stack" (3 windows)
2. They should cascade diagonally
3. Click on "Mission Brief" (first window)
4. It should jump to front
5. Click "Pricing"
6. It should jump to front

---

### ✅ Dock Icon Interactions
**Expected Behavior:**
- **Closed window:** Gray icon, no indicator → Click opens window
- **Open window:** Orange border, orange dot indicator → Click focuses window
- **Minimized window:** Dimmed icon, yellow pulsing dot → Click restores window

**Test:**
1. All windows closed: all icons gray
2. Click "Mission Brief" → opens, icon shows orange dot
3. Click "Pricing" → opens, icon shows orange dot
4. Click "Mission Brief" icon again → focuses that window (brings to front)
5. Minimize "Pricing" → icon shows yellow pulsing dot at reduced opacity
6. Click minimized icon → restores window

---

## Known Behaviors

### Window Positioning
- First window opens at: `x: 100, y: 80`
- Each subsequent window cascades: `+40px x, +40px y`
- Dragging updates position
- Position persists through minimize/restore cycle

### Z-Index Management
- Base z-index starts at 1000
- Each focus/open increments by 1
- No maximum z-index (infinite stacking)
- Clicking anywhere on window focuses it

### Animations
- **Open:** 200ms fade + scale + slide up
- **Close:** 150ms fade + scale + slide down
- **Content:** 100ms delay, then 200ms fade in
- Uses easing: `[0.16, 1, 0.3, 1]` (smooth ease-out)

---

## Quick Test Sequence

1. **Open 3 windows** from dock
2. **Drag** each to different positions
3. **Click** windows to test focus stacking
4. **Minimize** one window, verify yellow dot
5. **Restore** minimized window from dock
6. **Close** one window with X
7. **Reopen** closed window from dock
8. **Verify** position was preserved after reopen

---

## Mobile Notes (< 768px)

- Windows become fullscreen overlays
- No dragging on mobile
- One window visible at a time
- Dock remains functional at bottom



