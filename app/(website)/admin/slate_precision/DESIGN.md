# Design System Document: The Curated Lens

## 1. Overview & Creative North Star
This design system moves away from the "utility-first" clutter of traditional admin panels and toward **The Curated Lens**. Our North Star is a high-end editorial experience where data is not just "displayed"—it is presented with the gravity and precision of a luxury periodical. 

To break the "template" look, we leverage intentional asymmetry. We use expansive white space (breathing room) and a strict tonal hierarchy to guide the eye, rather than relying on heavy-handed containment. The interface should feel like a series of layered, frosted glass panes suspended in a deep, midnight environment.

---

## 2. Colors & Surface Architecture
The palette is rooted in a sophisticated deep-sea Slate and Zinc foundation, punctuated by soft, ethereal Rose and Amber for moments of critical intent.

### The "No-Line" Rule
Standard 1px solid borders are strictly prohibited for sectioning large layout areas. We define boundaries through **Tonal Transitions**. 
- A sidebar is not "bordered" from the main content; it sits on `surface-container-low` while the main stage occupies the `background`.
- This creates a seamless, infinite feel that removes visual noise and maximizes the impact of the data.

### Surface Hierarchy & Nesting
We treat the UI as a physical stack of materials.
- **Level 0 (Base):** `background` (#060e20) – The infinite void.
- **Level 1 (Sections):** `surface-container-low` (#06122d) – Large layout regions (e.g., Sidebars).
- **Level 2 (Active Cards):** `surface-container` (#05183c) – The primary workspace for widgets.
- **Level 3 (Popovers/Modals):** `surface-container-highest` (#00225a) – Elements that demand immediate focus.

### The "Glass & Gradient" Rule
Floating headers and navigation bars must utilize Glassmorphism. Use the `surface` color at 70% opacity with a `20px` backdrop-blur. 
- **Signature Polish:** For primary call-to-action elements, apply a subtle linear gradient from `primary` (#c4c7c9) to `primary_container` (#444749). This adds a metallic, premium depth that flat colors cannot achieve.

---

## 3. Typography
We utilize **Inter** as our typographic backbone, treated with an editorial eye for scale.

*   **Display Scale:** Use `display-md` (2.75rem) for high-level "At a Glance" metrics. This conveys authority.
*   **Headline Scale:** `headline-sm` (1.5rem) should be used for section titles, paired with a wide letter-spacing (+0.02em) to enhance the "premium" feel.
*   **Body & Labels:** `body-md` (0.875rem) is the workhorse. For secondary data labels, use `label-md` in `on_surface_variant` (#91aaeb) to create a clear visual hierarchy between "What the data is" and "What the value is."

**Editorial Note:** Do not center-align headers. Always flush-left to maintain a strong vertical "spine" throughout the dashboard.

---

## 4. Elevation & Depth
Depth in this system is achieved through light and layering, not shadows alone.

*   **The Layering Principle:** Place a `surface-container-lowest` (#000000) card inside a `surface-container-low` (#06122d) region to create a "recessed" look for inputs or secondary data.
*   **Ambient Shadows:** For floating elements (like dropdowns), use an extra-diffused shadow: `0px 20px 40px rgba(0, 0, 0, 0.4)`. The shadow color is never pure black, but a deep tint of our `surface` color to maintain a natural, atmospheric effect.
*   **The "Ghost Border" Fallback:** If a container requires a border for accessibility (e.g., in high-density data tables), use a "Ghost Border." Apply the `outline_variant` (#2b4680) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `on_primary` text, `md` (0.375rem) corner radius.
- **Secondary:** Transparent background with a `Ghost Border`. Text in `primary`.
- **Tertiary (Ghost):** No background or border. Text in `on_surface_variant`. Use for low-emphasis actions like "Cancel" or "View All."

### Analytics & Charts
- **Layout:** Remove all grid lines and axes borders. Use `outline_variant` at 10% opacity for horizontal markers only.
- **Colors:** Use `secondary` (#909fb4) for neutral data and `tertiary` (#ffb6be) for highlight trends. 
- **Interactivity:** Tooltips must use the Glassmorphism rule (70% opacity `surface` + blur).

### Inputs & Fields
- **Background:** `surface_container_lowest`.
- **States:** On focus, the border transitions from 0% opacity to 100% `outline`. 
- **Error State:** Use a soft glow. Instead of a thick red border, use a 1px `error` (#ee7d77) border and a `error_container` text label.

### Cards & Lists
- **The No-Divider Rule:** Forbid the use of line dividers between list items. Use 16px of vertical spacing (from the spacing scale) and a `surface` shift on hover to delineate items. This keeps the interface airy and "un-boxed."

---

## 6. Do’s and Don’ts

### Do
- **Do** embrace asymmetry. Allow a chart to take up 60% of the width while leaving the remaining 40% for a single, high-impact insight.
- **Do** use `tertiary` (#ffb6be) for "Alerts." It is a sophisticated rose/amber that signals attention without the "panic" of a bright red.
- **Do** use Lucide icons at a `1.25px` stroke weight. This matches the refinement of our typography.

### Don’t
- **Don’t** use 100% white (#FFFFFF) for text. Always use `on_surface` (#dee5ff) or `primary_fixed` to maintain the dark-mode's soft, high-end feel.
- **Don’t** use standard "Drop Shadows" on cards. Rely on background color shifts first.
- **Don’t** crowd the edges. Maintain a minimum of `2rem` (32px) padding on the outer container of the dashboard to ensure the content feels "curated" within the frame.