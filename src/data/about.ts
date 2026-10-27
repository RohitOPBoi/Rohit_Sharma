export interface FactItem {
  label: string;
  value: string;
  subValue?: string;
}

export interface AboutData {
  eyebrow: string;
  headline: string;
  leadParagraph: string;
  secondaryParagraph: string;
  portraitPlaceholder: string;
  quickFacts: FactItem[];
}

export const aboutData: AboutData = {
  eyebrow: "01 / WHO AM I",
  headline: "I ENGINEER INTELLIGENT SYSTEMS WHERE RIGOROUS DEEP LEARNING MEETS PRACTICAL DEPLOYMENT.",
  leadParagraph:
    "I am an AI & Machine Learning engineer and B.Tech undergraduate at Vivekananda Institute of Professional Studies (VIPS-TC). My work focuses on mathematical formulations of generative diffusion models and orchestrating multi-agent systems that solve complex, multi-step real-world problems.",
  secondaryParagraph:
    "From synthesizing anatomically faithful retinal OCT pathology with time-conditioned U-Net diffusions to designing closed-loop adversarial payment fraud defense mechanisms, I combine first-principles computer science with modern AI research pipelines.",
  portraitPlaceholder: "/media/portrait_placeholder.webp",
  quickFacts: [
    {
      label: "BASED IN",
      value: "GURUGRAM & NEW DELHI",
      subValue: "INDIA",
    },
    {
      label: "CORE FOCUS",
      value: "DIFFUSION & AGENTIC AI",
      subValue: "DDPMs • RAG • PyTorch",
    },
    {
      label: "EDUCATION",
      value: "B.TECH IN AI & ML",
      subValue: "VIPS-TC (2024 — 2028)",
    },
    {
      label: "LEADERSHIP",
      value: "TREASURER & EVENT MGR",
      subValue: "AARVAK & ADVAIT VSET",
    },
    {
      label: "RESEARCH RIGOR",
      value: "FID 13.20 | SSIM 0.86",
      subValue: "Peer-reviewed Paper 2026",
    },
    {
      label: "AVAILABILITY",
      value: "OPEN FOR INTERNSHIPS",
      subValue: "Research & Systems",
    },
  ],
};
