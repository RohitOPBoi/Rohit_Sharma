# Rohit Sharma — Portfolio v0.1

A modular, high-end personal portfolio built with **Vite + React 19 + TypeScript + Tailwind CSS + GSAP + Lenis**, featuring a 60fps cursor-tracked avatar hero, gooey metaball particle physics, fluid scroll transitions, and inverted section themes.

---

## 1. Quick Start

### Prerequisites
- Node.js 18+ (tested on Node v20/v22)
- Python 3.10+ with `opencv-python` (only required when re-extracting video frames)

### Installation & Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
The site will be live at `http://localhost:3000/`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 2. Avatar Frames & Two-Clip Architecture

### Frame Analysis & Status
- **Current Clip (`public/media/avatar.mp4`)**:
  - Duration: 6.00s (144 frames @ 24fps)
  - Head Motion: Starts at `0.00s` (Frame 0) looking **~35° to the left (viewer's left)**, smoothly rotating towards **center / neutral** by `5.80s` (Frame 140–143).
  - **Coverage**: **Left to Center only**. It does *not* cover turning from center to the right.
  - Video mirroring was deliberately avoided because it inverts the Apple laptop logo, table perspective, and sunlight direction.

### How to Add the Second Clip (`avatar_right.mp4`)
1. Generate your second clip:
   - **Prompt recommendation**:
     > *"Same 3D Pixar-style character with short dark hair, light beard, navy blue hoodie, sitting at the exact same wooden park table with Apple laptop, sunny park in background with blue sky, trees, lamp post and city buildings. Character starts facing center looking straight ahead, then smoothly turns his head to his left (viewer's right) by ~35-40 degrees, smiling subtly, 24fps, 5-6 seconds."*
2. Save the file to:
   ```
   public/media/avatar_right.mp4
   ```
3. Run the automated extraction and stitching script:
   ```bash
   python scripts/extract_and_stitch.py
   ```
   The script will:
   - Detect both `avatar.mp4` and `avatar_right.mp4`.
   - Sample 48 frames from the left-to-center clip and 48 frames from the center-to-right clip.
   - Blend the junction frame without duplicate stutter.
   - Export 96 WebP frames (1280px wide) into `public/frames/` and update `public/frames/manifest.json` (`hasRightClip: true`, `neutralFrameIndex: 47`).
   - The React canvas automatically adapts to map the cursor across the full horizontal spectrum!

---

## 3. How to Add or Edit Projects

All project data is decoupled from the UI inside `src/data/projects.ts`. Adding a new project is a simple one-file edit:

Open `src/data/projects.ts` and add an object to the `projectsData` array:

```typescript
{
  id: "your-project-id",
  index: "05",
  title: "Your Project Title",
  eyebrow: "CATEGORY • FOCUS",
  shortSummary: "1-2 line summary of the architecture or breakthrough.",
  fullDescription: "Detailed technical explanation, architecture decisions, and results.",
  tags: ["PyTorch", "Diffusion", "Docker"],
  metrics: [
    { label: "FID", value: "11.4" },
    { label: "METRIC 2", value: "99.2%" }
  ],
  liveUrl: "https://your-demo.com",
  repoUrl: "https://github.com/rohit/your-repo",
  coverImage: "/media/projects/your_image.svg",
  year: "2026",
  accentColor: "#6FA8FF"
}
```

---

## 4. How to Change Theme Tokens

All color, typography, and spacing tokens are defined in **CSS variables** and mapped to Tailwind utilities in `src/styles/tokens.css` and `src/styles/index.css`:

```css
/* src/styles/tokens.css */
:root {
  --bg-dark: #070B16;             /* Deep ink navy base */
  --bg-dark-card: #0D1424;        /* Card & panel surfaces */
  --bg-light: #F3EFE6;            /* Inverted light section (warm ivory) */
  --bg-light-surface: #E8E3D8;
  
  --accent-blue-primary: #2F5BFF; /* Hoodie / sky blue */
  --accent-blue-light: #6FA8FF;
  --accent-amber: #F5B84B;        /* Sunlit amber (particles & badge) */
}
```

To retheme the entire site, simply adjust those hex values in `tokens.css`.

---

## 5. Directory Structure

```
├── public/
│   ├── frames/                 # 72 pre-rendered 1280px WebP sequence + manifest.json
│   └── media/                  # Video sources & project SVGs
│       ├── avatar.mp4          # 1080p source video
│       ├── portrait_placeholder.webp
│       └── projects/           # Prometheus, OCT diffusion, Prahari, Research agent SVGs
├── scripts/
│   └── extract_and_stitch.py   # Python frame extraction & multi-clip stitcher
├── src/
│   ├── components/
│   │   ├── AvatarCanvas.tsx    # Cursor-tracked canvas with lerp & idle sway
│   │   ├── Cursor.tsx          # Fluid custom cursor with look/drag hints
│   │   ├── HairlineRule.tsx    # Hairline draw-in with sliding dot
│   │   ├── Marquee.tsx         # Infinite keyword ticker
│   │   ├── Navbar.tsx          # Script signature + section navigation
│   │   ├── ParticleWork.tsx    # Canvas gooey metaballs reacting to pointer
│   │   ├── Preloader.tsx       # Circular ring + script 'hello' draw-on
│   │   ├── ProjectPanel.tsx    # Full-bleed expandable accordion cards
│   │   └── RotatingBadge.tsx   # SVG textPath rotating badge
│   ├── data/
│   │   ├── about.ts            # Bio, degree, society leadership
│   │   ├── expertise.ts        # 5 technical capability rows + floating tokens
│   │   ├── profile.ts          # Contact details, socials, location
│   │   ├── projects.ts         # Initial 4 portfolio projects
│   │   └── research.ts         # ICSTESD-2026 paper & hackathon achievements
│   ├── sections/
│   │   ├── HeroSection.tsx     # Fullscreen canvas + giant ultra-condensed type
│   │   ├── AboutSection.tsx    # Inverted warm ivory section with quick facts
│   │   ├── ExpertiseSection.tsx# Capabilities with hover row reveals
│   │   ├── WorkSection.tsx     # Gooey WORK word + expandable panels
│   │   ├── ResearchSection.tsx # Publications and hackathon honors
│   │   ├── ContactSection.tsx  # Message transmission form & contact cards
│   │   └── Footer.tsx          # Giant wordmark & back-to-top
│   ├── styles/
│   │   ├── index.css
│   │   └── tokens.css
│   ├── App.tsx                 # Lenis + GSAP ScrollTrigger orchestrator
│   └── main.tsx
└── package.json
```
