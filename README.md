# ROOT_SEEKER — Cybersecurity Portfolio

A responsive personal portfolio for a cybersecurity professional (threat
intelligence, malware analysis, digital forensics, security research). Built as
a futuristic SOC / threat-intel style command center.

**Stack:** React 18 · Vite 5 · Tailwind CSS 3 · React Router 6 · lucide-react

---

## Quick start

> Requires **Node.js 18+** and npm. Node was not installed on the machine this
> project was generated on — install it from <https://nodejs.org> first.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

---

## Make it yours — edit data, not components

All content lives in `src/data/`. The UI renders from these files; you should
not need to touch any component to publish your own portfolio.

| File | Controls |
| --- | --- |
| `src/data/profile.js` | Name, role, bio, email, social links, hero copy, status cards, terminal lines |
| `src/data/navigation.js` | Navbar labels ↔ section ids |
| `src/data/skills.js` | Capability grid (name, group, proficiency level, accent color) |
| `src/data/experience.js` | Timeline entries — **all placeholder**, replace with verified roles |
| `src/data/projects.js` | Project cards (title, summary, tags, repo/demo links, status) |
| `src/data/certifications.js` | **Empty by design.** Add only credentials you actually hold |
| `src/data/platforms.js` | Practice-platform badges (TryHackMe, Hack The Box, KC7, ...) shown under `// CREDENTIALS`. Replace the placeholder URLs with your real profile links; leave `stat` blank unless it's a real, current number |
| `src/data/publications.js` | Published papers shown under `// CREDENTIALS`. Only list work that's actually published and verifiable at `url` |
| `src/data/blog.js` | Articles (`content` is lightweight Markdown) + category filters |

### Content integrity

- Experience entries use obvious placeholders (`[Employer Name]`, `20XX`). Do
  not publish them as real history.
- The certifications array is empty and the UI shows an honest empty state until
  you add real, verifiable credentials.
- Project descriptions describe *intended design*, not proven results.

---

## Contact form

`src/lib/submitContact.js` validates input and, by default, runs in **demo
mode** (no network request). To deliver messages for real, set an endpoint:

```bash
cp .env.example .env
# .env
VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

Works with Formspree, EmailJS/Resend proxies, or any JSON `POST` route.

---

## Project structure

```
src/
  main.jsx              app entry (+ BrowserRouter)
  App.jsx               routes, layout shell, skip link
  index.css            tokens, global background layers, reduced-motion rules
  data/                all editable content
  lib/                 cn, theme accents, tiny markdown renderer, date, form handler
  hooks/               useScrollSpy, useReveal, useReducedMotion
  components/
    Background, Navbar, Hero, StatusPanel, About, Skills,
    ExperienceTimeline, Projects, Certifications, Blog, Contact,
    Footer, Terminal, RouteManager
    ui/                SectionHeading, NeonButton, CornerFrame, Reveal, StatusDot, Tag
    visuals/           GeneratedVisual (seeded inline-SVG artwork — no image files)
  pages/               Home, BlogPost, NotFound
```

---

## Accessibility & motion

- Semantic landmarks, single `<h1>` per page, labelled form controls, visible
  focus rings, a skip link, and ARIA on the nav / filters / form status.
- Every animation is disabled or reduced under
  `prefers-reduced-motion: reduce`.

---

## Deployment

The app uses client-side routing, so configure an SPA fallback to
`index.html`:

- **Netlify** — `public/_redirects` is included.
- **Vercel** — `vercel.json` is included.
- **GitHub Pages / other static hosts** — add an equivalent rewrite, or switch
  `BrowserRouter` to `HashRouter` in `src/main.jsx`.
