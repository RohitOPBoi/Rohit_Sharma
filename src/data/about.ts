export interface StatPair {
  label: string;
  value: string;
}

export interface AboutData {
  eyebrow: string;
  headlineWords: { text: string; isGold?: boolean }[];
  paragraphs: string[];
  stats: StatPair[];
}

export const aboutData: AboutData = {
  eyebrow: "02 — ABOUT · ROHIT SHARMA",
  headlineWords: [
    { text: "ARCHITECTING" },
    { text: "ROBUST" },
    { text: "GENERATIVE", isGold: true },
    { text: "MODELS" },
    { text: "&" },
    { text: "AUTONOMOUS", isGold: true },
    { text: "MULTI-AGENT" },
    { text: "SYSTEMS", isGold: true },
  ],
  paragraphs: [
    "Undergraduate AI & ML engineer (CGPA: 9.4) and Machine Learning Intern at CDAC Noida, researching probabilistic diffusion models for clinical retinal OCT synthesis achieving SSIM 0.88 and FID 14.2 across complex diagnostic conditions.",
    "National hackathon victor including 3rd Place at Qualcomm Delhi National Hackathon with Quorum multimodal orchestration. Tech Lead at HackerRank Campus Crew and Secretary at AARVAK, dedicated to deterministic deep learning pipelines and production CUDA infrastructure.",
  ],
  stats: [
    { label: "CGPA", value: "9.4 CUMULATIVE" },
    { label: "RESEARCH", value: "DIFFUSION OCT" },
    { label: "HACKATHON", value: "QUALCOMM 3RD" },
    { label: "SYSTEMS", value: "MULTI-AGENT" },
    { label: "TECH LEAD", value: "CAMPUS CREW" },
    { label: "STACK", value: "PYTORCH & CUDA" },
  ],
};
