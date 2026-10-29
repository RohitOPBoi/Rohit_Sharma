# Rohit Sharma — Portfolio

Personal portfolio for **Rohit Sharma**, AI & ML Engineer specializing in generative diffusion models and autonomous multi-agent systems.

Built with **React 19 + TypeScript + Vite + Tailwind CSS + GSAP + Lenis**.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (http://localhost:3000)
npm run dev

# 3. Build for production
npm run build
```

---

## Features

- **3D Avatar Hero**: 144-frame horizontal cursor-controlled video scrubbing with zero-bezel scaling.
- **Interactive ElasticMesh**: 3D physics-driven balloon typography powered by Three.js.
- **Cinematic Preloader**: Non-linear S-curve counter with 99% pause, live script write-on, and 7-step pixel reveal.
- **Pinned Horizontal Track**: GSAP scroll-scrubbed track linking technical expertise and dripping gooey "WORK" typography.
- **Sticky Project Stack**: Flat-color case study cards that transition from cream to dark overlay on settle.
- **Contact Section**: Subtle ghost typography, gold top glow, sequential headline light-up, and interactive form.
- **Custom Cursor**: Trailing blob with difference-blend mode and responsive fallbacks.

---

## Content Configuration

All site content is decoupled in `src/data/` for easy updates:

- [`src/data/about.ts`](src/data/about.ts) — Background, verified facts, and statistics.
- [`src/data/projects.ts`](src/data/projects.ts) — Case studies, technical pills, metrics, and repository links.
- [`src/data/expertise.ts`](src/data/expertise.ts) — Core capabilities, tech chips, and service rows.
- [`src/data/research.ts`](src/data/research.ts) — Peer-reviewed publications and hackathon awards.
- [`src/data/profile.ts`](src/data/profile.ts) — Contact information and social profile links.

---

## Project Structure

```
├── public/
│   ├── frames/         # 144 pre-rendered WebP frames for avatar hero
│   └── media/          # Source video and assets
├── src/
│   ├── components/     # UI components (AvatarCanvas, Preloader, ElasticMesh, WorkDripping, Cursor)
│   ├── data/           # Content data files
│   ├── sections/       # Page sections (Hero, About, PinnedWork, ProjectStack, Research, Contact, Footer)
│   ├── styles/         # Design tokens and Tailwind CSS
│   └── App.tsx         # Lenis smooth-scroll and GSAP orchestration
├── index.html
└── package.json
```
