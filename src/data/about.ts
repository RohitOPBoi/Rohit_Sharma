export interface VerifiedFact {
  label: string;
  value: string;
  detail: string;
}

export interface AboutData {
  eyebrow: string;
  headline: string;
  summary: string[];
  facts: VerifiedFact[];
}

export const aboutData: AboutData = {
  eyebrow: "01 / FOUNDATIONS",
  headline: "THEORY GROUNDED IN EMPIRICAL DEPLOYMENT",
  summary: [
    "Undergraduate researcher and engineer specializing in Denoising Diffusion Probabilistic Models (DDPMs) and hierarchical multi-agent orchestrations at Vivekananda Institute of Professional Studies (VIPS-TC).",
    "Current work centers on forward/reverse stochastic diffusion equations, time-conditioned U-Nets with Group Normalization and temporal embeddings, and robust quantitative evaluation using SSIM, PSNR, and FID metrics across clinical imaging baselines.",
    "Beyond generative vision, I build autonomous multi-agent task graphs featuring dynamic decomposition, grounded vector RAG memory, and self-correcting validation loops that maintain auditability in production environments.",
  ],
  facts: [
    {
      label: "DEGREE PROGRAM",
      value: "B.Tech in Artificial Intelligence & Machine Learning",
      detail: "Vivekananda Institute of Professional Studies (VIPS-TC), New Delhi (2024 — 2028)",
    },
    {
      label: "PEER-REVIEWED RESEARCH",
      value: "Retinal OCT Image Synthesis via DDPMs",
      detail: "Accepted at ICSTESD-2026. Achieved FID 13.20 & SSIM 0.86 across 4 retinal conditions.",
    },
    {
      label: "HACKATHONS & RECOGNITION",
      value: "2nd Place — HACK GEEK ROOM Hackathon",
      detail: "Top 5,000 / 50,000+ globally in EY Hackathon 6.0 Global FinTech Challenge.",
    },
    {
      label: "DEPARTMENTAL LEADERSHIP",
      value: "Treasurer @ AARVAK & Event Manager @ ADVAIT",
      detail: "Managing financial allocation and operational logistics for technical symposiums.",
    },
    {
      label: "LOCATION & BASE",
      value: "Gurugram & New Delhi, India",
      detail: "UTC+5:30 (IST). Available for high-impact AI research and engineering roles.",
    },
  ],
};
