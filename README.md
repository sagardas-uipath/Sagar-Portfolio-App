# Sagar Das — Portfolio

React · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide · Vite

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # type-check + production build into dist/
```

## Editing content
All copy lives in **`src/data/portfolio.ts`** (profile, about, experience, expertise, projects, certifications, contact).

Replace the `TODO` placeholders: `contact.email`, `contact.linkedin`, and certification `credentialId` / `verifyUrl` (empty fields are hidden).

Optional: set `VITE_CONTACT_ENDPOINT` in `.env` (e.g. Formspree) — otherwise the contact form simulates sending.

## Eye-tracking portrait (`src/components/hero/Portrait.tsx`)
The face is never warped. At load, the iris area of each eye is filled in with surrounding eye-white; the original iris pixels are then drawn as a soft disc and shifted a few pixels, clipped to the eyelid opening.
Eye coordinates (`EYES`) are measured in the image's native pixels (1086 × 1146). **If you replace `public/sagar-portrait.webp` with a different image, re-measure them.**

- Mouse / trackpad: gaze follows the cursor.
- Touch devices: a slow idle glance cycle (off under reduced motion).

## 3D
CSS 3D transforms (perspective + `preserve-3d`) and one lightweight canvas (the neural sphere) — no WebGL dependency. Tilt effects are disabled on touch devices and under `prefers-reduced-motion`; the sphere is skipped below 768px.
